// src/components/StartPage.jsx
import React, { useState } from 'react';
import './Login.css';
import SignupLogic from './SignupLogic';
import LoginLogic from './LoginLogic';

const Login = () => {
const [isSignupActive, setIsSignupActive] = useState(false);

const toggleForm = () => {
setIsSignupActive(!isSignupActive);
};

return (
<div className='whole-container'>
    <div className={`login-container ${isSignupActive ? 'change' : '' }`}>
        <div className="forms-container">
            {/* form for signup */}
            <SignupLogic setIsSignupActive={setIsSignupActive} />
            {/* form for login */}
           <LoginLogic />
        </div>
            {/* section to toggle from signup and login */}
        <div className="intros-container">
            <div className="intro-control signin-intro">
                <div className="intro-control__inner">
                    <h2>Bienvenido!</h2>
                    <p>Todavía no tienes cuenta?</p>
                    <button id="signup-btn" onClick={toggleForm}>Registrate</button>
                </div>
            </div>
            <div className="intro-control signup-intro">
                <div className="intro-control__inner">
                    <h2>Bienvenido!</h2>
                    <p>Ya tienes cuenta?</p>
                    <button id="signin-btn" onClick={toggleForm}>Ingresa</button>
                </div>
            </div>
        </div>
    </div>
</div>
);
};

export default Login;