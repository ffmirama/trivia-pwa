import React, { useState } from 'react';
import { loginUser } from '../../services/api';
import '../../App.css'; // Asegúrate de importar el CSS

const Login = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(username, password);
    if (res.message === 'Login exitoso') {
      onAuth(username);
    } else {
      setMsg(res.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Usuario"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit">Entrar</button>
        </form>
        {msg && <p style={{ color: 'red', marginTop: '1rem' }}>{msg}</p>}
      </div>
    </div>
  );
};

export default Login;

