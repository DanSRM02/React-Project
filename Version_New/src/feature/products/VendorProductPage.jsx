import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineBan, HiOutlinePlusCircle, HiOutlineArchive } from "react-icons/hi";
import { AnimatePresence } from "framer-motion";
import { useProductVariants } from "../../hooks/useProductVariants";
import DataTable from "../../components/UI/datatable/DataTable";
import ConfirmationModal from "../../components/UI/alert/ConfirmationModal";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

const ProductsPage = () => {
    const { variants, loading, error, fetchVariants, toggleProductState } = useProductVariants();

    // Estados independientes para cada modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenCreate = () => {
        setShowAddModal(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleToggleState = (product) => {
        setSelectedProduct(product);
        setShowConfirmModal(true);
    };

    const confirmToggleState = async () => {
        if (!selectedProduct) return;
        try {
            const newState = !selectedProduct.state;
            await toggleProductState(selectedProduct.id, { state: newState });
            await fetchVariants();
        } catch (err) {
            console.error("Error al cambiar estado del producto:", err);
        } finally {
            setShowConfirmModal(false);
            setSelectedProduct(null);
        }
    };

    const columns = [
        {
            header: "Producto",
            accessor: "name",
            cellClassName: "font-medium text-gray-800 group-hover:text-gray-900",
            headerClassName: "pl-6 py-4 text-left"
        },
        {
            header: "Estado",
            render: (product) => (
                <div className="flex items-center justify-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.state
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                        }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${product.state ? "bg-green-500" : "bg-red-500"
                            }`}></span>
                        {product.state ? "Activo" : "Inactivo"}
                    </span>
                </div>
            ),
            headerClassName: "text-center",
            cellClassName: "px-6 py-4"
        },
        {
            header: "Variantes",
            render: (product) => (
                <div className="space-y-2">
                    {product.variants?.length > 0 ? (
                        product.variants.map((variant) => (
                            <div key={variant.id} className="flex items-center justify-between bg-gray-50/50 p-2 rounded-md">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">
                                        {variant.unit.acronym}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        ({variant.unit.unit_type})
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">
                                            ${variant.price.toLocaleString('es-CO')}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {variant.quantity} en stock
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                            <HiOutlineArchive className="w-4 h-4" />
                            <span className="text-sm">Sin variantes</span>
                        </div>
                    )}
                </div>
            ),
            headerClassName: "text-left pl-6",
            cellClassName: "px-6 py-4"
        },
        {
            header: "Acciones",
            render: (product) => (
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700"
                        title={`Editar ${product.name}`}
                        aria-label={`Editar producto ${product.name}`}
                    >
                        <HiOutlinePencil className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleToggleState(product)}
                        className={`p-2 rounded-lg transition-colors ${product.state
                            ? "hover:bg-red-50 text-red-600 hover:text-red-700"
                            : "hover:bg-green-50 text-green-600 hover:text-green-700"
                            }`}
                        title={product.state ? "Desactivar producto" : "Activar producto"}
                        aria-label={product.state ? "Desactivar producto" : "Activar producto"}
                    >
                        <HiOutlineBan className="w-5 h-5" />
                    </button>
                </div>
            ),
            headerClassName: "text-center",
            cellClassName: "px-6 py-4"
        },
    ];


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {variants.length} productos registrados
                    </p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-all 
                    shadow-sm hover:shadow-md"
                >
                    <HiOutlinePlusCircle className="w-5 h-5 mr-2" />
                    Nuevo Producto
                </button>
            </div>

            {/* Estados de carga y error */}
            {loading && (
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-12 bg-gray-100 rounded-lg"></div>
                    <div className="h-64 bg-gray-50 rounded-lg"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
                    <div className="flex-shrink-0">
                        <HiOutlineBan className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-red-800">
                            Error cargando productos (Código: {error.code})
                        </h3>
                        <p className="mt-1 text-sm text-red-700">{error.message}</p>
                    </div>
                </div>
            )}

            {!loading && !error && (
                <DataTable
                    columns={columns}
                    data={variants}
                    emptyState={
                        <div className="text-center py-12">
                            <HiOutlineArchive className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Sin productos</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Empieza creando tu primer producto
                            </p>
                        </div>
                    }
                    containerClassName="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden"
                    headerClassName="bg-gray-50 border-b border-gray-200"
                    rowClassName="hover:bg-gray-50 transition-colors group border-b border-gray-100 last:border-0"
                />
            )}
            <AnimatePresence>
                {/* Modal de Confirmación */}
                {showConfirmModal && (
                    <ConfirmationModal
                        key="confirm-modal"
                        isOpen={showConfirmModal}
                        onCancel={() => setShowConfirmModal(false)}
                        onConfirm={confirmToggleState}
                        title={selectedProduct?.state ? "Deshabilitar Producto" : "Habilitar Producto"}
                        message={
                            selectedProduct?.state
                                ? `¿Estás seguro de deshabilitar "${selectedProduct?.name}"?`
                                : `¿Estás seguro de habilitar "${selectedProduct?.name}"?`
                        }
                        confirmButtonColor={selectedProduct?.state ? "danger" : "primary"}
                    />
                )}

                {/* Modal de Edición */}
                {showEditModal && (
                    <EditProductModal
                        key="edit-modal"
                        isOpen={showEditModal}
                        product={selectedProduct}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedProduct(null);
                            fetchVariants();
                        }}
                    />
                )}

                {/* Modal de Creación */}
                {showAddModal && (
                    <AddProductModal
                        key="add-modal"
                        isOpen={showAddModal}
                        onClose={() => {
                            setShowAddModal(false);
                            fetchVariants();
                        }}
                        products={variants}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductsPage;