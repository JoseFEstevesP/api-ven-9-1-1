import { consumablesMSG } from '#Constants/system.js';
import { Consumables } from '#Schemas/consumables.schema.js';
import moment from 'moment';

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
            uid: consumablesMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: consumablesMSG.register.uid.default }],
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
            uid: consumablesMSG.register.serial.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: consumablesMSG.register.serial.default }],
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
    createAtDate: moment().format('YYYY-MM-DD'),
    createAtTime: moment().format('hh:mm A'),
    updateAtDate: moment().format('YYYY-MM-DD'),
    updateAtTime: moment().format('hh:mm A'),
  });
  await consumables.save();
  return res.status(201).send({ msg: consumablesMSG.register.msg });
};
export default consumablesRegisterController;
