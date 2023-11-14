import { purchaseMSG } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';
const purchaseDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingPurchaseById = await Purchase.findOne({
    where: { uid, status: '1' },
  });
  if (!existingPurchaseById)
    return res.status(401).send({ errors: [{ uid: purchaseMSG.noFound }] });
  existingPurchaseById.status = '0';
  await existingPurchaseById.save();
  return res.send({ msg: purchaseMSG.delete.msg });
};
export default purchaseDeleteController;
