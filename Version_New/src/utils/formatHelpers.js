export const formatCurrency = (amount) =>
    new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);

export const formatLongDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return ''; // Manejo de fechas inválidas
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};