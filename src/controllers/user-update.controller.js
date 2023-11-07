import { User } from '#Schemas/user.schema.js';

const userUpdateController = async (req, res) => {
  const { uid, ci, name, surname, email, uidRol, uidSite } = req.body;

  const existingUser = await User.findOne({ where: { uid, status: '1' } });
  if (!existingUser)
    return res.status(401).send({ errors: [{ uid: 'Usuario no encontrado' }] });
  existingUser.ci = ci;
  existingUser.name = name;
  existingUser.surname = surname;
  existingUser.email = email;
  existingUser.uidRol = uidRol;
  existingUser.uidSite = uidSite;
  await existingUser.save();
  return res.send({ msg: 'Usuario actualizado' });
};
export default userUpdateController;
