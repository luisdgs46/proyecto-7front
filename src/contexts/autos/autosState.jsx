import { useReducer } from 'react';
import AutosContext from './AutosContext';
import AutosReducer from './AutosReducer';
import axiosClient from '../../config/axios';
import PropTypes from 'prop-types';

const AutosState = ({children}) => {
    const initialState = {
        cars: []
    }

    const [globalState, dispatch] = useReducer(AutosReducer, initialState);

    const createAutos = async (dataForm) => {
        const form = {
            nombre: dataForm.nombre,
            precio: dataForm.precio
        }
        try {
            await axiosClient.post(`/product/crear-autos`, form);
            getAutos();
        } catch (error) {
            console.log(error);
        }
    }

    const getAutos = async () => {
        try {
            const res = await axiosClient.get(`/product/obtener-autos`);
            dispatch({
                type: "OBTENER-AUTOS",
                payload: res.data.cars
            });
        } catch (error) {
            console.log(error);
        }
    }

    const updateAutos = async (id, dataForm) => {
        const form = {
            id,
            nombre: dataForm.nombre,
            precio: dataForm.precio
        };
        try {
            await axiosClient.put(`/product/actualizar-autos`, form);
            getAutos();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAutos = async (id) => {
        const data = { id };
        try {
            await axiosClient.delete(`/product/borrar-autos`, { data });
            getAutos();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AutosContext.Provider value={{
            cars: globalState.cars,
            createAutos,
            getAutos,
            updateAutos,
            deleteAutos
        }}>
            {children}
        </AutosContext.Provider>
    )
}

AutosState.propTypes = {   children: PropTypes.node,};
export default AutosState;