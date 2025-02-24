import { useState, useEffect } from "react";
import { getAllIndividualTypes } from "../services/individualTypesService";

export const useIndividualTypes = () => {
    const [individualTypes, setIndividualTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndividualTypes = async () => {
            try {
                const response = await getAllIndividualTypes();

                setIndividualTypes(response.data || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchIndividualTypes();
    }, []);

    return { individualTypes, loading, error };
};
