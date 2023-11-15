import { breakdownReportMSG } from '#Constants/system.js';
import { BreakdownReport } from '#Schemas/breakdownReport.schema.js';

const breakdownReportUpdateController = async (req, res) => {
  const {
    uid,
    goods,
    description,
    proposedSolution,
    condition,
    location,
    dateOfReport,
    timeOfReport,
    serialOrCodeBN,
  } = req.body;
  const existingReportById = await BreakdownReport.findOne({
    where: { uid, status: '1' },
  });
  if (!existingReportById)
    return res
      .status(404)
      .send({ errors: [{ uid: breakdownReportMSG.noFound }] });
  existingReportById.goods = goods;
  existingReportById.description = description;
  existingReportById.proposedSolution = proposedSolution;
  existingReportById.condition = condition;
  existingReportById.location = location;
  existingReportById.dateOfReport = dateOfReport;
  existingReportById.timeOfReport = timeOfReport;
  existingReportById.serialOrCodeBN = serialOrCodeBN;
  await existingReportById.save();
  return res.status(201).send({ msg: breakdownReportMSG.update.msg });
};
export default breakdownReportUpdateController;
