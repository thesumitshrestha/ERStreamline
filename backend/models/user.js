const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      require: [true, 'Please select the role'],
    },
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [8, 'Minimum password length is 8 characters'],
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, 'Please confirm your password'],
    //   validate: {
    //     validator: function (val) {
    //       return val == this.password;
    //     },
    //     message: 'Password and Confirm Password does not match',
    //   },
    // },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  // if (!this.isModified('password')) return next();

  // encrypting password before saving it
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static Method to Login User
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Incorrect Email');
};

module.exports = mongoose.model('User', userSchema);
