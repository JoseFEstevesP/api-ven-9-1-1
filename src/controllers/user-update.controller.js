import { User } from '#Schemas/user.schema.js';

const userUpdateController = async (req, res) => {
  const { uid, ci, name, surname, email, uidRol, uidSite } = req.body;

  const existingUserById = await User.findByPk(uid);
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  existingUserById.ci = ci;
  existingUserById.name = name;
  existingUserById.surname = surname;
  existingUserById.email = email;
  existingUserById.uidRol = uidRol;
  existingUserById.uidSite = uidSite;
  await existingUserById.save();
  return res.send({ msg: 'Usuario actualizado' });
};
export default userUpdateController;
