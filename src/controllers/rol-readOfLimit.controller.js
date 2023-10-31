import { Rol } from '#Schemas/rol.schema.js';

const rolReadOfLimitController = async (req, res) => {
  const rol = await Rol.findAll();
  const rows = rol.map((item) => ({ uid: item.uid, name: item.name }));
  return res.status(200).send(rows);
};

export default rolReadOfLimitController;
