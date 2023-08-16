import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext.js';

const Logout = () => {
    const { user, setUser, setIsAuthenticated } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.clear();
        }
    }, [user, setUser]);

    return <Navigate to="/" replace />;
};

export default Logout;
