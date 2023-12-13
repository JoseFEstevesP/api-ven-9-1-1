import { BreakdownReport } from '#Schemas/breakdownReport.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
import moment from 'moment';

const breakdownReportController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uidSite: uidSiteQuery,
    orderProperty = 'goods',
    order = 'ASC',
    status = '1',
    dataQuantity = 17,
  } = req.query;
  const site = uidSiteQuery || uidSite;
  const { name, surname, ci } = await User.findOne({ where: { uid: id } });
  const breakdownReport = await BreakdownReport.findAll({
    where: {
      uidSite: site,
      status,
    },
    attributes: {
      exclude: ['uid', 'uidSite', 'uidUser'],
    },
    include: [
      {
        model: User,
        where: { status },
        attributes: ['ci'],
      },
    ],
    order: [[orderProperty, order]],
  });
  const rows = breakdownReport.reduce((acc, item, index) => {
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
    report: 'Reporte de averia',
    date: moment().format('DD-MM-YYYY'),
    time: moment().format('hh:mm A'),
  });
};

export default breakdownReportController;
