import React, { useState, useEffect } from 'react';
import './../../Styles/user.css';
import PlantillaUno from '../PlantillaUno';
import UserPicture1 from './../../Styles/img/UsersBack/user1.svg';

const InventoryHome = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [products, setProducts] = useState([]); // Cambié inventarios por products

    // Simulación de obtener datos de la tabla "products"
    useEffect(() => {
        // Suponiendo que tienes una API para obtener los productos
        // Puedes hacer una llamada a tu backend aquí, por ejemplo con fetch o axios
        const fetchedProducts = [
            { id: 1, name: 'Producto A', quantity: 10, price: 100.0, unit: 'kg', status: 'Disponible' },
            { id: 2, name: 'Producto B', quantity: 5, price: 50.0, unit: 'unidad', status: 'Agotado' },
        ];
        setProducts(fetchedProducts);
    }, []);

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
                            <a className="nav-link" href="/Inventory/Home">
                                <i className="bi bi-bag-check"></i> Ver inventario
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/inventarios/Create">
                                <i className="bi bi-bag-plus"></i> Añadir inventario
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

                <div className="col-md-9" style={{ marginTop: '100px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-primary">Gestión de Inventarios</h2>
                        <a href="/inventory/Create" className="btn btn-success">
                            <i className="bi bi-plus-circle"></i> Agregar Nuevo Inventario
                        </a>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Unidad de Medida</th> {/* Nueva columna */}
                                    <th>Estado</th> {/* Nueva columna para estado */}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((products) => (
                                    <tr key={products.id}>
                                        <td>{products.id}</td> {/* Usando product.id */}
                                        <td>{products.name}</td> {/* Usando product.name */}
                                        <td>{products.quantity}</td> {/* Usando product.quantity */}
                                        <td>${products.price.toFixed(2)}</td> {/* Usando product.price */}
                                        <td>{products.unit}</td> {/* Usando product.unit */}
                                        <td>{products.status}</td> {/* Usando product.status */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showProfile && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Perfil de Usuario</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowProfile(false)}
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={UserPicture1}
                                    alt="Usuario1"
                                    className="rounded-circle img-fluid mb-3"
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <p>
                                    <strong>Nombre de Usuario:</strong> Nombre de Usuario
                                </p>
                                <p>
                                    <strong>Rol:</strong> Rol
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowProfile(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PlantillaUno>
    );
};

export default InventoryHome;
