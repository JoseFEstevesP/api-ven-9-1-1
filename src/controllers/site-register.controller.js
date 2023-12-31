import { siteMSG } from '#Constants/system.js';
import { Site } from '#Schemas/site.schema.js';
import moment from 'moment';

const siteRegisterController = async (req, res) => {
  const { uid, name, direction } = req.body;
  const existingSiteById = await Site.findByPk(uid);
  if (existingSiteById) {
    if (existingSiteById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: siteMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: siteMSG.register.uid.default }],
      });
    }
  }
  const existingSiteName = await Site.findOne({ where: { name } });
  if (existingSiteName) {
    if (existingSiteName.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: siteMSG.register.name.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: siteMSG.register.name.default }],
      });
    }
  }
  const site = await Site.create({
    uid,
    name,
    direction,
    createAtDate: moment().format('YYYY-MM-DD'),
    createAtTime: moment().format('hh:mm A'),
    updateAtDate: moment().format('YYYY-MM-DD'),
    updateAtTime: moment().format('hh:mm A'),
  });
  await site.save();
  return res.status(201).send({ msg: siteMSG.register.msg });
};
export default siteRegisterController;
