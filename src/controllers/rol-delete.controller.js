import { Rol } from '#Schemas/rol.schema.js';
const rolDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingRolById = await Rol.findByPk(uid);
  if (!existingRolById)
    return res.status(401).send({ errors: [{ uid: 'Rol no encontrado' }] });
  await existingRolById.destroy();
  return res.send({ msg: 'Rol eliminado' });
};
export default rolDeleteController;
