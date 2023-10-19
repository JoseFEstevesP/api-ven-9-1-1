import { Site } from '#Schemas/site.schema.js';
const siteDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingSiteById = await Site.findByPk(uid);
  if (!existingSiteById)
    return res.status(401).send({ errors: [{ uid: 'Sede no encontrado' }] });
  await existingSiteById.destroy();
  return res.send({ msg: 'Sede eliminado' });
};
export default siteDeleteController;
