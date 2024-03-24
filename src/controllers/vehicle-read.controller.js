import ModelOptions from '#Class/ModelOptions.js';
import { limitPage } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

// Controlador para la lectura de vehículos
const vehicleReadController = async (req, res) => {
  try {
    // Obtener parámetros de la solicitud
    const {
      page = 1,
      limit = limitPage,
      uidSite: uidSiteQuery,
      orderProperty = 'description',
      order = 'ASC',
      status = '1',
    } = req.query;

    const { uidSite } = req;
    const site = uidSiteQuery || uidSite;

    const vehicle = new ModelOptions({ Model: Vehicle });

    const { rows, count, pages, currentPage, nextPage, previousPage } =
      await vehicle.getList({
        site,
        page,
        limit: Number(limit),
        orderProperty,
        order,
        status,
      });

    return res.status(200).send({
      rows,
      count,
      currentPage,
      nextPage,
      previousPage,
      limit: Number(limit),
      pages,
    });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la ejecución
    console.error(error);
    return res.status(500).send('Error interno del servidor');
  }
};

export default vehicleReadController;
