import { rolMSG } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';
import moment from 'moment';

const rolRegisterController = async (req, res) => {
  const { uid, name, permissions } = req.body;
  const existingRolById = await Rol.findByPk(uid);
  const existingRolName = await Rol.findOne({ where: { name } });
  if (existingRolById) {
    if (existingRolById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: rolMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res
        .status(409)
        .send({ errors: [{ uid: rolMSG.register.uid.default }] });
    }
  }
  if (existingRolName) {
    if (existingRolName.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: rolMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: rolMSG.register.uid.default }],
      });
    }
  }
  const rol = await Rol.create({
    uid,
    name,
    permissions,
    createAtDate: moment().format('YYYY-MM-DD'),
    createAtTime: moment().format('hh:mm A'),
    updateAtDate: moment().format('YYYY-MM-DD'),
    updateAtTime: moment().format('hh:mm A'),
  });
  await rol.save();
  return res.status(201).send({ msg: rolMSG.register.msg });
};
export default rolRegisterController;
