   // authContext.js
import React, { useState, createContext, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    //retrieve and parse the 'user' item from localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || null;
  });

  useEffect(() => {
    // Update localStorage based on user state
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }

    // Directly store or remove the token as it's not JSON
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [user, token]);

  // //method to verify token
  // const verifyToken = async () => {
  //   if (!token) {
  //     console.log("token not found");
  //     setUser(null);
  //     setToken(null);
  //     return false;
  //   }c

  //   try {
  //     const response = await fetch("http://localhost:5000/verifyToken", {
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     });
      
  //     if (!response.ok) throw new Error("Token verification failed");

  //     const data = await response.json();
  //     setUser(data.user);
  //     setToken(token);
  //     return true;
  //   }
  //   catch (error) {
  //     console.log(`Error in verifyToken: ${error.message}`);
  //     setUser(null);
  //     setToken(null);
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("token");
  //   }
  // };

  // //call verifyToken during initial load
  // useEffect(() => {
  //   verifyToken().then(isValid => {
  //     if (!isValid) {
  //       console.log('Token is invalid or expired');

  //     }
  //   })
  // })



// Method to handle user registration
const signup = async (username, email, password, confirmPassword) => {
  try {
    // Make a POST request to the backend API endpoint for signup
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, confirmPassword}),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'An error occurred');
    }

    // Registration successful
    const data = await response.json();
      setUser(data.user);
      return true; 
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};


// Method to handle user login
const login = async (usernameOrEmail, password) => {
  try {
    // fetch request to include usernameOrEmail
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail, password }),
    });


    if (response.ok) {
      const data = await response.json();
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);
  console.log("Stored in localStorage:", localStorage.getItem('user'), localStorage.getItem('token'));
  setUser(data.user);
  setToken(data.token);
  return data.user;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
};

// Method to handle user logout
const logout = () => {
  setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
