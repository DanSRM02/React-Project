import * as Yup from "yup";

// Esquema de validación para el login
export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),
    password: Yup.string()
    .min(8, "La contraseña debe de ser al menos de 8 caracteres")
    .max(16, "La contraseña debe de ser al menos de 16 caracteres")
    .required("La contraseña es obligatoria"),
});

