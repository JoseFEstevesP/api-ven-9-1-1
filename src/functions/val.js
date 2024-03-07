export const val = ({ val, errors, msg, name }) => {
  if (val) {
    if (val.status !== '1') {
      errors.push({ [name]: msg.register.uid.status });
    } else {
      errors.push({ [name]: msg.register.uid.default });
    }
  }
};
