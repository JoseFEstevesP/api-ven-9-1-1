import { accidentReportMSG } from '#Constants/system.js';
import { AccidentReport } from '#Schemas/accidentReport.schema.js';

const accidentReportRegisterController = async (req, res) => {
  const {
    uid,
    addressState,
    addressParish,
    addressMunicipality,
    incidentType,
    descriptionIncident,
    patientData,
    phone,
    time,
    responseTeam,
  } = req.body;
  const existingSiteById = await AccidentReport.findByPk(uid);
  if (existingSiteById) {
    if (existingSiteById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: accidentReportMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: accidentReportMSG.register.uid.default }],
      });
    }
  }
  const accidentReport = await AccidentReport.create({
    uid,
    addressState,
    addressParish,
    addressMunicipality,
    incidentType,
    descriptionIncident,
    patientData,
    phone,
    time,
    responseTeam,
  });
  await accidentReport.save();
  return res.status(201).send({ msg: accidentReportMSG.register.msg });
};
export default accidentReportRegisterController;
