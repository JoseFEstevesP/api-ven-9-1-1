import { Consumables } from '#Schemas/consumables.schema.js';

const consumablesSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const consumables = await Consumables.findOne({
    where: { uid, status: '1' },
  });
  if (!consumables)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún consumible' }] });
  return res.status(200).send(consumables);
};
export default consumablesSearchItemController;
