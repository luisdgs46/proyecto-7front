
import { useContext } from 'react'
import {
    Link
} from 'react-router-dom'
import UserContext from '../../contexts/users/UserContext'

export default function Header() {

    const ctx = useContext(UserContext)

    const { logout, user }    = ctx

    return (
        <div>
            <ul>
                <li>
                    <Link to="/">
                        Inicio
                    </Link>
                </li>

                {
                    user?.username ?
                        <>
                            <li>
                                <Link to="/perfil">
                                    Perfil
                                </Link>
                            </li>
                            <li onClick={() => { logout() }}>    
                                <Link to="#">
                                    Cerrar sesión
                                </Link>
                            </li>
                        </> :
                        <>
                            <li>
                                <Link to="/registro">
                                    Registro
                                </Link>
                            </li>
                            <li>
                                <Link to="/iniciar-sesion">
                                    Iniciar sesión
                                </Link>
                            </li>
                        </>
                }


            </ul>
        </div>
    )
}
