import { SALT } from '#Constants/salt.js';
import { userMSG } from '#Constants/system.js';
import { User } from '#Schemas/user.schema.js';
import { compare, hash } from 'bcrypt';
import moment from 'moment';
const userUpdatePasswordController = async (req, res) => {
  const { id } = req;
  const { oldPassword, newPassword } = req.body;
  const existingUserById = await User.findOne({
    where: { uid: id, status: '1' },
  });
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: userMSG.unauthorized }] });
  const checkPassword = await compare(oldPassword, existingUserById.password);
  if (!checkPassword)
    return res.status(401).send({ errors: [{ uid: userMSG.login.error }] });
  const hashedPassword = await hash(newPassword, SALT);
  existingUserById.password = hashedPassword;
  existingUserById.updateAtDate = moment().format('YYYY-MM-DD');
  existingUserById.updateAtTime = moment().format('hh:mm A');
  await existingUserById.save();
  return res.send({ msg: userMSG.update.password });
};
export default userUpdatePasswordController;
