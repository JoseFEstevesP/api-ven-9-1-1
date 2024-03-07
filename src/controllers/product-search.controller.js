import ModelOptions from '#Class/ModelOptions.js';
import { limitPage, purchaseMSG } from '#Constants/system.js';
import { Purchase } from '#Schemas/purchase.schema.js';

const purchaseSearchController = async (req, res) => {
  // Desestructurar parámetro ID del sitio y datos de consulta
  const { uidSite } = req;
  const {
    page = 1, // Número de página actual (predeterminado: 1)
    limit = limitPage, // Cantidad de compras por página (predeterminado: valor de "limitPage")
    uidSiteQuery, // ID del sitio específico a consultar (si se proporciona)
    orderProperty = 'product', // Propiedad por la que se ordenarán las compras (predeterminado: "product")
    order = 'ASC', // Dirección del orden (predeterminado: "ASC" ascendente)
    status = '1', // Estado de las compras que se desean consultar (predeterminado: "1" activas)
  } = req.query;

  const { search } = req.params; // Término de búsqueda en los campos especificados

  // Obtener el ID del sitio del usuario o el que se proporcionó en la consulta
  const site = uidSiteQuery || uidSite;

  // Crear una instancia de ModelOptions con el esquema Purchase
  const purchase = new ModelOptions({ Model: Purchase });

  // Realizar la búsqueda de compras filtrando por sitio, paginando, ordenando, por estado y término de búsqueda
  const { rows, count } = await purchase.getSearchItem({
    page,
    limit,
    uidSite,
    orderProperty,
    order,
    status,
    site,
    search,
    params: [
      // Campos en los que se buscará el término
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
  });

  // Verificar si se encontraron resultados. Si no, devolver error de "No encontrado".
  if (!rows.length) {
    return res.status(404).send({ errors: [{ uid: purchaseMSG.noFound }] });
  }

  // Calcular el número total de páginas en base al resultado y el límite por página
  const pages = Math.ceil(count / limit);

  // Ajustar la página actual si excede el número total de páginas
  const totalPage = page > pages ? pages : page;

  // Calcular la página siguiente y la anterior, teniendo en cuenta los límites
  const nextPage = Number(totalPage) + 1;
  const previousPage = Number(totalPage) - 1;

  // Devolver una respuesta exitosa (200) con los datos de la búsqueda y metadatos de paginación
  return res.status(200).send({
    count, // Cantidad total de compras que cumplen con los filtros y búsqueda
    currentPage: Number(totalPage), // Página actual de la lista
    nextPage: nextPage <= pages ? nextPage : null, // Página siguiente, si existe
    previousPage: previousPage > 0 ? previousPage : null, // Página anterior, si existe
    limit: Number(limit), // Cantidad de compras por página
    pages, // Número total de páginas de la lista completa
    rows, // Las compras encontradas que cumplen con los filtros y búsqueda
  });
};

export default purchaseSearchController;
