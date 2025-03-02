import React from "react";
import {
    HiOutlineUserGroup,
    HiOutlineCurrencyDollar,
    HiOutlineClipboardList,
    HiOutlineTrendingUp,
} from "react-icons/hi";
import { StatCard } from "../../components/UI/StatCard";

const ManagerHomePage = () => {
    return (
        <div className="space-y-6">
            {/* Título principal */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-700">Panel Gerente</h1>
                <span className="text-gray-500">Bienvenido(a), Gerente</span>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    title="Usuarios Activos"
                    value="1,230"
                    icon={<HiOutlineUserGroup className="w-8 h-8 text-green-600" />}
                />
                <StatCard
                    title="Ventas del Día"
                    value="$12,340"
                    icon={<HiOutlineCurrencyDollar className="w-8 h-8 text-green-600" />}
                />
                <StatCard
                    title="Órdenes Pendientes"
                    value="15"
                    icon={<HiOutlineClipboardList className="w-8 h-8 text-green-600" />}
                />
                <StatCard
                    title="Crecimiento Mensual"
                    value="8.5%"
                    icon={<HiOutlineTrendingUp className="w-8 h-8 text-green-600" />}
                />
            </div>

            {/* Sección con un gráfico y tabla de actividad reciente */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Placeholder para gráfico (2 columnas en desktop) */}
                <div className="col-span-2 bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Resumen de Ventas</h2>
                    {/* Aquí puedes integrar un componente de gráfico (por ejemplo, react-chartjs-2) */}
                    <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                        <span className="text-gray-400">[Gráfico de ejemplo]</span>
                    </div>
                </div>

                {/* Tabla de actividad reciente (1 columna en desktop) */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Actividad Reciente</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-gray-600">ID</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-gray-600">Usuario</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-gray-600">Acción</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-gray-600">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">#1001</td>
                                    <td className="py-2 px-4 border-b border-gray-200">Carlos Pérez</td>
                                    <td className="py-2 px-4 border-b border-gray-200">Realizó un pedido</td>
                                    <td className="py-2 px-4 border-b border-gray-200">01/03/2025</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">#1002</td>
                                    <td className="py-2 px-4 border-b border-gray-200">María López</td>
                                    <td className="py-2 px-4 border-b border-gray-200">Registró un pago</td>
                                    <td className="py-2 px-4 border-b border-gray-200">01/03/2025</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">#1003</td>
                                    <td className="py-2 px-4 border-b border-gray-200">Juan Gómez</td>
                                    <td className="py-2 px-4 border-b border-gray-200">Actualizó su perfil</td>
                                    <td className="py-2 px-4 border-b border-gray-200">02/03/2025</td>
                                </tr>                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ManagerHomePage;