/** GOOGLE STRATEGY */
const { Strategy } = require('passport-google-oauth20');

const PASSPORTGOOGLE = new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.REDIRECT_OAUTH}/auth/google/callback`
},
  async function (accessToken, refreshToken, otherTokenDetails, profile, done) {

    const UserObject = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
      token: accessToken
    }

    done(null, UserObject);
  }
);

module.exports = { PASSPORTGOOGLE };