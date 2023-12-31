import { userMSG } from '#Constants/system.js';
import { Consumables } from '#Schemas/consumables.schema.js';
import { Furniture } from '#Schemas/furniture.schema.js';
import { Technology } from '#Schemas/technology.schema.js';
import { User } from '#Schemas/user.schema.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';
import { compare } from 'bcrypt';
import moment from 'moment';
const userUnregisterController = async (req, res) => {
  const { id } = req;
  const { password } = req.body;
  const existingUserById = await User.findOne({
    where: { uid: id, status: '1' },
  });
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: userMSG.unauthorized }] });
  const userRelationTechnology = await Technology.findAll({
    where: { uidUser: id, status: '1' },
  });
  if (userRelationTechnology.length > 0)
    return res.status(401).send({
      errors: [{ uid: userMSG.delete.technology }],
    });
  const userRelationConsumables = await Consumables.findAll({
    where: { uidUser: id, status: '1' },
  });
  if (userRelationConsumables.length > 0)
    return res.status(401).send({
      errors: [{ uid: userMSG.delete.consumables }],
    });
  const userRelationFurniture = await Furniture.findAll({
    where: { uidUser: id, status: '1' },
  });
  if (userRelationFurniture.length > 0)
    return res.status(401).send({
      errors: [{ uid: userMSG.delete.furniture }],
    });
  const userRelationVehicle = await Vehicle.findAll({
    where: { uidUser: id, status: '1' },
  });
  if (userRelationVehicle.length > 0)
    return res.status(401).send({
      errors: [{ uid: userMSG.delete.vehicle }],
    });
  const checkPassword = await compare(password, existingUserById.password);
  if (!checkPassword)
    return res.status(401).send({ errors: [{ uid: userMSG.login.error }] });
  existingUserById.status = '0';
  existingUserById.updateAtDate = moment().format('YYYY-MM-DD');
  existingUserById.updateAtTime = moment().format('hh:mm A');
  await existingUserById.save();
  return res.send({ msg: userMSG.delete.msg });
};
export default userUnregisterController;
