import { limitPage } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';

const userReadController = async (req, res) => {
  const {
    page = 1,
    limit = limitPage,
    uidSite: uidSiteQuery,
    orderProperty = 'name',
    order = 'ASC',
    status = '1',
  } = req.query;
  const { uidSite, id } = req;
  const site = uidSiteQuery || uidSite;
  const { rows, count } = await User.findAndCountAll({
    where: { uidSite: site, status },
    attributes: { exclude: ['password'] },
    limit,
    offset: (page - 1) * limit,
    order: [[orderProperty, order]],
  });
  const data = rows
    .filter((item) => item.uid !== id)
    .map(async (item) => {
      const { uid, name, surname, ci, email, uidRol, uidSite } = item;
      const { name: nameRol } = await Rol.findOne({
        where: { uid: uidRol, status },
      });
      const { name: nameSite } = await Site.findOne({
        where: { uid: uidSite, status },
      });
      return {
        uid,
        name,
        surname,
        ci,
        email,
        uidRol,
        uidSite,
        nameRol,
        nameSite,
      };
    });
  const pages = Math.ceil(count / limit);
  const totalPage = page > pages ? pages : page;
  const nextPage = Number(totalPage) + 1;
  const previousPage = Number(totalPage) - 1;
  return res.status(200).send({
    rows: await Promise.all(data),
    count,
    currentPage: Number(totalPage),
    nextPage: nextPage <= pages ? nextPage : null,
    previousPage: previousPage > 0 ? previousPage : null,
    limit: Number(limit),
    pages,
  });
};

export default userReadController;
