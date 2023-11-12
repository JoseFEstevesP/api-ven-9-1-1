import { userMSG } from '#Constants/system.js';
import { User } from '#Schemas/user.schema.js';

const userSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ where: { uid, status: '1' } });
  if (!user)
    return res.status(404).send({ errors: [{ uid: userMSG.noFound }] });

  return res.status(200).send(user);
};

export default userSearchItemController;
