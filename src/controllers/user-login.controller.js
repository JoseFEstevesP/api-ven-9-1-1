import coder from '#Functions/coder.js';
import { Rol } from '#Schemas/rol.schema.js';
import { User } from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';
const userLoginController = async (req, res) => {
  const { ci, password } = req.body;
  const existingUserByCi = await User.findOne({ where: { ci } });
  if (!existingUserByCi)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Credenciales incorrectas' }] });
  const checkPassword = await compare(password, existingUserByCi.password);
  if (!checkPassword)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Credenciales incorrectas' }] });
  const jwtConstructor = new SignJWT({
    id: existingUserByCi.uid,
    uidRol: existingUserByCi.uidRol,
  });
  const { permissions } = await Rol.findByPk(existingUserByCi.uidRol);
  const jwt = await jwtConstructor
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(coder(process.env.JWT_PRIVATE_KEY));
  return res.send({ JWT: jwt, rol: permissions });
};
export default userLoginController;
