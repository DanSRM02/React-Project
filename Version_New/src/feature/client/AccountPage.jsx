import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { passwordChangeSchema } from '../../utils/validation/validationSchema';
import { useAuth } from '../../contexts/AuthContext';
import { useUsers } from '../../hooks/useUsers';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/UI/Loader';
import { LockClosedIcon } from '../../components/UI/Icons';
import { FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import LocationPicker from '../../components/UI/map/LocationPicker';
import ErrorMessage from '../../components/UI/alert/ErrorMessage';
import Input from '../../components/UI/form/Input';
import Label from '../../components/UI/form/Label';
import { Button } from '../../components/UI/form/Button';
import { DetailItem } from '../../components/UI/datatable/DetailItem';
import { SuccessAlert } from '../../components/UI/alert/SuccessAlert';
import { InfoAlert } from '../../components/UI/alert/InfoAlert';

const AccountSettingsPage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [status, setStatus] = useState(null);
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const [redirectMessage, setRedirectMessage] = useState(null);

    const {
        fetchUserById,
        handleChangePassword,
        error,
        isLoading,
        selectedUser,
        handleUpdateAddress
    } = useUsers();

    // Estado unificado para dirección
    const [tempAddress, setTempAddress] = useState({
        address: '',
        lat: null,
        lng: null
    });

    // Verificar si hay un mensaje de redirección
    useEffect(() => {
        if (location.state?.message) {
            setRedirectMessage(location.state.message);
            // Auto-abrir el selector de ubicación si fue redirigido para actualizar dirección
            setShowLocationPicker(true);
        }
    }, [location.state]);

    // Inicializar datos del usuario
    useEffect(() => {
        if (user?.id) {
            fetchUserById(user.id).then(() => {
                if (selectedUser?.individual) {
                    setTempAddress({
                        address: selectedUser.individual.address || '',
                        lat: selectedUser.individual.latitude || null,
                        lng: selectedUser.individual.longitude || null
                    });
                }
            });
        }
    }, [user?.id]);

    // Actualizar ubicación
    const handleUpdateLocation = async (newLocation) => {
        try {
            await handleUpdateAddress(selectedUser.id, {
                address: newLocation.address,
                latitude: newLocation.lat,
                longitude: newLocation.lng
            });

            setTempAddress(newLocation);
            setStatus({ type: 'success', message: '¡Ubicación actualizada!' });
            setShowLocationPicker(false);

            // Limpiar el mensaje de redirección después de actualizar
            setRedirectMessage(null);
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        }
    };

    const handlePasswordSubmit = async (values, { resetForm }) => {
        try {
            if (!selectedUser?.individual?.email) {
                throw new Error("Usuario no identificado");
            }

            await handleChangePassword(user.id, {
                currentPassword: values.currentPassword,
                password: values.newPassword,
                username: selectedUser.individual.email
            });

            setStatus({
                type: "success",
                message: "¡Contraseña actualizada correctamente!"
            });
            resetForm();
        } catch (error) {
            setStatus({
                type: "error",
                message: error.message
            });
        }
    };

    // Formulario de cambio de contraseña
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: passwordChangeSchema,
        onSubmit: handlePasswordSubmit
    });

    if (isLoading.single) return <Loader className="mx-auto my-8" />;
    if (error.single) return <ErrorMessage message={error.single.message} />;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Mensaje de redirección */}
            {redirectMessage && (
                <InfoAlert
                    message={redirectMessage}
                    title="Actualización necesaria"
                    actionText="Actualizar ahora"
                    onAction={() => setShowLocationPicker(true)}
                    className="mb-4 animate-pulse"
                />
            )}

            {/* Encabezado */}
            <header className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Configuración de Cuenta</h1>
            </header>

            {/* Sección de Información Personal */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Información Personal</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Cuenta verificada
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna Izquierda */}
                    <div className="space-y-4">
                        <DetailItem
                            label="Nombre completo"
                            value={selectedUser?.individual?.name}
                            icon="user"
                        />
                        <DetailItem
                            label="Documento"
                            value={`${selectedUser?.individual?.document_type?.acronym} ${selectedUser?.individual?.document}`}
                            icon="id"
                        />
                        <DetailItem
                            label="Correo electrónico"
                            value={selectedUser?.individual?.email}
                            icon="email"
                        />
                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-4">
                        <DetailItem
                            label="Teléfono"
                            value={selectedUser?.individual?.phone}
                            icon="phone"
                        />
                        <DetailItem
                            label="Rol"
                            value={selectedUser?.rol_type?.name}
                            icon="badge"
                        />
                        <DetailItem
                            label="Tipo"
                            value={selectedUser?.individual?.individual_type?.name}
                            icon="person"
                        />
                    </div>
                </div>
            </section>

            {status && (
                status.type === 'success'
                    ? <SuccessAlert message={status.message} className="mb-4" />
                    : <ErrorMessage message={status.message} className="mb-4" />
            )}

            {/* Sección de Dirección */}
            <section className={`bg-white rounded-2xl shadow-sm p-6 ${redirectMessage ? 'ring-2 ring-blue-500 animate-pulse' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Dirección de Entrega</h2>
                    <Button
                        variant="secondary"
                        onClick={() => setShowLocationPicker(true)}
                        icon={<FaEdit className="mr-2" />}
                    >
                        Actualizar Ubicación
                    </Button>
                </div>

                {!selectedUser?.individual?.address && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    No tienes una dirección registrada. Para realizar compras es necesario registrar una dirección de entrega.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <DetailItem
                        label="Dirección Actual"
                        value={selectedUser?.individual?.address || 'No registrada'}
                        icon={<FaMapMarkerAlt className="text-gray-400" />}
                    />

                    {(tempAddress.lat && tempAddress.lng) && (
                        <DetailItem
                            label="Coordenadas"
                            value={`${Number(tempAddress.lat).toFixed(5)}, ${Number(tempAddress.lng).toFixed(5)}`}
                            icon={<FaMapMarkerAlt className="text-gray-400" />}
                        />
                    )}
                </div>

                {showLocationPicker && (
                    <LocationPicker
                        onConfirm={handleUpdateLocation}
                        onCancel={() => setShowLocationPicker(false)}
                        initialLocation={tempAddress}
                    />
                )}
            </section>

            {/* Sección de Cambio de Contraseña */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Seguridad</h2>
                    <p className="text-gray-500">Actualiza tu contraseña regularmente para mantener la seguridad</p>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit(e);
                    }}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {/* Campo Contraseña Actual */}
                        <div>
                            <Label htmlFor="currentPassword">Contraseña actual</Label>
                            <Input
                                id="currentPassword"
                                {...formik.getFieldProps('currentPassword')}
                                type="password"
                                placeholder="••••••••"
                                leftIcon={<LockClosedIcon className="text-gray-400" />}
                                error={formik.touched.currentPassword && formik.errors.currentPassword}
                                className={formik.errors.currentPassword ? 'border-red-500' : ''}
                            />
                            {formik.touched.currentPassword && formik.errors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.currentPassword}</p>
                            )}
                        </div>

                        {/* Campos Nueva Contraseña y Confirmar */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="newPassword">Nueva contraseña</Label>
                                <Input
                                    id="newPassword"
                                    {...formik.getFieldProps('newPassword')}
                                    type="password"
                                    placeholder="••••••••"
                                    leftIcon={<LockClosedIcon className="text-gray-400" />}
                                    error={formik.touched.newPassword && formik.errors.newPassword}
                                    className={formik.errors.newPassword ? 'border-red-500' : ''}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.newPassword}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                                <Input
                                    id="confirmPassword"
                                    {...formik.getFieldProps('confirmPassword')}
                                    type="password"
                                    placeholder="••••••••"
                                    leftIcon={<LockClosedIcon className="text-gray-400" />}
                                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    className={formik.errors.confirmPassword ? 'border-red-500' : ''}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="border-t pt-6">
                        <button
                            type="submit"
                            className={`w-full px-4 py-3 rounded-lg font-medium text-white transition-colors ${formik.isValid && !isLoading.update
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!formik.isValid || formik.isSubmitting || isLoading.update}
                        >
                            {isLoading.update ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Actualizando...
                                </div>
                            ) : (
                                'Cambiar contraseña'
                            )}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AccountSettingsPage;