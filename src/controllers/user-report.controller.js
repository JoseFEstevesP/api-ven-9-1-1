import { reportDate } from '#Functions/reportDate.js';
import { Rol } from '#Schemas/rol.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
import moment from 'moment';

const userReportController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uidSite: uidSiteQuery,
    orderProperty = 'name',
    order = 'ASC',
    status = '1',
    dataQuantity = 17,
    endDate,
    startDate,
  } = req.query;
  const site = uidSiteQuery || uidSite;
  const { name, surname, ci } = await User.findOne({ where: { uid: id } });
  const userReport = await User.findAll({
    where: reportDate({ endDate, startDate, status, uidSite: site }),
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
  const { name: siteName } = await Site.findByPk(site);
  return res.status(200).send({
    rows,
    author: `${name} ${surname} CI: ${ci}`,
    siteName,
    report: 'Usuario',
    date: moment().format('DD-MM-YYYY'),
    time: moment().format('hh:mm A'),
  });
};

export default userReportController;
