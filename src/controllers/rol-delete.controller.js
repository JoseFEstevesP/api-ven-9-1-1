import { Rol } from '#Schemas/rol.schema.js';
import { User } from '#Schemas/user.schema.js';
const rolDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingRolById = await Rol.findByPk(uid);
  if (!existingRolById)
    return res.status(401).send({ errors: [{ uid: 'Rol no encontrado' }] });
  const userRelation = await User.findAll({ where: { uidRol: uid } });
  if (userRelation.length > 0)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Rol vinculado a un usuario' }] });
  await existingRolById.destroy();
  return res.send({ msg: 'Rol eliminado' });
};
export default rolDeleteController;
