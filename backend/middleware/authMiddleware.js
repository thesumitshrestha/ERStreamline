const jwt = require('jsonwebtoken');
const jwtSecret =
  '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd';
const User = require('../models/user');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('TOKEN IN MIDDLEWARE IS', token);

  // check json web token exists & is verified
  if (token) {
    try {
      const decoded = jwt.verify(process, jwtSecret);
      const user = await User.findById(decoded.id).select('-password');
      res.render('/patient-lab-reports/');
    } catch (error) {
      res.status(401);
      // throw new Error('Not Authorized, No Token');
    }
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log('ERROR MESSAGE', err.message);
        res.redirect('/login');
      } else {
        console.log('DECODED TOKEN IS', decodedToken);
        next();
      }
    });
  } else {
    res.status(401);
    console.log('HERE IN 401 ELSE');
    // throw new Error('Not Authorized, No Token');
  }
};

module.exports = { requireAuth };
