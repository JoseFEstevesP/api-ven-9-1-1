import { limitPage } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';

// Controlador para la lectura de roles
const rolReadController = async (req, res) => {
  try {
    // Obtener parámetros de la solicitud
    const {
      page = 1,
      limit = limitPage,
      orderProperty = 'name',
      order = 'ASC',
      status = '1',
    } = req.query;

    // Realizar la consulta a la base de datos para obtener los roles
    const { rows, count } = await Rol.findAndCountAll({
      where: { status },
      limit,
      offset: (page - 1) * limit,
      order: [[orderProperty, order]],
    });
    rows.map((row) => {
      row.permissions = Object.values(
        row.permissions.split(',').reduce((acc, item) => {
          const name = item.split('_')[1] || item.split('_')[0];
          acc[name] = acc[name] || [];
          acc[name].push(item);
          return acc;
        }, {})
      ).map((items) => items);
      return row;
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

export default rolReadController;
