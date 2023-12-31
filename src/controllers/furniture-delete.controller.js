import { furnitureMSG } from '#Constants/system.js';
import { Furniture } from '#Schemas/furniture.schema.js';
import moment from 'moment';
const furnitureDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingFurnitureById = await Furniture.findOne({
    where: { uid, status: '1' },
  });
  if (!existingFurnitureById)
    return res.status(401).send({ errors: [{ uid: furnitureMSG.noFound }] });
  existingFurnitureById.status = '0';
  existingFurnitureById.updateAtDate = moment().format('YYYY-MM-DD');
  existingFurnitureById.updateAtTime = moment().format('hh:mm A');
  await existingFurnitureById.save();
  return res.send({ msg: furnitureMSG.delete.msg });
};
export default furnitureDeleteController;
