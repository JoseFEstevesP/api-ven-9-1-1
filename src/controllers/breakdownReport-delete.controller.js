import { breakdownReportMSG } from '#Constants/system.js';
import { BreakdownReport } from '#Schemas/breakdownReport.schema.js';
const breakdownReportDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingReportById = await BreakdownReport.findOne({
    where: { uid, status: '1' },
  });
  if (!existingReportById)
    return res
      .status(401)
      .send({ errors: [{ uid: breakdownReportMSG.noFound }] });
  existingReportById.status = '0';
  await existingReportById.save();
  return res.send({ msg: breakdownReportMSG.delete.msg });
};
export default breakdownReportDeleteController;
