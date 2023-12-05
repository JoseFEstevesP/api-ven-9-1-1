import { assignMSG } from '#Constants/system.js';
import { Assign } from '#Schemas/assign.schema.js';

const assignSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const report = await Assign.findOne({ where: { uid, status: '1' } });
  if (!report)
    return res.status(404).send({ errors: [{ uid: assignMSG.noFound }] });
  return res.status(200).send(report);
};

export default assignSearchItemController;
