import { purchaseMSG } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';

const purchaseSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const purchase = await Purchase.findOne({ where: { uid, status: '1' } });
  if (!purchase)
    return res.status(404).send({ errors: [{ uid: purchaseMSG.noFound }] });
  return res.status(200).send(purchase);
};

export default purchaseSearchItemController;
