import { limitPage } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';
import { User } from '#Schemas/user.schema.js';

// Función para manejar la lectura de los datos del usuario
const userReadController = async (req, res) => {
  try {
    // Desestructurar los parámetros de consulta de la solicitud
    const {
      page = 1,
      limit = limitPage,
      uidSite: uidSiteQuery,
      orderProperty = 'name',
      order = 'ASC',
      status = '1',
    } = req.query;

    const { uidSite, id } = req;
    const site = uidSiteQuery || uidSite;

    // Obtener los usuarios de la base de datos
    const { rows, count } = await User.findAndCountAll({
      where: { uidSite: site, status },
      attributes: {
        exclude: [
          'password',
          'status',
          'createAtDate',
          'createAtTime',
          'updateAtDate',
          'updateAtTime',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [
        {
          model: Rol,
          attributes: {
            exclude: [
              'uid',
              'permissions',
              'status',
              'createdAt',
              'updatedAt',
              'createAtDate',
              'createAtTime',
              'updateAtDate',
              'updateAtTime',
            ],
          },
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: [[orderProperty, order]],
    });

    // Filtrar al usuario actual de los datos obtenidos
    const data = rows.filter((item) => item.uid !== id);

    // Calcular los detalles de paginación
    const pages = Math.ceil(count / limit);
    const totalPage = page > pages ? pages : page;
    const nextPage = Number(totalPage) + 1;
    const previousPage = Number(totalPage) - 1;

    // Enviar la respuesta con los datos y detalles de paginación
    return res.status(200).send({
      rows: data,
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

export default userReadController;
