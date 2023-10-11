import { User } from '#Schemas/user.schema.js';

const userSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findByPk(uid);
  if (!user)
    return res
      .status(404)
      .send({ errors: ['No se a encontrado ningún usuario'] });
  return res.status(200).send(user);
};

export default userSearchItemController;
