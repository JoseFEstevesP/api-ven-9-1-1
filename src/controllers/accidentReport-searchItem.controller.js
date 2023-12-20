import { accidentReportMSG } from '#Constants/system.js';
import { AccidentReport } from '#Schemas/accidentReport.schema.js';

const accidentReportSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const accidentReport = await AccidentReport.findOne({
    where: { uid, status: '1' },
  });
  if (!accidentReport)
    return res
      .status(404)
      .send({ errors: [{ uid: accidentReportMSG.noFound }] });
  return res.status(200).send(accidentReport);
};

export default accidentReportSearchItemController;
