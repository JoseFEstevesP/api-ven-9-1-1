import { furnitureMSG } from '#Constants/system.js';
import { Furniture } from '#Schemas/furniture.schema.js';
import moment from 'moment';

const furnitureUpdateController = async (req, res) => {
  const {
    uid,
    description,
    serial,
    quantity,
    condition,
    dateOfAcquisition,
    remarks,
    codeBN,
  } = req.body;
  const existingFurnitureById = await Furniture.findOne({
    where: { uid, status: '1' },
  });
  if (!existingFurnitureById)
    return res.status(404).send({ errors: [{ uid: furnitureMSG.noFound }] });
  existingFurnitureById.description = description;
  existingFurnitureById.serial = serial;
  existingFurnitureById.quantity = quantity;
  existingFurnitureById.condition = condition;
  existingFurnitureById.dateOfAcquisition = dateOfAcquisition;
  existingFurnitureById.remarks = remarks;
  existingFurnitureById.codeBN = codeBN;
  existingFurnitureById.updateAtDate = moment().format('YYYY-MM-DD');
  existingFurnitureById.updateAtTime = moment().format('hh:mm A');
  await existingFurnitureById.save();
  return res.status(201).send({ msg: furnitureMSG.update.msg });
};
export default furnitureUpdateController;
