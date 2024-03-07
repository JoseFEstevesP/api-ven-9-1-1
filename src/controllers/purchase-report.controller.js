import ModelOptions from '#Class/ModelOptions.js';
import { Purchase } from '#Schemas/purchase.schema.js';
import { Site } from '#Schemas/site.schema.js';
import { User } from '#Schemas/user.schema.js';

const purchaseReportController = async (req, res) => {
  // Extraer parámetros de la solicitud:
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

  // Determinar ID del sitio:
  const site = uidSiteQuery || uidSite;

  // Crear instancia de ModelOptions para el modelo Purchase:
  const purchase = new ModelOptions({ Model: Purchase });

  // Generar reporte de compras:
  const { rows, author, siteName, report, date, time } =
    await purchase.getReport({
      // Pasar datos necesarios para la generación del reporte
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
        // Campos en los que se buscará
        'product',
        'serial',
        'brand',
        'model',
        'dateOfPurchase',
        'value',
        'quantity',
        'supplier',
        'warranty',
        'orderNumber',
      ],
      dataQuantity,
      reportName: 'Compra', // Nombre del reporte
    });

  // Enviar respuesta con datos del reporte:
  return res.status(200).send({ rows, author, siteName, report, date, time });
};

export default purchaseReportController;
