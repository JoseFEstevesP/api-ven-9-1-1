import ModelOptions from '#Class/ModelOptions.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

const vehicleSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const vehicle = new ModelOptions({ Model: Vehicle });
  const resVehicle = vehicle.getItem({ uid, status: '1' });
  return res.status(200).send(resVehicle);
};

export default vehicleSearchItemController;
