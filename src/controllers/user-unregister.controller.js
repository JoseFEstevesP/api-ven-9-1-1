import { Technology } from '#Schemas/technology.schema.js';
import { User } from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
const userUnregisterController = async (req, res) => {
  const { id } = req;
  const { password } = req.body;
  const existingUserById = await User.findByPk(id);
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  const userRelationTechnology = await Technology.findAll({
    where: { uidUser: id, status: '1' },
  });
  if (userRelationTechnology.length > 0)
    return res.status(401).send({
      errors: [{ uid: 'Usuario vinculado con el registro de Tecnología' }],
    });
  const checkPassword = await compare(password, existingUserById.password);
  if (!checkPassword)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Credenciales incorrectas' }] });
  existingUserById.status = '0';
  await existingUserById.save();
  return res.send({ msg: 'Usuario eliminado' });
};
export default userUnregisterController;
