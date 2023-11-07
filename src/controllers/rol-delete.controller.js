import { Rol } from '#Schemas/rol.schema.js';
import { User } from '#Schemas/user.schema.js';
const rolDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingRolById = await Rol.findOne({ where: { uid, status: '1' } });
  if (!existingRolById)
    return res.status(401).send({ errors: [{ uid: 'Rol no encontrado' }] });
  const userRelation = await User.findAll({
    where: { uidRol: uid, status: '1' },
  });
  if (userRelation.length > 0)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Rol vinculado a un usuario' }] });
  existingRolById.status = '0';
  await existingRolById.save();
  return res.send({ msg: 'Rol eliminado' });
};
export default rolDeleteController;
