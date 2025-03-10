import { useState, useEffect } from "react";
import { getAllDocumentTypes } from "../services/documentTypeService";

export const useDocumentTypes = () => {
    const [documentTypes, setDocumentTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocumentTypes = async () => {
            try {
                const response = await getAllDocumentTypes();
                // Según la estructura de tu Map<String, Object>,
                // probablemente la data real esté en response.data
                setDocumentTypes(response.data || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDocumentTypes();
    }, []);

    return { documentTypes, loading, error };
};
