import ModelOptions from '#Class/ModelOptions.js';
import { limitPage } from '#Constants/system.js';
import { Consumables } from '#Schemas/consumables.schema.js';

const consumablesReadController = async (req, res) => {
  const {
    page = 1,
    limit = limitPage,
    uidSite: uidSiteQuery,
    orderProperty = 'description',
    order = 'ASC',
    status = '1',
  } = req.query;
  const { uidSite } = req;
  const site = uidSiteQuery || uidSite;
  try {
    const consumable = new ModelOptions({ Model: Consumables });

    const { rows, count } = await consumable.getList({
      orderProperty,
      page,
      site,
      status,
      order,
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
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error interno del servidor');
  }
};

export default consumablesReadController;
