import { consumablesMSG } from '#Constants/system.js';
import { Consumables } from '#Schemas/consumables.schema.js';
const consumablesDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingConsumablesById = await Consumables.findOne({
    where: { uid, status: '1' },
  });
  if (!existingConsumablesById)
    return res.status(401).send({ errors: [{ uid: consumablesMSG.noFound }] });
  existingConsumablesById.status = '0';
  await existingConsumablesById.save();
  return res.send({ msg: consumablesMSG.delete.msg });
};
export default consumablesDeleteController;
