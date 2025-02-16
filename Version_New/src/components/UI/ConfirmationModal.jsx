import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({ isOpen, onClose, redirectLink }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    ¿Estás seguro?
                </h3>
                <p className="text-gray-600 mb-6">
                    Vas a salir de la página actual para ver la ficha técnica del producto.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => navigate(redirectLink)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Sí, ir a la ficha
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal