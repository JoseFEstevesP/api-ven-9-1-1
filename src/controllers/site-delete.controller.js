import { Site } from '#Schemas/site.schema.js';
import { Technology } from '#Schemas/technology.schema.js';
import { User } from '#Schemas/user.schema.js';
const siteDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingSiteById = await Site.findOne({ where: { uid, status: '1' } });
  if (!existingSiteById)
    return res.status(401).send({ errors: [{ uid: 'Sede no encontrado' }] });
  const userRelationUser = await User.findAll({
    where: { uidSite: uid, status: '1' },
  });
  if (userRelationUser.length > 0)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Sede vinculada a un usuario' }] });
  const userRelationTechnology = await Technology.findAll({
    where: { uidSite: uid, status: '1' },
  });
  if (userRelationTechnology.length > 0)
    return res.status(401).send({
      errors: [{ uid: 'Sede vinculada a un registro de Tecnología' }],
    });
  existingSiteById.status = '0';
  await existingSiteById.save();
  return res.send({ msg: 'Sede eliminado' });
};
export default siteDeleteController;
