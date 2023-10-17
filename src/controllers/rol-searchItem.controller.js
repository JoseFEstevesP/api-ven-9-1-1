import { Rol } from '#Schemas/rol.schema.js';

const rolSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const rol = await Rol.findByPk(uid);
  if (!rol)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún rol' }] });
  return res.status(200).send(rol);
};

export default rolSearchItemController;
