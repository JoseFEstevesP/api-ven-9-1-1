const coder = (env) => {
  const encoder = new TextEncoder();
  return encoder.encode(env);
};
export default coder;
