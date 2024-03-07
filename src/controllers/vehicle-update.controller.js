import { vehicleMSG } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';
import moment from 'moment';

const vehicleUpdateController = async (req, res) => {
  const {
    uid,
    description,
    brand,
    model,
    place,
    quantity,
    condition,
    dateOfAcquisition,
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
  existingVehicleById.condition = condition;
  existingVehicleById.dateOfAcquisition = dateOfAcquisition;
  existingVehicleById.remarks = remarks;
  existingVehicleById.codeBN = codeBN;
  existingVehicleById.updateAtDate = moment().format('YYYY-MM-DD');
  existingVehicleById.updateAtTime = moment().format('hh:mm A');
  await existingVehicleById.save();
  return res.status(201).send({ msg: vehicleMSG.update.msg });
};
export default vehicleUpdateController;
