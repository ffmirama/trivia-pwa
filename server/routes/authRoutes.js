// 📁 server/routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// 👉 POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'El usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password_hash: hash });
    res.json({ message: 'Usuario registrado correctamente', user: newUser.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// 👉 POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    res.json({ message: 'Login exitoso', user: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
