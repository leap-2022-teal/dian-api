const jwt = require('jsonwebtoken');

export default async function auth(req: any, res: any, next: any) {
  const authString = req.header('Authorization');
  console.log(authString);
  if (!authString) {
    return res.sendStatus(403);
  }

  const token = authString.split(' ').pop();
  console.log('tokent', token);
  console.log('SECRET_KEY', process.env.SECRET_KEY);
  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.sendStatus(403);
    }

    const { userId } = decoded;
    req.userId = userId;
    console.log('userId', userId);
    next();
  } else {
    res.sendStatus(400);
  }
}
