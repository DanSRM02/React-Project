import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../components/UI/form/Input";
import Label from "../../components/UI/form/Label";
import ConfirmationModal from "../../components/UI/alert/ConfirmationModal";
import { useRegisterIndividual } from "./hooks/useRegisterIndividual";
import { useDocumentTypes } from "../../hooks/useDocumentTypes";
import { useIndividualTypes } from "../../hooks/useIndividualTypes"; // Necesitamos crear este hook
import { registerSchema } from "../../utils/validation/validationSchema";

const Register = () => {
    const { individual, handleChange, registerIndividual, loading, error } = useRegisterIndividual();
    const { documentTypes, loading: loadingDocs, error: errorDocs } = useDocumentTypes();    
    const [modalData, setModalData] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    });
    const navigate = useNavigate();    

    const onFormSubmit = async (values) => {
        console.log("Form submitted with values:", values);

        // Make sure individual_type_id is set based on document_type_id
        const docTypeId = Number(values.document_type_id);
        if (docTypeId && !values.individual_type_id) {
            values.individual_type_id =
                docTypeId === 1 || docTypeId === 3 ? 1 : // CC or CE -> Persona
                    docTypeId === 2 ? 2 : // NIT -> Empresa
                        ""; // Default empty
        }

        console.log("Processed values with individual_type:", values);

        const response = await registerIndividual(values);
        console.log("Registration response:", response);

        if (response && response.code === 200) {
            // Registro exitoso
            setModalData({
                isOpen: true,
                title: "Registro exitoso",
                message:
                    "Tu cuenta se ha creado correctamente. Usa tu correo como nombre de usuario y tu número de documento como contraseña. Recuerda cambiarla en el primer acceso.",
                onConfirm: () => {
                    setModalData((prev) => ({ ...prev, isOpen: false }));
                    navigate("/login", { state: { registrationSuccess: true } });
                },
            });
        } else {
            // Registro con error
            setModalData({
                isOpen: true,
                title: "Error al registrarse",
                message:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Ocurrió un error al registrarse.",
                onConfirm: () => setModalData((prev) => ({ ...prev, isOpen: false })),
            });
        }
    };

    const handleModalClose = () => {
        setModalData((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                    Crea tu cuenta
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Regístrate para acceder a todas nuestras funcionalidades
                </p>

                <Formik
                    initialValues={individual}
                    validationSchema={registerSchema}
                    onSubmit={onFormSubmit}
                    enableReinitialize
                >
                    {({ handleChange: formikHandleChange }) => (
                        <Form className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nombre Completo</Label>
                                <Field name="name">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            id="name"
                                            placeholder="Ingresa tu nombre completo"
                                            showIcon={false}
                                            required
                                            onChange={(e) => {
                                                handleChange(e);
                                                formikHandleChange(e);
                                            }}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Field name="email">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="email"
                                            id="email"
                                            placeholder="tucorreo@ejemplo.com"
                                            showIcon={false}
                                            required
                                            onChange={(e) => {
                                                handleChange(e);
                                                formikHandleChange(e);
                                            }}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>                            

                            <div>
                                <Label htmlFor="phone">Teléfono</Label>
                                <Field name="phone">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            id="phone"
                                            placeholder="Ingresa tu número de teléfono"
                                            showIcon={false}
                                            required
                                            onChange={(e) => {
                                                handleChange(e);
                                                formikHandleChange(e);
                                            }}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <Label htmlFor="document_type_id">Tipo de Documento</Label>
                                <Field
                                    as="select"
                                    name="document_type_id"
                                    id="document_type_id"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                                    required
                                    onChange={(e) => {
                                        // Handle in your custom hook
                                        handleChange(e);

                                        // Also update Formik values
                                        formikHandleChange(e);

                                        // Set individual_type_id in Formik based on the selection
                                        const docTypeId = Number(e.target.value);
                                        const autoIndividualType =
                                            docTypeId === 1 || docTypeId === 3 ? 1 : // CC or CE -> Persona
                                                docTypeId === 2 ? 2 : // NIT -> Empresa
                                                    ""; // Default empty

                                        // Update Formik with the new individual_type_id
                                        formikHandleChange({
                                            target: {
                                                name: "individual_type_id",
                                                value: autoIndividualType
                                            }
                                        });
                                    }}
                                >
                                    <option value="">Selecciona un tipo de documento</option>
                                    {loadingDocs ? (
                                        <option>Cargando...</option>
                                    ) : errorDocs ? (
                                        <option>Error al cargar</option>
                                    ) : (
                                        documentTypes.map((dt) => (
                                            <option key={dt.id} value={dt.id}>
                                                {dt.name} {dt.acronym ? `(${dt.acronym})` : ""}
                                            </option>
                                        ))
                                    )}
                                </Field>
                                <ErrorMessage name="document_type_id" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <Label htmlFor="document">Documento</Label>
                                <Field name="document">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            id="document"
                                            placeholder="Ingresa tu número de documento"
                                            showIcon={false}
                                            required
                                            onChange={(e) => {
                                                handleChange(e);
                                                formikHandleChange(e);
                                            }}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="document" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Cargando..." : "Registrarse"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <ConfirmationModal
                    isOpen={modalData.isOpen}
                    onCancel={handleModalClose}
                    onConfirm={modalData.onConfirm || handleModalClose}
                    title={modalData.title}
                    message={modalData.message}
                    showCancelButton={modalData.title !== "Registro exitoso"}
                />

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