import { userMSG } from '#Constants/system.js';
import { Consumables } from '#Schemas/consumables.schema.js';
import { Furniture } from '#Schemas/furniture.schema.js';
import { Technology } from '#Schemas/technology.schema.js';
import { User } from '#Schemas/user.schema.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';
const userDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingUserById = await User.findOne({ where: { uid, status: '1' } });
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: userMSG.noFound }] });
  const userRelationTechnology = await Technology.findAll({
    where: { uidUser: uid, status: '1' },
  });
  if (userRelationTechnology.length > 0)
    return res.status(401).send({
      errors: [{ uid: userMSG.delete.technology }],
    });
  const userRelationConsumables = await Consumables.findAll({
    where: { uidUser: uid, status: '1' },
  });
  if (userRelationConsumables.length > 0)
    return res.status(401).send({
      errors: [{ uid: userMSG.delete.consumables }],
    });
  const userRelationFurniture = await Furniture.findAll({
    where: { uidUser: uid, status: '1' },
  });
  if (userRelationFurniture.length > 0)
    return res.status(401).send({
      errors: [{ uid: userMSG.delete.furniture }],
    });
  const userRelationVehicle = await Vehicle.findAll({
    where: { uidUser: uid, status: '1' },
  });
  if (userRelationVehicle.length > 0)
    return res.status(401).send({
      errors: [{ uid: userMSG.delete.vehicle }],
    });
  existingUserById.status = '0';
  await existingUserById.save();
  return res.send({ msg: userMSG.delete.msg });
};
export default userDeleteController;
