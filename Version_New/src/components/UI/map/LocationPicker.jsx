import { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const LIBRARIES = ['places', 'geometry'];
const API_KEY = import.meta.env.VITE_API_KEY;

// Esquema de validación
const validationSchema = Yup.object().shape({
    address: Yup.string()
        .min(5, 'Mínimo 5 caracteres')
        .required('Campo obligatorio')
});

const LocationPicker = ({ onConfirm, onCancel, initialLocation }) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);

    // Configuración de Formik
    const formik = useFormik({
        initialValues: {
            address: initialLocation?.address || ''
        },
        validationSchema,
        onSubmit: (values) => {
            if (!selectedPosition) {
                formik.setStatus('Selecciona una ubicación en el mapa');
                return;
            }
            onConfirm({
                lat: Number(selectedPosition.lat.toFixed(6)),
                lng: Number(selectedPosition.lng.toFixed(6)),
                address: values.address
            });
        }
    });

    // Efecto para inicialización
    useEffect(() => {
        if (initialLocation?.lat && initialLocation?.lng) {
            setSelectedPosition({
                lat: Number(initialLocation.lat),
                lng: Number(initialLocation.lng)
            });
        }
    }, [initialLocation]);

    // Handler de carga del mapa
    const handleMapLoad = () => setMapLoaded(true);

    // Crear tamaño del ícono
    const createScaledSize = () => {
        return mapLoaded && window.google ?
            new window.google.maps.Size(40, 40) :
            null;
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onCancel}>
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>

                {/* Formulario */}
                <form onSubmit={formik.handleSubmit}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" />
                            Actualizar Ubicación
                        </h2>
                        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                            <FaTimes className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Campo de dirección */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                            Dirección completa*
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            {...formik.getFieldProps('address')}
                            placeholder="Ej: Carrera 15 # 32-10, Bogotá"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${formik.errors.address ?
                                    'border-red-500 focus:ring-red-500' :
                                    'border-gray-300 focus:ring-green-500'
                                }`}
                        />
                        {formik.touched.address && formik.errors.address && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
                        )}
                    </div>

                    {/* Mapa */}
                    <div className="mb-4">
                        <LoadScript
                            googleMapsApiKey={API_KEY}
                            libraries={LIBRARIES}
                            onLoad={handleMapLoad}
                        >
                            {mapLoaded && (
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={selectedPosition || { lat: 4.6097, lng: -74.0817 }}
                                    zoom={selectedPosition ? 15 : 12}
                                    onClick={(e) => {
                                        const lat = e.latLng.lat();
                                        const lng = e.latLng.lng();
                                        setSelectedPosition({
                                            lat: Number(lat.toFixed(6)),
                                            lng: Number(lng.toFixed(6))
                                        });
                                    }}
                                >
                                    {selectedPosition && (
                                        <Marker
                                            position={selectedPosition}
                                            icon={{
                                                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                                scaledSize: createScaledSize()
                                            }}
                                        >
                                            <InfoWindow position={selectedPosition}>
                                                <div className="text-sm p-2">
                                                    <p className="font-medium">Ubicación seleccionada</p>
                                                    <p>{formik.values.address || 'Sin dirección registrada'}</p>
                                                    <p>Lat: {selectedPosition.lat.toFixed(6)}</p>
                                                    <p>Lng: {selectedPosition.lng.toFixed(6)}</p>
                                                </div>
                                            </InfoWindow>
                                        </Marker>
                                    )}
                                </GoogleMap>
                            )}
                        </LoadScript>
                    </div>

                    {/* Mensaje de error general */}
                    {formik.status && (
                        <p className="mb-4 text-red-500 text-sm">{formik.status}</p>
                    )}

                    {/* Botones */}
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-lg transition-colors ${formik.isValid && selectedPosition ?
                                    'bg-green-600 text-white hover:bg-green-700' :
                                    'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={!formik.isValid || !selectedPosition}
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LocationPicker;