import { reportMSG } from '#Constants/system.js';
import { Report } from '#Schemas/report.schema.js';

const reportSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const report = await Report.findOne({ where: { uid, status: '1' } });
  if (!report)
    return res.status(404).send({ errors: [{ uid: reportMSG.noFound }] });
  return res.status(200).send(report);
};

export default reportSearchItemController;
