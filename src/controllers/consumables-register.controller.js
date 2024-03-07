import ModelOptions from '#Class/ModelOptions.js';
import { consumablesMSG } from '#Constants/system.js';
import { extraData } from '#Functions/dataEx.js';
import { validateConsumables } from '#Functions/validate/validateConsumables.js';
import { Consumables } from '#Schemas/consumables.schema.js';

const consumablesRegisterController = async (req, res) => {
  // Extraer ID de usuario e ID del sitio de la solicitud
  const { id, uidSite } = req;
  const { uidSite: uidSiteQuery } = req.body;
  const site = uidSiteQuery || uidSite;

  // Crear una nueva instancia de ModelOptions para el modelo Consumables
  const consumable = new ModelOptions({ Model: Consumables });

  // Extraer datos adicionales específicos del usuario y el sitio
  const exData = extraData({ id, uidSite: site });

  // Combinar datos del cuerpo de la solicitud con datos extraídos y el objeto de mensaje
  const data = { ...req.body, ...exData, msg: consumablesMSG };

  try {
    // Registrar los datos del consumible utilizando el método postRegister del modelo
    const resConsumable = await consumable.postRegister({
      data,
      validateFunctions: validateConsumables, // Pasar la función de validación
    });

    // Comprobar si hay errores en la respuesta
    if (resConsumable.errors) {
      // Manejar errores de validación
      return res.status(400).send(resConsumable.errors); // Enviar mensajes de error específicos
    }

    // Devolver una respuesta exitosa con un mensaje
    return res.status(201).send({ msg: consumablesMSG.register.msg });
  } catch (error) {
    // Manejar errores inesperados
    console.error('Error al registrar el consumible:', error);
    return res
      .status(500)
      .send({ msg: 'Se produjo un error durante el registro.' });
  }
};

export default consumablesRegisterController;
