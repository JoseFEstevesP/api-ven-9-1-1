import { siteMSG } from '#Constants/system.js';
import { Site } from '#Schemas/site.schema.js';
import moment from 'moment';

const siteUpdateController = async (req, res) => {
  const { uid, name, direction } = req.body;
  const existingSiteById = await Site.findOne({ where: { uid, status: '1' } });
  if (!existingSiteById)
    return res.status(404).send({ errors: [{ uid: siteMSG.noFound }] });
  existingSiteById.name = name;
  existingSiteById.direction = direction;
  existingSiteById.updateAtDate = moment().format('YYYY-MM-DD');
  existingSiteById.updateAtTime = moment().format('hh:mm A');
  await existingSiteById.save();
  return res.status(201).send({ msg: siteMSG.update.msg });
};
export default siteUpdateController;
