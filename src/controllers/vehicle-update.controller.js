import ModelOptions from '#Class/ModelOptions.js';
import { vehicleMSG } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

const vehicleUpdateController = async (req, res) => {
  const {
    description,
    brand,
    model,
    place,
    quantity,
    condition,
    dateOfAcquisition,
    remarks,
    codeBN,
    status,
    fuelCapacity,
    currentFuel,
  } = req.body;

  // Crear instancia de ModelOptions:
  const vehicle = new ModelOptions({ Model: Vehicle });

  // Actualizar el elemento de compra:
  await vehicle.updateItem({
    // Proporcionar los datos para la actualización
    uid: req.body.uid, // ID del elemento a actualizar
    status: req.body.olStatus, // Estado que se actualizará
    data: {
      description,
      brand,
      model,
      place,
      quantity,
      condition,
      dateOfAcquisition,
      remarks,
      codeBN,
      status,
      fuelCapacity,
      currentFuel,
    }, // Datos actualizados para el elemento
  });

  return res.status(201).send({ msg: vehicleMSG.update.msg });
};
export default vehicleUpdateController;
