import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { changePassword } from "../services/authService";

export const useUsers = (autoFetch = true) => {
    // Estados generales
    const [users, setUsers] = useState([]);
    const [deliveriesActive, setDeliveriesActive] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [addressState, setAddressState] = useState({
        loading: false,
        error: null,
        address: null
    });

    // Estados de carga
    const [isLoading, setIsLoading] = useState({
        all: false,
        single: false,
        add: false,
        update: false,
        delete: false
    });

    // Estados de error
    const [error, setError] = useState({
        all: null,
        single: null,
        add: null,
        update: null,
        delete: null
    });

    // Obtener todos los usuarios
    const fetchDeliveriesActive = async () => {
        setIsLoading(prev => ({ ...prev, all: true }));
        setError(prev => ({ ...prev, all: null }));

        try {
            const response = await userService.getDeliveriesActive();
            setDeliveriesActive(response.data);
            return response;
        } catch (err) {
            setError(prev => ({ ...prev, all: err }));
            throw err;
        } finally {
            setIsLoading(prev => ({ ...prev, all: false }));
        }
    };

    // Obtener todos los usuarios
    const fetchUsers = async () => {
        setIsLoading(prev => ({ ...prev, all: true }));
        setError(prev => ({ ...prev, all: null }));

        try {
            const response = await userService.getAllUsers();
            setUsers(response.data);
            return response;
        } catch (err) {
            setError(prev => ({ ...prev, all: err }));
            throw err;
        } finally {
            setIsLoading(prev => ({ ...prev, all: false }));
        }
    };

    // Obtener usuario por ID
    const fetchUserById = async (id) => {
        setIsLoading(prev => ({ ...prev, single: true }));
        setError(prev => ({ ...prev, single: null }));

        try {
            const response = await userService.getUserById(id);
            setSelectedUser(response.data);
            return response;
        } catch (err) {
            setError(prev => ({ ...prev, single: err }));
            throw err;
        } finally {
            setIsLoading(prev => ({ ...prev, single: false }));
        }
    };

    const handleChangePassword = async (id, userData) => {        
        setIsLoading(prev => ({ ...prev, update: true }));
        setError(prev => ({ ...prev, update: null }));

        try {
            const response = await changePassword(id, userData);
            return response.data;
        } catch (err) {
            setError(prev => ({ ...prev, update: err }));
            throw err;
        } finally {
            setIsLoading(prev => ({ ...prev, update: false }));
        }
    }

    const handleUpdateAddress = async (userId, addressData) => {
        setAddressState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Validación de coordenadas
            if (!validateCoordinates(addressData.latitude, addressData.longitude)) {
                throw new Error('Coordenadas inválidas');
            }

            const response = await userService.updateAddress(userId, addressData);
            setAddressState({
                loading: false,
                error: null,
                address: response.data
            });
            return response.data;
        } catch (error) {
            setAddressState({
                loading: false,
                error: error.response?.data?.message || error.message,
                address: null
            });
            throw error;
        }
    };

    const validateCoordinates = (lat, lng) => {
        return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    };


    const handleChangeStatus = async (id, status) => {
        setIsLoading(prev => ({ ...prev, single: true }));
        setError(prev => ({ ...prev, single: null }));

        try {
            const response = await userService.changeStatus(id, { state: status });
            setSelectedUser(response.data);
            return response;
        } catch (err) {
            setError(prev => ({ ...prev, single: err }));
            throw err;
        } finally {
            setIsLoading(prev => ({ ...prev, single: false }));
        }
    }

    // Crear usuario
    const createUser = async (userData) => {
        setIsLoading(prev => ({ ...prev, add: true }));
        setError(prev => ({ ...prev, add: null }));

        try {
            const response = await userService.addUser({ data: userData });
            setUsers(prev => [...prev, response]);
            return response;
        } catch (err) {
            setError(prev => ({ ...prev, add: err }));
            throw err;
        } finally {
            setIsLoading(prev => ({ ...prev, add: false }));
        }
    };

    // Actualizar usuario
    const updateUser = async (id, userData) => {
        setIsLoading(prev => ({ ...prev, update: true }));
        setError(prev => ({ ...prev, update: null }));

        try {
            const response = await userService.updateUser(id, { data: userData });
            setUsers(prev =>
                prev.map(user => user.id === id ? response : user)
            );
            if (selectedUser?.id === id) setSelectedUser(response.data);
            return response;
        } catch (err) {
            setError(prev => ({ ...prev, update: err }));
            throw err;
        } finally {
            setIsLoading(prev => ({ ...prev, update: false }));
        }
    };

    // Carga inicial automática
    useEffect(() => {
        if (autoFetch) fetchUsers();
    }, []);

    return {
        // Estados
        users,
        selectedUser,
        deliveriesActive,
        isLoading,
        error,
        addressState,
        setAddressState,

        // Acciones
        fetchUsers,
        fetchUserById,
        createUser,
        updateUser,
        handleChangePassword,
        handleChangeStatus,
        fetchDeliveriesActive,
        handleUpdateAddress,

        // Helpers
        resetErrors: () => setError({
            all: null,
            single: null,
            add: null,
            update: null,
            delete: null
        })
    };
};