import { Technology } from '#Schemas/technology.schema.js';

const technologySearchItemController = async (req, res) => {
  const { uid } = req.params;
  const technology = await Technology.findOne({ where: { uid, status: '1' } });
  if (!technology)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningúna Tecnología' }] });
  return res.status(200).send(technology);
};

export default technologySearchItemController;
