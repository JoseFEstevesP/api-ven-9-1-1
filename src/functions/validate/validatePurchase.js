import { val } from '#Functions/val.js';

export const validatePurchase = async ({ data, Model, msg }) => {
  const isExistById = await Model.findByPk(data.uid);
  const isExistByOrderNumber = await Model.findOne({
    where: { orderNumber: data.orderNumber },
  });

  const errors = [];

  // Comprobamos si ya existe una compra con el ID proporcionado
  val({ val: isExistById, errors, msg, name: 'uid' });

  // Comprobamos si ya existe una compra con el número de pedido proporcionado
  val({ val: isExistByOrderNumber, errors, msg, name: 'orderNumber' });

  // Devolvemos los errores de validación si hay alguno
  if (errors.length > 0) {
    return { errors };
  }

  // No se han encontrado errores de validación
  return null;
};
