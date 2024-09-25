import { useContext, useEffect, useState } from "react";
import AutosContext from "../../contexts/autos/AutosContext";
import PaypalButton from "./PaypalButton";
// AutosList.jsx



export const AutosList = () => {
  const [cars, setCars] = useState({
    nombre: "",
    precio: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  const ctx = useContext(AutosContext);
  const { createAutos, getAutos, updateAutos, deleteAutos } = ctx;
  
 

  useEffect(() => {
    getAutos();
  }, );

  const handleChange = (event) => {
    setCars({
      ...cars,
      [event.target.name]: event.target.value,
    });
  };

  const sendDataToCreateAutos = (event) => {
    event.preventDefault();
    if (!cars.nombre.trim() || !cars.precio.trim()) {
      return setError("Debes llenar todos los campos de texto");
    }
    createAutos(cars);
    setError(null);
  };

  const sendDataToUpdateAutos = (event) => {
    event.preventDefault();
    if (cars.nombre.trim() || !cars.precio.toString().trim()) {
      return setError("Debes llenar todos los campos de texto");
    }

    updateAutos(id, cars);
    setId(null);

    setCars({
      nombre: "",
      precio: "",
    });

    setEditMode(false);
    setError(null);
  };

  const sendDataToDeleteAutos = (element) => {
    deleteAutos(element._id);
  };

  const activateEditMode = (element) => {
    setEditMode(true);
    setId(element._id);
    setCars({
      nombre: element.nombre,
      precio: element.precio,
    });
  };

  return (
    <div>
      {/* TÍTULO (DEPENDIENDO DEL MODO EN EL QUE ESTEMOS) */}
      <h1>{editMode ? "Edita auto" : "Crea un auto"}</h1>
      {/* NUESTRO FORMULARIO */}
      <form
        onSubmit={
          editMode
            ? (e) => {
              sendDataToUpdateAutos(e);
            }
            : (e) => {
              sendDataToCreateAutos(e);
            }
        }
      >
        <h2>Escribe el nombre del auto</h2>
        <input
          name="nombre"
          onChange={(e) => {
            handleChange(e);
          }}
          value={cars.nombre}
        />
        <h2>Escribe el precio</h2>
        <input
          name="precio"
          onChange={(e) => {
            handleChange(e);
          }}
          value={cars.precio}
          type="number"
        />
        <button type="submit">
          {editMode ? "Editar auto" : "Crear auto"}
        </button>
      </form>
      {error ? error : null}
      <h1>Lista de autos</h1>
      {cars.map((cars) => {
        return (
          <div key={cars._id}>
            <h2>{cars.nombre}</h2>
            <p>Precio: ${cars.precio}</p>
            <PaypalButton valor={cars.precio} />
            {<button onClick={() => activateEditMode(cars)}>Editar</button>}
            <button onClick={() => sendDataToDeleteAutos(cars)}>
              Borrar
            </button>
          </div>
        );
      }
      )}
    </div>
  );
};

