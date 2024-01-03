import { reportDate } from '#Functions/reportDate.js';
import { Rol } from '#Schemas/rol.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
import moment from 'moment';

const rolReportController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    orderProperty = 'name',
    order = 'ASC',
    status = '1',
    dataQuantity = 17,
    startDate,
    endDate,
    search,
  } = req.query;
  const { name, surname, ci } = await User.findOne({ where: { uid: id } });

  const rolReport = await Rol.findAll({
    where: reportDate({
      search,
      searchItem: 'rol',
      endDate,
      startDate,
      status,
    }),
    attributes: {
      exclude: ['uid'],
    },
    order: [[orderProperty, order]],
  });
  const rows = rolReport.reduce((acc, item, index) => {
    if (index % dataQuantity === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, []);
  const { name: siteName } = await Site.findByPk(uidSite);
  return res.status(200).send({
    rows,
    author: `${name} ${surname} CI: ${ci}`,
    siteName,
    report: 'Rol',
    date: moment().format('DD-MM-YYYY'),
    time: moment().format('hh:mm A'),
  });
};

export default rolReportController;
