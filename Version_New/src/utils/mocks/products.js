import dioxido from '../../assets/img/dioxidocarbono.webp';
import oxigeno from '../../assets/img/oxigeno.webp'
import hidrogeno from '../../assets/img/hidrogeno.png'
import nitrogeno from '../../assets/img/nitrogeno.webp'
import argon from '../../assets/img/argon.webp'
import acetileno from '../../assets/img/acetileno.webp'

const ProductsAvailable = [
    {
        name: "Oxígeno",
        image: `${oxigeno}`,
        description:
            "El oxígeno es un elemento crucial para la industria. Se usa en combustión, soldadura y producción de acero.",
        link: "/productos/oxigeno"
    },
    {
        name: "Dióxido de Carbono",
        image: `${dioxido}`,
        description:
            "Usado en la industria alimentaria y en la fabricación de extintores.",
        link: "/productos/dioxido-de-carbono"
    },
    {
        name: "Argón",
        image: `${argon}`,
        description:
            "Indispensable en la industria metalmecánica, utilizado en soldaduras como gas de protección.",
        link: "/productos/argon"
    },
    {
        name: "Acetileno",
        image: `${acetileno}`,
        description:
            "Usado en soldaduras y recocido de metales, creando una atmósfera protectora en hornos.",
        link: "/productos/acetileno"
    },
    {
        name: "Hidrógeno",
        image: `${hidrogeno}`,
        description:
            "Combinado con nitrógeno para crear atmósferas protectoras en la industria metalúrgica.",
        link: "/productos/hidrogeno"
    },
    {
        name: "Nitrógeno",
        image: `${nitrogeno}`,
        description:
            "Facilita el encaje de piezas en la industria metalúrgica, ayudando a contraer materiales.",
        link: "/productos/nitrogeno"
    },
];

export default ProductsAvailable