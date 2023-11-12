import { limitPage, vehicleMSG } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';
import { Op } from 'sequelize';

const vehicleSearchController = async (req, res) => {
  const { uidSite } = req;
  const {
    page = 1,
    limit = limitPage,
    uidSite: uidSiteQuery,
    orderProperty = 'description',
    order = 'ASC',
    status = '1',
  } = req.query;
  const { search } = req.params;
  const site = uidSiteQuery || uidSite;
  const { rows, count } = await Vehicle.findAndCountAll({
    where: {
      uidSite: site,
      status,
      [Op.or]: [
        { description: { [Op.iLike]: `%${search}%` } },
        { brand: { [Op.iLike]: `%${search}%` } },
        { model: { [Op.iLike]: `%${search}%` } },
        { place: { [Op.iLike]: `%${search}%` } },
        { quantity: { [Op.iLike]: `%${search}%` } },
        { value: { [Op.iLike]: `%${search}%` } },
        { state: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
        { dateOfAcquisition: { [Op.iLike]: `%${search}%` } },
        { warranty: { [Op.iLike]: `%${search}%` } },
        { remarks: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
      ],
    },
    limit,
    offset: (page - 1) * limit,
    order: [[orderProperty, order]],
  });
  if (!rows.length)
    return res.status(404).send({ errors: [{ uid: vehicleMSG.search.uid }] });
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

export default vehicleSearchController;
