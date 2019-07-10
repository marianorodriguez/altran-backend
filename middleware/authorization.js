import JWT from 'jsonwebtoken';

export default {
  hasRole: role => (req, res, next) => {
    const { token } = req.headers;
    try {
      const user = JWT.verify(token, 'secretKey');
      if (user.role === role) {
        return next();
      }
      return res.status(401).json({ error: { message: `${role} role needed` } });
    } catch (e) {
      return res.status(401).json({ error: e });
    }
  },
};
