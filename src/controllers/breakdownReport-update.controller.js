import { breakdownReportMSG } from '#Constants/system.js';
import { BreakdownReport } from '#Schemas/breakdownReport.schema.js';
import moment from 'moment';

const breakdownReportUpdateController = async (req, res) => {
  const {
    uid,
    goods,
    problem,
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
  existingReportById.condition = condition;
  existingReportById.breakdownDepartment = breakdownDepartment;
  existingReportById.location = location;
  existingReportById.serialOrCodeBN = serialOrCodeBN;
  existingReportById.updateAtDate = moment().format('YYYY-MM-DD');
  existingReportById.updateAtTime = moment().format('hh:mm A');
  await existingReportById.save();
  return res.status(201).send({ msg: breakdownReportMSG.update.msg });
};
export default breakdownReportUpdateController;
