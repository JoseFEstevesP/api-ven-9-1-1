import { Consumables } from '#Schemas/consumables.schema.js';
const consumablesDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingConsumablesById = await Consumables.findOne({
    where: { uid, status: '1' },
  });
  if (!existingConsumablesById)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Consumible no encontrado' }] });
  existingConsumablesById.status = '0';
  await existingConsumablesById.save();
  return res.send({ msg: 'Consumible eliminado' });
};
export default consumablesDeleteController;
