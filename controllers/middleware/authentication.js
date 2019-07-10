import JWT from 'jsonwebtoken';
import Client from '../../models/Client';

export default {
  login: async (req, res) => {
    const { email } = req.body;
    const loginFailed = {
      success: false,
      token: null,
    };
    if (!email) {
      return res.status(401).json(loginFailed);
    }

    /*
      for simplicity I will only check that the email exists in the database
      without having in consideration an email/password combination
    */
    const client = await Client.getByEmail(email);
    if (!client.id) {
      return res.status(401).json(loginFailed);
    }
    const token = JWT.sign(
      Object.assign({}, client), // JWT requires a plain object as payload
      'secretKey',
      { expiresIn: '30min' },
    );
    return res.json({ success: true, token });
  },
};
