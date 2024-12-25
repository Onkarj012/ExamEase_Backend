const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

// User Signup (Create a new user)
exports.signup = async (req, res) => {
  const { username, full_name, phone_number, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await db.query(
      'INSERT INTO users (username, full_name, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, full_name, phone_number, hashedPassword]
    );

    const newUser = result.rows[0];

    // Return success
    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: newUser.username,
        full_name: newUser.full_name,
        phone_number: newUser.phone_number,
        created_at: newUser.created_at
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// User Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
