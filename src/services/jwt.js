import jwt from 'jwt-simple'
import moment from 'moment'
const secret = '2jBzWe[*<rb.GV`M*(N+-J+.euC'

exports.createToken = (user) => {
  let payload = {
    sub: user._id,
    nombre: user.nombre,
    apellidos: user.apellidos,
    username: user.username,
    role: user.role,
    email: user.email,
    image: user.image,
    iat: moment(). unix(),
    exp: moment().add(6, 'days').unix()
  }

  return jwt.encode(payload, secret)
}