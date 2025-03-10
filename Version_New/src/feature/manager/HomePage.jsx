import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Iconos de la UI (puedes usar una biblioteca como lucide-react)
import { Users, DollarSign, ClipboardList, TrendingUp } from "lucide-react";

const ManagerHomePage = () => {
    // Estado para los datos
    const [salesData, setSalesData] = useState([]);
    const [ordersByStatus, setOrdersByStatus] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [metrics, setMetrics] = useState({
        activeUsers: 0,
        dailySales: 0,
        pendingOrders: 0,
        monthlyGrowth: 0
    });

    // Fetch data cuando el componente se monta
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Reemplazar con llamadas API reales
                const salesResponse = await fetch('/api/sales/monthly');
                const salesData = await salesResponse.json();

                const ordersResponse = await fetch('/api/orders/by-status');
                const ordersData = await ordersResponse.json();

                const activityResponse = await fetch('/api/activity/recent');
                const activityData = await activityResponse.json();

                const metricsResponse = await fetch('/api/dashboard/metrics');
                const metricsData = await metricsResponse.json();

                setSalesData(salesData);
                setOrdersByStatus(ordersData);
                setRecentActivity(activityData);
                setMetrics(metricsData);
            } catch (error) {
                console.error("Error al obtener datos del dashboard:", error);
                // Usar datos de ejemplo si la API falla
                setSalesData(sampleSalesData);
                setOrdersByStatus(sampleOrdersStatus);
                setRecentActivity(sampleActivity);
                setMetrics(sampleMetrics);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    // Datos de ejemplo
    const sampleSalesData = [
        { month: "Ene", sales: 12500, orders: 125 },
        { month: "Feb", sales: 14200, orders: 142 },
        { month: "Mar", sales: 13800, orders: 138 },
        { month: "Abr", sales: 15600, orders: 156 },
        { month: "May", sales: 16200, orders: 162 },
        { month: "Jun", sales: 18400, orders: 184 }
    ];

    const sampleOrdersStatus = [
        { name: "Pendiente", value: 15 },
        { name: "Aprobada", value: 8 },
        { name: "Entrega", value: 12 },
        { name: "Cancelada", value: 45 }
    ];

    const sampleActivity = [
        { id: "#1001", usuario: "Carlos Pérez", accion: "Realizó un pedido", fecha: "01/03/2025" },
        { id: "#1002", usuario: "María López", accion: "Registró un pago", fecha: "01/03/2025" },
        { id: "#1003", usuario: "Juan Gómez", accion: "Actualizó su perfil", fecha: "02/03/2025" }
    ];

    const sampleMetrics = {
        activeUsers: 1230,
        dailySales: 12340,
        pendingOrders: 15,
        monthlyGrowth: 8.5
    };

    // Usar datos de ejemplo si la API no ha devuelto nada
    const displaySalesData = salesData.length > 0 ? salesData : sampleSalesData;
    const displayOrdersData = ordersByStatus.length > 0 ? ordersByStatus : sampleOrdersStatus;
    const displayActivity = recentActivity.length > 0 ? recentActivity : sampleActivity;
    const displayMetrics = metrics.activeUsers ? metrics : sampleMetrics;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Panel Gerente</h1>
                <div className="text-gray-600">Bienvenido(a), Gerente</div>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Usuarios Activos */}
                <div className="bg-white rounded-lg p-4 shadow flex items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                        <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Usuarios Activos</p>
                        <p className="text-xl font-bold">{displayMetrics.activeUsers.toLocaleString()}</p>
                    </div>
                </div>

                {/* Ventas del Día */}
                <div className="bg-white rounded-lg p-4 shadow flex items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                        <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Ventas del Día</p>
                        <p className="text-xl font-bold">${displayMetrics.dailySales.toLocaleString()}</p>
                    </div>
                </div>

                {/* Órdenes Pendientes */}
                <div className="bg-white rounded-lg p-4 shadow flex items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                        <ClipboardList className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Órdenes Pendientes</p>
                        <p className="text-xl font-bold">{displayMetrics.pendingOrders}</p>
                    </div>
                </div>

                {/* Crecimiento Mensual */}
                <div className="bg-white rounded-lg p-4 shadow flex items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Crecimiento Mensual</p>
                        <p className="text-xl font-bold">{displayMetrics.monthlyGrowth}%</p>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráficos de ventas (ocupa 2 columnas en desktop) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg p-6 shadow mb-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Resumen de Ventas</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Ingresos Mensuales */}
                            <div>
                                <h3 className="text-md font-semibold text-gray-700 mb-2">Ingresos Mensuales</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={displaySalesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Ventas"]} />
                                            <Line type="monotone" dataKey="sales" stroke="#4CAF50" strokeWidth={2} name="Ventas" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Órdenes por Estado */}
                            <div>
                                <h3 className="text-md font-semibold text-gray-700 mb-2">Órdenes por Estado</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={displayOrdersData} margin={{ top: 7, right: 7, left: 7, bottom: 7 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="value" fill="#2196F3" name="Cantidad" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actividad Reciente (ocupa 1 columna) */}
                <div className="bg-white rounded-lg p-6 shadow">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Actividad Reciente</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500">ID</th>
                                    <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500">Usuario</th>
                                    <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500">Acción</th>
                                    <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayActivity.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b text-sm">{item.id}</td>
                                        <td className="py-2 px-4 border-b text-sm">{item.usuario}</td>
                                        <td className="py-2 px-4 border-b text-sm">{item.accion}</td>
                                        <td className="py-2 px-4 border-b text-sm">{item.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerHomePage;