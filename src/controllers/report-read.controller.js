import { limitPage } from '#Constants/system.js';
import { Report } from '#Schemas/report.schema.js';

const reportReadController = async (req, res) => {
  const {
    page = 1,
    limit = limitPage,
    uidSite: uidSiteQuery,
    orderProperty = 'goods',
    order = 'ASC',
    status = '1',
  } = req.query;
  const { uidSite } = req;
  const site = uidSiteQuery || uidSite;
  const { rows, count } = await Report.findAndCountAll({
    where: { uidSite: site, status },
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

export default reportReadController;
