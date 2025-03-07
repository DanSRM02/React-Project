import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { InfoAlert } from '../../components/UI/alert/InfoAlert';
import { passwordChangeSchema } from '../../utils/validation/validationSchema';
import ErrorMessage from '../../components/UI/alert/ErrorMessage';
import Input from '../../components/UI/form/Input';
import Label from '../../components/UI/form/Label';
import { useAuth } from '../../contexts/AuthContext';
import { useUsers } from '../../hooks/useUsers';
import Loader from '../../components/UI/Loader';
import { DetailItem } from '../../components/UI/datatable/DetailItem';
import { LockClosedIcon } from '../../components/UI/Icons';
import { Button } from '../../components/UI/form/Button';

const AccountSettingsPage = () => {
    const { user } = useAuth();
    const [status, setStatus] = React.useState(null);
    const { fetchUserById, handleChangePassword, error, isLoading, selectedUser } = useUsers();

    // Obtener datos del usuario al montar el componente
    useEffect(() => {
        if (user?.id) {
            fetchUserById(user.id);
        }
    }, [user?.id]);

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: passwordChangeSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // Corrección aquí: separar id y datos
                await handleChangePassword(user.id, {
                    currentPassword: values.currentPassword,
                    password: values.newPassword,
                    username: selectedUser.individual.email
                });

                setStatus({ type: 'success', message: '¡Contraseña actualizada exitosamente!' });
                resetForm();
            } catch (error) {
                setStatus({
                    type: 'error',
                    message: error.response?.data?.message || 'Error al actualizar la contraseña'
                });
            }
        }
    });

    if (isLoading.single) return <Loader className="mx-auto my-8" />;
    if (error.single) return <ErrorMessage message={error.single.message} />;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Encabezado con icono */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Configuración de Cuenta</h1>
            </div>

            {/* Sección de Información Personal */}
            {selectedUser && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
                        <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                            Cuenta verificada
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Columna izquierda */}
                        <div className="space-y-5">
                            <DetailItem
                                label="Nombre completo"
                                value={selectedUser.individual.name}
                                icon="user"
                            />
                            <DetailItem
                                label="Documento"
                                value={`${selectedUser.individual.document_type.acronym} ${selectedUser.individual.document}`}
                                icon="id"
                            />
                            <DetailItem
                                label="Correo electrónico"
                                value={selectedUser.individual.email}
                                icon="email"
                            />
                        </div>

                        {/* Columna derecha */}
                        <div className="space-y-5">
                            <DetailItem
                                label="Teléfono"
                                value={selectedUser.individual.phone}
                                icon="phone"
                            />
                            <DetailItem
                                label="Dirección"
                                value={selectedUser.individual.address}
                                icon="location"
                            />
                            <div className="grid grid-cols-2 gap-5">
                                <DetailItem
                                    label="Rol"
                                    value={selectedUser.rol_type.name}
                                    icon="badge"
                                />
                                <DetailItem
                                    label="Tipo"
                                    value={selectedUser.individual.individual_type.name}
                                    icon="person"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sección de Cambio de Contraseña */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Seguridad</h2>
                    <p className="text-gray-500 text-sm">Actualiza tu contraseña regularmente para mantener la seguridad de tu cuenta</p>
                </div>

                {status?.type === 'success' && <InfoAlert message={status.message} className="mb-6" />}
                {status?.type === 'error' && <ErrorMessage message={status.message} className="mb-6" />}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="currentPassword" className="mb-1.5">Contraseña actual</Label>
                            <Input
                                showIcon={false}
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="••••••••"
                                leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                                onChange={formik.handleChange}
                                value={formik.values.currentPassword}
                            />
                            {formik.errors.currentPassword && (
                                <ErrorMessage message={formik.errors.currentPassword} className="mt-1" />
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="newPassword" className="mb-1.5">Nueva contraseña</Label>
                                <Input
                                    showIcon={false}
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword}
                                />
                                {formik.errors.newPassword && (
                                    <ErrorMessage message={formik.errors.newPassword} className="mt-1" />
                                )}
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword" className="mb-1.5">Confirmar contraseña</Label>
                                <Input
                                    showIcon={false}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                />
                                {formik.errors.confirmPassword && (
                                    <ErrorMessage message={formik.errors.confirmPassword} className="mt-1" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <Button
                            type="submit"
                            disabled={isLoading.update}
                            variant="primary"
                            loading={isLoading.update}
                            className="w-full px-4 py-3 text-base font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            {isLoading.update ? 'Actualizando...' : 'Cambiar contraseña'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
