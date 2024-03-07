import ModelOptions from '#Class/ModelOptions.js';
import { purchaseMSG } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';

const purchaseUpdateController = async (req, res) => {
  // Crear instancia de ModelOptions:
  const purchase = new ModelOptions({ Model: Purchase });

  // Verificar la existencia del modelo:
  if (!purchase) {
    // Si la instancia no es válida, enviar error de "no encontrado"
    return res.status(404).send({ errors: [{ uid: purchaseMSG.noFound }] });
  }
  const {
    product,
    serial,
    brand,
    model,
    dateOfPurchase,
    value,
    quantity,
    supplier,
    warranty,
    orderNumber,
    status,
  } = req.body;
  // Actualizar el elemento de compra:
  await purchase.updateItem({
    // Proporcionar los datos para la actualización
    uid: req.body.uid, // ID del elemento a actualizar
    status: req.body.olStatus, // Estado que se actualizará
    data: {
      product,
      serial,
      brand,
      model,
      dateOfPurchase,
      value,
      quantity,
      supplier,
      warranty,
      orderNumber,
      status,
    }, // Datos actualizados para el elemento
  });

  // Enviar respuesta de éxito:
  return res.status(201).send({ msg: purchaseMSG.update.msg }); // Mensaje de éxito
};

export default purchaseUpdateController;
