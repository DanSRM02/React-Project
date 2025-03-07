import React, { useEffect, useState } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmationModal = ({
    isOpen,
    onConfirm,
    onCancel,
    title = "Confirmar Acción",
    message = "¿Estás seguro de proceder?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmButtonColor = "primary",    
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await onConfirm();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={(e) => e.target === e.currentTarget && onCancel()}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            
                            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                        </div>

                        <p className="text-gray-600 mb-6">{message}</p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                disabled={isSubmitting}
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={`px-4 py-2 rounded-lg transition-colors ${confirmButtonColor === 'danger'
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-green-600 hover:bg-green-700'
                                    } text-white`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <FaSpinner className="animate-spin mx-2" />
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;