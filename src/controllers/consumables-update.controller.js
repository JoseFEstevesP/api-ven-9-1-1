import { consumablesMSG } from '#Constants/system.js';
import { Consumables } from '#Schemas/consumables.schema.js';
import moment from 'moment';

const consumablesUpdateController = async (req, res) => {
  const {
    uid,
    description,
    serial,
    brand,
    quantity,
    dateOfAcquisition,
    remarks,
  } = req.body;
  const existingConsumablesById = await Consumables.findOne({
    where: { uid, status: '1' },
  });
  if (!existingConsumablesById)
    return res.status(404).send({ errors: [{ uid: consumablesMSG.noFound }] });
  existingConsumablesById.update({
    description,
    serial,
    brand,
    quantity,
    dateOfAcquisition,
    remarks,
    updateAtDate: moment().format('YYYY-MM-DD'),
    updateAtTime: moment().format('hh:mm A'),
  });

  return res.status(201).send({ msg: consumablesMSG.update.msg });
};
export default consumablesUpdateController;
