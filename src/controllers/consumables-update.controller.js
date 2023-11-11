import { Consumables } from '#Schemas/consumables.schema.js';

const consumablesUpdateController = async (req, res) => {
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
  const existingConsumablesById = await Consumables.findOne({
    where: { uid, status: '1' },
  });
  if (!existingConsumablesById)
    return res
      .status(404)
      .send({ errors: [{ uid: 'Consumible no encontrado' }] });
  existingConsumablesById.description = description;
  existingConsumablesById.serial = serial;
  existingConsumablesById.brand = brand;
  existingConsumablesById.quantity = quantity;
  existingConsumablesById.value = value;
  existingConsumablesById.location = location;
  existingConsumablesById.dateOfAcquisition = dateOfAcquisition;
  existingConsumablesById.remarks = remarks;
  await existingConsumablesById.save();
  return res.status(201).send({ msg: 'Consumible actualizado con éxito' });
};
export default consumablesUpdateController;
