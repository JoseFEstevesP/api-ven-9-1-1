import { User } from '#Schemas/user.schema.js';
import { Op } from 'sequelize';

const userSearchController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.body;
  const { rows, count } = await User.findAndCountAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { ci: { [Op.iLike]: `%${search}%` } },
        { surname: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ],
    },
    limit,
    page,
  });
  if (!rows.length)
    return res
      .status(404)
      .send({ errors: ['No se a encontrado ningún usuario'] });
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

export default userSearchController;
