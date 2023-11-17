const User = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtSecret =
  '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd';

// const getBed = async (req, res) => {
//   const bed = await Bed.find({}).sort({ createdAt: -1 });
//   res.status(200).json(bed);
// };

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const expiryDate = new Date(Date.now() + 3600000); // 1 hour
const createToken = (id) => {
  return jwt.sign({ id }, jwtSecret);
};

// Create new User
const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!password) {
    emptyFields.push('password');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      maxAge: maxAge * 1000,
      httpOnly: true, // recommended for security
      secure: false, // set to true if using HTTPS
      sameSite: 'None', // only if using HTTPS
    });

    res
      .status(201)
      .json({ message: 'User Successfully Created', user: user._id });
  } catch (error) {
    // const errors = handleErrors(err);
    res
      .status(400)
      .json({ message: 'User not successfully created', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    console.log('USERRRRR IN USER.LOGIN IS', user);
    // const token = createToken(user._id);
    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.cookie('jwt', token, {
      maxAge: maxAge * 1000,
      // expires: expiryDate,
      httpOnly: true, // recommended for security
      // secure: false, // set to true if using HTTPS
      // sameSite: 'None', // only if using HTTPS
    });

    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({});
  }
};

const logout = (req, res) => {
  res.cookie('access_token', '', { httpOnly: true, maxAge: 1 });
  res.status(200).json({ message: 'User logged Out' });
};

module.exports = {
  signUp,
  login,
  logout,
};
