require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conectado a PostgreSQL (Render) con Sequelize'))
  .catch((err) => console.error('❌ Error al conectar:', err));

module.exports = sequelize;
