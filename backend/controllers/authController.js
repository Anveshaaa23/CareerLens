const pool = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const register = async (req, res) => {
  const { name, email, password, stream, education_level, degree } = req.body;

  try {
    // Check if email already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, stream, education_level, degree)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, stream, education_level, degree, role`,
      [name, email, password_hash, stream, education_level, degree]
    );

    const user = result.rows[0];

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: '✅ Account created successfully!',
      token,
      user
    });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: '✅ Logged in successfully!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        stream: user.stream,
        education_level: user.education_level,
        degree: user.degree,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET LOGGED IN USER
const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, stream, education_level, degree, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('GetMe error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE profile after onboarding
const updateProfile = async (req, res) => {
  const { stream, education_level, degree } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `UPDATE users SET stream = $1, education_level = $2, degree = $3 WHERE id = $4
       RETURNING id, name, email, stream, education_level, degree, role`,
      [stream, education_level, degree, user_id]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('updateProfile error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login, getMe, updateProfile };