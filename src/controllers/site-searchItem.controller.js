import { siteMSG } from '#Constants/system.js';
import { Site } from '#Schemas/site.schema.js';

const siteSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const site = await Site.findOne({ where: { uid, status: '1' } });
  if (!site)
    return res.status(404).send({ errors: [{ uid: siteMSG.noFound }] });
  return res.status(200).send(site);
};

export default siteSearchItemController;
