import { SALT } from '#Constants/salt.js';
import { User } from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';
const userRegisterController = async (req, res) => {
  const { uid, ci, name, surname, email, password, uidRol } = req.body;
  const existingUserById = await User.findByPk(uid);
  if (existingUserById)
    return res.status(409).send({
      errors: [{ uid: 'Ya existe un usuario con ese id registrado' }],
    });
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail)
    return res.status(409).send({
      errors: [{ email: 'Ya existe un usuario con ese correo registrado' }],
    });
  const hashedPassword = await hash(password, SALT);
  const user = await User.create({
    uid,
    ci,
    name,
    surname,
    email,
    password: hashedPassword,
    uidRol,
  });
  await user.save();
  return res.status(201).send({ msg: 'Usuario registrado con éxito' });
};
export default userRegisterController;
