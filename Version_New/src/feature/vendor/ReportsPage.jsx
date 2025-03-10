import React, { useState, useEffect } from "react";
import {
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FileText, Download, Filter } from "lucide-react";

const ReportsPage = () => {
    const [activeTab, setActiveTab] = useState("ventas");
    const [dateRange, setDateRange] = useState("month");
    const [isLoading, setIsLoading] = useState(true);
    const [salesData, setSalesData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchReportData = async () => {
            setIsLoading(true);
            try {
                // Aquí conectarías con tu backend real
                // const response = await fetch(`/api/reports/${activeTab}?range=${dateRange}`);
                // const data = await response.json();

                // Usando datos de ejemplo mientras tanto
                setTimeout(() => {
                    setSalesData(sampleSalesData);
                    setOrderData(sampleOrderData);
                    setProductData(sampleProductData);
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error al cargar datos de reportes:", error);
                setIsLoading(false);
            }
        };

        fetchReportData();
    }, [activeTab, dateRange]);

    // Datos de ejemplo basados en el MER
    const sampleSalesData = [
        { fecha: "Ene", total: 42500, cantidad: 57 },
        { fecha: "Feb", total: 38700, cantidad: 49 },
        { fecha: "Mar", total: 45200, cantidad: 63 },
        { fecha: "Abr", total: 47800, cantidad: 50 },        
        { fecha: "Jun", total: 49200, cantidad: 65 }
    ];

    const sampleOrderData = [
        { estado: "Pendiente", value: 12, color: "#FFB900" },
        { estado: "Priorizada", value: 3, color: "#E74C3C" },
        { estado: "En Proceso", value: 8, color: "#3498DB" },
        { estado: "Completada", value: 42, color: "#2ECC71" },
        { estado: "Cancelada", value: 5, color: "#95A5A6" }
    ];

    const sampleProductData = [
        { name: "Oxigeno", ventas: 145, inventario: 28 },
        { name: "Árgon", ventas: 124, inventario: 12 },
        { name: "Acetileno", ventas: 105, inventario: 43 },
        { name: "Nitrogeno", ventas: 93, inventario: 15 },
        { name: "Hidrogeno", ventas: 87, inventario: 22 }
    ];

    const renderTabContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-12">
                    <div className="text-gray-500">Cargando datos...</div>
                </div>
            );
        }

        switch (activeTab) {
            case "ventas":
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Ventas Totales</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="fecha" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Total"]} />
                                        <Legend />
                                        <Line type="monotone" dataKey="total" stroke="#10B981" name="Ventas ($)" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Cantidad de Órdenes</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="fecha" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="cantidad" fill="#3B82F6" name="Órdenes" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                            <h3 className="text-lg font-semibold mb-4">Resumen de Ventas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Ventas Totales</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        ${salesData.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Órdenes Totales</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {salesData.reduce((sum, item) => sum + item.cantidad, 0)}
                                    </p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Ticket Promedio</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        ${Math.round(salesData.reduce((sum, item) => sum + item.total, 0) /
                                            salesData.reduce((sum, item) => sum + item.cantidad, 0)).toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-4 bg-amber-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Mes Más Alto</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {salesData.reduce((max, item) => item.total > max.total ? item : max, salesData[0]).fecha}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "ordenes":
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Estado de Órdenes</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={orderData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={130}
                                            dataKey="value"
                                            nameKey="estado"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {orderData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value, name) => [value, name]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Detalle por Estado</h3>
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="py-2 text-left text-sm font-medium text-gray-500">Estado</th>
                                        <th className="py-2 text-left text-sm font-medium text-gray-500">Cantidad</th>
                                        <th className="py-2 text-left text-sm font-medium text-gray-500">Porcentaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData.map((item, index) => {
                                        const totalOrders = orderData.reduce((sum, item) => sum + item.value, 0);
                                        const percentage = ((item.value / totalOrders) * 100).toFixed(1);

                                        return (
                                            <tr key={index}>
                                                <td className="py-2">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                                        {item.estado}
                                                    </div>
                                                </td>
                                                <td className="py-2">{item.value}</td>
                                                <td className="py-2">{percentage}%</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                            <h3 className="text-lg font-semibold mb-4">Métricas Importantes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Tasa de Completadas</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {((orderData.find(o => o.estado === "Completada")?.value || 0) /
                                            orderData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%
                                    </p>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Tasa de Cancelación</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {((orderData.find(o => o.estado === "Cancelada")?.value || 0) /
                                            orderData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%
                                    </p>
                                </div>
                                <div className="p-4 bg-amber-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Órdenes Prioritarias</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {orderData.find(o => o.estado === "Priorizada")?.value || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "productos":
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={productData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" width={100} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="ventas" fill="#10B981" name="Unidades Vendidas" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Nivel de Inventario</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={productData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" width={100} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="inventario" fill="#6366F1" name="Unidades Disponibles" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                            <h3 className="text-lg font-semibold mb-4">Productos con Inventario Bajo</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="py-2 text-left text-sm font-medium text-gray-500">Producto</th>
                                            <th className="py-2 text-left text-sm font-medium text-gray-500">Inventario</th>
                                            <th className="py-2 text-left text-sm font-medium text-gray-500">Ventas</th>
                                            <th className="py-2 text-left text-sm font-medium text-gray-500">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productData
                                            .sort((a, b) => a.inventario - b.inventario)
                                            .map((item, index) => {
                                                let statusColor = "bg-green-100 text-green-800";
                                                let statusText = "Normal";

                                                if (item.inventario < 15) {
                                                    statusColor = "bg-red-100 text-red-800";
                                                    statusText = "Crítico";
                                                } else if (item.inventario < 30) {
                                                    statusColor = "bg-amber-100 text-amber-800";
                                                    statusText = "Bajo";
                                                }

                                                return (
                                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                                        <td className="py-2">{item.name}</td>
                                                        <td className="py-2">{item.inventario}</td>
                                                        <td className="py-2">{item.ventas}</td>
                                                        <td className="py-2">
                                                            <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
                                                                {statusText}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Seleccione un tipo de reporte</div>;
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reporte de Ventas</h1>
                    <p className="text-gray-600">Visualiza estadísticas y análisis de tu negocio</p>
                </div>
                <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtrar
                    </button>
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Selector de periodo */}
            <div className="mb-6">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${dateRange === "week"
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            } border border-gray-300 rounded-l-lg`}
                        onClick={() => setDateRange("week")}
                    >
                        Semanal
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${dateRange === "month"
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            } border-t border-b border-gray-300`}
                        onClick={() => setDateRange("month")}
                    >
                        Mensual
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${dateRange === "year"
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            } border border-gray-300 rounded-r-lg`}
                        onClick={() => setDateRange("year")}
                    >
                        Anual
                    </button>
                </div>
            </div>

            {/* Tabs de navegación */}
            <div className="mb-6 border-b border-gray-200">
                <ul className="flex -mb-px">
                    <li className="mr-2">
                        <button
                            className={`inline-flex items-center px-4 py-2 pb-3 border-b-2 ${activeTab === "ventas"
                                    ? "border-green-500 text-green-600"
                                    : "border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                                } font-medium text-sm`}
                            onClick={() => setActiveTab("ventas")}
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Ventas
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            className={`inline-flex items-center px-4 py-2 pb-3 border-b-2 ${activeTab === "ordenes"
                                    ? "border-green-500 text-green-600"
                                    : "border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                                } font-medium text-sm`}
                            onClick={() => setActiveTab("ordenes")}
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Órdenes
                        </button>
                    </li>
                    <li>
                        <button
                            className={`inline-flex items-center px-4 py-2 pb-3 border-b-2 ${activeTab === "productos"
                                    ? "border-green-500 text-green-600"
                                    : "border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                                } font-medium text-sm`}
                            onClick={() => setActiveTab("productos")}
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Productos
                        </button>
                    </li>
                </ul>
            </div>

            {/* Contenido de reportes */}
            {renderTabContent()}
        </div>
    );
};

export default ReportsPage;