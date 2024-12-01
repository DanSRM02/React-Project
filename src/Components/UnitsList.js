
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnitsList = () => {
  const [units, setUnits] = useState([]);  // Guardar unidades de medición
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState(null);  // Para mostrar la unidad seleccionada

  useEffect(() => {
    // Llamada a la API para obtener las unidades de medición
    const fetchUnits = async () => {
      try {
        const response = await axios.get('/api/units');  // Reemplaza con tu endpoint
        if (response.status === 200) {
          setUnits(response.data);  // Guarda la respuesta en el estado
        }
      } catch (error) {
        console.error('Error al obtener las unidades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  const handleSelectUnit = (unitId) => {
    // Busca la unidad seleccionada por su ID
    const unit = units.find(u => u.id === unitId);
    setSelectedUnit(unit);  // Guarda la unidad seleccionada en el estado
  };

  if (loading) {
    return <p>Cargando unidades...</p>;
  }

  return (
    <div>
      <h2>Unidades de Medición</h2>
      <ul>
        {units.map((unit) => (
          <li key={unit.id} onClick={() => handleSelectUnit(unit.id)}>
            {unit.unitType} ({unit.acronym})
          </li>
        ))}
      </ul>

      {selectedUnit && (
        <div>
          <h3>Detalles de la Unidad</h3>
          <p><strong>Tipo:</strong> {selectedUnit.unitType}</p>
          <p><strong>Acrónimo:</strong> {selectedUnit.acronym}</p>
        </div>
      )}
    </div>
  );
};

export default UnitsList;
