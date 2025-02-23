import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../Components/UI/Input";
import Label from "../../Components/UI/Label";

const Register = () => {
    const [individual, setIndividual] = useState({
        name: "",
        email: "",
        address: "",
        document: "",
        phone: ""
    });

    const handleChange = (e) => {
        setIndividual({
            ...individual,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar la información al backend
        console.log("Datos de registro:", individual);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Registro
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                            name="name"
                            id="name"
                            placeholder="Ingresa tu nombre completo"
                            value={individual.name}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="tucorreo@ejemplo.com"
                            value={individual.email}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                            name="address"
                            id="address"
                            placeholder="Ingresa tu dirección"
                            value={individual.address}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="document">Documento</Label>
                        <Input
                            name="document"
                            id="document"
                            placeholder="Ingresa tu número de documento"
                            value={individual.document}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                            name="phone"
                            id="phone"
                            placeholder="Ingresa tu número de teléfono"
                            value={individual.phone}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;