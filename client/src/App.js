import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Quiz from './components/Trivia/Quiz';

const App = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(savedUser);
  }, []);

  const handleAuth = (username) => {
    localStorage.setItem('user', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return (
      <div>
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Ya tengo cuenta' : 'Registrarse'}
        </button>
        {showRegister ? <Register onAuth={handleAuth} /> : <Login onAuth={handleAuth} />}
      </div>
    );
  }

  return (
    <div>
      <h2>¡Hola, {user}!</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <Quiz />
    </div>
  );
};

export default App;
