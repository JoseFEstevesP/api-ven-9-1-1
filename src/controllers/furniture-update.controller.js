import { Furniture } from '#Schemas/furniture.schema.js';

const furnitureUpdateController = async (req, res) => {
  const {
    uid,
    description,
    serial,
    quantity,
    value,
    state,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
  } = req.body;
  const existingFurnitureById = await Furniture.findOne({
    where: { uid, status: '1' },
  });
  if (!existingFurnitureById)
    return res
      .status(404)
      .send({ errors: [{ uid: 'Mobiliario no encontrada' }] });
  existingFurnitureById.description = description;
  existingFurnitureById.serial = serial;
  existingFurnitureById.quantity = quantity;
  existingFurnitureById.value = value;
  existingFurnitureById.state = state;
  existingFurnitureById.location = location;
  existingFurnitureById.dateOfAcquisition = dateOfAcquisition;
  existingFurnitureById.warranty = warranty;
  existingFurnitureById.remarks = remarks;
  existingFurnitureById.codeBN = codeBN;
  await existingFurnitureById.save();
  return res.status(201).send({ msg: 'Mobiliario actualizada con éxito' });
};
export default furnitureUpdateController;
