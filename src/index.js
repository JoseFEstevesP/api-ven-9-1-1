import { sequelize } from '#Config/db.js';
import '#Config/env.js';
import httpServer from '#Config/http.js';
const bootstrap = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log('database connected'));
    await sequelize.sync();
    // await sequelize.sync({ alter: true });
    httpServer.listen(process.env.PORT, () => {
      console.log(`server in port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('connection fails', error);
  }
};
bootstrap();
