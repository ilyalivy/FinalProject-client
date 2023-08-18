import axios from 'axios';
import { useState, useContext } from 'react';
import UserContext from '../UserContext.js';
import './AuthPage.css'
import { Link } from 'react-router-dom';
import loadingimage from '../images/loading.gif';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const BASE_URL = process.env.REACT_APP_BASE_URL

    const isValidEmail = (email) => {
        // Регулярное выражение для проверки email
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };
    

    const handleAuth = async (isLogin) => {
        if (!isValidEmail(email)) {
            setError('Invalid email format');
            return;
        }

        if (!password.trim()) {
            setError('Password is required');
            return;
        }

        const url = isLogin ? `${BASE_URL}/login` : `${BASE_URL}/register`;
        const userData = { email, password };

        setLoading(true);

        try {
            const response = await axios.post(url, userData);
            // console.log('auth user=>', response.data);
            setUser({...response.data[0], photo:response.data[0].location});
            localStorage.setItem('user', JSON.stringify(response.data[0]));
        } catch (err) {
            setError(err.response.data.msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={user ? "" : "main"}>
            <div className='innermain'>
                <h1 className="name">Chandler</h1>
                <h3 className='mates'>Your tv mates worldwide</h3>
                <p className='community'>Community app based on matching by your favorite tv series</p>
                
                {error && <p className='error'>{error}</p>}

                {loading ? 
                    <img 
                        style={{width: '65px', height: '65px'}}
                        src={loadingimage}
                        alt='Loading...'
                    /> : 
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
                }

            </div>

            
        </div>
    );
}

export default AuthPage;