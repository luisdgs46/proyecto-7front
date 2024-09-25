import { useEffect, useContext } from 'react'
import {AppProvider, SignInPage} from '@toolpad/core';
import UserContext from '../../contexts/users/UserContext'
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'

const providers = [{id:'credentials', name:'Email & Password'}];

const signIn = async (provider, formData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const correctEmail = 'tu_email@example.com';
        const correctPassword = 'tu_contraseña';
        if (formData.get('email') === correctEmail && formData.get('password') === correctPassword) {
          alert('Ingreso exitoso.');
          resolve({ success: true });
        } else {
          alert('Credenciales incorrectas.');
          reject({ success: false });
        }
      }, 300);
    });
  };
   
export default function Login() {
    const theme = useTheme();
    const navigate = useNavigate();
    const userCtx = useContext(UserContext)

    const { 
        loginUser,
        authStatus,
        verifyingToken
    } = userCtx

    // const [data, setData] = useState({
    //     email: "",
    //     password: ""
    // })


    useEffect(() => {
        verifyingToken();

        if(authStatus){
            navigate("/perfil")
            //props.history.push("/perfil")
        }

    }, [authStatus, navigate]);

    if(authStatus) return null;   


    // const handleChange = (event) => {

    //     setData({
    //         ...data,
    //         [event.target.name]: event.target.value
    //     })

    // }

    // const sendData = (event) => {
        
    //     event.preventDefault()
    //     loginUser(data)

    // }
const handleSignIn = async (provider, formData) => {
    try{
        const result = await signIn(provider, formData);
        if (result.success) {
            loginUser({email:formData.get('email'), password: formData.get('password')});
        }
    }catch (error){
        console.error('Error de Autenticación', error);
    }
};

    return (
        <>
        <AppProvider theme={theme}>
            <div>
                <SignInPage signIn={handleSignIn} providers={providers}/>
            </div>
        </AppProvider>
            {/* <div>
                <div>
                    <div>
                        <h2>
                            Iniciar sesión
                        </h2>
                    </div>
                    <form onSubmit={(e) => { sendData(e) }}>
                        <input type="hidden" name="remember" value="true" />
                        <div>
                            <div>
                                <label htmlFor="email-address">Tu correo</label>
                                <input 
                                id="email-address" 
                                onChange={(e) => { handleChange(e) }}
                                name="email" type="email" autoComplete="email" required placeholder="Tu correo" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                
                                <input id="password" 
                                name="password" 
                                onChange={(e) => { handleChange(e) }}
                                type="password" autoComplete="current-password" 
                                required 
                                placeholder="Password" />
                            </div>
                        </div>


                        <div>
                            <button type="submit">
                                Comenzar
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
        </>
    )
}
//index.propTypes = {   history.push: PropTypes.elementType.isRequired, };
