import { furnitureMSG } from '#Constants/system.js';
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
            uid: furnitureMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: furnitureMSG.register.uid.default }],
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
            uid: furnitureMSG.register.codeBN.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: furnitureMSG.register.codeBN.default }],
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
            uid: furnitureMSG.register.serial.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: furnitureMSG.register.serial.default }],
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
  return res.status(201).send({ msg: furnitureMSG.register.msg });
};
export default furnitureRegisterController;
