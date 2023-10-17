import { User } from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
const userUpdateEmailController = async (req, res) => {
  const { id } = req;
  const { email, password } = req.body;
  const existingUserById = await User.findByPk(id);
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  const checkPassword = await compare(password, existingUserById.password);
  if (!checkPassword)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Credenciales incorrectas' }] });
  existingUserById.email = email;
  await existingUserById.save();
  return res.send({ msg: 'Email del usuario actualizado' });
};
export default userUpdateEmailController;
