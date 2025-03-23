import React, { useState } from 'react';
import { registerUser } from '../../services/api';

const Register = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(username, password);
    if (res.message === 'Usuario registrado correctamente') {
      onAuth(username);
    } else {
      setMsg(res.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Registrarse</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Register;
