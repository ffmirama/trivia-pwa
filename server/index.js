const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('./sync');
const app = express();
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Puerto
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});