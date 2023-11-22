import { breakdownReportMSG } from '#Constants/system.js';
import { BreakdownReport } from '#Schemas/breakdownReport.schema.js';
import moment from 'moment';
moment.locale('es-VE');
const breakdownReportRegisterController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uid,
    goods,
    problem,
    symptoms,
    proposedSolution,
    condition,
    breakdownDepartment,
    location,
    serialOrCodeBN,
  } = req.body;
  const existingReportById = await BreakdownReport.findByPk(uid);
  if (existingReportById) {
    if (existingReportById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: breakdownReportMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: breakdownReportMSG.register.uid.default }],
      });
    }
  }
  const existingReportByCodeOrSerial = await BreakdownReport.findOne({
    where: { serialOrCodeBN },
  });
  if (existingReportByCodeOrSerial) {
    if (existingReportByCodeOrSerial.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: breakdownReportMSG.register.serialOrCodeBN.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: breakdownReportMSG.register.serialOrCodeBN.default }],
      });
  }
  const technology = await BreakdownReport.create({
    uid,
    goods,
    problem,
    symptoms,
    proposedSolution,
    condition,
    breakdownDepartment,
    location,
    dateOfReport: moment().format('DD-MM-YYYY'),
    timeOfReport: moment().format('hh:mm A'),
    serialOrCodeBN,
    uidUser: id,
    uidSite,
  });
  await technology.save();
  return res.status(201).send({ msg: breakdownReportMSG.register.msg });
};
export default breakdownReportRegisterController;
