import { Rol } from '#Schemas/rol.schema.js';

const rolRegisterController = async (req, res) => {
  const { uid, name, permissions } = req.body;
  const existingRolById = await Rol.findByPk(uid);
  const existingRolName = await Rol.findOne({ where: { name } });
  if (existingRolById)
    return res
      .status(409)
      .send({ errors: ['Ya existe un rol con ese id registrado'] });
  if (existingRolName)
    return res
      .status(409)
      .send({ errors: ['Ya existe un rol con ese nombre registrado'] });
  const rol = await Rol.create({
    uid,
    name,
    permissions,
  });
  await rol.save();
  return res.status(201).send({ msg: 'Rol registrado con éxito' });
};
export default rolRegisterController;
