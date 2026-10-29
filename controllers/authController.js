import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    console.log("Registering user with data:", { name, email, password });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

     const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User created:", user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    console.log("User found:", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { register, login }; 



const generateToken = (userId) => {
  return jwt.sign(
    { userId},
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};