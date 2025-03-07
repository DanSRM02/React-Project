// loginSchema.js
import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),
    password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña no puede exceder los 16 caracteres")
        .required("La contraseña es obligatoria"),
});

export const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .matches(/^\S.*$/, "El nombre no puede comenzar con un espacio")
        .required("El nombre completo es obligatorio"),
    email: Yup.string()
        .email("Correo electrónico inválido")
        .required("El correo es obligatorio"),
    address: Yup.string()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .required("La dirección es obligatoria"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "El teléfono debe contener solo números")
        .min(7, "El teléfono debe tener al menos 7 dígitos")
        .max(15, "El teléfono no puede exceder 15 dígitos")
        .required("El teléfono es obligatorio"),
    document_type_id: Yup.string()
        .required("El tipo de documento es obligatorio"),
    document: Yup.string()
        .matches(/^[0-9]+$/, "El documento debe contener solo números")
        .min(6, "El documento debe tener al menos 6 dígitos")
        .required("El número de documento es obligatorio"),
});

export const passwordChangeSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(8, "Debe tener al menos 8 caracteres")
        .max(16, "No puede exceder los 16 caracteres")
        .required("La contraseña actual es obligatoria"),

    newPassword: Yup.string()
        .min(8, "Debe tener al menos 8 caracteres")
        .max(16, "No puede exceder los 16 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Debe contener al menos un carácter especial"
        )
        .notOneOf(
            [Yup.ref("currentPassword")],
            "La nueva contraseña debe ser diferente a la actual"
        )
        .required("La nueva contraseña es obligatoria"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Las contraseñas deben coincidir")
        .required("Confirma tu nueva contraseña"),
});

export const orderSchema = Yup.object().shape({
    selectedVariants: Yup.array()
        .min(1, 'Debes seleccionar al menos una variante')
        .required('Selección requerida'),
    orderQuantities: Yup.object().test(
        'valid-quantities',
        'Cantidad inválida',
        function (quantities) {
            const { selectedVariants } = this.parent;

            if (!selectedVariants || selectedVariants.length === 0) return true;

            return selectedVariants.every(variantId => {
                const qty = quantities[variantId];
                return qty >= 1;
            });
        }
    )
});

