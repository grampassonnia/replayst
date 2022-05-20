const mongoose = require('./');

const { Schema } = mongoose;

const newUser = new Schema({
  email: { type: String, required: true },
  nickname: String,
  name: { type: String, required: true },
  surname: String,
  password: { type: String, required: true },
  owned: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Game' }]
});

const User = mongoose.model('User', newUser);

module.exports = User;
