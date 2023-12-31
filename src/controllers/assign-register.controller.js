import { invent } from '#Constants/assignModel.js';
import { assignMSG } from '#Constants/system.js';
import { Assign } from '#Schemas/assign.schema.js';
import moment from 'moment';
moment.locale('es-VE');
const assignRegisterController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uid,
    inventory,
    article,
    articleUid,
    department,
    quantity,
    description,
    remarks,
  } = req.body;
  const existingAssignById = await Assign.findByPk(uid);
  if (existingAssignById) {
    if (existingAssignById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: assignMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: assignMSG.register.uid.default }],
      });
    }
  }
  if (quantity <= 0)
    return res.status(409).send({
      errors: [
        {
          uid: assignMSG.register.uid.lowerQuantity,
        },
      ],
    });
  const inventoryData = await invent[inventory].findOne({
    where: { uid: articleUid, status: '1' },
  });
  if (!inventoryData)
    return res.status(409).send({
      errors: [
        {
          uid: assignMSG.register.uid.articleNotFound,
        },
      ],
    });
  const fullQuantity = Number(inventoryData.assign) + Number(quantity);
  const resQuantity =
    Number(inventoryData.quantity) - Number(inventoryData.assign);
  if (resQuantity <= 0)
    return res.status(409).send({
      errors: [
        {
          uid: assignMSG.register.uid.article,
        },
      ],
    });
  if (fullQuantity > inventoryData.quantity)
    return res.status(409).send({
      errors: [
        {
          uid: `${assignMSG.register.uid.higherQuantity} quedan ${resQuantity} cantidad de ese articulo`,
        },
      ],
    });
  inventoryData.assign = `${fullQuantity}`;
  inventoryData.updateAtDate = moment().format('YYYY-MM-DD');
  inventoryData.updateAtTime = moment().format('hh:mm A');
  inventoryData.save();
  const serialOrCodeBN = inventoryData.codeBN || inventoryData.serial;
  const assign = await Assign.create({
    uid,
    inventory,
    article,
    articleUid,
    serialOrCodeBN,
    department,
    quantity,
    description,
    remarks,
    assignmentDate: moment().format('DD-MM-YYYY'),
    assignmentTime: moment().format('hh:mm A'),
    uidUser: id,
    uidSite,
    createAtDate: moment().format('YYYY-MM-DD'),
    createAtTime: moment().format('hh:mm A'),
    updateAtDate: moment().format('YYYY-MM-DD'),
    updateAtTime: moment().format('hh:mm A'),
  });
  await assign.save();
  return res.status(201).send({ msg: assignMSG.register.msg });
};
export default assignRegisterController;
