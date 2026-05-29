const pool = require('../db/index');

// POST a comment — professionals only
const addComment = async (req, res) => {
  const { career_id, body, daily_work, skills_that_matter } = req.body;
  const user_id = req.user.id;

  try {
    // Check if user is a verified professional
    const proResult = await pool.query(
      `SELECT id FROM professionals WHERE user_id = $1`,
      [user_id]
    );

    if (proResult.rows.length === 0) {
      return res.status(403).json({ 
        error: 'Only verified professionals can comment. Please register as a professional first.' 
      });
    }

    const professional_id = proResult.rows[0].id;

    const result = await pool.query(
      `INSERT INTO comments (career_id, professional_id, body, daily_work, skills_that_matter)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [career_id, professional_id, body, daily_work, skills_that_matter]
    );

    res.status(201).json({ 
      message: '✅ Comment added!', 
      comment: result.rows[0] 
    });
  } catch (err) {
    console.error('addComment error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET comments for a career
const getComments = async (req, res) => {
  const { career_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT cm.id, cm.body, cm.daily_work, cm.skills_that_matter, cm.created_at,
              p.job_title, p.company, p.years_of_experience, p.linkedin_url, p.portfolio_url,
              u.name as professional_name
       FROM comments cm
       JOIN professionals p ON cm.professional_id = p.id
       JOIN users u ON p.user_id = u.id
       WHERE cm.career_id = $1
       ORDER BY cm.created_at DESC`,
      [career_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('getComments error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addComment, getComments };