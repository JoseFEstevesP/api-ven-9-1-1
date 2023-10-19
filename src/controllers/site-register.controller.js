import { Site } from '#Schemas/site.schema.js';

const siteRegisterController = async (req, res) => {
  const { uid, name, direction } = req.body;
  const existingSiteById = await Site.findByPk(uid);
  const existingSiteName = await Site.findOne({ where: { name } });
  if (existingSiteById)
    return res
      .status(409)
      .send({ errors: [{ uid: 'Ya existe una sede con ese id registrado' }] });
  if (existingSiteName)
    return res.status(409).send({
      errors: [{ uid: 'Ya existe un sede con ese nombre registrado' }],
    });
  const site = await Site.create({
    uid,
    name,
    direction,
  });
  await site.save();
  return res.status(201).send({ msg: 'Sede registrado con éxito' });
};
export default siteRegisterController;
