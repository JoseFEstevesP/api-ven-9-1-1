import ModelOptions from '#Class/ModelOptions.js';
import {
  inventoryData,
  inventoryMSG,
  inventoryModel,
  inventoryValidate,
} from '#Constants/purchaseInventory.js';
import { purchaseMSG } from '#Constants/system.js';
import { extraData } from '#Functions/dataEx.js';
import { validatePurchase } from '#Functions/validate/validatePurchase.js';
import { Purchase } from '#Schemas/purchase.schema.js';

async function purchaseRegisterController(req, res) {
  // Desestructurar ID de usuario e ID del sitio de la solicitud
  const { id, uidSite } = req;
  const { uidSite: uidSiteQuery } = req.body;
  const site = uidSiteQuery || uidSite;

  // Crear una nueva instancia de la clase ModelOptions con el esquema Purchase
  const purchase = new ModelOptions({ Model: Purchase });

  // Registrar los datos de compra con validación y manejo de errores
  const exData = extraData({ id, uidSite: site });

  try {
    // Registrar los datos del compras utilizando el método postRegister del modelo
    const resPurchase = await purchase.postRegister({
      data: { ...req.body, ...exData }, // Combinar datos del cuerpo de la solicitud con datos adicionales
      msg: purchaseMSG, // Usar mensajes de error del sistema
      validateFunctions: validatePurchase, // Aplicar la validación de datos de compra
    });

    // Comprobar si hay errores en la respuesta de registro de compra
    if (resPurchase.errors) {
      return res.status(400).send(resPurchase.errors);
    }

    // Obtener el modelo de inventario adecuado según el tipo de inventario en la solicitud
    const inventory = inventoryModel[req.body.inventory];

    // Si no se encuentra un modelo de inventario válido, devolver un error
    if (!inventory) {
      return res.status(400).send({ msg: 'Tipo de inventario no válido' });
    }

    // Preparar datos de inventario según el tipo de inventario elegido
    const inventoryDataParams = { data: req.body, extraData: exData };
    const inventoryDataFunction =
      inventoryData[req.body.inventory](inventoryDataParams);

    // Si no se encuentra una función de datos de inventario válida, devolver un error
    if (!inventoryDataFunction) {
      return res.status(400).send({
        msg: 'Función de datos de inventario no encontrada para este tipo',
      });
    }

    // Registrar los datos de inventario con validación y manejo de errores
    const resInventory = await inventory.postRegister({
      data: inventoryDataFunction, // Usar la función de datos de inventario
      msg: inventoryMSG[req.body.inventory], // Usar mensajes de error específicos del inventario
      validateFunctions: inventoryValidate[req.body.inventory], // Aplicar la validación de datos de inventario
    });

    // Si hay errores en la respuesta de registro de inventario, devolver un error
    if (resInventory.errors) {
      return res.status(400).send(resInventory.errors);
    }

    // Devolver una respuesta exitosa (201) con un mensaje de éxito
    return res.status(201).send({ msg: purchaseMSG.register.msg });
  } catch (error) {
    // Registrar el error y devolver una respuesta de error genérica
    console.error('Error al registrar la compra:', error);
    return res
      .status(500)
      .send({ msg: 'Se produjo un error durante el registro.' });
  }
}

export default purchaseRegisterController;
