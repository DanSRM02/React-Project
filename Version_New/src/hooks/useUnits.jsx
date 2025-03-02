import { useState, useEffect } from "react";
import { getAllUnits } from "../services/unitService";

export const useUnits = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUnits = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllUnits();
            // Si el endpoint envuelve los datos en "data", se extrae ese arreglo.
            setUnits(res.data || []);
        } catch (err) {
            console.error("Error al obtener unidades:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    return { units, loading, error, fetchUnits };
};
