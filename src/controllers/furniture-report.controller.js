import { reportDate } from '#Functions/reportDate.js';
import { Furniture } from '#Schemas/furniture.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
import moment from 'moment';

const furnitureReportController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uidSite: uidSiteQuery,
    orderProperty = 'description',
    order = 'ASC',
    status = '1',
    dataQuantity = 17,
    endDate,
    startDate,
    search,
  } = req.query;
  const site = uidSiteQuery || uidSite;
  const { name, surname, ci } = await User.findOne({ where: { uid: id } });
  const furnitureReport = await Furniture.findAll({
    where: reportDate({
      search,
      searchItem: 'furniture',
      endDate,
      startDate,
      status,
      uidSite: site,
    }),
    attributes: {
      exclude: ['uid', 'uidSite', 'uidUser'],
    },

    order: [[orderProperty, order]],
  });
  const rows = furnitureReport.reduce((acc, item, index) => {
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
    report: 'Mobiliario',
    date: moment().format('DD-MM-YYYY'),
    time: moment().format('hh:mm A'),
  });
};

export default furnitureReportController;
