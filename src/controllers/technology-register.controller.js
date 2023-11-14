import { technologyMSG } from '#Constants/system.js';
import { Technology } from '#Schemas/technology.schema.js';

const technologyRegisterController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uid,
    description,
    brand,
    model,
    serial,
    quantity,
    value,
    condition,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
  } = req.body;
  const existingTechnologyById = await Technology.findByPk(uid);
  if (existingTechnologyById) {
    if (existingTechnologyById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: technologyMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: technologyMSG.register.uid.default }],
      });
    }
  }
  const existingTechnologyCode = await Technology.findOne({
    where: { codeBN },
  });
  if (existingTechnologyCode) {
    if (existingTechnologyCode.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: technologyMSG.register.codeBN.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: technologyMSG.register.codeBN.default }],
      });
  }
  const existingTechnologySerial = await Technology.findOne({
    where: { serial },
  });
  if (existingTechnologySerial) {
    if (existingTechnologySerial.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: technologyMSG.register.serial.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: technologyMSG.register.serial.default }],
      });
  }
  const technology = await Technology.create({
    uid,
    description,
    brand,
    model,
    serial,
    quantity,
    value,
    condition,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
    uidUser: id,
    uidSite,
  });
  await technology.save();
  return res.status(201).send({ msg: technologyMSG.register.msg });
};
export default technologyRegisterController;
