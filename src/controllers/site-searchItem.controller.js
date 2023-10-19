import { Site } from '#Schemas/site.schema.js';

const siteSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const site = await Site.findByPk(uid);
  if (!site)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningúna sede' }] });
  return res.status(200).send(site);
};

export default siteSearchItemController;
