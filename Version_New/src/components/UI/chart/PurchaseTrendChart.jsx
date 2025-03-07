import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

// Registra los componentes necesarios
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

export const PurchaseTrendChart = ({ data }) => {
    // Verificar si hay datos válidos
    if (!data?.labels || !data?.datasets) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Tendencia de Compras</h3>
                <p className="text-gray-500 text-center py-4">
                    No hay datos suficientes para mostrar el gráfico
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Tendencia de Compras</h3>
            <Line
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 12,
                                padding: 20
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: (value) => `$${value.toLocaleString()}`
                            }
                        }
                    }
                }}
            />
        </div>
    );
};