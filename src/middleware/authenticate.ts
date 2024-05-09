import { BasicStrategy } from "passport-http";
import passport from "passport";

const user = {
  username: process.env.SIMPLE_LOGIN_USERNAME,
  password: process.env.SIMPLE_LOGIN_PASSWORD,
};

passport.use(
  new BasicStrategy(function (username, password, cb) {
    if (username === user.username && password === user.password) {
      return cb(null, user);
    } else {
      return cb(null, false);
    }
  })
);

export default passport.authenticate("basic", { session: false });
