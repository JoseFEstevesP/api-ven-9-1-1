import ModelOptions from '#Class/ModelOptions.js';
import { purchaseMSG } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';
const purchaseDeleteController = async (req, res) => {
  // Crear instancia de ModelOptions:
  const purchase = new ModelOptions({ Model: Purchase });

  // Verificar la existencia del modelo:
  if (!purchase) {
    // Si la instancia no es válida, enviar error de "no encontrado"
    return res.status(404).send({ errors: [{ uid: purchaseMSG.noFound }] });
  }

  // Eliminar el elemento de compra:
  await purchase.deleteItem({
    // Proporcionar datos para la eliminación
    uid: req.body.uid, // ID del elemento a eliminar
    status: '1', // Estado del elemento que se desea eliminar
  });

  // Enviar respuesta de éxito:
  return res.send({ msg: purchaseMSG.delete.msg }); // Mensaje de éxito
};

export default purchaseDeleteController;
