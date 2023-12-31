import { technologyMSG } from '#Constants/system.js';
import { Technology } from '#Schemas/technology.schema.js';
import moment from 'moment';

const technologyUpdateController = async (req, res) => {
  const {
    uid,
    description,
    brand,
    model,
    serial,
    quantity,
    value,
    condition,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
  } = req.body;
  const existingTechnologyById = await Technology.findOne({
    where: { uid, status: '1' },
  });
  if (!existingTechnologyById)
    return res.status(404).send({ errors: [{ uid: technologyMSG.noFound }] });
  existingTechnologyById.description = description;
  existingTechnologyById.brand = brand;
  existingTechnologyById.model = model;
  existingTechnologyById.serial = serial;
  existingTechnologyById.quantity = quantity;
  existingTechnologyById.value = value;
  existingTechnologyById.condition = condition;
  existingTechnologyById.location = location;
  existingTechnologyById.dateOfAcquisition = dateOfAcquisition;
  existingTechnologyById.warranty = warranty;
  existingTechnologyById.remarks = remarks;
  existingTechnologyById.codeBN = codeBN;
  existingTechnologyById.updateAtDate = moment().format('YYYY-MM-DD');
  existingTechnologyById.updateAtTime = moment().format('hh:mm A');
  await existingTechnologyById.save();
  return res.status(201).send({ msg: technologyMSG.update.msg });
};
export default technologyUpdateController;
