import { InfoAlert } from "../alert/InfoAlert";
import { VariantItem } from "./VariantItem";

// Componentes auxiliares para mejor legibilidad
export const ProductSection = ({ product, formik, variantMap, onSelect, onQuantityChange }) => (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:border-green-100 transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{product.name}</h3>

        {product.variants?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.variants.map(variant => (
                    <VariantItem
                        key={variant.id}
                        variant={variant}
                        isSelected={formik.values.selectedVariants.includes(variant.id)}
                        quantity={formik.values.orderQuantities[variant.id] || 0}
                        onSelect={onSelect}
                        onQuantityChange={onQuantityChange}
                    />
                ))}
            </div>
        ) : (
            <InfoAlert message="No hay stock disponible" />
        )}
    </div>
);

