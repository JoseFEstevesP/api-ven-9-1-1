import { Furniture } from '#Schemas/furniture.schema.js';
const furnitureDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingFurnitureById = await Furniture.findOne({
    where: { uid, status: '1' },
  });
  if (!existingFurnitureById)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Mobiliario no encontrado' }] });
  existingFurnitureById.status = '0';
  await existingFurnitureById.save();
  return res.send({ msg: 'Mobiliario eliminado' });
};
export default furnitureDeleteController;