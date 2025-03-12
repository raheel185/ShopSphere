import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ status: false, message: "User not authenticated" });
  }
};
