import { SALT } from '#Constants/salt.js';
import { User } from '#Schemas/user.schema.js';
import { compare, hash } from 'bcrypt';
const userUpdatePasswordController = async (req, res) => {
  const { id } = req;
  const { oldPassword, newPassword } = req.body;
  const existingUserById = await User.findByPk(id);
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  const checkPassword = await compare(oldPassword, existingUserById.password);
  if (!checkPassword)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Credenciales incorrectas' }] });
  const hashedPassword = await hash(newPassword, SALT);
  existingUserById.password = hashedPassword;
  await existingUserById.save();
  return res.send({ msg: 'Clave del usuario actualizada' });
};
export default userUpdatePasswordController;
