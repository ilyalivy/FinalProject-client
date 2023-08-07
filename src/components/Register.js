import axios from 'axios';
import { useState, useContext } from 'react';
import UserContext from '../UserContext.js';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useContext(UserContext);

    const register = async (e) => {
        e.preventDefault();
        try {
            const newUser = {email, password};
            const response = await axios.post('http://localhost:3030/register', newUser);
            setUser(response.data[0]);
        } catch (error) {
            setError(error.response.data.msg);
        }
    }

    return (
    <div>
        <h1>Chandler</h1>
        <h3>Find your TV Series friends worldwide</h3>
        <p>Community app based on matching by TV Series you like</p>

        <h2>Register</h2>
        {error && <p>{error}</p>}
        <form onSubmit={register}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Register</button>
        </form>
    </div>
    );
}

export default Register;