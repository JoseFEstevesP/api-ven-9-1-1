import { furnitureMSG, limitPage } from '#Constants/system.js';
import { Furniture } from '#Schemas/furniture.schema.js';
import { Op } from 'sequelize';

// Controlador para la búsqueda de muebles
const furnitureSearchController = async (req, res) => {
  try {
    // Obtener parámetros de la solicitud
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

    // Realizar la consulta a la base de datos para buscar muebles
    const { rows, count } = await Furniture.findAndCountAll({
      where: {
        uidSite: site,
        status,
        [Op.or]: [
          { description: { [Op.iLike]: `%${search}%` } },
          { quantity: { [Op.iLike]: `%${search}%` } },
          { value: { [Op.iLike]: `%${search}%` } },
          { condition: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } },
          { dateOfAcquisition: { [Op.iLike]: `%${search}%` } },
          { warranty: { [Op.iLike]: `%${search}%` } },
          { remarks: { [Op.iLike]: `%${search}%` } },
          { codeBN: { [Op.iLike]: `%${search}%` } },
        ],
      },
      limit,
      offset: (page - 1) * limit,
      order: [[orderProperty, order]],
    });

    // Verificar si se encontraron resultados
    if (!rows.length) {
      return res.status(404).send({ errors: [{ uid: furnitureMSG.noFound }] });
    }

    // Calcular detalles de paginación
    const pages = Math.ceil(count / limit);
    const totalPage = page > pages ? pages : page;
    const nextPage = Number(totalPage) + 1;
    const previousPage = Number(totalPage) - 1;

    // Enviar la respuesta con los datos y detalles de paginación
    return res.status(200).send({
      count,
      currentPage: Number(totalPage),
      nextPage: nextPage <= pages ? nextPage : null,
      previousPage: previousPage > 0 ? previousPage : null,
      limit: Number(limit),
      pages,
      rows,
    });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la ejecución
    console.error(error);
    return res.status(500).send('Error interno del servidor');
  }
};

export default furnitureSearchController;
