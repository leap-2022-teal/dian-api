const jwt = require('jsonwebtoken');

export default async function auth(req: any, res: any, next: any) {
  const authString = req.header('Authorization');
  if (!authString) {
    return res.sendStatus(403);
  }

  const token = authString.split(' ').pop();
  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.sendStatus(403);
    }

    const { userId, role } = decoded;
    req.userId = userId;
    req.role = role;
    next();
  } else {
    res.sendStatus(400);
  }
}
