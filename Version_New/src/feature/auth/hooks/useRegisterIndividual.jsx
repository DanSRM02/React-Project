import { useState } from "react";
import { registerUser } from "../../../services/authService";

export const useRegisterIndividual = () => {
    const [individual, setIndividual] = useState({
        name: "",
        email: "",
        address: "",
        document: "",
        phone: "",
        document_type_id: "",
        individual_type_id: "",
        state: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Para selects normales
        if (name === "document_type_id" || name === "individual_type_id") {
            const numericValue = Number(value);
            setIndividual(prev => ({
                ...prev,
                [name]: numericValue,
                // Actualizar individual_type_id automáticamente si es document_type_id
                ...(name === "document_type_id" && {
                    individual_type_id: numericValue === 2 ? 2 : 1
                })
            }));
        } else {
            setIndividual(prev => ({ ...prev, [name]: value }));
        }
    };
    // Función que realiza el registro con los datos correctamente formateados
    const registerIndividual = async (formValues = null) => {
        setLoading(true);
        setError(null);

        // Use provided form values if available, otherwise use state
        let dataToSend = formValues || individual;

        // Ensure types are correct for the backend
        dataToSend = {
            ...dataToSend,
            document_type_id: Number(dataToSend.document_type_id),
            individual_type_id: Number(dataToSend.individual_type_id),
            // Convert document to number if it's numeric
            document: /^\d+$/.test(dataToSend.document) ? Number(dataToSend.document) : dataToSend.document
        };

        console.debug("Enviando datos formateados:", dataToSend);

        try {
            const response = await registerUser(dataToSend);
            if (!response) {
                console.log("¡Error en la respuesta!");
            }
            return response;
        } catch (err) {
            console.error("Error al enviar la petición:", err);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { individual, handleChange, setIndividual, registerIndividual, loading, error };
};