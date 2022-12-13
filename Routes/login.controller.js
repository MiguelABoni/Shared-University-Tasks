const express = require('express');
const passport = require('passport');

const UsersRouter = express.Router();

/** LOGIN - GOOGLE */
UsersRouter.get('/auth/google',
  passport.authenticate('GOOGLE', {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/calendar.events.readonly",
      "https://www.googleapis.com/auth/calendar.settings.readonly",
    ], session: false
  })
);

UsersRouter.get('/auth/google/callback',
  passport.authenticate('GOOGLE', { failureRedirect: '/404', session: false }),
  async function (request, response) {

    const UserGoogle = request.user;

    response.cookie('GoogleToken', UserGoogle.token);
    response.json(UserGoogle);
  }
);

module.exports = UsersRouter;