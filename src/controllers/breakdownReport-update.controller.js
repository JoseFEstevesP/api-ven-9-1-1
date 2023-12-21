import { breakdownReportMSG } from '#Constants/system.js';
import { BreakdownReport } from '#Schemas/breakdownReport.schema.js';

const breakdownReportUpdateController = async (req, res) => {
  const {
    uid,
    goods,
    problem,
    symptoms,
    condition,
    breakdownDepartment,
    location,
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
  existingReportById.problem = problem;
  existingReportById.symptoms = symptoms;
  existingReportById.condition = condition;
  existingReportById.breakdownDepartment = breakdownDepartment;
  existingReportById.location = location;
  existingReportById.serialOrCodeBN = serialOrCodeBN;
  await existingReportById.save();
  return res.status(201).send({ msg: breakdownReportMSG.update.msg });
};
export default breakdownReportUpdateController;
