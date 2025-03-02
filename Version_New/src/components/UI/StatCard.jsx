/** 
 * Componente auxiliar para mostrar tarjetas de estadísticas
 * Recibe title, value y un icono.
 */
export const StatCard = ({ title, value, icon }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg p-6 flex items-center space-x-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-bold text-gray-700">{value}</p>
            </div>
        </div>
    );
};