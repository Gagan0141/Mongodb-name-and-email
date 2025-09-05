const User = require('../models/userModel');

// GET all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET single user
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

// POST new user
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};

// PUT replace user
exports.replaceUser = async (req, res) => {
  const user = await User.findOneAndReplace({ _id: req.params.id }, req.body, { new: true });
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

// PATCH update user
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

// DELETE user
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.status(204).send();
};

// HEAD users
exports.headUsers = async (req, res) => {
  res.status(200).end();
};

// OPTIONS users
exports.optionsUsers = (req, res) => {
  res.set('Allow', 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS').send();
};
