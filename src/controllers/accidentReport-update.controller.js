import { accidentReportMSG } from '#Constants/system.js';
import { AccidentReport } from '#Schemas/accidentReport.schema.js';

const accidentReportUpdateController = async (req, res) => {
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
  const existingAccidentReportById = await AccidentReport.findOne({
    where: { uid, status: '1' },
  });
  if (!existingAccidentReportById)
    return res
      .status(404)
      .send({ errors: [{ uid: accidentReportMSG.noFound }] });
  existingAccidentReportById.addressState = addressState;
  existingAccidentReportById.addressParish = addressParish;
  existingAccidentReportById.addressMunicipality = addressMunicipality;
  existingAccidentReportById.incidentType = incidentType;
  existingAccidentReportById.descriptionIncident = descriptionIncident;
  existingAccidentReportById.patientData = patientData;
  existingAccidentReportById.phone = phone;
  existingAccidentReportById.time = time;
  existingAccidentReportById.responseTeam = responseTeam;
  await existingAccidentReportById.save();
  return res.status(201).send({ msg: accidentReportMSG.update.msg });
};
export default accidentReportUpdateController;
