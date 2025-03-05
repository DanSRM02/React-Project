import React from "react";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmar Acción",
    message = "¿Estás seguro de proceder?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    icon
}) => {
    if (!isOpen) return null;

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleBackgroundClick}
        >
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg transform transition-all">
                <div className="flex items-center gap-3 mb-4">
                    {icon}
                    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;