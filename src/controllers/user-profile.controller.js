import { userMSG } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
const userProfileController = async (req, res) => {
  const { id } = req;
  const status = '1';
  const existingUserById = await User.findOne({
    where: { uid: id, status },
    include: [
      {
        model: Rol,
        where: { status },
        attributes: ['name'],
      },
      {
        model: Site,
        where: { status },
        attributes: ['name'],
      },
    ],
    attributes: {
      exclude: [
        'uidRol',
        'uidSite',
        'status',
        'createAtDate',
        'createAtTime',
        'updateAtDate',
        'updateAtTime',
        'createdAt',
        'updatedAt',
      ],
    },
  });
  if (!existingUserById)
    return res.status(401).send({ errors: [{ uid: userMSG.noFound }] });

  return res.send(existingUserById);
};
export default userProfileController;
