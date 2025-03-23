// 📁 server/sync.js

const sequelize = require('./db');
const User = require('./models/User');

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos sincronizada (tablas creadas o actualizadas)');
    process.exit();
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
    process.exit(1);
  }
})();