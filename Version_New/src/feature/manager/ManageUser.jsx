import React, { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import DataTable from "../../components/UI/datatable/DataTable";
import Loader from "../../components/UI/Loader";
import ErrorMessage from "../../components/UI/alert/ErrorMessage";
import { HiOutlinePencil, HiOutlineUserAdd, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { ROLE_COLORS, STATUS_BADGES } from "../../utils/constans/states";
import { Button } from "../../components/UI/form/Button";
import { Modal } from "../../components/UI/alert/Modal";
import { useRegisterIndividual } from "../auth/hooks/useRegisterIndividual";
import Input from "../../components/UI/form/Input";
import { Select } from "../../components/UI/form/Select";
import ConfirmationModal from "../../components/UI/alert/ConfirmationModal";

const UsersList = () => {
    const {
        users,
        isLoading,
        error,
        fetchUsers,
        updateUser,
        handleChangeStatus
    } = useUsers();

    const {
        individual,
        handleChange,
        registerIndividual,
        setIndividual,
        loading,
        error: registerError
    } = useRegisterIndividual();

    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [initialEditData, setInitialEditData] = useState(null);
    const [validationError, setValidationError] = useState(null);

    // Estado para el modal de confirmación
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [userToToggle, setUserToToggle] = useState(null);

    const roleOptions = [
        { label: "Gerente", value: 4 },
        { label: "Vendedor", value: 1 },
        { label: "Domiciliario", value: 3 },
        { label: "Cliente", value: 2 }
    ];

    const handleEdit = (user) => {
        const initialData = {
            name: user.individual.name,
            email: user.individual.email,
            document_type_id: user.individual.document_type.id.toString(),
            document: user.individual.document,
            phone: user.individual.phone,
            individual_type_id: user.individual.individual_type.id,
            state: user.state
        };

        setEditUser(user);
        setInitialEditData(initialData);
        setIndividual(initialData);
        setSelectedRole(user.rol_type.id.toString());
        setShowEditModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            ...individual,
            rol_type: selectedRole,
            individual_type_id: individual.individual_type_id
        };

        try {
            await registerIndividual(formData);
            setShowModal(false);
            setIndividual({
                name: "",
                email: "",
                document: "",
                phone: "",
                document_type_id: "",
                individual_type_id: "",
                state: null
            });
            fetchUsers();
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setValidationError(null);

        const hasChanges = Object.keys(individual).some(key => {
            return individual[key] !== initialEditData[key];
        });

        if (!hasChanges) {
            setValidationError("No se detectaron cambios para actualizar");
            return;
        }

        try {
            await updateUser(editUser.id, {
                ...individual,
                rol_type: parseInt(selectedRole),
                individual_type_id: individual.individual_type_id,
                state: individual.state
            });

            setShowEditModal(false);
            setInitialEditData(null);
            setIndividual({
                name: "",
                email: "",
                document: "",
                phone: "",
                document_type_id: "",
                individual_type_id: "",
                state: null
            });
            fetchUsers();
        } catch (error) {
            console.error("Error actualizando usuario:", error);
        }
    };

    // Función para mostrar el modal de confirmación
    const confirmToggleStatus = (id, currentStatus) => {
        setUserToToggle({ id, currentStatus });
        setConfirmModalOpen(true);
    };

    // Función para realizar el cambio de estado después de la confirmación
    const executeStatusChange = async () => {
        if (!userToToggle) return;

        try {
            await handleChangeStatus(userToToggle.id, !userToToggle.currentStatus);
            fetchUsers();
        } catch (error) {
            console.error("Error cambiando estado:", error);
        } finally {
            setConfirmModalOpen(false);
            setUserToToggle(null);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            header: "Usuario",
            accessor: "individual.name",
            render: (user) => (
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-medium">
                            {user.individual.name[0].toUpperCase()}
                        </span>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {user.individual.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {user.individual.email}
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: "Documento",
            accessor: "individual.document",
            render: (user) => (
                <div className="text-sm text-gray-900">
                    {user.individual.document_type.acronym} {user.individual.document}
                </div>
            )
        },
        {
            header: "Rol",
            accessor: "rol_type.name",
            render: (user) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${ROLE_COLORS[user.rol_type.name]}`}>
                    {user.rol_type.name}
                </span>
            )
        },
        {
            header: "Estado",
            accessor: "state",
            render: (user) => {
                const status = user.state ? 'active' : 'inactive';
                return (
                    <button
                        onClick={() => confirmToggleStatus(user.id, user.state)}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${STATUS_BADGES[status]}`}
                    >
                        {user.state ? (
                            <>
                                <HiOutlineCheckCircle className="w-4 h-4" />
                                Activo
                            </>
                        ) : (
                            <>
                                <HiOutlineXCircle className="w-4 h-4" />
                                Inactivo
                            </>
                        )}
                    </button>
                );
            }
        },
        {
            header: "Acciones",
            accessor: "actions",
            render: (user) => (
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => handleEdit(user)}
                        className="text-green-600 hover:text-green-800"
                        title="Editar usuario"
                    >
                        <HiOutlinePencil className="w-5 h-5" />
                    </button>
                </div>
            )
        }
    ];

    const mobileRender = (user) => {
        const status = user.state ? 'active' : 'inactive';
        return (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-medium text-gray-800">{user.individual.name}</h3>
                        <p className="text-sm text-gray-500">{user.individual.email}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs ${ROLE_COLORS[user.rol_type.name]}`}>
                        {user.rol_type.name}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        {user.individual.document_type.acronym} {user.individual.document}
                    </p>
                    <button
                        onClick={() => confirmToggleStatus(user.id, user.state)}
                        className={`px-2 py-1 text-xs flex items-center gap-1 ${STATUS_BADGES[status]}`}
                    >
                        {user.state ? 'Activo' : 'Inactivo'}
                    </button>
                </div>
            </div>
        );
    };

    if (isLoading.all) return <Loader className="mx-auto my-8" />;
    if (error.all) return <ErrorMessage message={error.all.message} />;

    const filteredUsers = users?.filter(user =>
        user.individual.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.individual.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Listado de Usuarios</h1>

                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Buscar usuarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Button
                        onClick={() => setShowModal(true)}
                        variant="primary"
                        className="px-4 py-2.5 text-sm gap-2 transition-all"
                    >
                        <HiOutlineUserAdd className="w-5 h-5" />
                        Nuevo Usuario
                    </Button>
                </div>
            </div>

            {/* Modal de confirmación para activar/desactivar usuario */}
            <ConfirmationModal
                isOpen={confirmModalOpen}
                onConfirm={executeStatusChange}
                onCancel={() => {
                    setConfirmModalOpen(false);
                    setUserToToggle(null);
                }}
                title={userToToggle?.currentStatus ? "Desactivar Usuario" : "Activar Usuario"}
                message={userToToggle?.currentStatus
                    ? "¿Estás seguro que deseas desactivar este usuario? No podrá acceder al sistema mientras esté inactivo."
                    : "¿Estás seguro que deseas activar este usuario? Esto le permitirá acceder al sistema nuevamente."}
                confirmText={userToToggle?.currentStatus ? "Desactivar" : "Activar"}
                confirmButtonColor={userToToggle?.currentStatus ? "danger" : "success"}
            />

            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setValidationError(null);
                    setInitialEditData(null);
                    setIndividual({
                        name: "",
                        email: "",
                        document: "",
                        phone: "",
                        document_type_id: "",
                        individual_type_id: "",
                        state: null
                    });
                }}
                title="Editar Usuario"
                size="lg"
            >
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            showIcon={false}
                            label="Nombre Completo"
                            name="name"
                            value={individual.name}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            showIcon={false}
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            value={individual.email}
                            onChange={handleChange}
                            required
                        />

                        <Select
                            label="Tipo de Documento"
                            name="document_type_id"
                            options={[
                                { value: "1", label: "Cédula" },
                                { value: "2", label: "NIT" },
                                { value: "3", label: "Cédula extranjería" },
                            ]}
                            value={individual.document_type_id}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            showIcon={false}
                            label="Número de Documento"
                            name="document"
                            value={individual.document}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            showIcon={false}
                            label="Teléfono"
                            name="phone"
                            value={individual.phone}
                            onChange={handleChange}
                            required
                        />

                        <Select
                            label="Rol del Usuario"
                            options={roleOptions}
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            required
                        />
                    </div>


                    {validationError && (
                        <div className="mt-2">
                            <ErrorMessage message={validationError} />
                        </div>
                    )}

                    <div className="flex gap-4 justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowEditModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading.update}
                        >
                            {isLoading.update ? "Actualizando..." : "Guardar Cambios"}
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setIndividual({
                        name: "",
                        email: "",
                        document: "",
                        phone: "",
                        document_type_id: "",
                        individual_type_id: "",
                        state: null
                    });
                    setSelectedRole("");
                }}
                title="Registrar Nuevo Usuario"
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            showIcon={false}
                            label="Nombre Completo"
                            name="name"
                            value={individual.name}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            showIcon={false}
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            value={individual.email}
                            onChange={handleChange}
                            required
                        />

                        <Select
                            label="Tipo de Documento"
                            options={[
                                { value: "", label: "Seleccionar", disabled: true },
                                { value: "1", label: "Cédula" },
                                { value: "2", label: "NIT" },
                                { value: "3", label: "Cédula extranjería" },
                            ]}
                            value={individual.document_type_id}
                            onChange={handleChange}
                            name="document_type_id"
                            required
                        />

                        <Input
                            showIcon={false}
                            label="Número de Documento"
                            name="document"
                            value={individual.document}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            showIcon={false}
                            label="Teléfono"
                            name="phone"
                            value={individual.phone}
                            onChange={handleChange}
                            required
                        />

                        <Select
                            label="Rol del Usuario"
                            options={[
                                { value: "", label: "Seleccionar rol", disabled: true },
                                ...roleOptions.map(role => ({
                                    value: role.value,
                                    label: role.label
                                }))
                            ]}
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            required
                        />
                    </div>
                    {registerError && (
                        <div className="mt-4">
                            <ErrorMessage message={registerError.message} />
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 mt-8 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader className="h-4 w-4 animate-spin" />
                                    Registrando...
                                </span>
                            ) : 'Crear Usuario'}
                        </Button>
                    </div>
                </form>
            </Modal>

            <DataTable
                columns={columns}
                data={filteredUsers}
                emptyMessage="No se encontraron usuarios"
                mobileRender={mobileRender}
            />
        </div>
    );
};

export default UsersList;