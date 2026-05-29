const pool = require('../db/index');

// GET ALL CAREERS — A to Z with optional domain filter
const getAllCareers = async (req, res) => {
  const { domain, search } = req.query;

  try {
    let query = `
      SELECT c.id, c.title, c.domain, c.description, 
             c.avg_salary_min, c.avg_salary_max, c.growth_outlook,
             c.education_required,
             ARRAY_AGG(s.name ORDER BY s.name) as skills
      FROM careers c
      LEFT JOIN career_skills cs ON c.id = cs.career_id
      LEFT JOIN skills s ON cs.skill_id = s.id
    `;

    const values = [];
    const conditions = [];

    if (domain) {
      values.push(domain);
      conditions.push(`c.domain = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`(c.title ILIKE $${values.length} OR c.description ILIKE $${values.length})`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY c.id ORDER BY c.title ASC';

    const result = await pool.query(query, values);

    res.json({
      count: result.rows.length,
      careers: result.rows
    });

  } catch (err) {
    console.error('getAllCareers error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET SINGLE CAREER by ID — full detail with skills and comments
const getCareerById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get career details
    const careerResult = await pool.query(
      `SELECT c.*,
              ARRAY_AGG(DISTINCT s.name) as skills
       FROM careers c
       LEFT JOIN career_skills cs ON c.id = cs.career_id
       LEFT JOIN skills s ON cs.skill_id = s.id
       WHERE c.id = $1
       GROUP BY c.id`,
      [id]
    );

    if (careerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Career not found' });
    }

    // Get comments for this career
    const commentsResult = await pool.query(
      `SELECT cm.id, cm.body, cm.daily_work, cm.skills_that_matter, cm.created_at,
              p.job_title, p.company, p.years_of_experience, p.linkedin_url,
              u.name as professional_name
       FROM comments cm
       JOIN professionals p ON cm.professional_id = p.id
       JOIN users u ON p.user_id = u.id
       WHERE cm.career_id = $1
       ORDER BY cm.created_at DESC`,
      [id]
    );

    res.json({
      career: careerResult.rows[0],
      comments: commentsResult.rows
    });

  } catch (err) {
    console.error('getCareerById error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET ALL DOMAINS — for filter buttons
const getDomains = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT domain, COUNT(*) as career_count 
       FROM careers 
       GROUP BY domain 
       ORDER BY domain ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('getDomains error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET CAREERS BY STREAM — for onboarding suggestions
const getCareerSuggestions = async (req, res) => {
  const { stream, education_level } = req.query;

  const domainMap = {
    'Science': ['Technology', 'Healthcare', 'Science', 'Engineering'],
    'Commerce': ['Finance', 'Business', 'Marketing', 'Law'],
    'Arts': ['Media', 'Design', 'Arts & Entertainment', 'Education', 'Social Work'],
    'Engineering': ['Technology', 'Engineering', 'Science'],
    'Medical': ['Healthcare', 'Science'],
    'Law': ['Law', 'Government'],
    'Management': ['Business', 'Marketing', 'Finance'],
  };

  const domains = domainMap[stream] || ['Technology', 'Business', 'Design'];

  try {
    const placeholders = domains.map((_, i) => `$${i + 1}`).join(', ');
    const result = await pool.query(
      `SELECT id, title, domain, description, avg_salary_min, avg_salary_max, growth_outlook
       FROM careers
       WHERE domain IN (${placeholders})
       ORDER BY RANDOM()
       LIMIT 6`,
      domains
    );

    res.json(result.rows);
  } catch (err) {
    console.error('getCareerSuggestions error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllCareers,
  getCareerById,
  getDomains,
  getCareerSuggestions
};