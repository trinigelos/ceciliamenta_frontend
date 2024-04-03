import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/authContext';
import { UserProvider } from './contexts/userContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <UserProvider>
    <App />
</UserProvider>
    </AuthProvider>
  </React.StrictMode>,
);
