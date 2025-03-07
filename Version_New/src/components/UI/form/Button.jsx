export const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    loading = false,
    disabled = false,
    ...props
}) => {
    const variants = {
        primary: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
        secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
    };

    return (
        <button
            type={type}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all 
                text-sm flex items-center justify-center gap-2
                ${variants[variant]} 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${props.className || ''}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <FaSpinner className="animate-spin h-4 w-4" />}
            {children}
        </button>
    );
};