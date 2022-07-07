const User = require("../Models/User");
const Customer = require("../Models/Customer");
const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const { join } = require("path");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
	user: "zidieya78@gmail.com",
	pass: process.env.APP_PASS,
    },
    tls: {
	rejectUnauthorized: false,
    },
});
const DOMAIN = process.env.APP_DOMAIN;
const SECRET = process.env.APP_SECRET;
var RefreshTokens = [];
// register of admin
registreAdmin = async(req, res) => {
    try {
	const password = bcrypt.hashSync(req.body.password, 10);
	req.body.image = req.file.filename;
	const admin = new Admin({
	    ...req.body,
	    email: req.body.email,
	    password,
	    verified: true,
	});
	await admin.save();
	res.status(201).json({
	    message: "your account admin is created",
	    data: admin,
	});
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
// register of customer
registerCustomer = async(req, res) => {
    try {
	const password = bcrypt.hashSync(req.body.password, 10);
	req.body["picture"] = "node.png";
	const newCustomer = new Customer({
	    ...req.body,
	    password,
	    verificationCode: randomBytes(6).toString("hex"),
	});
	await newCustomer.save();
	res.status(201).json({
	    message: " Your account is created verify your email address",
	});
	transporter.sendMail({
	    to: newCustomer.email,
	    subject: "welcome" + " " + newCustomer.fullname,
	    text: "Bonjour Mr/Mme",
	    html: `
                    <h2>Hello ${newCustomer.fullname}</h2>
                    <p>we are glad to have you on board at  ${newCustomer.fullname}. </p>
                    <a href="${DOMAIN}verify-now/${newCustomer.verificationCode}">verify now</a>
             `,
	},
			     (err, info) => {
				 if (err) {
				     console.log("error:" + err.message);
				 } else {
				     console.log("Email sent: ", info.response);
				 }
			     }
			    );
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
verifyEmail = async(req, res) => {
    try {
	const user = await User.findOne({
	    verificationCode: req.params.verificationCode,
	});

	user.verified = true;
	user.verificationCode = undefined;
	user.save();
	//console.log(user)
	res.sendFile(join(__dirname, "../Templates/verification_success.html"));
    } catch (error) {
	res.sendFile(join(__dirname, "../Templates/errors.html"));
    }
};
// login function
login = async(req, res) => {
    try {
	// verifcation et compare password //
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
	    return res.status(404).json({
		message: "Email not found",
		status: 404,
	    });
	}
	if (user.verified === true) {
	    const passwordCompare = bcrypt.compareSync(password, user.password);
	    if (!passwordCompare) {
		return res.status(404).json({
		    message: "Password incorrect",
		    status: 404,
		});
	    }
	    //creation token  //
	    const token = jwt.sign({ id: user._id, user: user }, SECRET, {
		expiresIn: "20 h",
	    });
	    const refreshToken = jwt.sign({ id: user._id }, SECRET, {
		expiresIn: "86400",
	    });
	    RefreshTokens[refreshToken] = user._id;

	    const result = {
		email: user.email,
		user: user,
		token: token,
		expiresIn: 20,
		refreshToken,
	    };

	    res.status(200).json({
		...result,
		message: "Hurray! you are now logged in",
		status: 200,
	    });
	} else {
	    return res.status(404).json({
		message: "You are not verified",
		status: 404,
	    });
	}
    } catch (error) {
	res.status(404).json({
	    message: "error is" + error.message,
	});
    }
};
refreshToken = async(req, res) => {
    try {
	var refreshToken = req.body.refreshToken;
	if (refreshToken in RefreshTokens) {
	    const token = jwt.sign({
		user: req.user,
	    },
				   SECRET, {
				       expiresIn: "7h",
				   }
				  );

	    var refreshToken = jwt.sign({ id: req.user }, SECRET, {
		expiresIn: 86400,
	    });
	    RefreshTokens[refreshToken] = req.user._id;

	    res.status(200).json({
		accesstoken: token,
		refreshToken: refreshToken,
	    });
	} else {
	    res.status(404).json({ message: "refresh token not found!" });
	}
    } catch (error) {
	res.status(404).json({ message: "error is" + error.message });
    }
};
// profile function
profile = async(req, res) => {
    try {
	const user = req.user;
	res.status(200).json({ user: user });
    } catch (error) {
	res.status(406).json({ message: "error is" + error.message });
    }
};
// update profile functions
updateProfile = async(req, res) => {
    try {
	await Customer.updateOne({ _id: req.user._id }, req.body);
	return res.status(200).json({ message: "user update" });
    } catch (error) {
	res.status(406).json({ message: "error is" + error.message });
    }
};
// function to reset the password
forgotpassword = async(req, res) => {
    try {
	const email = req.body.email;
	const user = await User.findOne({ email });
	if (!user) {
	    return res
	        .status(406)
	        .json({ message: "user with this email not found" });
	}
	// creation token //
	const token = jwt.sign({ id: user._id, user: user }, SECRET, {
	    expiresIn: "20h",
	});
	await User.findByIdAndUpdate({ _id: user._id }, { resetPasswordToken: token });

	res
	    .status(200)
	    .json({
		token: token,
		message: "Token created chek your email",
		status: 200,
	    });
	transporter.sendMail({
	    to: user.email,
	    subject: "welcome" + " " + user.fullname,
	    text: "Bonjour Mr/Mme",
	    html: `
                  <h2>Hello ${user.fullname}</h2>
                  <p> reset your password  </p>
                  <a href="${DOMAIN}reset-now/${token}">reset-now</a> `,
	});
    } catch (error) {
	res.status(406).json({ message: "error is" + error.message });
    }
};
// reset password
resetpassword = async(req, res) => {
    try {
	const resetPasswordToken = req.params.token;

	if (resetPasswordToken) {
	    jwt.verify(resetPasswordToken, SECRET, async(err) => {
		if (err) {
		    return res.json({ error: "incorrect token or it is expired" });
		}
		const user = await User.findOne({
		    resetPasswordToken: resetPasswordToken,
		});
		user.password = bcrypt.hashSync(req.body.newPass, 10);
		user.save();
		return res.status(200).json({
		    message: "passord has been changed",
		});
	    });
	}
    } catch (error) {
	res.status(404).json({ message: "error is" + error.message });
    }

};
module.exports = {
    registreAdmin,
    registerCustomer,
    verifyEmail,
    login,
    refreshToken,
    profile,
    updateProfile,
    forgotpassword,
    resetpassword,
};
