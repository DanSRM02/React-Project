import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input";
import Label from "../../components/UI/Label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../utils/validation/validationSchema";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const { login, loading, error, user } = useAuth();
    const navigate = useNavigate();

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

    // Función de envío del formulario
    const handleSubmit = async (values, { setSubmitting }) => {        
        await login(values); // La función login del contexto usa las credenciales
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Iniciar Sesión
                </h2>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (


                        <Form className="space-y-4">
                            <div>
                                <Label htmlFor="username">Correo Electrónico</Label>
                                <Field name="username">
                                    {({ field }) => (
                                         
                                        <Input
                                            {...field}
                                            type="text"
                                            id="username"
                                            placeholder="tucorreo@ejemplo.com"
                                            showIcon={false}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Contraseña</Label>
                                <Field name="password">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="password"
                                            id="password"
                                            placeholder="********"
                                            showIcon={false}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm"
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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
                            </button>
                            {error && (
                                <p className="text-red-500 text-sm">
                                    {error.message || "Ocurrió un error"}
                                </p>
                            )}
                        </Form>
                    )}
                </Formik>
                <p className="text-center text-gray-600 text-sm mt-4">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-green-600 hover:underline">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;