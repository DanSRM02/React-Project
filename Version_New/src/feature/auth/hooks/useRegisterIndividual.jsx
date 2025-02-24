// useRegisterIndividual.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/authService";

export const useRegisterIndividual = () => {
    const navigate = useNavigate();
    const [individual, setIndividual] = useState({
        name: "",
        email: "",
        address: "",
        document: "",
        phone: "",
        document_type_id: "",
        individual_type_id: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "document_type_id") {
            const autoIndividualType =
                value === "1" || value === "3" ? "1" : value === "2" ? "2" : "";
            setIndividual((prev) => ({
                ...prev,
                document_type_id: value,
                individual_type_id: autoIndividualType
            }));
        } else {
            setIndividual((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Función que realiza el registro sin depender del evento del formulario
    const registerIndividual = async () => {
        setLoading(true);
        setError(null);

        console.debug("Enviando datos del individual:", individual);

        try {
            const response = await registerUser(individual);
            if (!response) {
                console.log("¡Error!");
            }
            navigate("/login");
        } catch (err) {
            console.error("Error al enviar la petición:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { individual, handleChange, registerIndividual, loading, error };
};