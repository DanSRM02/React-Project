import Input from "../../components/UI/Input";
import Label from "../../components/UI/Label";
import { useAuthenticate } from "./hooks/useAuthenticate";

const Login = () => {
    const { credentials, handleChange, authenticateUser, loading, error } = useAuthenticate();

    // Handler para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticateUser();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Iniciar Sesión
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="username">Correo Electrónico</Label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="tucorreo@ejemplo.com"
                            value={credentials.username || ""}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            value={credentials.password || ""}
                            onChange={handleChange}
                            required
                            showIcon={false}
                        />
                    </div>
                    <div className="flex justify-end mb-6">
                        <button
                            type="button"
                            className="text-sm text-green-600 hover:underline"
                            onClick={() => console.log("Olvidé mi contraseña")}
                        >
                            Olvidé mi contraseña
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                    {error && (
                        <p className="text-red-500 text-center mt-2">
                            {error.message || "Ocurrió un error al iniciar sesión"}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;