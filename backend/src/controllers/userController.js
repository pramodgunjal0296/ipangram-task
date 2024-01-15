const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xl";

exports.login = async (req, res) => {
  try {
    const { employee_id, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ employee_id });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.signup = async (req, res) => {
  try {
    const { employee_id, password, department, role, location } = req.body;

    const user = new User({
      employee_id,
      password,
      department,
      role,
      location,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
