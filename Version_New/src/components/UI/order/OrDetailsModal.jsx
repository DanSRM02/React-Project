// components/UI/order/OrDetailsModal.jsx
export const OrDetailsModal = ({ order, onClose }) => {
    const [activeTab, setActiveTab] = useState('products');
    const tabs = ['products', 'shipping', 'payment'];

    return (
        <div className="p-6">
            <div className="border-b border-gray-200">
                <nav className="flex gap-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 px-1 ${activeTab === tab
                                    ? 'border-b-2 border-green-600 text-green-700'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tabLabels[tab]}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === 'products' && (
                <div className="space-y-4 mt-4">
                    {order.products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            )}

            {activeTab === 'shipping' && (
                <div className="mt-4 space-y-4">
                    <DetailItem label="Dirección" value={order.address} />
                    <DetailItem label="Método de Envío" value={order.shippingMethod} />
                    <MapPreview coordinates={order.shippingCoordinates} />
                </div>
            )}

            {activeTab === 'payment' && (
                <div className="mt-4 space-y-4">
                    <DetailItem label="Método de Pago" value={order.paymentMethod} />
                    <DetailItem label="Referencia" value={order.paymentReference} />
                    <InvoicePreview invoiceUrl={order.invoiceUrl} />
                </div>
            )}
        </div>
    );
};