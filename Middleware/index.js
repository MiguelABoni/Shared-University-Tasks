const passport = require('passport');
const { PASSPORTGOOGLE } = require('./google.js')

passport.use("GOOGLE", PASSPORTGOOGLE);