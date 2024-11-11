import React, { useState } from 'react';
import './../../Styles/user.css';
import PlantillaUno from '../PlantillaUno';
import UserPicture1 from './../../Styles/img/UsersBack/user1.svg';

const InventoryHome = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [inventarios, setInventarios] = useState([
        { id: 1, nombreProducto: 'Producto A', quantity: 10, price: 100.00 },
        { id: 2, nombreProducto: 'Producto B', quantity: 5, price: 50.00 }
    ]);

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
                    <h3 className="border border-light rounded p-2">Inventario</h3>
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
                    <a href="/inventarios/nuevo" className="btn btn-primary mb-3">Agregar Nuevo Inventario</a>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventarios.map((inventario) => (
                                <tr key={inventario.id}>
                                    <td>{inventario.id}</td>
                                    <td>{inventario.nombreProducto}</td>
                                    <td>{inventario.quantity}</td>
                                    <td>{inventario.price}</td>
                                    <td>
                                        <a href={`/inventarios/editar/${inventario.id}`} className="btn btn-warning">Editar</a>
                                        <a href={`/inventarios/eliminar/${inventario.id}`} className="btn btn-danger">Eliminar</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
        </PlantillaUno>
    );
}

export default InventoryHome;
