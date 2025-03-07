import React, { useEffect } from "react";
import { HiX } from "react-icons/hi";

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = "md"
}) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-xl",
        lg: "max-w-3xl",
        xl: "max-w-5xl",
        full: "max-w-full"
    };

    return (
        <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
        >           

            {/* Contenedor del modal */}
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
                <div
                    className={`inline-block w-full ${sizeClasses[size]
                        } overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                            aria-label="Cerrar"
                        >
                            <HiX className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Contenido */}
                    <div className="max-h-[70vh] overflow-y-auto p-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};