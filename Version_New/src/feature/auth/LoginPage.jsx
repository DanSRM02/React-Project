import Input from "../../components/UI/Input";
import Label from "../../components/UI/Label";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const { login, loading, error, user} = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    // Redirigir según el rol después de un login exitoso
    useEffect(() => {
        if (user && user.token) {
            const role = user.role; 
            switch (role) {
                case "cliente":
                    navigate("/client/home");
                    break;
                case "vendedor":
                    navigate("/vendor/home");
                    break;
                case "gerente":
                    navigate("/manager/home");
                    break;
                case "desarrollador":
                    navigate("/developer/home");
                    break;
                case "domiciliario":
                    navigate("/delivery/home");
                    break;
                default:
                    navigate("/login");
                    break;
            }
        }
    }, [user, navigate]);

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(credentials); // Usa la función login del contexto
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
                            value={credentials.username}
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
                            value={credentials.password}
                            onChange={handleChange}
                            showIcon={false}
                            required
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
                    {error && <p>{error.message || "Ocurrió un error"}</p>}

                </form>
            </div>
        </div>
    );
};

export default Login;
