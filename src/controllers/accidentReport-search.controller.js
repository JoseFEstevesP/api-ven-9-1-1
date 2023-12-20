import { accidentReportMSG, limitPage } from '#Constants/system.js';
import { AccidentReport } from '#Schemas/accidentReport.schema.js';
import { Op } from 'sequelize';

const accidentReportSearchController = async (req, res) => {
  const { uidSite } = req;
  const {
    page = 1,
    limit = limitPage,
    uidSite: uidSiteQuery,
    orderProperty = 'name',
    order = 'ASC',
    status = '1',
  } = req.query;
  const { search } = req.params;
  const site = uidSiteQuery || uidSite;
  const { rows, count } = await AccidentReport.findAndCountAll({
    where: {
      uidSite: site,
      status,
      [Op.or]: [
        { addressState: { [Op.iLike]: `%${search}%` } },
        { addressParish: { [Op.iLike]: `%${search}%` } },
        { addressMunicipality: { [Op.iLike]: `%${search}%` } },
        { incidentType: { [Op.iLike]: `%${search}%` } },
        { descriptionIncident: { [Op.iLike]: `%${search}%` } },
        { patientData: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } },
        { time: { [Op.iLike]: `%${search}%` } },
        { responseTeam: { [Op.iLike]: `%${search}%` } },
      ],
    },
    limit,
    offset: (page - 1) * limit,
    order: [[orderProperty, order]],
  });
  if (!rows.length)
    return res
      .status(404)
      .send({ errors: [{ uid: accidentReportMSG.noFound }] });
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

export default accidentReportSearchController;
