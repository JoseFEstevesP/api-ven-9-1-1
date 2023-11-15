import { breakdownReportMSG } from '#Constants/system.js';
import { BreakdownReport } from '#Schemas/breakdownReport.schema.js';

const breakdownReportSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const report = await BreakdownReport.findOne({ where: { uid, status: '1' } });
  if (!report)
    return res
      .status(404)
      .send({ errors: [{ uid: breakdownReportMSG.noFound }] });
  return res.status(200).send(report);
};

export default breakdownReportSearchItemController;
