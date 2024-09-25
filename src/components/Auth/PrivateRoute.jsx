import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../contexts/users/UserContext';
import PropTypes from "prop-types";

export default function PrivateRoute({ component: Component, ...props }) {
    const userCtx = useContext(UserContext);
    const { authStatus, verifyingToken } = userCtx;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            await verifyingToken();
            setLoading(false);
        };
        verify();
    }, [authStatus, verifyingToken]);

    if (loading) {
        return <div>cargando..</div>; 
    }

    return authStatus ? <Component {...props} /> : <Navigate to="/" />;
}

PrivateRoute.propTypes = {   component: PropTypes.elementType.isRequired, };