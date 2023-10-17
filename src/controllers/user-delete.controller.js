import { User } from '#Schemas/user.schema.js';
const userDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingUserById = await User.findByPk(uid);
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no encontrado' }] });
  await existingUserById.destroy();
  return res.send({ msg: 'usuario eliminado' });
};
export default userDeleteController;
