import { Rol } from '#Schemas/rol.schema.js';
import { Op } from 'sequelize';

const rolSearchController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.body;
  const { rows, count } = await Rol.findAndCountAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { permissions: { [Op.iLike]: `%${search}%` } },
      ],
    },
    limit,
    page,
  });
  if (!rows.length)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún rol' }] });
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

export default rolSearchController;
