import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
const siteDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingSiteById = await Site.findByPk(uid);
  if (!existingSiteById)
    return res.status(401).send({ errors: [{ uid: 'Sede no encontrado' }] });
  const userRelation = await User.findAll({ where: { uidSite: uid } });
  if (userRelation.length > 0)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Sede vinculada a un usuario' }] });
  await existingSiteById.destroy();
  return res.send({ msg: 'Sede eliminado' });
};
export default siteDeleteController;
