import { User } from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
const userUnregisterController = async (req, res) => {
  const { id } = req;
  const { password } = req.body;
  const existingUserById = await User.findByPk(id);
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  const checkPassword = await compare(password, existingUserById.password);
  if (!checkPassword)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Credenciales incorrectas' }] });
  await existingUserById.destroy();
  return res.send({ msg: 'Usuario eliminado' });
};
export default userUnregisterController;
