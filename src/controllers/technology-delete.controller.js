import { technologyMSG } from '#Constants/system.js';
import { Technology } from '#Schemas/technology.schema.js';
const technologyDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingTechnologyById = await Technology.findOne({
    where: { uid, status: '1' },
  });
  if (!existingTechnologyById)
    return res.status(401).send({ errors: [{ uid: technologyMSG.noFound }] });
  existingTechnologyById.status = '0';
  await existingTechnologyById.save();
  return res.send({ msg: technologyMSG.delete.msg });
};
export default technologyDeleteController;
