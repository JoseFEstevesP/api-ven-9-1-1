import { SALT } from '#Constants/salt.js';
import { User } from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';
const userRegisterController = async (req, res) => {
  const { uid, ci, name, surname, email, password, uidRol, uidSite } = req.body;
  const existingUserById = await User.findByPk(uid);
  if (existingUserById) {
    if (existingUserById.status !== '1') {
      return res.status(410).send({
        errors: [{ uid: 'Este usuario fue deshabilitado' }],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: 'Ya existe un usuario con ese id registrado' }],
      });
    }
  }
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) {
    if (existingUserByEmail.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Este correo ya está registrado, pero fue deshabilitado',
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ email: 'Ya existe un usuario con ese correo registrado' }],
      });
    }
  }
  const hashedPassword = await hash(password, SALT);
  const user = await User.create({
    uid,
    ci,
    name,
    surname,
    email,
    password: hashedPassword,
    uidRol,
    uidSite,
  });
  await user.save();
  return res.status(201).send({ msg: 'Usuario registrado con éxito' });
};
export default userRegisterController;
