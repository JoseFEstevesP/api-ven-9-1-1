import { val } from '#Functions/val.js';

export const validateConsumables = async ({ data, Model, msg }) => {
  const isExistById = await Model.findByPk(data.uid);
  const isExistBySerial = await Model.findOne({
    where: { serial: data.serial },
  });

  const errors = [];

  // Comprobamos si ya existe una tecnologia con el ID proporcionado
  val({ val: isExistById, errors, msg, name: 'uid' });

  // Comprobamos si ya existe una tecnología con ese código de bien nacional
  if (data.codeBN !== 'No asignado') {
    const isExistByCodeBN = await Model.findOne({
      where: { codeBN: data.codeBN },
    });
    val({ val: isExistByCodeBN, errors, msg, name: 'codeBN' });
  }

  // Comprobamos si ya existe una tecnología con ese serial de bien nacional
  val({ val: isExistBySerial, errors, msg, name: 'serial' });

  // Devolvemos los errores de validación si hay alguno
  if (errors.length > 0) {
    return { errors };
  }

  // No se han encontrado errores de validación
  return null;
};
