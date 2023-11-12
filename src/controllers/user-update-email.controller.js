import { userMSG } from '#Constants/system.js';
import { User } from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
const userUpdateEmailController = async (req, res) => {
  const { id } = req;
  const { email, password } = req.body;
  const existingUserById = await User.findOne({
    where: { uid: id, status: '1' },
  });
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: userMSG.unauthorized }] });
  const checkPassword = await compare(password, existingUserById.password);
  if (!checkPassword)
    return res.status(401).send({ errors: [{ uid: userMSG.login.error }] });
  existingUserById.email = email;
  await existingUserById.save();
  return res.send({ msg: userMSG.update.email });
};
export default userUpdateEmailController;
