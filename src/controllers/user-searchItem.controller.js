import { User } from '#Schemas/user.schema.js';

const userSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ where: { uid, status: '1' } });
  if (!user)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún usuario' }] });

  return res.status(200).send(user);
};

export default userSearchItemController;
