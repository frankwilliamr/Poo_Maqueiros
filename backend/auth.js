import jsonwebtoken from 'jsonwebtoken';

export const PRIVATE_KEY = '1010FFF'

export function tokenValited(req, res, next) {

  const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }
  try {
    const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
    const userIdFromToken = typeof payload !== 'string' && payload.user;

    if (!userIdFromToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.headers['user'] = payload.user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}