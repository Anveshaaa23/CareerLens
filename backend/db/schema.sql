-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  stream VARCHAR(100),
  education_level VARCHAR(50),
  degree VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Professionals table
CREATE TABLE IF NOT EXISTS professionals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_title VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  years_of_experience INTEGER,
  linkedin_url VARCHAR(255),
  portfolio_url VARCHAR(255),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Careers table
CREATE TABLE IF NOT EXISTS careers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) UNIQUE NOT NULL,
  domain VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  day_in_life TEXT,
  avg_salary_min INTEGER,
  avg_salary_max INTEGER,
  growth_outlook VARCHAR(50),
  education_required VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50)
);

-- Career skills junction table
CREATE TABLE IF NOT EXISTS career_skills (
  id SERIAL PRIMARY KEY,
  career_id INTEGER REFERENCES careers(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  importance VARCHAR(20) DEFAULT 'must-have'
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  career_id INTEGER REFERENCES careers(id) ON DELETE CASCADE,
  professional_id INTEGER REFERENCES professionals(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  daily_work TEXT,
  skills_that_matter TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Saved careers table
CREATE TABLE IF NOT EXISTS saved_careers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  career_id INTEGER REFERENCES careers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, career_id)
);