import { userMSG } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
const userProfileController = async (req, res) => {
  const { id } = req;
  const existingUserById = await User.findOne({
    where: { uid: id, status: '1' },
  });
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: userMSG.noFound }] });
  const { uid, ci, name, surname, email, uidRol, uidSite } = existingUserById;
  const { name: nameRol } = await Rol.findOne({
    where: { uid: uidRol, status: '1' },
  });
  const { name: nameSite } = await Site.findOne({
    where: { uid: uidSite, status: '1' },
  });
  return res.send({ uid, ci, name, surname, email, nameRol, nameSite });
};
export default userProfileController;
