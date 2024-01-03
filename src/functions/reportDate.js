import { Op } from 'sequelize';
const options = {
  user: ({ search }) => [
    { name: { [Op.iLike]: `%${search}%` } },
    { ci: { [Op.iLike]: `%${search}%` } },
    { surname: { [Op.iLike]: `%${search}%` } },
    { email: { [Op.iLike]: `%${search}%` } },
  ],
  rol: ({ search }) => [
    { name: { [Op.iLike]: `%${search}%` } },
    { permissions: { [Op.iLike]: `%${search}%` } },
  ],
  site: ({ search }) => [
    { name: { [Op.iLike]: `%${search}%` } },
    { direction: { [Op.iLike]: `%${search}%` } },
  ],
  assign: ({ search }) => [
    { inventory: { [Op.iLike]: `%${search}%` } },
    { article: { [Op.iLike]: `%${search}%` } },
    { serialOrCodeBN: { [Op.iLike]: `%${search}%` } },
    { department: { [Op.iLike]: `%${search}%` } },
    { quantity: { [Op.iLike]: `%${search}%` } },
    { description: { [Op.iLike]: `%${search}%` } },
    { remarks: { [Op.iLike]: `%${search}%` } },
  ],
  breakdownReport: ({ search }) => [
    { goods: { [Op.iLike]: `%${search}%` } },
    { problem: { [Op.iLike]: `%${search}%` } },
    { symptoms: { [Op.iLike]: `%${search}%` } },
    { condition: { [Op.iLike]: `%${search}%` } },
    { breakdownDepartment: { [Op.iLike]: `%${search}%` } },
    { location: { [Op.iLike]: `%${search}%` } },
    { dateOfReport: { [Op.iLike]: `%${search}%` } },
    { timeOfReport: { [Op.iLike]: `%${search}%` } },
    { serialOrCodeBN: { [Op.iLike]: `%${search}%` } },
  ],
  consumables: ({ search }) => [
    { description: { [Op.iLike]: `%${search}%` } },
    { serial: { [Op.iLike]: `%${search}%` } },
    { brand: { [Op.iLike]: `%${search}%` } },
    { quantity: { [Op.iLike]: `%${search}%` } },
    { value: { [Op.iLike]: `%${search}%` } },
    { location: { [Op.iLike]: `%${search}%` } },
    { dateOfAcquisition: { [Op.iLike]: `%${search}%` } },
    { remarks: { [Op.iLike]: `%${search}%` } },
  ],
  furniture: ({ search }) => [
    { description: { [Op.iLike]: `%${search}%` } },
    { quantity: { [Op.iLike]: `%${search}%` } },
    { value: { [Op.iLike]: `%${search}%` } },
    { condition: { [Op.iLike]: `%${search}%` } },
    { location: { [Op.iLike]: `%${search}%` } },
    { dateOfAcquisition: { [Op.iLike]: `%${search}%` } },
    { warranty: { [Op.iLike]: `%${search}%` } },
    { remarks: { [Op.iLike]: `%${search}%` } },
    { codeBN: { [Op.iLike]: `%${search}%` } },
  ],
  purchase: ({ search }) => [
    { product: { [Op.iLike]: `%${search}%` } },
    { serial: { [Op.iLike]: `%${search}%` } },
    { brand: { [Op.iLike]: `%${search}%` } },
    { model: { [Op.iLike]: `%${search}%` } },
    { dateOfPurchase: { [Op.iLike]: `%${search}%` } },
    { value: { [Op.iLike]: `%${search}%` } },
    { quantity: { [Op.iLike]: `%${search}%` } },
    { supplier: { [Op.iLike]: `%${search}%` } },
    { warranty: { [Op.iLike]: `%${search}%` } },
    { orderNumber: { [Op.iLike]: `%${search}%` } },
    { location: { [Op.iLike]: `%${search}%` } },
  ],
  technology: ({ search }) => [
    { description: { [Op.iLike]: `%${search}%` } },
    { brand: { [Op.iLike]: `%${search}%` } },
    { model: { [Op.iLike]: `%${search}%` } },
    { serial: { [Op.iLike]: `%${search}%` } },
    { quantity: { [Op.iLike]: `%${search}%` } },
    { value: { [Op.iLike]: `%${search}%` } },
    { condition: { [Op.iLike]: `%${search}%` } },
    { location: { [Op.iLike]: `%${search}%` } },
    { dateOfAcquisition: { [Op.iLike]: `%${search}%` } },
    { warranty: { [Op.iLike]: `%${search}%` } },
    { remarks: { [Op.iLike]: `%${search}%` } },
    { codeBN: { [Op.iLike]: `%${search}%` } },
  ],
  vehicle: ({ search }) => [
    { description: { [Op.iLike]: `%${search}%` } },
    { brand: { [Op.iLike]: `%${search}%` } },
    { model: { [Op.iLike]: `%${search}%` } },
    { place: { [Op.iLike]: `%${search}%` } },
    { quantity: { [Op.iLike]: `%${search}%` } },
    { value: { [Op.iLike]: `%${search}%` } },
    { condition: { [Op.iLike]: `%${search}%` } },
    { location: { [Op.iLike]: `%${search}%` } },
    { dateOfAcquisition: { [Op.iLike]: `%${search}%` } },
    { warranty: { [Op.iLike]: `%${search}%` } },
    { remarks: { [Op.iLike]: `%${search}%` } },
    { codeBN: { [Op.iLike]: `%${search}%` } },
  ],
};
export const reportDate = ({
  search,
  searchItem,
  status,
  uidSite,
  startDate,
  endDate,
}) => {
  return {
    status,
    ...(uidSite && { uidSite }),
    ...(startDate &&
      endDate && {
        createAtDate: {
          [Op.between]: [startDate, endDate],
        },
      }),
    ...(search && {
      [Op.or]: options[searchItem]({ search }),
    }),
  };
};
