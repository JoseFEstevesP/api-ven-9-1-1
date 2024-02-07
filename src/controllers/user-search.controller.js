import { limitPage, userMSG } from '#Constants/system.js';
import { Rol } from '#Schemas/rol.schema.js';
import { User } from '#Schemas/user.schema.js';
import { Op as SequelizeOp } from 'sequelize';

// Controlador para la búsqueda de usuarios
const userSearchController = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const { id, uidSite } = req;
    const {
      page = 1,
      limit = limitPage,
      uidSite: uidSiteQuery,
      orderProperty = 'name',
      order = 'ASC',
      status = '1',
    } = req.query;
    const { search } = req.params;
    const site = uidSiteQuery || uidSite;

    // Realizar la búsqueda de usuarios en la base de datos
    const { rows, count } = await User.findAndCountAll({
      where: {
        uidSite: site,
        status,
        [SequelizeOp.or]: [
          { name: { [SequelizeOp.iLike]: `%${search}%` } },
          { ci: { [SequelizeOp.iLike]: `%${search}%` } },
          { surname: { [SequelizeOp.iLike]: `%${search}%` } },
          { email: { [SequelizeOp.iLike]: `%${search}%` } },
        ],
      },
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

    // Verificar si se encontraron resultados
    if (!rows.length) {
      return res.status(404).send({ errors: [{ uid: userMSG.noFound }] });
    }

    // Procesar los resultados y paginación
    const data = rows.filter((item) => item.uid !== id);
    const pages = Math.ceil(count / limit);
    const totalPage = page > pages ? pages : page;
    const nextPage = Number(totalPage) + 1;
    const previousPage = Number(totalPage) - 1;

    // Enviar la respuesta con los datos y detalles de paginación
    return res.status(200).send({
      rows: await Promise.all(data),
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

export default userSearchController;
