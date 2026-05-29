const pool = require('./index');

const careers = [
  // TECHNOLOGY
  {
    title: "Software Engineer",
    domain: "Technology",
    description: "Design, develop and maintain software applications and systems. Work with teams to build products used by millions of people.",
    day_in_life: "Writing and reviewing code, attending team standups, debugging issues, collaborating with designers and product managers.",
    avg_salary_min: 600000, avg_salary_max: 2500000, growth_outlook: "Excellent",
    education_required: "B.Tech/B.E in Computer Science or related field",
    skills: ["Programming", "Data Structures", "Problem Solving", "Git", "Communication"]
  },
  {
    title: "Data Scientist",
    domain: "Technology",
    description: "Analyse large datasets to find patterns and insights that help businesses make better decisions using statistics and machine learning.",
    day_in_life: "Cleaning data, building ML models, creating visualisations, presenting findings to stakeholders.",
    avg_salary_min: 700000, avg_salary_max: 2800000, growth_outlook: "Excellent",
    education_required: "B.Tech/B.Sc in CS, Statistics or Mathematics",
    skills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualisation"]
  },
  {
    title: "Cybersecurity Analyst",
    domain: "Technology",
    description: "Protect organisations from digital attacks by monitoring systems, finding vulnerabilities and responding to threats.",
    day_in_life: "Monitoring security alerts, running penetration tests, patching vulnerabilities, writing security reports.",
    avg_salary_min: 600000, avg_salary_max: 2500000, growth_outlook: "Excellent",
    education_required: "B.Tech in CS or IT — certifications like CEH, CISSP are a big plus",
    skills: ["Network Security", "Ethical Hacking", "Linux", "Cryptography", "Problem Solving"]
  },
  {
    title: "DevOps Engineer",
    domain: "Technology",
    description: "Bridge the gap between development and operations by automating deployments, managing infrastructure and ensuring system reliability.",
    day_in_life: "Managing cloud infrastructure, setting up CI/CD pipelines, monitoring systems, automating repetitive tasks.",
    avg_salary_min: 700000, avg_salary_max: 2800000, growth_outlook: "Excellent",
    education_required: "B.Tech in CS or IT — AWS/Azure certifications a big plus",
    skills: ["Docker", "Kubernetes", "Linux", "CI/CD", "Cloud Platforms"]
  },
  {
    title: "Machine Learning Engineer",
    domain: "Technology",
    description: "Build and deploy machine learning models and AI systems that power intelligent products and services.",
    day_in_life: "Training ML models, optimising algorithms, deploying models to production, collaborating with data scientists.",
    avg_salary_min: 800000, avg_salary_max: 3500000, growth_outlook: "Excellent",
    education_required: "B.Tech in CS or related — strong maths background needed",
    skills: ["Python", "TensorFlow", "PyTorch", "Mathematics", "Cloud Platforms"]
  },
  {
    title: "Mobile App Developer",
    domain: "Technology",
    description: "Build applications for iOS and Android devices that people use every day for shopping, communication, entertainment and more.",
    day_in_life: "Writing app code, testing on devices, fixing bugs, releasing updates on app stores.",
    avg_salary_min: 500000, avg_salary_max: 2200000, growth_outlook: "Good",
    education_required: "B.Tech in CS or self-taught with strong portfolio",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "API Integration"]
  },
  {
    title: "Cloud Architect",
    domain: "Technology",
    description: "Design and oversee an organisation's cloud computing strategy including cloud adoption plans and cloud application design.",
    day_in_life: "Designing cloud solutions, reviewing architecture, working with engineering teams, managing cloud costs.",
    avg_salary_min: 1200000, avg_salary_max: 4000000, growth_outlook: "Excellent",
    education_required: "B.Tech with cloud certifications like AWS Solutions Architect",
    skills: ["AWS", "Azure", "System Design", "Networking", "Security"]
  },
  {
    title: "Blockchain Developer",
    domain: "Technology",
    description: "Build decentralised applications and smart contracts on blockchain platforms for finance, supply chain and more.",
    day_in_life: "Writing smart contracts, building DApps, auditing code for security, staying updated on blockchain trends.",
    avg_salary_min: 800000, avg_salary_max: 3500000, growth_outlook: "Good",
    education_required: "B.Tech in CS — strong programming background needed",
    skills: ["Solidity", "Ethereum", "Web3.js", "Cryptography", "JavaScript"]
  },
  // DESIGN
  {
    title: "UX Designer",
    domain: "Design",
    description: "Create meaningful and enjoyable experiences for users by designing interfaces, flows and interactions for apps and websites.",
    day_in_life: "Conducting user research, creating wireframes, designing prototypes, testing with real users.",
    avg_salary_min: 500000, avg_salary_max: 2000000, growth_outlook: "Good",
    education_required: "Degree in Design, Psychology or any field with a strong portfolio",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping", "Empathy"]
  },
  {
    title: "Graphic Designer",
    domain: "Design",
    description: "Create visual content for brands, marketing, social media and print using design tools and creative thinking.",
    day_in_life: "Designing logos, social media posts, brochures, presentations and illustrations for clients.",
    avg_salary_min: 300000, avg_salary_max: 1200000, growth_outlook: "Good",
    education_required: "Degree or diploma in Graphic Design or Fine Arts",
    skills: ["Adobe Photoshop", "Illustrator", "Typography", "Creativity", "Branding"]
  },
  {
    title: "Motion Graphics Designer",
    domain: "Design",
    description: "Create animated visual content for videos, ads, social media and films using animation and design tools.",
    day_in_life: "Animating logos and graphics, creating video intros, working with video editors and marketing teams.",
    avg_salary_min: 350000, avg_salary_max: 1500000, growth_outlook: "Good",
    education_required: "Degree in Design or Animation — strong portfolio needed",
    skills: ["After Effects", "Premiere Pro", "Illustrator", "Animation", "Storytelling"]
  },
  {
    title: "Fashion Designer",
    domain: "Design",
    description: "Create clothing, accessories and footwear by combining creativity, trends and technical skills.",
    day_in_life: "Sketching designs, selecting fabrics, overseeing production, attending fashion shows, meeting clients.",
    avg_salary_min: 300000, avg_salary_max: 2000000, growth_outlook: "Stable",
    education_required: "Degree from NIFT, NID or similar fashion institutes",
    skills: ["Sketching", "Fabric Knowledge", "Trend Forecasting", "Sewing", "Creativity"]
  },
  {
    title: "Interior Designer",
    domain: "Design",
    description: "Plan and design interior spaces for homes, offices and commercial spaces to make them functional and beautiful.",
    day_in_life: "Meeting clients, creating mood boards, selecting furniture and materials, supervising contractors.",
    avg_salary_min: 350000, avg_salary_max: 1800000, growth_outlook: "Good",
    education_required: "Degree or diploma in Interior Design",
    skills: ["AutoCAD", "3D Visualisation", "Space Planning", "Creativity", "Client Management"]
  },
  // BUSINESS
  {
    title: "Product Manager",
    domain: "Business",
    description: "Own the vision and strategy of a product. Work between business, design and engineering to build the right things for users.",
    day_in_life: "Writing product specs, prioritising features, talking to customers, running meetings, analysing metrics.",
    avg_salary_min: 800000, avg_salary_max: 3000000, growth_outlook: "Excellent",
    education_required: "Any degree — MBA is a plus but not required",
    skills: ["Strategic Thinking", "Communication", "Data Analysis", "Leadership", "Problem Solving"]
  },
  {
    title: "Business Analyst",
    domain: "Business",
    description: "Bridge the gap between business needs and technology solutions by analysing processes and recommending improvements.",
    day_in_life: "Gathering requirements, creating process diagrams, writing specifications, liaising between business and tech teams.",
    avg_salary_min: 500000, avg_salary_max: 2000000, growth_outlook: "Good",
    education_required: "BBA, B.Tech or any degree — MBA is a plus",
    skills: ["Data Analysis", "Communication", "Problem Solving", "SQL", "Excel"]
  },
  {
    title: "Human Resources Manager",
    domain: "Business",
    description: "Manage recruitment, employee relations, performance management and organisational culture.",
    day_in_life: "Interviewing candidates, handling employee issues, running performance reviews, planning team activities.",
    avg_salary_min: 400000, avg_salary_max: 1800000, growth_outlook: "Stable",
    education_required: "BBA, MBA in HR or any degree with HR certification",
    skills: ["Communication", "Empathy", "Recruitment", "Conflict Resolution", "Organisation"]
  },
  {
    title: "Supply Chain Manager",
    domain: "Business",
    description: "Oversee the flow of goods from suppliers to customers, optimising cost, speed and quality.",
    day_in_life: "Coordinating with suppliers, tracking shipments, managing inventory, solving logistics problems.",
    avg_salary_min: 500000, avg_salary_max: 2200000, growth_outlook: "Good",
    education_required: "B.Tech in Industrial Engineering or MBA in Operations",
    skills: ["Logistics", "Data Analysis", "Negotiation", "ERP Systems", "Problem Solving"]
  },
  {
    title: "Entrepreneur",
    domain: "Business",
    description: "Build and run your own business from scratch — identify a problem, create a solution and grow a company around it.",
    day_in_life: "Meeting investors, building products, hiring team members, handling finances, pitching to customers.",
    avg_salary_min: 0, avg_salary_max: 10000000, growth_outlook: "Variable",
    education_required: "No formal requirement — but business knowledge and resilience are key",
    skills: ["Leadership", "Risk Taking", "Communication", "Financial Management", "Networking"]
  },
  // FINANCE
  {
    title: "Chartered Accountant",
    domain: "Finance",
    description: "Manage financial records, audits, tax planning and compliance for individuals and organisations.",
    day_in_life: "Reviewing financial statements, filing tax returns, auditing accounts, advising clients on financial decisions.",
    avg_salary_min: 600000, avg_salary_max: 2500000, growth_outlook: "Stable",
    education_required: "CA qualification from ICAI after completing B.Com or any graduation",
    skills: ["Accounting", "Taxation", "Auditing", "Tally", "Attention to Detail"]
  },
  {
    title: "Financial Analyst",
    domain: "Finance",
    description: "Analyse financial data to help businesses and individuals make investment and budgeting decisions.",
    day_in_life: "Building financial models, analysing company performance, preparing reports, presenting recommendations.",
    avg_salary_min: 500000, avg_salary_max: 2200000, growth_outlook: "Good",
    education_required: "B.Com, BBA or B.Tech — CFA certification is a big plus",
    skills: ["Excel", "Financial Modelling", "Data Analysis", "Accounting", "Communication"]
  },
  {
    title: "Investment Banker",
    domain: "Finance",
    description: "Help companies raise capital, execute mergers and acquisitions and advise on major financial transactions.",
    day_in_life: "Building pitch decks, financial modelling, client meetings, due diligence on deals.",
    avg_salary_min: 1000000, avg_salary_max: 5000000, growth_outlook: "Good",
    education_required: "B.Com, BBA or B.Tech — MBA from top institute preferred",
    skills: ["Financial Modelling", "Valuation", "Excel", "Communication", "Attention to Detail"]
  },
  {
    title: "Stock Market Trader",
    domain: "Finance",
    description: "Buy and sell financial instruments like stocks, bonds and derivatives to generate returns for clients or yourself.",
    day_in_life: "Monitoring markets, analysing charts, executing trades, managing risk, staying updated on financial news.",
    avg_salary_min: 400000, avg_salary_max: 5000000, growth_outlook: "Variable",
    education_required: "B.Com, BBA or any degree — SEBI certification needed",
    skills: ["Technical Analysis", "Risk Management", "Mathematics", "Decision Making", "Discipline"]
  },
  {
    title: "Insurance Advisor",
    domain: "Finance",
    description: "Help individuals and businesses choose the right insurance policies to protect against financial risk.",
    day_in_life: "Meeting clients, explaining policies, processing claims, building a client portfolio.",
    avg_salary_min: 300000, avg_salary_max: 1500000, growth_outlook: "Stable",
    education_required: "Any degree — IRDAI licence required",
    skills: ["Communication", "Sales", "Product Knowledge", "Client Relationship", "Empathy"]
  },
  // HEALTHCARE
  {
    title: "Doctor (MBBS)",
    domain: "Healthcare",
    description: "Diagnose and treat patients, prevent illness and promote health in hospitals, clinics or communities.",
    day_in_life: "Examining patients, reviewing test reports, prescribing medicines, performing procedures.",
    avg_salary_min: 800000, avg_salary_max: 3000000, growth_outlook: "Excellent",
    education_required: "MBBS from a recognised medical college after clearing NEET",
    skills: ["Medical Knowledge", "Diagnosis", "Empathy", "Attention to Detail", "Communication"]
  },
  {
    title: "Dentist",
    domain: "Healthcare",
    description: "Diagnose and treat problems with teeth, gums and the mouth to improve oral health.",
    day_in_life: "Examining patients, performing dental procedures, advising on oral hygiene, managing a dental clinic.",
    avg_salary_min: 600000, avg_salary_max: 2500000, growth_outlook: "Good",
    education_required: "BDS degree after clearing NEET",
    skills: ["Dental Procedures", "Patient Care", "Attention to Detail", "Manual Dexterity", "Communication"]
  },
  {
    title: "Physiotherapist",
    domain: "Healthcare",
    description: "Help patients recover from injuries, surgeries and chronic conditions through physical exercises and therapy.",
    day_in_life: "Assessing patients, designing therapy programmes, conducting sessions, tracking recovery progress.",
    avg_salary_min: 350000, avg_salary_max: 1500000, growth_outlook: "Good",
    education_required: "BPT (Bachelor of Physiotherapy) degree",
    skills: ["Anatomy Knowledge", "Exercise Therapy", "Patient Care", "Empathy", "Communication"]
  },
  {
    title: "Nurse",
    domain: "Healthcare",
    description: "Provide direct patient care, administer medications and support doctors in hospitals, clinics and homes.",
    day_in_life: "Monitoring patients, giving medications, assisting in procedures, updating patient records.",
    avg_salary_min: 300000, avg_salary_max: 1200000, growth_outlook: "Excellent",
    education_required: "B.Sc Nursing or GNM diploma",
    skills: ["Patient Care", "Medical Knowledge", "Empathy", "Attention to Detail", "Teamwork"]
  },
  {
    title: "Psychologist",
    domain: "Healthcare",
    description: "Study human behaviour and mental processes to help people overcome emotional, mental and behavioural challenges.",
    day_in_life: "Conducting therapy sessions, psychological assessments, writing reports, researching mental health topics.",
    avg_salary_min: 400000, avg_salary_max: 2000000, growth_outlook: "Excellent",
    education_required: "M.Sc or M.A in Psychology — RCI registration for clinical practice",
    skills: ["Empathy", "Active Listening", "Assessment", "Communication", "Research"]
  },
  // LAW
  {
    title: "Lawyer",
    domain: "Law",
    description: "Represent clients in legal matters, provide legal advice and help navigate the justice system.",
    day_in_life: "Researching case law, drafting legal documents, appearing in court, advising clients.",
    avg_salary_min: 400000, avg_salary_max: 3000000, growth_outlook: "Good",
    education_required: "LLB degree — 3 years after graduation or 5-year integrated BA LLB",
    skills: ["Legal Research", "Argumentation", "Writing", "Negotiation", "Critical Thinking"]
  },
  {
    title: "Judge",
    domain: "Law",
    description: "Preside over court proceedings, interpret laws and deliver judgements in civil and criminal cases.",
    day_in_life: "Hearing cases, reviewing legal arguments, writing judgements, managing courtroom proceedings.",
    avg_salary_min: 800000, avg_salary_max: 2500000, growth_outlook: "Stable",
    education_required: "LLB degree — must clear judicial services exam or be elevated from legal practice",
    skills: ["Legal Knowledge", "Impartiality", "Decision Making", "Writing", "Integrity"]
  },
  {
    title: "Legal Advisor (Corporate)",
    domain: "Law",
    description: "Provide legal guidance to companies on contracts, compliance, mergers, intellectual property and disputes.",
    day_in_life: "Reviewing contracts, advising management, handling regulatory compliance, managing legal risks.",
    avg_salary_min: 700000, avg_salary_max: 3500000, growth_outlook: "Good",
    education_required: "LLB degree — LLM or MBA is a plus",
    skills: ["Contract Law", "Corporate Law", "Negotiation", "Communication", "Attention to Detail"]
  },
  // ENGINEERING
  {
    title: "Mechanical Engineer",
    domain: "Engineering",
    description: "Design, develop and maintain mechanical systems and machines used in manufacturing, automotive, aerospace and more.",
    day_in_life: "Creating CAD designs, testing prototypes, analysing failures, working with production teams.",
    avg_salary_min: 400000, avg_salary_max: 1800000, growth_outlook: "Stable",
    education_required: "B.Tech/B.E in Mechanical Engineering",
    skills: ["CAD/CAM", "Thermodynamics", "Problem Solving", "AutoCAD", "Manufacturing Processes"]
  },
  {
    title: "Civil Engineer",
    domain: "Engineering",
    description: "Plan, design and oversee construction of infrastructure like roads, bridges, buildings and water systems.",
    day_in_life: "Visiting construction sites, reviewing blueprints, coordinating contractors, ensuring safety standards.",
    avg_salary_min: 400000, avg_salary_max: 1800000, growth_outlook: "Stable",
    education_required: "B.Tech/B.E in Civil Engineering",
    skills: ["AutoCAD", "Structural Analysis", "Project Management", "Problem Solving", "Communication"]
  },
  {
    title: "Electrical Engineer",
    domain: "Engineering",
    description: "Design and develop electrical systems and equipment for power generation, electronics and communication.",
    day_in_life: "Designing circuits, testing equipment, troubleshooting electrical issues, working with contractors.",
    avg_salary_min: 400000, avg_salary_max: 1800000, growth_outlook: "Stable",
    education_required: "B.Tech/B.E in Electrical Engineering",
    skills: ["Circuit Design", "MATLAB", "Power Systems", "Problem Solving", "AutoCAD"]
  },
  {
    title: "Architect",
    domain: "Engineering",
    description: "Design buildings and spaces that are functional, safe and beautiful — from homes to skyscrapers.",
    day_in_life: "Drawing building plans, meeting clients, visiting construction sites, working with engineers.",
    avg_salary_min: 400000, avg_salary_max: 2000000, growth_outlook: "Stable",
    education_required: "B.Arch degree — 5 year programme",
    skills: ["AutoCAD", "3D Modelling", "Creativity", "Structural Knowledge", "Client Communication"]
  },
  {
    title: "Chemical Engineer",
    domain: "Engineering",
    description: "Apply chemistry and engineering principles to design processes for manufacturing chemicals, food, pharmaceuticals and more.",
    day_in_life: "Designing production processes, running experiments, ensuring safety compliance, optimising plant operations.",
    avg_salary_min: 450000, avg_salary_max: 2000000, growth_outlook: "Stable",
    education_required: "B.Tech/B.E in Chemical Engineering",
    skills: ["Process Design", "Chemistry", "Safety Management", "Problem Solving", "MATLAB"]
  },
  // MEDIA
  {
    title: "Content Writer",
    domain: "Media",
    description: "Create written content for websites, blogs, social media, marketing and more across all industries.",
    day_in_life: "Researching topics, writing articles and blogs, editing drafts, working with SEO guidelines.",
    avg_salary_min: 250000, avg_salary_max: 1000000, growth_outlook: "Good",
    education_required: "Any degree — strong command of English and writing portfolio needed",
    skills: ["Writing", "Research", "SEO", "Editing", "Creativity"]
  },
  {
    title: "Journalist",
    domain: "Media",
    description: "Research, investigate and report news and stories for newspapers, magazines, TV and online media.",
    day_in_life: "Researching stories, interviewing sources, writing articles, meeting deadlines, fact-checking.",
    avg_salary_min: 300000, avg_salary_max: 1500000, growth_outlook: "Stable",
    education_required: "Degree in Journalism, Mass Communication or any field",
    skills: ["Writing", "Research", "Interviewing", "Storytelling", "Fact Checking"]
  },
  {
    title: "Video Editor",
    domain: "Media",
    description: "Edit raw video footage into polished content for films, YouTube, ads, documentaries and social media.",
    day_in_life: "Cutting and assembling footage, adding music and effects, colour grading, working with directors.",
    avg_salary_min: 300000, avg_salary_max: 1500000, growth_outlook: "Good",
    education_required: "Degree in Mass Communication or Film — strong portfolio needed",
    skills: ["Premiere Pro", "After Effects", "Colour Grading", "Storytelling", "Attention to Detail"]
  },
  {
    title: "Photographer",
    domain: "Media",
    description: "Capture compelling images for weddings, brands, news, fashion, wildlife and more.",
    day_in_life: "Shooting photos on location, editing images, meeting clients, building portfolio.",
    avg_salary_min: 250000, avg_salary_max: 2000000, growth_outlook: "Stable",
    education_required: "Diploma or degree in Photography — strong portfolio is most important",
    skills: ["Camera Operation", "Lighting", "Photoshop", "Creativity", "Client Communication"]
  },
  {
    title: "Social Media Manager",
    domain: "Media",
    description: "Manage a brand's presence on social media platforms by creating content, engaging audiences and growing followers.",
    day_in_life: "Creating posts, writing captions, replying to comments, analysing engagement, planning campaigns.",
    avg_salary_min: 300000, avg_salary_max: 1200000, growth_outlook: "Good",
    education_required: "Any degree — certifications in social media marketing a plus",
    skills: ["Content Creation", "Copywriting", "Analytics", "Creativity", "Communication"]
  },
  // EDUCATION
  {
    title: "School Teacher",
    domain: "Education",
    description: "Educate and inspire students in schools by teaching subjects, building character and shaping young minds.",
    day_in_life: "Teaching classes, preparing lesson plans, grading assignments, meeting parents, organising activities.",
    avg_salary_min: 300000, avg_salary_max: 1000000, growth_outlook: "Stable",
    education_required: "B.Ed degree along with subject specialisation",
    skills: ["Subject Knowledge", "Communication", "Patience", "Creativity", "Classroom Management"]
  },
  {
    title: "Professor",
    domain: "Education",
    description: "Teach at university level, conduct research and contribute to academic knowledge in your field.",
    day_in_life: "Taking lectures, guiding research students, publishing papers, attending conferences, grading.",
    avg_salary_min: 600000, avg_salary_max: 2000000, growth_outlook: "Stable",
    education_required: "PhD in relevant subject — NET/SET qualification required for government colleges",
    skills: ["Research", "Subject Expertise", "Communication", "Writing", "Mentoring"]
  },
  {
    title: "Education Counsellor",
    domain: "Education",
    description: "Guide students in choosing the right courses, colleges and career paths based on their interests and abilities.",
    day_in_life: "Counselling students, conducting aptitude tests, researching college options, meeting parents.",
    avg_salary_min: 350000, avg_salary_max: 1200000, growth_outlook: "Good",
    education_required: "Degree in Psychology, Education or Counselling",
    skills: ["Counselling", "Empathy", "Communication", "Knowledge of Education Systems", "Patience"]
  },
  // GOVERNMENT
  {
    title: "Civil Services Officer (IAS/IPS)",
    domain: "Government",
    description: "Serve the nation by managing administration, law enforcement and public policy at district, state and national levels.",
    day_in_life: "Meeting citizens, reviewing government schemes, coordinating with departments, making policy decisions.",
    avg_salary_min: 560000, avg_salary_max: 1500000, growth_outlook: "Stable",
    education_required: "Any graduation — must clear UPSC Civil Services Examination",
    skills: ["Leadership", "Decision Making", "Communication", "General Knowledge", "Integrity"]
  },
  {
    title: "Defence Officer (Army/Navy/Air Force)",
    domain: "Government",
    description: "Serve in the Indian Armed Forces protecting national security, leading troops and managing defence operations.",
    day_in_life: "Physical training, leading missions, strategic planning, managing troops, attending briefings.",
    avg_salary_min: 600000, avg_salary_max: 2000000, growth_outlook: "Stable",
    education_required: "Any graduation — must clear NDA, CDS or AFCAT examination",
    skills: ["Leadership", "Physical Fitness", "Discipline", "Decision Making", "Teamwork"]
  },
  {
    title: "Bank PO (Probationary Officer)",
    domain: "Government",
    description: "Work in public sector banks managing accounts, loans, customer service and branch operations.",
    day_in_life: "Handling customer queries, processing loans, managing accounts, attending training programmes.",
    avg_salary_min: 450000, avg_salary_max: 1200000, growth_outlook: "Stable",
    education_required: "Any graduation — must clear IBPS PO or SBI PO examination",
    skills: ["Banking Knowledge", "Communication", "Mathematics", "Customer Service", "Integrity"]
  },
  // ARTS & ENTERTAINMENT
  {
    title: "Actor",
    domain: "Arts & Entertainment",
    description: "Perform in films, TV shows, theatre and web series bringing characters to life through expression and emotion.",
    day_in_life: "Learning scripts, attending rehearsals, shooting scenes, working with directors, promoting projects.",
    avg_salary_min: 200000, avg_salary_max: 10000000, growth_outlook: "Variable",
    education_required: "No formal requirement — acting school or drama degree helpful",
    skills: ["Acting", "Dialogue Delivery", "Emotional Range", "Physical Fitness", "Networking"]
  },
  {
    title: "Musician",
    domain: "Arts & Entertainment",
    description: "Create, perform and record music across genres — from classical to pop, film scores to independent artists.",
    day_in_life: "Practising instruments, composing music, recording in studios, performing live, collaborating with artists.",
    avg_salary_min: 200000, avg_salary_max: 5000000, growth_outlook: "Variable",
    education_required: "Degree from music college or self-taught with strong performance portfolio",
    skills: ["Music Theory", "Instrument Proficiency", "Composition", "Performance", "Creativity"]
  },
  {
    title: "Game Developer",
    domain: "Arts & Entertainment",
    description: "Design and build video games — from mobile games to AAA titles — combining programming and creativity.",
    day_in_life: "Writing game code, designing levels, testing gameplay, fixing bugs, collaborating with artists.",
    avg_salary_min: 500000, avg_salary_max: 2500000, growth_outlook: "Good",
    education_required: "B.Tech in CS or degree in Game Design",
    skills: ["Unity/Unreal Engine", "C++/C#", "Game Design", "3D Modelling", "Problem Solving"]
  },
  // SCIENCE & RESEARCH
  {
    title: "Research Scientist",
    domain: "Science",
    description: "Conduct original research to expand human knowledge in fields like physics, chemistry, biology and more.",
    day_in_life: "Designing experiments, collecting data, analysing results, writing research papers, attending conferences.",
    avg_salary_min: 500000, avg_salary_max: 2000000, growth_outlook: "Good",
    education_required: "PhD in relevant scientific field",
    skills: ["Research Methodology", "Data Analysis", "Writing", "Critical Thinking", "Lab Skills"]
  },
  {
    title: "Biotechnologist",
    domain: "Science",
    description: "Apply biological systems and living organisms to develop products and technologies in medicine, agriculture and industry.",
    day_in_life: "Running lab experiments, analysing biological data, writing research reports, working with medical teams.",
    avg_salary_min: 400000, avg_salary_max: 1800000, growth_outlook: "Good",
    education_required: "B.Sc/M.Sc in Biotechnology or related field",
    skills: ["Lab Techniques", "Molecular Biology", "Data Analysis", "Research", "Attention to Detail"]
  },
  {
    title: "Environmental Scientist",
    domain: "Science",
    description: "Study the environment and find solutions to environmental problems like pollution, climate change and conservation.",
    day_in_life: "Collecting field samples, running tests, writing environmental impact reports, advising policy makers.",
    avg_salary_min: 400000, avg_salary_max: 1500000, growth_outlook: "Good",
    education_required: "B.Sc/M.Sc in Environmental Science or related field",
    skills: ["Field Research", "Data Analysis", "Report Writing", "GIS", "Environmental Law"]
  },
  // MARKETING
  {
    title: "Digital Marketing Specialist",
    domain: "Marketing",
    description: "Plan and execute online marketing campaigns across social media, search engines and email to grow brands.",
    day_in_life: "Running ad campaigns, analysing website traffic, creating content calendars, writing copy.",
    avg_salary_min: 350000, avg_salary_max: 1500000, growth_outlook: "Excellent",
    education_required: "Any degree — certifications in Google Ads, SEO, Social Media a plus",
    skills: ["SEO", "Google Ads", "Social Media", "Content Writing", "Analytics"]
  },
  {
    title: "Brand Manager",
    domain: "Marketing",
    description: "Develop and maintain a brand's identity, positioning and communication across all channels.",
    day_in_life: "Developing brand strategy, overseeing campaigns, working with agencies, analysing brand performance.",
    avg_salary_min: 600000, avg_salary_max: 2500000, growth_outlook: "Good",
    education_required: "MBA in Marketing or any degree with marketing experience",
    skills: ["Brand Strategy", "Marketing", "Communication", "Creativity", "Data Analysis"]
  },
  {
    title: "Market Research Analyst",
    domain: "Marketing",
    description: "Collect and analyse data about consumers and markets to help businesses make informed decisions.",
    day_in_life: "Designing surveys, analysing data, writing reports, presenting findings to management.",
    avg_salary_min: 400000, avg_salary_max: 1800000, growth_outlook: "Good",
    education_required: "Degree in Marketing, Statistics or Business",
    skills: ["Data Analysis", "Research", "Excel", "Communication", "Critical Thinking"]
  },
  // HOSPITALITY
  {
    title: "Hotel Manager",
    domain: "Hospitality",
    description: "Oversee all operations of a hotel including staff, guest experience, revenue and facilities.",
    day_in_life: "Managing staff, handling guest complaints, reviewing financials, coordinating departments.",
    avg_salary_min: 500000, avg_salary_max: 2000000, growth_outlook: "Good",
    education_required: "Degree in Hotel Management from institutes like IHM",
    skills: ["Leadership", "Customer Service", "Financial Management", "Communication", "Problem Solving"]
  },
  {
    title: "Chef",
    domain: "Hospitality",
    description: "Create and prepare dishes in restaurants, hotels or your own food business combining culinary skill and creativity.",
    day_in_life: "Preparing meals, managing kitchen team, planning menus, ordering ingredients, maintaining food standards.",
    avg_salary_min: 300000, avg_salary_max: 2000000, growth_outlook: "Good",
    education_required: "Diploma or degree from a culinary institute",
    skills: ["Culinary Skills", "Creativity", "Kitchen Management", "Teamwork", "Time Management"]
  },
  {
    title: "Travel & Tourism Manager",
    domain: "Hospitality",
    description: "Plan and manage travel experiences for individuals and groups including tours, accommodation and transport.",
    day_in_life: "Planning itineraries, booking travel, coordinating with vendors, resolving travel issues for clients.",
    avg_salary_min: 300000, avg_salary_max: 1500000, growth_outlook: "Good",
    education_required: "Degree in Tourism or Hospitality Management",
    skills: ["Geography Knowledge", "Customer Service", "Organisation", "Communication", "Problem Solving"]
  },
  // SOCIAL WORK
  {
    title: "Social Worker",
    domain: "Social Work",
    description: "Help individuals, families and communities overcome challenges like poverty, abuse and mental illness.",
    day_in_life: "Meeting clients, connecting them with resources, writing case reports, advocating for their needs.",
    avg_salary_min: 250000, avg_salary_max: 800000, growth_outlook: "Stable",
    education_required: "BSW or MSW degree",
    skills: ["Empathy", "Communication", "Problem Solving", "Case Management", "Advocacy"]
  },
  {
    title: "NGO Programme Manager",
    domain: "Social Work",
    description: "Plan, execute and monitor programmes that address social issues like education, health and poverty.",
    day_in_life: "Managing projects, coordinating with stakeholders, writing grant proposals, measuring programme impact.",
    avg_salary_min: 350000, avg_salary_max: 1200000, growth_outlook: "Stable",
    education_required: "Any degree — MSW or MBA in Social Entrepreneurship is a plus",
    skills: ["Project Management", "Communication", "Fundraising", "Data Analysis", "Leadership"]
  },
];

async function seedData() {
  try {
    console.log('🌱 Seeding career data...');

    for (const career of careers) {
      const careerResult = await pool.query(
        `INSERT INTO careers (title, domain, description, day_in_life, avg_salary_min, avg_salary_max, growth_outlook, education_required)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (title) DO NOTHING
         RETURNING id`,
        [career.title, career.domain, career.description, career.day_in_life,
         career.avg_salary_min, career.avg_salary_max, career.growth_outlook, career.education_required]
      );

      if (careerResult.rows.length === 0) continue;
      const careerId = careerResult.rows[0].id;

      for (const skillName of career.skills) {
        const skillResult = await pool.query(
          `INSERT INTO skills (name) VALUES ($1)
           ON CONFLICT (name) DO NOTHING
           RETURNING id`,
          [skillName]
        );

        let skillId;
        if (skillResult.rows.length > 0) {
          skillId = skillResult.rows[0].id;
        } else {
          const existing = await pool.query('SELECT id FROM skills WHERE name = $1', [skillName]);
          skillId = existing.rows[0].id;
        }

        await pool.query(
          `INSERT INTO career_skills (career_id, skill_id) VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [careerId, skillId]
        );
      }
    }

    console.log(`✅ Successfully seeded ${careers.length} careers!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seedData();