import coder from '#Functions/coder.js';
import { jwtVerify } from 'jose';
const userJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  const JWT = authorization.split(' ')[1];
  if (!JWT) return res.status(401).send({ errors: ['Usuario no autorizado'] });
  try {
    const { payload } = await jwtVerify(
      JWT,
      coder(process.env.JWT_PRIVATE_KEY)
    );
    req.id = payload.id;
    req.uidRol = payload.uidRol;
    next();
  } catch (error) {
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  }
};

export default userJWTDTO;
