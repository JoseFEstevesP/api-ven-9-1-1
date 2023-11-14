import { vehicleMSG } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

const vehicleUpdateController = async (req, res) => {
  const {
    uid,
    description,
    brand,
    model,
    place,
    quantity,
    value,
    condition,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
  } = req.body;
  const existingVehicleById = await Vehicle.findOne({
    where: { uid, status: '1' },
  });
  if (!existingVehicleById)
    return res.status(404).send({ errors: [{ uid: vehicleMSG.noFound }] });
  existingVehicleById.description = description;
  existingVehicleById.brand = brand;
  existingVehicleById.model = model;
  existingVehicleById.place = place;
  existingVehicleById.quantity = quantity;
  existingVehicleById.value = value;
  existingVehicleById.condition = condition;
  existingVehicleById.location = location;
  existingVehicleById.dateOfAcquisition = dateOfAcquisition;
  existingVehicleById.warranty = warranty;
  existingVehicleById.remarks = remarks;
  existingVehicleById.codeBN = codeBN;
  await existingVehicleById.save();
  return res.status(201).send({ msg: vehicleMSG.update.msg });
};
export default vehicleUpdateController;
