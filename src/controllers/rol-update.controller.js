import { rolMSG } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';
import moment from 'moment';

const rolUpdateController = async (req, res) => {
  const { uid, name, permissions } = req.body;
  const existingRol = await Rol.findOne({ where: { uid, status: '1' } });
  if (!existingRol)
    return res.status(404).send({ errors: [{ uid: rolMSG.noFound }] });
  existingRol.name = name;
  existingRol.permissions = permissions;
  existingRol.updateAtDate = moment().format('YYYY-MM-DD');
  existingRol.updateAtTime = moment().format('hh:mm A');
  await existingRol.save();
  return res.status(201).send({ msg: rolMSG.update.msg });
};
export default rolUpdateController;
