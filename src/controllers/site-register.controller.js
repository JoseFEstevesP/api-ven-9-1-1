import { Site } from '#Schemas/site.schema.js';

const siteRegisterController = async (req, res) => {
  const { uid, name, direction } = req.body;
  const existingSiteById = await Site.findByPk(uid);
  const existingSiteName = await Site.findOne({ where: { name } });
  if (existingSiteById) {
    if (existingSiteById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Este sede ya está registrada, pero fue deshabilitada',
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una sede con ese id registrado' }],
      });
    }
  }
  if (existingSiteName) {
    if (existingSiteName.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Este nombre de sede ya está registrado, pero fue deshabilitada',
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una sede con ese nombre registrada' }],
      });
    }
  }
  const site = await Site.create({
    uid,
    name,
    direction,
  });
  await site.save();
  return res.status(201).send({ msg: 'Sede registrado con éxito' });
};
export default siteRegisterController;
