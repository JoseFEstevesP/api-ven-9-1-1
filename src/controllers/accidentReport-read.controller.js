import { limitPage } from '#Constants/system.js';
import { AccidentReport } from '#Schemas/accidentReport.schema.js';

const accidentReportReadController = async (req, res) => {
  const {
    page = 1,
    limit = limitPage,
    orderProperty = 'addressState',
    order = 'ASC',
    status = '1',
  } = req.query;
  const { rows, count } = await AccidentReport.findAndCountAll({
    where: { status },
    limit,
    offset: (page - 1) * limit,
    order: [[orderProperty, order]],
  });
  const pages = Math.ceil(count / limit);
  const totalPage = page > pages ? pages : page;
  const nextPage = Number(totalPage) + 1;
  const previousPage = Number(totalPage) - 1;
  return res.status(200).send({
    rows,
    count,
    currentPage: Number(totalPage),
    nextPage: nextPage <= pages ? nextPage : null,
    previousPage: previousPage > 0 ? previousPage : null,
    limit: Number(limit),
    pages,
  });
};

export default accidentReportReadController;
