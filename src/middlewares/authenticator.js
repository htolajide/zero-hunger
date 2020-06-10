import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send({
    status: 'Error',
    message: 'You have not been authenticated!'
  });

  try {
    const user = jwt.decode(token, process.env.SECRET);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).send({
      message: 'authentication failed',
      data: error,
    });
  }
};
