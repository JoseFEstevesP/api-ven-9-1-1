import { reportMSG } from '#Constants/system.js';
import { Report } from '#Schemas/report.schema.js';
const reportDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingReportById = await Report.findOne({
    where: { uid, status: '1' },
  });
  if (!existingReportById)
    return res.status(401).send({ errors: [{ uid: reportMSG.noFound }] });
  existingReportById.status = '0';
  await existingReportById.save();
  return res.send({ msg: reportMSG.delete.msg });
};
export default reportDeleteController;
