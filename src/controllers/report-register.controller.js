import { reportMSG } from '#Constants/system.js';
import { Report } from '#Schemas/report.schema.js';

const reportRegisterController = async (req, res) => {
  const { id, uidSite } = req;
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
  const existingReportById = await Report.findByPk(uid);
  if (existingReportById) {
    if (existingReportById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: reportMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: reportMSG.register.uid.default }],
      });
    }
  }
  const existingReportByCodeOrSerial = await Report.findOne({
    where: { serialOrCodeBN },
  });
  if (existingReportByCodeOrSerial) {
    if (existingReportByCodeOrSerial.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: reportMSG.register.serialOrCodeBN.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: reportMSG.register.serialOrCodeBN.default }],
      });
  }
  const technology = await Report.create({
    uid,
    goods,
    description,
    proposedSolution,
    condition,
    location,
    dateOfReport,
    timeOfReport,
    serialOrCodeBN,
    uidUser: id,
    uidSite,
  });
  await technology.save();
  return res.status(201).send({ msg: reportMSG.register.msg });
};
export default reportRegisterController;
