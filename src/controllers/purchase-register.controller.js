import { purchaseMSG } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';
import moment from 'moment';

const purchaseRegisterController = async (req, res) => {
  const { id, uidSite } = req;
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
  const existingPurchaseById = await Purchase.findByPk(uid);
  if (existingPurchaseById) {
    if (existingPurchaseById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: purchaseMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: purchaseMSG.register.uid.default }],
      });
    }
  }
  const existingPurchaseOrderNumber = await Purchase.findOne({
    where: { orderNumber },
  });
  if (existingPurchaseOrderNumber) {
    if (existingPurchaseOrderNumber.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: purchaseMSG.register.orderNumber.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: purchaseMSG.register.orderNumber.default }],
      });
  }
  const purchase = await Purchase.create({
    uid,
    brand,
    model,
    serial,
    quantity,
    value,
    location,
    warranty,
    product,
    dateOfPurchase,
    supplier,
    orderNumber,
    uidUser: id,
    uidSite,
    createAtDate: moment().format('YYYY-MM-DD'),
    createAtTime: moment().format('hh:mm A'),
    updateAtDate: moment().format('YYYY-MM-DD'),
    updateAtTime: moment().format('hh:mm A'),
  });
  await purchase.save();
  return res.status(201).send({ msg: purchaseMSG.register.msg });
};
export default purchaseRegisterController;
