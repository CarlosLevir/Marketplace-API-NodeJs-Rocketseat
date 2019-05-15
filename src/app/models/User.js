const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line consistent-return
User.pre('save', async function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

User.methods = {
  comparteHash(password) {
    return bcrypt.compare(password, this.password);
  },
};

User.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  },
};

module.exports = mongoose.model('User', User);
