import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineBan, HiOutlinePlusCircle } from "react-icons/hi";
import { useProductVariants } from "../../hooks/useProductVariants";
import DataTable from "../../components/UI/DataTable";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

const ProductsPage = () => {
    const { variants, loading, error, fetchVariants } = useProductVariants();

    // Estado para los modales
    const [showFormModal, setShowFormModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    // Producto seleccionado para editar o togglear estado
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Abrir modal para crear producto (sin producto seleccionado)
    const handleOpenCreate = () => {
        setSelectedProduct(null);
        setShowFormModal(true);
    };

    // Abrir modal para editar producto
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowFormModal(true);
    };

    // Abrir modal para togglear estado
    const handleToggleState = (product) => {
        setSelectedProduct(product);
        setShowConfirmModal(true);
    };

    // Ejecuta la operación para togglear el estado del producto y refresca la lista
    const confirmToggleState = async () => {
        if (!selectedProduct) return;
        try {
            const newState = !selectedProduct.state;
            await toggleProductState(selectedProduct.id, newState);
            await fetchVariants();
        } catch (err) {
            console.error("Error al togglear estado del producto:", err);
        } finally {
            setShowConfirmModal(false);
            setSelectedProduct(null);
        }
    };

    // Definición de columnas para DataTable
    const columns = [
        {
            header: "Nombre",
            accessor: "name",
        },
        {
            header: "Estado",
            render: (product) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${product.state ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                >
                    {product.state ? "Habilitado" : "Deshabilitado"}
                </span>
            ),
            headerClassName: "text-center",
            cellClassName: "text-center",
        },
        {
            header: "Variantes",
            render: (product) => {
                if (!product.variants || product.variants.length === 0) {
                    return <span className="text-gray-500 text-sm">Sin variantes</span>;
                }
                return (
                    <div className="text-sm text-gray-700">
                        {product.variants.map((variant) => (
                            <div key={variant.id} className="flex items-center justify-between">
                                <span>
                                    {variant.unit.acronym} ({variant.unit.unit_type}):
                                </span>
                                <span className="ml-1 text-gray-600">
                                    Stock: {variant.quantity}, Precio: ${variant.price}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            },
        },
        {
            header: "Acciones",
            render: (product) => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Editar"
                    >
                        <HiOutlinePencil className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleToggleState(product)}
                        className={`p-1 ${product.state
                            ? "text-red-600 hover:text-red-700"
                            : "text-green-600 hover:text-green-700"
                            }`}
                        title={product.state ? "Deshabilitar" : "Habilitar"}
                    >
                        <HiOutlineBan className="w-5 h-5" />
                    </button>
                </div>
            ),
            headerClassName: "text-center",
            cellClassName: "text-center",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Gestión de Productos</h2>

            <div className="flex justify-end mb-4">
                <button
                    onClick={handleOpenCreate}
                    className="flex items-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
                >
                    <HiOutlinePlusCircle className="w-5 h-5 mr-2" />
                    Agregar Producto
                </button>
            </div>

            {loading && <p className="text-center">Cargando productos...</p>}
            {error && <p className="text-center text-red-600">Error al cargar productos.</p>}
            {!loading && !error && variants.length === 0 && (
                <p className="text-center text-gray-600">No hay productos registrados.</p>
            )}
            {!loading && !error && variants.length > 0 && (
                <DataTable
                    columns={columns}
                    data={variants}
                    emptyMessage="No hay productos registrados."
                />
            )}

            <ConfirmationModal
                isOpen={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={confirmToggleState}
                title={selectedProduct?.state ? "Deshabilitar Producto" : "Habilitar Producto"}
                message={
                    selectedProduct?.state
                        ? `¿Estás seguro de deshabilitar el producto "${selectedProduct?.name}"?`
                        : `¿Estás seguro de habilitar el producto "${selectedProduct?.name}"?`
                }
            />

            {showFormModal &&
                (selectedProduct ? (
                    <EditProductModal
                        isOpen={showFormModal}
                        onClose={() => {
                            setShowFormModal(false);
                            setSelectedProduct(null);
                            fetchVariants();
                        }}
                        product={selectedProduct}
                    />
                ) : (
                    <AddProductModal
                        isOpen={showFormModal}
                        onClose={() => {
                            setShowFormModal(false);
                            setSelectedProduct(null);
                            fetchVariants();
                        }}
                        products={variants} // Se pasa el listado de productos (en este caso, "variants" con id, name, etc.)
                    />
                ))}
        </div>
    );
};

export default ProductsPage;
