import { Consumables } from '#Schemas/consumables.schema.js';

const consumablesRegisterController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uid,
    description,
    serial,
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
            uid: 'Ya existe un consumible con ese id, pero fue deshabilitado',
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una consumible con ese id registrado' }],
      });
    }
  }
  const existingConsumablesBySerial = await Consumables.findOne({
    where: { serial },
  });
  if (existingConsumablesBySerial) {
    if (existingConsumablesBySerial.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Ya existe un consumible con ese serial, pero fue deshabilitado',
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: 'Ya existe un consumible con ese serial registrado' }],
      });
    }
  }
  const consumables = await Consumables.create({
    uid,
    description,
    serial,
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
