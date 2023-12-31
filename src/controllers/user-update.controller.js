import { userMSG } from '#Constants/system.js';
import { User } from '#Schemas/user.schema.js';
import moment from 'moment';

const userUpdateController = async (req, res) => {
  const { uid, ci, name, surname, email, uidRol, uidSite } = req.body;

  const existingUser = await User.findOne({ where: { uid, status: '1' } });
  if (!existingUser)
    return res.status(401).send({ errors: [{ uid: userMSG.noFound }] });
  existingUser.ci = ci;
  existingUser.name = name;
  existingUser.surname = surname;
  existingUser.email = email;
  existingUser.uidRol = uidRol;
  existingUser.uidSite = uidSite;
  existingUser.updateAtDate = moment().format('YYYY-MM-DD');
  existingUser.updateAtTime = moment().format('hh:mm A');
  await existingUser.save();
  return res.send({ msg: userMSG.update.msg });
};
export default userUpdateController;
