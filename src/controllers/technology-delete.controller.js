import { Technology } from '#Schemas/technology.schema.js';
const technologyDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingTechnologyById = await Technology.findOne({
    where: { uid, status: '1' },
  });
  if (!existingTechnologyById)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Tecnología no encontrada' }] });
  existingTechnologyById.status = '0';
  await existingTechnologyById.save();
  return res.send({ msg: 'Tecnología eliminada' });
};
export default technologyDeleteController;
