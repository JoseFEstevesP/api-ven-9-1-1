import ModelOptions from '#Class/ModelOptions.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';

const vehicleReportController = async (req, res) => {
  const { id, uidSite } = req;
  const {
    uidSite: uidSiteQuery,
    orderProperty,
    order,
    status = '1',
    dataQuantity,
    endDate,
    startDate,
    search,
  } = req.query;

  const site = uidSiteQuery || uidSite;

  const purchase = new ModelOptions({ Model: Vehicle });

  const { rows, author, siteName, report, date, time } =
    await purchase.getReport({
      userModel: User,
      siteModel: Site,
      uid: id,
      orderProperty,
      order,
      search,
      endDate,
      startDate,
      status,
      uidSite: site,
      params: [
        'description',
        'brand',
        'model',
        'place',
        'quantity',
        'condition',
        'dateOfAcquisition',
        'codeBN',
        'fuelCapacity',
        'currentFuel',
      ],
      dataQuantity,
      reportName: 'Vehículo', // Nombre del reporte
    });

  // Enviar respuesta con datos del reporte:
  return res.status(200).send({ rows, author, siteName, report, date, time });
};

export default vehicleReportController;
