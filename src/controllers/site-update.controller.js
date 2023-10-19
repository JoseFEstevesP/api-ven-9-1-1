import { Site } from '#Schemas/site.schema.js';

const siteUpdateController = async (req, res) => {
  const { uid, name, direction } = req.body;
  const existingSiteById = await Site.findByPk(uid);
  if (!existingSiteById)
    return res.status(404).send({ errors: [{ uid: 'Sede no encontrada' }] });
  existingSiteById.name = name;
  existingSiteById.direction = direction;
  await existingSiteById.save();
  return res.status(201).send({ msg: 'Sede actualizada con éxito' });
};
export default siteUpdateController;
