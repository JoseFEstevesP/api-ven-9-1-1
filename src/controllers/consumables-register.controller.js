import { Consumables } from '#Schemas/consumables.schema.js';

const consumablesRegisterController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uid,
    description,
    brand,
    quantity,
    value,
    location,
    dateOfAcquisition,
    remarks,
  } = req.body;
  const existingConsumablesById = await Consumables.findByPk(uid);
  if (existingConsumablesById) {
    if (existingConsumablesById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Este consumible ya esta registrado, pero fue deshabilitado',
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una consumible con ese id registrado' }],
      });
    }
  }
  const consumables = await Consumables.create({
    uid,
    description,
    brand,
    quantity,
    value,
    location,
    dateOfAcquisition,
    remarks,
    uidUser: id,
    uidSite,
  });
  await consumables.save();
  return res.status(201).send({ msg: 'Consumible registrada con éxito' });
};
export default consumablesRegisterController;
