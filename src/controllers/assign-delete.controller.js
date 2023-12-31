import { invent } from '#Constants/assignModel.js';
import { assignMSG } from '#Constants/system.js';
import { Assign } from '#Schemas/assign.schema.js';
import moment from 'moment';
const assignDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingReportById = await Assign.findOne({
    where: { uid, status: '1' },
  });
  if (!existingReportById)
    return res.status(401).send({ errors: [{ uid: assignMSG.noFound }] });
  const inventory = await invent[existingReportById.inventory].findOne({
    where: { uid: existingReportById.articleUid },
  });
  inventory.assign = `${+inventory.assign - +existingReportById.quantity}`;
  await inventory.save();
  existingReportById.status = '0';
  existingReportById.updateAtDate = moment().format('YYYY-MM-DD');
  existingReportById.updateAtTime = moment().format('hh:mm A');
  await existingReportById.save();
  return res.send({ msg: assignMSG.delete.msg });
};
export default assignDeleteController;
