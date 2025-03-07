// Route for user Login
const loginUser = async (req, res) => {
  res.json({ message: "API Login working" });
};

// Route for user register
const registerUser = async (req, res) => {};

const AdminLogin = async (req, res) => {};

export { loginUser, registerUser, AdminLogin };
