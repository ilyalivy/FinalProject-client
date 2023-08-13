import axios from 'axios';
import { useState, useContext } from 'react';
import UserContext from '../UserContext.js';
import './AuthPage.css'
import { Link } from 'react-router-dom';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useContext(UserContext);

    const isValidEmail = (email) => {
        // Регулярное выражение для проверки email
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };
    

    const handleAuth = async (isLogin) => {
        // if (!isValidEmail(email)) {
        //     setError('Invalid email format');
        //     return;
        // }

        if (!password.trim()) {
            setError('Password is required');
            return;
        }

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
        <div className={user ? "" : "main"}>
            <div className='innermain'>
                <h1 className="name">Chandler</h1>
                <h3 className='mates'>Your tv mates worldwide</h3>
                <p className='community'>Community app based on matching by your favorite tv series</p>
                
                {error && <p className='error'>{error}</p>}
                <form>
                    <div className='datainput'>
                        <input 
                        className='email'
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            className='password'
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    
                    <div className='sign'>
                        <Link className='link'
                        to="#" 
                        onClick={() => handleAuth(false)}
                        >
                            Sign up
                        </Link>
                        <Link className='link'
                            to="#" 
                            onClick={() => handleAuth(true)}
                        >
                            Sign in
                        </Link>
                    </div>
                    
                    
                </form>

            </div>

            
        </div>
    );
}

export default AuthPage;