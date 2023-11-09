import { Technology } from '#Schemas/technology.schema.js';

const technologyUpdateController = async (req, res) => {
  const {
    uid,
    description,
    brand,
    model,
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
  const existingTechnologyById = await Technology.findOne({
    where: { uid, status: '1' },
  });
  if (!existingTechnologyById)
    return res
      .status(404)
      .send({ errors: [{ uid: 'Tecnología no encontrada' }] });
  existingTechnologyById.description = description;
  existingTechnologyById.brand = brand;
  existingTechnologyById.model = model;
  existingTechnologyById.serial = serial;
  existingTechnologyById.quantity = quantity;
  existingTechnologyById.value = value;
  existingTechnologyById.state = state;
  existingTechnologyById.location = location;
  existingTechnologyById.dateOfAcquisition = dateOfAcquisition;
  existingTechnologyById.warranty = warranty;
  existingTechnologyById.remarks = remarks;
  existingTechnologyById.codeBN = codeBN;
  await existingTechnologyById.save();
  return res.status(201).send({ msg: 'Tecnología actualizada con éxito' });
};
export default technologyUpdateController;
