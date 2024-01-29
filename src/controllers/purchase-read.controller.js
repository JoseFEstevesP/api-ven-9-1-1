import { limitPage } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';

// Controlador para la lectura de compras
const purchaseReadController = async (req, res) => {
  try {
    // Obtener parámetros de la solicitud
    const {
      page = 1,
      limit = limitPage,
      uidSite: uidSiteQuery,
      orderProperty = 'product',
      order = 'ASC',
      status = '1',
    } = req.query;
    const { uidSite } = req;
    const site = uidSiteQuery || uidSite;

    // Realizar la consulta a la base de datos para obtener las compras
    const { rows, count } = await Purchase.findAndCountAll({
      where: { uidSite: site, status },
      limit,
      offset: (page - 1) * limit,
      order: [[orderProperty, order]],
    });

    // Calcular el valor total de las compras
    const valueTotal = rows.reduce((acc, item) => acc + Number(item.value), 0);

    // Calcular detalles de paginación
    const pages = Math.ceil(count / limit);
    const totalPage = page > pages ? pages : page;
    const nextPage = Number(totalPage) + 1;
    const previousPage = Number(totalPage) - 1;

    // Enviar la respuesta con los datos y detalles de paginación
    return res.status(200).send({
      rows,
      valueTotal,
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

export default purchaseReadController;
