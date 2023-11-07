import { Site } from '#Schemas/site.schema.js';
import { Op } from 'sequelize';

const siteSearchController = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    orderProperty = 'name',
    order = 'ASC',
    status = '1',
  } = req.query;
  const { search } = req.params;
  const { rows, count } = await Site.findAndCountAll({
    where: {
      status,
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { direction: { [Op.iLike]: `%${search}%` } },
      ],
    },
    limit,
    offset: (page - 1) * limit,
    order: [[orderProperty, order]],
  });
  if (!rows.length)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningúna sede' }] });
  const pages = Math.ceil(count / limit);
  const totalPage = page > pages ? pages : page;
  const nextPage = Number(totalPage) + 1;
  const previousPage = Number(totalPage) - 1;
  return res.status(200).send({
    count,
    currentPage: Number(totalPage),
    nextPage: nextPage <= pages ? nextPage : null,
    previousPage: previousPage > 0 ? previousPage : null,
    limit: Number(limit),
    pages,
    rows,
  });
};

export default siteSearchController;
