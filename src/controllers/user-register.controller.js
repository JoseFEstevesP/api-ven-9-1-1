import { permissions } from '#Constants/permissions.js';
import { SALT } from '#Constants/salt.js';
import { userMSG } from '#Constants/system.js';
import { validatePermissions } from '#Functions/validatePermissions.js';
import { User } from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';
const userRegisterController = async (req, res) => {
  const { uidRol: uidRolUser, uidSite: uidSiteUser } = req;
  const { uid, ci, name, surname, email, password, uidRol, uidSite } = req.body;
  const existingUserById = await User.findByPk(uid);
  if (existingUserById) {
    if (existingUserById.status !== '1') {
      return res.status(410).send({
        errors: [{ uid: userMSG.register.uid.status }],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: userMSG.register.uid.default }],
      });
    }
  }
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) {
    if (existingUserByEmail.status !== '1') {
      return res.status(409).send({
        errors: [{ uid: userMSG.register.email.status }],
      });
    } else {
      return res.status(409).send({
        errors: [{ email: userMSG.register.email.default }],
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
    uidSite: validatePermissions({ uidRol: uidRolUser, per: permissions.site })
      ? uidSite
      : uidSiteUser,
  });
  await user.save();
  return res.status(201).send({ msg: userMSG.register.msg });
};
export default userRegisterController;
