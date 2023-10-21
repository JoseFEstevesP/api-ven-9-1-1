import { User } from '#Schemas/user.schema.js';
import { Op } from 'sequelize';

const userSearchController = async (req, res) => {
  const { page = 1, limit = 10, uidSite } = req.query;
  const { search } = req.body;
  const { id } = req;
  const user = await User.findByPk(id);
  const site = uidSite || user.uidSite;
  const { rows, count } = await User.findAndCountAll({
    where: {
      uidSite: site,
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { ci: { [Op.iLike]: `%${search}%` } },
        { surname: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { uidRol: { [Op.iLike]: `%${search}%` } },
      ],
    },
    limit,
    offset: page,
  });
  if (!rows.length)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún usuario' }] });

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
