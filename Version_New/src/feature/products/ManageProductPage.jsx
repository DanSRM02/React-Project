import React, { useState } from "react";
import { useProducts } from "../../hooks/useProduct";
import { FiTrash2, FiPackage, FiPlus, FiAlertTriangle } from "react-icons/fi";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import { useProductVariants } from "../../hooks/useProductVariants";

const ManageProductPage = () => {
    const { handlerAddProduct, handlerRemoveProduct } = useProducts();
    const { variants, loading, error, } = useProductVariants();
    const [newProductName, setNewProductName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [productToDelete, setProductToDelete] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newProductName.trim()) return;

        try {
            await handlerAddProduct({
                name: newProductName,
                state: true
            });
            setNewProductName("");
            setSuccessMessage("¡Producto creado exitosamente!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Error creating product:", err);
        }
    };

    const handleDeleteConfirmation = async () => {
        if (productToDelete) {
            try {
                await handlerRemoveProduct(productToDelete);
                setSuccessMessage("¡Producto eliminado correctamente!");
                setTimeout(() => setSuccessMessage(""), 3000);
            } catch (err) {
                console.error("Error deleting product:", err);
            }
        }
        setProductToDelete(null);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center gap-3 mb-8">
                <FiPackage className="text-3xl text-green-600" />
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
            </div>

            {/* Sección de creación */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                    <FiPlus className="text-green-600" />
                    Crear Nuevo Producto
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="Ej: Nitrógeno"
                        className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <FiPlus className="text-lg" />
                                Crear Producto
                            </>
                        )}
                    </button>
                </form>

                {/* Mensajes de estado */}
                <div className="mt-4">
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                            <FiAlertTriangle />
                            {error.message}
                        </div>
                    )}
                    {successMessage && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                            <FiPackage />
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>

            {/* Listado de productos */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                    <FiPackage className="text-gray-600" />
                    Productos Registrados
                </h2>

                {variants.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No hay productos registrados
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {variants.map((product) => (
                            <div key={product.id} className="group relative border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                            {product.name}
                                        </h3>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.state ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {product.state ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setProductToDelete(product.id)}

                                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                        title="Eliminar producto"
                                    >
                                        <FiTrash2 className="text-lg" />
                                    </button>
                                </div>

                                {product.variants.length > 0 ? (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-600 mb-2">Variantes disponibles:</h4>
                                        <div className="space-y-2">
                                            {product.variants.map((variant) => (
                                                <div key={variant.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm font-medium">${variant.price.toLocaleString()}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {variant.quantity} {variant.unit.acronym}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                        {variant.unit.unit_type}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
                                        <FiAlertTriangle className="inline-block mr-2" />
                                        Este producto no tiene variantes registradas
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de confirmación */}
            <ConfirmationModal
                isOpen={!!productToDelete}
                onClose={() => setProductToDelete(null)}
                onConfirm={handleDeleteConfirmation}
                title="Confirmar eliminación"
                message="¿Estás seguro que deseas eliminar este producto? Esta acción no se puede deshacer."
                confirmText="Eliminar"
                cancelText="Cancelar"
                icon={<FiAlertTriangle className="text-red-600 text-3xl" />}
            />
        </div>
    );
};

export default ManageProductPage;