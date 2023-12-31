import { vehicleMSG } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';
import moment from 'moment';
const vehicleDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingVehicleById = await Vehicle.findOne({
    where: { uid, status: '1' },
  });
  if (!existingVehicleById)
    return res.status(401).send({ errors: [{ uid: vehicleMSG.noFound }] });
  existingVehicleById.status = '0';
  existingVehicleById.updateAtDate = moment().format('YYYY-MM-DD');
  existingVehicleById.updateAtTime = moment().format('hh:mm A');
  await existingVehicleById.save();
  return res.send({ msg: vehicleMSG.delete.msg });
};
export default vehicleDeleteController;
