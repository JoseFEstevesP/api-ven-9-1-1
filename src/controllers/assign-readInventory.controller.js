import { invent } from '#Constants/assignModel.js';

const inventoryReadController = async (req, res) => {
  const { inventory } = req.params;
  const { uidSite } = req;
  const dataInventory = await invent[inventory].findAll({
    where: { status: '1', uidSite },
  });
  const rows = dataInventory
    // ?.filter((item) => item.quantity !== item.assign)
    ?.map((item) => ({
      uid: item.uid,
      description: item.description,
      quantityAndAssign: `${item.quantity}/${item.assign}`,
    }));
  return res.status(200).send(rows);
};

export default inventoryReadController;
