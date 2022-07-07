const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const SECRET = process.env.APP_SECRET;
const User = require("../Models/User");

// to choose the format of  token
var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
};

passport.use(
    new Strategy(options, async ({ id }, done) => {
	try {
	    const user = await User.findById(id).populate('orders');
	    if (!user) {
		throw new error("User not found");
	    }
	    done(null, user);
	} catch (error) {
	    done(null, error.message);
	}
    })
);
