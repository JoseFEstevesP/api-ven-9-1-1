import { limitPage } from '#Constants/system.js';
import { BreakdownReport } from '#Schemas/breakdownReport.schema.js';

// Controlador para la lectura de informes de averías
const breakdownReportReadController = async (req, res) => {
  try {
    // Obtener parámetros de la solicitud
    const {
      page = 1,
      limit = limitPage,
      uidSite: uidSiteQuery,
      orderProperty = 'goods',
      order = 'ASC',
      status = '1',
    } = req.query;
    const { uidSite } = req;
    const site = uidSiteQuery || uidSite;

    // Realizar la consulta a la base de datos para obtener los informes de averías
    const { rows, count } = await BreakdownReport.findAndCountAll({
      where: { uidSite: site, status },
      limit,
      offset: (page - 1) * limit,
      order: [[orderProperty, order]],
    });

    // Calcular detalles de paginación
    const pages = Math.ceil(count / limit);
    const totalPage = page > pages ? pages : page;
    const nextPage = Number(totalPage) + 1;
    const previousPage = Number(totalPage) - 1;

    // Enviar la respuesta con los datos y detalles de paginación
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
    // Manejar cualquier error que ocurra durante la ejecución
    console.error(error);
    return res.status(500).send('Error interno del servidor');
  }
};

export default breakdownReportReadController;
