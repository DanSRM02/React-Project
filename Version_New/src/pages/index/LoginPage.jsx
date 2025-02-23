import React, { useState } from "react";
import Input from "../../Components/UI/Input";
import Label from "../../Components/UI/Label";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Iniciar Sesión
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="tucorreo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;