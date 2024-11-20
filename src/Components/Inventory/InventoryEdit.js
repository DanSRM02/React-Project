import React, { useState } from 'react';
import PlantillaUno from '../PlantillaUno';

const InventoryEdit = ({ initialData, onSubmit }) => {
    const [inventario, setInventario] = useState({
        id: initialData?.id || null,
        nombreProducto: initialData?.nombreProducto || '',
        productID: initialData?.productID || '',
        quantity: initialData?.quantity || 0,
        price: initialData?.price || 0.0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventario((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inventario);
    };

    return (
        <PlantillaUno>   
        <div className="col-md-9 cuerpocontenido">
            <div className="row p-1">
                <div className="col-md-12">
                    <h1 className="mt-4">{inventario.id ? 'Editar Producto' : 'Nuevo Producto'}</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombreProducto" className="form-label">Nombre del Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreProducto"
                                name="nombreProducto"
                                value={inventario.nombreProducto}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productID" className="form-label">ID del Producto</label>
                            <input
                                type="number"
                                className="form-control"
                                id="productID"
                                name="productID"
                                value={inventario.productID}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Cantidad</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                name="quantity"
                                value={inventario.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={inventario.price}
                                onChange={handleChange}
                                step="0.01"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Guardar</button>
                        <button type="button" className="btn btn-secondary" onClick={() => window.location.href = '/inventarios'}>
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </PlantillaUno>
    );
    }
    
    export default InventoryEdit;
