import axios from 'axios';
import { useState, useContext } from 'react';
import UserContext from '../UserContext.js';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();
        try {
            const user = {email, password};
            const response = await axios.post('http://localhost:3030/login', user);
            console.log(response.data)
            setUser(response.data[0]);
            localStorage.setItem('user', JSON.stringify(response.data[0]));
        } catch (error) {
            setError(error.response.data.msg)
        }
    };

    return (
    <div>
        <h1>Chandler</h1>
        <h3>Find your TV Series friends worldwide</h3>
        <p>Community app based on matching by TV Series you like</p>

        <h2>Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={login}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Login</button>
        </form>
    </div>
    );
}

export default Login;