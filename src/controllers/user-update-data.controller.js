import { userMSG } from '#Constants/system.js';
import { User } from '#Schemas/user.schema.js';

const userUpdateDataController = async (req, res) => {
  const { id } = req;
  const { ci, name, surname } = req.body;
  const existingUserById = await User.findOne({
    where: { uid: id, status: '1' },
  });
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: userMSG.unauthorized }] });
  existingUserById.ci = ci;
  existingUserById.name = name;
  existingUserById.surname = surname;
  await existingUserById.save();
  return res.send({ msg: userMSG.update.msg });
};
export default userUpdateDataController;
