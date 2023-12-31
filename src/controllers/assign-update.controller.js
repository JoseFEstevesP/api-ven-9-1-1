import { invent } from '#Constants/assignModel.js';
import { assignMSG } from '#Constants/system.js';
import { Assign } from '#Schemas/assign.schema.js';
import moment from 'moment';

const assignUpdateController = async (req, res) => {
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
  const existingAssignById = await Assign.findOne({
    where: { uid, status: '1' },
  });
  if (!existingAssignById)
    return res.status(404).send({ errors: [{ uid: assignMSG.noFound }] });
  if (existingAssignById.quantity !== quantity) {
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
    const fullQuantity =
      +inventoryData.assign - existingAssignById.quantity + +quantity;
    const resQuantity =
      +inventoryData.quantity -
      (+inventoryData.assign - +existingAssignById.quantity);
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
  }
  if (existingAssignById.articleUid !== articleUid) {
    const oldInventoryData = await invent[existingAssignById.inventory].findOne(
      {
        where: { uid: existingAssignById.articleUid, status: '1' },
      }
    );
    if (!oldInventoryData)
      return res.status(409).send({
        errors: [
          {
            uid: assignMSG.register.uid.articleNotFound,
          },
        ],
      });
    oldInventoryData.assign = `${
      +existingAssignById.quantity - +oldInventoryData.assign
    }`;
    oldInventoryData.save();
    const newInventoryData = await invent[inventory].findOne({
      where: { uid: articleUid, status: '1' },
    });
    if (!newInventoryData)
      return res.status(409).send({
        errors: [
          {
            uid: assignMSG.register.uid.articleNotFound,
          },
        ],
      });
    newInventoryData.assign = quantity;
    newInventoryData.save();
  }
  const inventoryDataFull = await invent[inventory].findOne({
    where: { uid: articleUid, status: '1' },
  });
  const serialOrCodeBN = inventoryDataFull.codeBN || inventoryDataFull.serial;
  existingAssignById.inventory = inventory;
  existingAssignById.article = article;
  existingAssignById.articleUid = articleUid;
  existingAssignById.serialOrCodeBN = serialOrCodeBN;
  existingAssignById.department = department;
  existingAssignById.quantity = quantity;
  existingAssignById.description = description;
  existingAssignById.remarks = remarks;
  existingAssignById.updateAtDate = moment().format('YYYY-MM-DD');
  existingAssignById.updateAtTime = moment().format('hh:mm A');
  await existingAssignById.save();
  return res.status(201).send({ msg: assignMSG.update.msg });
};
export default assignUpdateController;
