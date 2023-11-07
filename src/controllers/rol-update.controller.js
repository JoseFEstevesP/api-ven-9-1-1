import { Rol } from '#Schemas/rol.schema.js';

const rolUpdateController = async (req, res) => {
  const { uid, name, permissions } = req.body;
  const existingRol = await Rol.findOne({ where: { uid, status: '1' } });
  if (!existingRol)
    return res.status(404).send({ errors: [{ uid: 'Rol no encontrado' }] });
  existingRol.name = name;
  existingRol.permissions = permissions;
  await existingRol.save();
  return res.status(201).send({ msg: 'Rol actualizado con éxito' });
};
export default rolUpdateController;
