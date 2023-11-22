import { Rol } from '#Schemas/rol.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';

const userReportController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uidSite: uidSiteQuery,
    orderProperty = 'name',
    order = 'ASC',
    status = '1',
    dataQuantity = 18,
  } = req.query;
  const site = uidSiteQuery || uidSite;
  const { name, surname, ci } = await User.findOne({ where: { uid: id } });
  const userReport = await User.findAll({
    where: {
      uidSite: site,
      status,
    },
    attributes: {
      exclude: ['uid', 'password', 'uidRol', 'uidSite'],
    },
    include: [
      {
        model: Rol,
        where: { status },
        attributes: {
          exclude: ['uid', 'permissions', 'status', 'createdAt', 'updatedAt'],
        },
      },
      {
        model: Site,
        where: { status },
        attributes: {
          exclude: ['uid', 'direction', 'status', 'createdAt', 'updatedAt'],
        },
      },
    ],
    order: [[orderProperty, order]],
  });
  const rows = userReport.reduce((acc, item, index) => {
    if (index % dataQuantity === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, []);
  return res.status(200).send({
    rows,
    author: `${name} ${surname} CI: ${ci}`,
  });
};

export default userReportController;
