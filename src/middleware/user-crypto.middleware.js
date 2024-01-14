import crypto from 'crypto-js';
const userCryptoDTO = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  const cryptoData = crypto.AES.decrypt(
    authorization,
    process.env.CRYPTO_KEY
  ).toString(crypto.enc.Utf8);
  req.jwt = cryptoData;
  next();
};

export default userCryptoDTO;
