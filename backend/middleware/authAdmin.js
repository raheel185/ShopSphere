import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        status: false,
        message: "Access Denied! No Token Provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.admin) {
      return res.json({ status: false, message: "Forbidden! Admins only." });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

export default authAdmin;
