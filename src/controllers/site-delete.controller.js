import { siteMSG } from '#Constants/system.js';
import { Consumables } from '#Schemas/consumables.schema.js';
import { Furniture } from '#Schemas/furniture.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { Technology } from '#Schemas/technology.schema.js';
import { User } from '#Schemas/user.schema.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';
const siteDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingSiteById = await Site.findOne({ where: { uid, status: '1' } });
  if (!existingSiteById)
    return res.status(401).send({ errors: [{ uid: siteMSG.noFound }] });
  const userRelationUser = await User.findAll({
    where: { uidSite: uid, status: '1' },
  });
  if (userRelationUser.length > 0)
    return res.status(401).send({ errors: [{ uid: siteMSG.delete.user }] });
  const userRelationTechnology = await Technology.findAll({
    where: { uidSite: uid, status: '1' },
  });
  if (userRelationTechnology.length > 0)
    return res.status(401).send({
      errors: [{ uid: siteMSG.delete.technology }],
    });
  const userRelationConsumables = await Consumables.findAll({
    where: { uidSite: uid, status: '1' },
  });
  if (userRelationConsumables.length > 0)
    return res.status(401).send({
      errors: [{ uid: siteMSG.delete.consumables }],
    });
  const userRelationFurniture = await Furniture.findAll({
    where: { uidSite: uid, status: '1' },
  });
  if (userRelationFurniture.length > 0)
    return res.status(401).send({
      errors: [{ uid: siteMSG.delete.furniture }],
    });
  const userRelationVehicle = await Vehicle.findAll({
    where: { uidSite: uid, status: '1' },
  });
  if (userRelationVehicle.length > 0)
    return res.status(401).send({
      errors: [{ uid: siteMSG.delete.vehicle }],
    });
  existingSiteById.status = '0';
  await existingSiteById.save();
  return res.send({ msg: siteMSG.delete.msg });
};
export default siteDeleteController;
