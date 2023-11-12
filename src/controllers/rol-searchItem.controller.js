import { rolMSG } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';

const rolSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const rol = await Rol.findOne({ where: { uid, status: '1' } });
  if (!rol) return res.status(404).send({ errors: [{ uid: rolMSG.noFound }] });
  return res.status(200).send(rol);
};

export default rolSearchItemController;
