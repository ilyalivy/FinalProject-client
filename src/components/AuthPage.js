import axios from 'axios';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext.js';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useContext(UserContext);

    const handleAuth = async (isLogin) => {
        const url = isLogin ? 'http://localhost:3030/login' : 'http://localhost:3030/register';
        const userData = { email, password };

        try {
            const response = await axios.post(url, userData);
            setUser(response.data[0]);
            localStorage.setItem('user', JSON.stringify(response.data[0]));
        } catch (err) {
            setError(err.response.data.msg);
        }
    };

    return (
        <div>
            <h1>Chandler</h1>
            <h3>Find your TV friends worldwide</h3>
            <p>Community app based on matching by your favorite TV Series</p>

            <h2>Authentication</h2>
            {error && <p>{error}</p>}
            <form>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button 
                    type='button' 
                    onClick={() => handleAuth(true)}
                >
                    Sign in
                </button>
                <button 
                    type='button' 
                    onClick={() => handleAuth(false)}
                >
                    Sign up
                </button>
            </form>
        </div>
    );
}

export default AuthPage;

