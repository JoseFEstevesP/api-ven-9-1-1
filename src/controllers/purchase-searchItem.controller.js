import ModelOptions from '#Class/ModelOptions.js';
import { purchaseMSG } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';

const purchaseSearchItemController = async (req, res) => {
  const purchase = new ModelOptions({ Model: Purchase });
  const resPurchase = await purchase.getItem({
    uid: req.params.uid,
    status: '1',
  });
  if (!purchase)
    return res.status(404).send({ errors: [{ uid: purchaseMSG.noFound }] });
  return res.status(200).send(resPurchase);
};

export default purchaseSearchItemController;
