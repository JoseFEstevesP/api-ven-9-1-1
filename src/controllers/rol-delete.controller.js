import { rolMSG } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';
import { User } from '#Schemas/user.schema.js';
import moment from 'moment';
const rolDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingRolById = await Rol.findOne({ where: { uid, status: '1' } });
  if (!existingRolById)
    return res.status(401).send({ errors: [{ uid: rolMSG.noFound }] });
  const userRelation = await User.findOne({
    where: { uidRol: uid, status: '1' },
  });
  if (userRelation)
    return res.status(401).send({ errors: [{ uid: rolMSG.delete.user }] });
  existingRolById.status = '0';
  existingRolById.updateAtDate = moment().format('YYYY-MM-DD');
  existingRolById.updateAtTime = moment().format('hh:mm A');
  await existingRolById.save();
  return res.send({ msg: rolMSG.delete.msg });
};
export default rolDeleteController;
