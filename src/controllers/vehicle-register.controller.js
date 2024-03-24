import ModelOptions from '#Class/ModelOptions.js';
import { vehicleMSG } from '#Constants/system.js';
import { extraData } from '#Functions/dataEx.js';
import { validateVehicle } from '#Functions/validate/validateVehicle.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

const vehicleRegisterController = async (req, res) => {
  // Desestructurar ID de usuario e ID del sitio de la solicitud
  const { id, uidSite } = req;
  const { uidSite: uidSiteQuery } = req.body;
  const site = uidSiteQuery || uidSite;

  // Crear una nueva instancia de la clase ModelOptions con el esquema Vehicle
  const vehicle = new ModelOptions({ Model: Vehicle });

  // Registrar de los datos extras para la tabla
  const exData = extraData({ id, uidSite: site });

  try {
    // Registrar los datos del vehículos utilizando el método postRegister del modelo
    const resVehicle = await vehicle.postRegister({
      data: { ...req.body, ...exData }, // Combinar datos del cuerpo de la solicitud con datos adicionales
      msg: vehicleMSG, // Usar mensajes de error del sistema
      validateFunctions: validateVehicle, // Aplicar la validación de datos de compra
    });

    // Comprobar si hay errores en la respuesta de registro de vehículos
    if (resVehicle.errors) {
      return res.status(400).send(resVehicle.errors);
    }

    // Devolver una respuesta exitosa (201) con un mensaje de éxito
    return res.status(201).send({ msg: vehicleMSG.register.msg });
  } catch (error) {
    // Registrar el error y devolver una respuesta de error genérica
    console.error('Error al registrar la compra:', error);
    return res
      .status(500)
      .send({ msg: 'Se produjo un error durante el registro.' });
  }
};
export default vehicleRegisterController;
