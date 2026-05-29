const pool = require('../db/index');

// SAVE a career
const saveCareer = async (req, res) => {
  const { career_id } = req.body;
  const user_id = req.user.id;

  try {
    await pool.query(
      `INSERT INTO saved_careers (user_id, career_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [user_id, career_id]
    );
    res.json({ message: '✅ Career saved!' });
  } catch (err) {
    console.error('saveCareer error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UNSAVE a career
const unsaveCareer = async (req, res) => {
  const { career_id } = req.params;
  const user_id = req.user.id;

  try {
    await pool.query(
      `DELETE FROM saved_careers WHERE user_id = $1 AND career_id = $2`,
      [user_id, career_id]
    );
    res.json({ message: '✅ Career removed from saved!' });
  } catch (err) {
    console.error('unsaveCareer error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET all saved careers for logged in user
const getSavedCareers = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT c.id, c.title, c.domain, c.description, 
              c.avg_salary_min, c.avg_salary_max, c.growth_outlook,
              sc.created_at as saved_at
       FROM saved_careers sc
       JOIN careers c ON sc.career_id = c.id
       WHERE sc.user_id = $1
       ORDER BY sc.created_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('getSavedCareers error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
// CHECK if a specific career is saved
const checkSaved = async (req, res) => {
  const { career_id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT id FROM saved_careers WHERE user_id = $1 AND career_id = $2`,
      [user_id, career_id]
    );
    res.json({ saved: result.rows.length > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { saveCareer, unsaveCareer, getSavedCareers, checkSaved };