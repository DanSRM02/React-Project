import React, { useState } from 'react';
import './../../Styles/user.css';
import PlantillaUno from '../PlantillaUno';
import UserPicture1 from './../../Styles/img/UsersBack/user1.svg';
import axiosInstance from '../../api/axios';

const InventoryCreate = () => {
    const [nombreProducto, setNombreProducto] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [state, setState] = useState(true);  // Suponiendo que el estado es un booleano (activo/inactivo)
    const [showProfile, setShowProfile] = useState(false); // Agregado el estado de showProfile

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const productData = {
            name: nombreProducto,
            quantity: quantity,
            price: price,
            state: state,  // Asegúrate de manejar correctamente el estado (activo/inactivo)
        };

        try {
            const response = await axiosInstance.post('/Inventory/Create', productData);
            console.log('Producto creado:', response.data);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <PlantillaUno>
            <div className="row">
                <div className="col-md-3 menu">
                    {/* Menú lateral */}
                    <div className="imgrol text-center mt-2 mb-3">
                        <img className="rounded img-fluid" src={UserPicture1} alt="Usuario1" />
                    </div>
                    <div className="infoRol text-center p-3 mt-3">
                        <h5>Nombre de Usuario</h5>
                        <h6>Rol</h6>
                    </div>
                    <div className="masInfo text-center mb-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowProfile(true)}
                        >
                            Ver perfil
                        </button>
                    </div>
                    {/* Menú adicional */}
                    <hr />
                </div>

                {/* Contenido principal */}
                <div className="col-md-9 cuerpocontenido">
                    <h1 className="text-center seccion-titulo">Añadir Productos</h1>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-default">
                                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="card-title">Crear Producto</span>
                                    </div>
                                    <div className="card-body bg-white">
                                        <form onSubmit={handleSubmit} role="form">
                                            <div className="form-group">
                                                <label htmlFor="nombreProducto">Nombre del Producto</label>
                                                <input
                                                    type="text"
                                                    id="nombreProducto"
                                                    className="form-control"
                                                    value={nombreProducto}
                                                    onChange={(e) => setNombreProducto(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="quantity">Cantidad</label>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    className="form-control"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="price">Precio</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    id="price"
                                                    className="form-control"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="state">Estado</label>
                                                <input
                                                    type="checkbox"
                                                    id="state"
                                                    checked={state}
                                                    onChange={(e) => setState(e.target.checked)}
                                                />
                                                <span> ¿Está disponible?</span>
                                            </div>
                                            <div className="mt-3" style={{ textAlign: 'right' }}>
                                                <button type="submit" className="btn btn-primary">Crear Producto</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {showProfile && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Perfil de Usuario</h5>
                                    <button type="button" className="close" onClick={() => setShowProfile(false)} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body text-center">
                                    <img src={UserPicture1} alt="Usuario1" className="rounded-circle img-fluid mb-3" style={{ width: '100px', height: '100px' }} />
                                    <p><strong>Nombre de Usuario:</strong> Nombre de Usuario</p>
                                    <p><strong>Rol:</strong> Rol</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowProfile(false)}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PlantillaUno>
    );
}

export default InventoryCreate;
