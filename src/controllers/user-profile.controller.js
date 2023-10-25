import { Rol } from '#Schemas/rol.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
const userProfileController = async (req, res) => {
  const { id } = req;
  const existingUserById = await User.findByPk(id);
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  const { uid, ci, name, surname, email, uidRol, uidSite } = existingUserById;
  const { name: nameRol } = await Rol.findByPk(uidRol);
  const { name: nameSite } = await Site.findByPk(uidSite);
  return res.send({ uid, ci, name, surname, email, nameRol, nameSite });
};
export default userProfileController;
