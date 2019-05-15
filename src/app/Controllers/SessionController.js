const jwt = require('jsonwebtoken');
const User = require('../models/User');

class SessionController {
  generateToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
  }

  async authenticate(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne(email).select('+password');

    if (!user) return res.status(400).json({ error: 'User not found' });

    if (!(await User.compareHash(password))) return res.status(400).json({ error: 'Invalid password' });

    user.password = undefined;

    const token = this.generateToken({ id: user._id });

    return res.json(user, token);
  }
}

module.exports = new SessionController();
