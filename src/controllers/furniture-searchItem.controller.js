import { furnitureMSG } from '#Constants/system.js';
import { Furniture } from '#Schemas/furniture.schema.js';

const furnitureSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const furniture = await Furniture.findOne({ where: { uid, status: '1' } });
  if (!furniture)
    return res.status(404).send({ errors: [{ uid: furnitureMSG.noFound }] });
  return res.status(200).send(furniture);
};

export default furnitureSearchItemController;
