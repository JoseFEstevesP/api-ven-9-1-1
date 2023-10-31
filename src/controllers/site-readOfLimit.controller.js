import { Site } from '#Schemas/site.schema.js';

const siteReadOfLimitController = async (req, res) => {
  const site = await Site.findAll();
  const rows = site.map((item) => ({ uid: item.uid, name: item.name }));
  return res.status(200).send(rows);
};

export default siteReadOfLimitController;
