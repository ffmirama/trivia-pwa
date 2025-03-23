const users = []; // Temporal, sin base de datos por ahora

// Registrar usuario
const register = (req, res) => {
  const { username, password } = req.body;

  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.status(400).json({ message: 'Usuario ya registrado' });
  }

  const newUser = { username, password };
  users.push(newUser);
  res.status(201).json({ message: 'Usuario registrado correctamente' });
};

// Login
const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({ message: 'Login exitoso', username });
};

module.exports = { register, login };
