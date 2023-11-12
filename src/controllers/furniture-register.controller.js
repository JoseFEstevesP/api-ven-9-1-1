import { Furniture } from '#Schemas/furniture.schema.js';

const furnitureRegisterController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uid,
    description,
    serial,
    quantity,
    value,
    state,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
  } = req.body;
  const existingFurnitureById = await Furniture.findByPk(uid);
  if (existingFurnitureById) {
    if (existingFurnitureById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Este mobiliario ya esta registrada, pero fue deshabilitada',
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una mobiliario con ese id registrado' }],
      });
    }
  }
  const existingFurnitureCode = await Furniture.findOne({
    where: { codeBN },
  });
  if (existingFurnitureCode) {
    if (existingFurnitureCode.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Ya existe una mobiliario con ese código, pero fue deshabilitado',
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una mobiliario con ese código registrado' }],
      });
  }
  const existingFurnitureSerial = await Furniture.findOne({
    where: { serial },
  });
  if (existingFurnitureSerial) {
    if (existingFurnitureSerial.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: 'Ya existe una mobiliario con ese serial, pero fue deshabilitado',
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: 'Ya existe una mobiliario con ese serial registrado' }],
      });
  }
  const furniture = await Furniture.create({
    uid,
    description,
    serial,
    quantity,
    value,
    state,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
    uidUser: id,
    uidSite,
  });
  await furniture.save();
  return res.status(201).send({ msg: 'Mobiliario registrada con éxito' });
};
export default furnitureRegisterController;
