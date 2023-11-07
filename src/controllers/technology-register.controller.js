import { Technology } from '#Schemas/technology.schema.js';

const technologyRegisterController = async (req, res) => {
  const {
    uid,
    description,
    brand,
    model,
    quantity,
    value,
    state,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    code,
    uidUser,
    uidSite,
  } = req.body;
  const existingTechnologyById = await Technology.findByPk(uid);
  if (existingTechnologyById) {
    if (existingTechnologyById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Este tecnologia ya esta registrada, pero fue deshabilitada',
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una Tecnología con ese id registrado' }],
      });
    }
  }
  const existingTechnologyCode = await Technology.findOne({ where: { code } });
  if (existingTechnologyCode) {
    if (existingTechnologyCode.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Ya existe una Tecnología con ese código, pero fue deshabilitado',
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una Tecnología con ese código registrado' }],
      });
  }
  const technology = await Technology.create({
    uid,
    description,
    brand,
    model,
    quantity,
    value,
    state,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    code,
    uidUser,
    uidSite,
  });
  await technology.save();
  return res.status(201).send({ msg: 'Tecnología registrada con éxito' });
};
export default technologyRegisterController;
