import { User } from '#Schemas/user.schema.js';

const userReadController = async (req, res) => {
  const { page = 1, limit = 10, uidSite } = req.query;
  const { id } = req;
  const user = await User.findByPk(id);
  const site = uidSite || user.uidSite;
  const { rows, count } = await User.findAndCountAll({
    where: { uidSite: site },
    limit,
    offset: page,
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

export default userReadController;
