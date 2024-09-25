import { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import PropTypes from 'prop-types'; 
import axiosClient from '../../config/axios'
 
const UserState = (props) => {
 
    const initialState = {
        user: {
            username: null,
            email: null,
        },
        authStatus: false,
        loading: true
    }
 
    const [ globalState, dispatch ] = useReducer(UserReducer, initialState)
 
    const registerUser = async (dataForm) => {
 
        try {
            const res = await axiosClient.post("/user/register", dataForm)
            dispatch({
                type: "REGISTRO_EXITOSO",
                payload: res.data
            })
 
        } catch (error) {
            console.log(error)
        }
    }
 
    const loginUser = async (dataForm) => {
 
        try {
            const respuesta = await axiosClient.post("/user/login", dataForm)
 
            dispatch({
                type: "LOGIN_EXITOSO",
                payload: respuesta.data
            })
 
        } catch (error) {
            console.log(error)
        }
    }
 
    const verifyingToken = async () => {
 
        const token = localStorage.getItem('token')
 
        if(token){
            axiosClient.defaults.headers.common['authorization'] = `Bearer ${token}`
 
        } else{
            delete axiosClient.defaults.headers.common['authorization']
        }
 
        try {
 
            const respuesta = await axiosClient.get("/user/verifytoken")
 
            dispatch({
                type: "OBTENER_USUARIO",
                payload: respuesta.data.usuario
            })
 
        } catch (error) {
            console.log(error)
        }
    }
 
    const logout = () => {
        dispatch({
            type: "CERRAR_SESION"
        })
    }
 
    return (
        <UserContext.Provider value={{
            user: globalState.user,
            authStatus: globalState.authStatus,
            loading: globalState.loading,
            registerUser,
            loginUser,
            verifyingToken,
            logout
        }}>
 
            {props.children}
 
        </UserContext.Provider>
    )
 
 
};

UserState.PropTypes = {
    children: PropTypes.node.isRequired
}
 
 
export default UserState