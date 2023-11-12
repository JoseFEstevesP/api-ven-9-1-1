import { vehicleMSG } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

const vehicleSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const vehicle = await Vehicle.findOne({ where: { uid, status: '1' } });
  if (!vehicle)
    return res.status(404).send({ errors: [{ uid: vehicleMSG.noFound }] });
  return res.status(200).send(vehicle);
};

export default vehicleSearchItemController;
