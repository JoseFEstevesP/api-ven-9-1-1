import { Rol } from '#Schemas/rol.schema.js';

const rolUpdateController = async (req, res) => {
  const { uid, name, permissions } = req.body;
  const existingRolById = await Rol.findByPk(uid);
  if (!existingRolById)
    return res.status(404).send({ errors: [{ uid: 'Rol no encontrado' }] });
  existingRolById.name = name;
  existingRolById.permissions = permissions;
  await existingRolById.save();
  return res.status(201).send({ msg: 'Rol actualizado con éxito' });
};
export default rolUpdateController;
