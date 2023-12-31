import { Op } from 'sequelize';

export const reportDate = ({ status, uidSite, startDate, endDate }) => {
  return {
    status,
    ...(uidSite && { uidSite }),
    ...(startDate &&
      endDate && {
        createAtDate: {
          [Op.between]: [startDate, endDate],
        },
      }),
  };
};
