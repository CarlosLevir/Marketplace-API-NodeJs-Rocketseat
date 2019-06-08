const User = require('../models/User');

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ error: 'Invalid data' });

    try {
      if (await User.findOne({ email })) return res.status(400).json({ error: 'User already exists' });

      const user = await User.create({
        name,
        email,
        password,
      });

      const token = User.generateToken({ id: user._id });

      user.password = undefined;

      return res.json({ user, token });
    } catch (err) {
      return res.status(400).json({ error: 'Registration failed. Please, verify your data' });
    }
  }

  async show(req, res) {
    const user = await User.findById(req.params.id);

    return res.json(user);
  }
}

module.exports = new UserController();
