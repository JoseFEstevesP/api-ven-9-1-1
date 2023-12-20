import { accidentReportMSG } from '#Constants/system.js';
import { AccidentReport } from '#Schemas/accidentReport.schema.js';
import { User } from '#Schemas/user.schema.js';
const accidentReportDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingAccidentReportById = await AccidentReport.findOne({
    where: { uid, status: '1' },
  });
  if (!existingAccidentReportById)
    return res
      .status(401)
      .send({ errors: [{ uid: accidentReportMSG.noFound }] });
  const userRelationUser = await User.findAll({
    where: { uidSite: uid, status: '1' },
  });
  if (userRelationUser.length > 0)
    return res
      .status(401)
      .send({ errors: [{ uid: accidentReportMSG.delete.user }] });

  existingAccidentReportById.status = '0';
  await existingAccidentReportById.save();
  return res.send({ msg: accidentReportMSG.delete.msg });
};
export default accidentReportDeleteController;
