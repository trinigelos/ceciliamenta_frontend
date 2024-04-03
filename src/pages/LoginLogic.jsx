//LoginLogic.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { useUser } from '../contexts/userContext'; 


export default function LoginLogic() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const { setUser } = useUser();
const { login } = useAuth()
    const navigate = useNavigate();
    

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const userData = await login(username, password);
        console.log("Login response userData:", userData);
        if (userData) {
            setUser(userData); // Set the user data in context
            navigate('/dashboard'); 
        }
      
    } catch (error) {
      console.error("Login error:", error); 
        setErrorMessage("Credenciales incorrectas, intente nuevamente");
        
    }
};

return (
<div className="form-control signin-form background-login">
    <form onSubmit={handleSubmit}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {/* form for login */}
        <h2 className='h2-form'>Ingresa</h2>
        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}
        placeholder="Usuario o email" required />
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}
        placeholder="Contraseña" required />
        <button type='submit'>Ingresar</button>
    </form>
</div>)
}