import { purchaseMSG } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';
import moment from 'moment';

const purchaseUpdateController = async (req, res) => {
  const {
    uid,
    product,
    serial,
    brand,
    model,
    dateOfPurchase,
    value,
    quantity,
    supplier,
    warranty,
    orderNumber,
    location,
  } = req.body;
  const existingPurchaseById = await Purchase.findOne({
    where: { uid, status: '1' },
  });
  if (!existingPurchaseById)
    return res.status(404).send({ errors: [{ uid: purchaseMSG.noFound }] });
  existingPurchaseById.product = product;
  existingPurchaseById.serial = serial;
  existingPurchaseById.brand = brand;
  existingPurchaseById.model = model;
  existingPurchaseById.dateOfPurchase = dateOfPurchase;
  existingPurchaseById.value = value;
  existingPurchaseById.quantity = quantity;
  existingPurchaseById.supplier = supplier;
  existingPurchaseById.warranty = warranty;
  existingPurchaseById.orderNumber = orderNumber;
  existingPurchaseById.location = location;
  existingPurchaseById.updateAtDate = moment().format('YYYY-MM-DD');
  existingPurchaseById.updateAtTime = moment().format('hh:mm A');
  await existingPurchaseById.save();
  return res.status(201).send({ msg: purchaseMSG.update.msg });
};
export default purchaseUpdateController;
