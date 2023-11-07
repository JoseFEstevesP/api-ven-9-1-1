import { Technology } from '#Schemas/technology.schema.js';
import { User } from '#Schemas/user.schema.js';
const userDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingUserById = await User.findOne({ where: { uid, status: '1' } });
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no encontrado' }] });
  const userRelationTechnology = await Technology.findAll({
    where: { uidUser: uid, status: '1' },
  });
  if (userRelationTechnology.length > 0)
    return res.status(401).send({
      errors: [{ uid: 'Usuario vinculado con el registro de Tecnología' }],
    });
  existingUserById.status = '0';
  await existingUserById.save();
  return res.send({ msg: 'usuario eliminado' });
};
export default userDeleteController;
