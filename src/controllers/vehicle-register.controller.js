import { vehicleMSG } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

const vehicleRegisterController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uid,
    description,
    brand,
    model,
    place,
    quantity,
    value,
    state,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
  } = req.body;
  const existingVehicleById = await Vehicle.findByPk(uid);
  if (existingVehicleById) {
    if (existingVehicleById.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: vehicleMSG.register.uid.status,
          },
        ],
      });
    } else {
      return res.status(409).send({
        errors: [{ uid: vehicleMSG.register.uid.default }],
      });
    }
  }
  const existingVehicleCode = await Vehicle.findOne({
    where: { codeBN },
  });
  if (existingVehicleCode) {
    if (existingVehicleCode.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: vehicleMSG.register.codeBN.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: vehicleMSG.register.codeBN.default }],
      });
  }
  const existingVehiclePlace = await Vehicle.findOne({
    where: { place },
  });
  if (existingVehiclePlace) {
    if (existingVehiclePlace.status !== '1') {
      return res.status(409).send({
        errors: [
          {
            uid: vehicleMSG.register.place.status,
          },
        ],
      });
    } else
      return res.status(409).send({
        errors: [{ uid: vehicleMSG.register.place.default }],
      });
  }
  const vehicle = await Vehicle.create({
    uid,
    description,
    brand,
    model,
    place,
    quantity,
    value,
    state,
    location,
    dateOfAcquisition,
    warranty,
    remarks,
    codeBN,
    uidUser: id,
    uidSite,
  });
  await vehicle.save();
  return res.status(201).send({ msg: vehicleMSG.register.msg });
};
export default vehicleRegisterController;
