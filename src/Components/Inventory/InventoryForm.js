import React, { useState } from 'react';
import './../../Styles/user.css';
import PlantillaUno from '../PlantillaUno';
import UserPicture1 from './../../Styles/img/UsersBack/user1.svg';

const InventoryForm = () => {
    const [showProfile, setShowProfile] = useState(false);

    return (
        <PlantillaUno>
            <div className="row">
                <div className="col-md-3 menu">
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
                    <hr />
                    <h3 className="border border-light rounded p-2">inventario</h3>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/products">
                                <i className="bi bi-bag-check"></i> Ver inventario
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/User/CancelOrder">
                                <i className="bi bi-bag-x"></i> Añadir inventario
                            </a>
                        </li>
                    </ul>
                    <hr />
                    <h3 className="mt-3 border border-light rounded p-2">Cuenta</h3>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/data-change">
                                <i className="bi bi-globe"></i> Cambiar datos
                            </a>
                        </li>
                    </ul>
                    <hr />
                </div>

                <div className="col-md-9 cuerpocontenido">
                    <h1 className="text-center seccion-titulo">Lista De Domicilios</h1>
                    <p className="text-center seccion-texto">Aquí puedes ver la lista de domiciliarios</p>
                    <div className="row p-1">
                        <div className="col-md-12">
                            <h1>{false ? 'Editar Producto' : 'Nuevo Producto'}</h1>
                            <form action="/inventarios" method="post">
                                <div className="mb-3">
                                    <label htmlFor="nombreProducto" className="form-label">Nombre del Producto</label>
                                    <input type="text" className="form-control" id="nombreProducto" name="nombreProducto" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productID" className="form-label">ID del Producto</label>
                                    <input type="number" className="form-control" id="productID" name="productID" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                    <input type="number" className="form-control" id="cantidad" name="quantity" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <input type="number" className="form-control" id="precio" name="price" step="0.01" required />
                                </div>
                                <button type="submit" className="btn btn-success">Guardar</button>
                                <a href="/inventarios" className="btn btn-secondary">Cancelar</a>
                            </form>
                        </div>
                    </div>
                </div>

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

export default InventoryForm;
