import moment from 'moment';
import { Op } from 'sequelize';

class ModelOptions {
  Model;
  constructor({ Model }) {
    this.Model = Model;
  }

  async postRegister({ data, validateFunctions, msg }) {
    const validate = await validateFunctions({ data, Model: this.Model, msg });
    if (validate) return { errors: validate };
    const register = await this.Model.create(data);
    return await register.save();
  }

  async getList({ site, status, limit, page, orderProperty, order }) {
    const { rows, count } = await this.Model.findAndCountAll({
      where: { uidSite: site, status },
      limit,
      offset: (page - 1) * limit,
      order: [[orderProperty, order]],
    });

    const pages = Math.ceil(count / limit);

    const totalPage = page > pages ? pages : page;

    const nextPage = Number(totalPage) + 1;
    const previousPage = Number(totalPage) - 1;

    return {
      rows,
      pages,
      count,
      currentPage: Number(totalPage),
      nextPage: nextPage <= pages ? nextPage : null,
      previousPage: previousPage > 0 ? previousPage : null,
    };
  }

  async getItem({ uid, status }) {
    return await this.Model.findOne({ where: { uid, status } });
  }

  async getSearchItem({
    uidSite,
    status,
    limit,
    page,
    orderProperty,
    order,
    params,
    search,
  }) {
    const { rows, count } = await this.Model.findAndCountAll({
      where: {
        uidSite,
        status,
        [Op.or]: params.map((item) => ({
          [item]: { [Op.iLike]: `%${search}%` },
        })),
      },
      limit,
      offset: (page - 1) * limit,
      order: [[orderProperty, order]],
    });

    const pages = Math.ceil(count / limit);

    const totalPage = page > pages ? pages : page;

    const nextPage = Number(totalPage) + 1;
    const previousPage = Number(totalPage) - 1;

    return {
      rows,
      pages,
      count,
      currentPage: Number(totalPage),
      nextPage: nextPage <= pages ? nextPage : null,
      previousPage: previousPage > 0 ? previousPage : null,
    };
  }

  async getReport({
    userModel,
    siteModel,
    uid,
    orderProperty,
    order,
    search,
    endDate,
    startDate,
    status,
    uidSite,
    params,
    dataQuantity,
    reportName,
  }) {
    const { name, surname, ci } = await userModel.findOne({ where: { uid } });
    const report = await this.Model.findAll({
      where: {
        status,
        ...(uidSite && { uidSite }),
        ...(startDate &&
          endDate && {
            createAtDate: {
              [Op.between]: [startDate, endDate],
            },
          }),
        ...(search && {
          [Op.or]: params.map((item) => ({
            [item]: { [Op.iLike]: `%${search}%` },
          })),
        }),
      },
      attributes: {
        exclude: ['uid', 'uidSite', 'uidUser'],
      },

      order: [[orderProperty, order]],
    });
    const rows = report.reduce((acc, item, index) => {
      if (index % dataQuantity === 0) {
        acc.push([item]);
      } else {
        acc[acc.length - 1].push(item);
      }
      return acc;
    }, []);
    const { name: siteName } = await siteModel.findByPk(uidSite);
    return {
      rows,
      author: `${name} ${surname} CI: ${ci}`,
      siteName,
      report: reportName,
      date: moment().format('DD-MM-YYYY'),
      time: moment().format('hh:mm A'),
    };
  }

  async updateItem({ uid, status, data }) {
    const res = await this.Model.findOne({
      where: { uid, status },
    });
    res.update({
      ...data,
      updateAtDate: moment().format('YYYY-MM-DD'),
      updateAtTime: moment().format('hh:mm A'),
    });
  }

  async deleteItem({ uid, status }) {
    const res = await this.Model.findOne({
      where: { uid, status },
    });
    res.status = '0';
    res.updateAtDate = moment().format('YYYY-MM-DD');
    res.updateAtTime = moment().format('hh:mm A');
    res.save();
  }
}
export default ModelOptions;
