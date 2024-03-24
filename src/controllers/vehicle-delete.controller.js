import ModelOptions from '#Class/ModelOptions.js';
import { vehicleMSG } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';
const vehicleDeleteController = async (req, res) => {
  const vehicle = new ModelOptions({ Model: Vehicle });
  if (!vehicle) {
    return res.status(404).send({ errors: [{ uid: vehicleMSG.noFound }] });
  }
  await vehicle.deleteItem({
    uid: req.body.uid,
    status: '1',
  });
  return res.send({ msg: vehicleMSG.delete.msg });
};
export default vehicleDeleteController;
