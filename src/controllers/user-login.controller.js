import { userMSG } from '#Constants/system.js';
import coder from '#Functions/coder.js';
import { Rol } from '#Schemas/rol.schema.js';
import { User } from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import crypto from 'crypto-js';
import { SignJWT } from 'jose';
const userLoginController = async (req, res) => {
  const { ci, password } = req.body;
  const existingUserByCi = await User.findOne({ where: { ci } });
  if (existingUserByCi?.status !== '1')
    return res.status(410).send({ errors: [{ uid: userMSG.login.status }] });
  if (!existingUserByCi)
    return res.status(401).send({ errors: [{ uid: userMSG.login.error }] });
  const checkPassword = await compare(password, existingUserByCi.password);
  if (!checkPassword)
    return res.status(401).send({ errors: [{ uid: userMSG.login.error }] });
  const jwtConstructor = new SignJWT({
    id: existingUserByCi.uid,
    uidRol: existingUserByCi.uidRol,
    uidSite: existingUserByCi.uidSite,
  });
  const { permissions } = await Rol.findOne({
    where: { uid: existingUserByCi.uidRol, status: '1' },
  });
  const jwt = await jwtConstructor
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(coder(process.env.JWT_PRIVATE_KEY));
  const cryptoToken = crypto.AES.encrypt(jwt, process.env.CRYPTO_KEY);
  const dataCrypto = cryptoToken.toString();
  return res.send({
    JWT: dataCrypto,
    rol: permissions,
    site: existingUserByCi.uidSite,
  });
};
export default userLoginController;
