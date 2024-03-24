import ModelOptions from '#Class/ModelOptions.js';
import { limitPage } from '#Constants/system.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

// Controlador para la búsqueda de vehículos
const vehicleSearchController = async (req, res) => {
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

  const vehicle = new ModelOptions({ Model: Vehicle });
  const { rows, pages, count, currentPage, nextPage, previousPage } =
    await vehicle.getSearchItem({
      page,
      limit,
      uidSite: site,
      orderProperty,
      order,
      status,
      search,
      params: [
        'description',
        'brand',
        'model',
        'place',
        'quantity',
        'condition',
        'dateOfAcquisition',
        'codeBN',
      ],
    });

  // Enviar la respuesta con los datos y detalles de paginación
  return res.status(200).send({
    count,
    currentPage,
    nextPage,
    previousPage,
    limit: Number(limit),
    pages,
    rows,
  });
};

export default vehicleSearchController;
