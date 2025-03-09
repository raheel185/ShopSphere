import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Creating token

function createToken(id) {
  return jwt.sign({ id, admin: false }, process.env.JWT_SECRET);
}

// Route for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    } else {
      let password_from_db = user.password;

      const pw_match = await bcrypt.compare(password, password_from_db);

      if (!pw_match) {
        return res.json({ success: false, message: "Incorrect password" });
      }

      const token = createToken(user._id);

      return res.json({
        success: true,
        message: "Login successfull",
        token,
      });
    }
  } catch (error) {}
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists!" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const NewUser = new userModel({
      name,
      email,
      password: hashpassword,
    });

    const user = await NewUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      res.json({ success: false, message: "Incorrect email or password" });
    }

    const token = jwt.sign({ email, admin: true }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ status: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, AdminLogin };
