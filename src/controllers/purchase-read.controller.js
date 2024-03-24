import ModelOptions from '#Class/ModelOptions.js';
import { limitPage } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';

const purchaseReadController = async (req, res) => {
  const {
    page = 1,
    limit = limitPage,
    uidSite: uidSiteQuery,
    orderProperty = 'product',
    order = 'ASC',
    status = '1',
  } = req.query;

  const { uidSite } = req;
  const site = uidSiteQuery || uidSite;

  const purchase = new ModelOptions({ Model: Purchase });

  const { rows, count, pages, currentPage, nextPage, previousPage } =
    await purchase.getList({
      site,
      page,
      limit: Number(limit),
      orderProperty,
      order,
      status,
    });

  return res.status(200).send({
    rows,
    count,
    currentPage,
    nextPage,
    previousPage,
    limit,
    pages,
  });
};

export default purchaseReadController;
