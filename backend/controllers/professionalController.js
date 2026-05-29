const pool = require('../db/index');

// REGISTER as a professional
const registerProfessional = async (req, res) => {
  const { job_title, company, years_of_experience, linkedin_url, portfolio_url } = req.body;
  const user_id = req.user.id;

  try {
    // Check if already registered
    const existing = await pool.query(
      `SELECT id FROM professionals WHERE user_id = $1`,
      [user_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Already registered as a professional' });
    }

    const result = await pool.query(
      `INSERT INTO professionals (user_id, job_title, company, years_of_experience, linkedin_url, portfolio_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, job_title, company, years_of_experience, linkedin_url, portfolio_url]
    );

    // Update user role to professional
    await pool.query(
      `UPDATE users SET role = 'professional' WHERE id = $1`,
      [user_id]
    );

    res.status(201).json({
      message: '✅ Registered as a professional! You can now comment on careers.',
      professional: result.rows[0]
    });
  } catch (err) {
    console.error('registerProfessional error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET professional profile
const getProfessionalProfile = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT p.*, u.name, u.email 
       FROM professionals p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = $1`,
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Professional profile not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('getProfessionalProfile error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { registerProfessional, getProfessionalProfile };