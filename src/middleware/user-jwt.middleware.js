import coder from '#Functions/coder.js';
import { jwtVerify } from 'jose';
const userJWTDTO = async (req, res, next) => {
  const { jwt } = req;
  if (!jwt) return res.status(401).send({ errors: ['Usuario no autorizado'] });
  try {
    const { payload } = await jwtVerify(
      jwt,
      coder(process.env.JWT_PRIVATE_KEY)
    );
    req.id = payload.id;
    req.uidRol = payload.uidRol;
    req.uidSite = payload.uidSite;
    next();
  } catch (error) {
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  }
};

export default userJWTDTO;
