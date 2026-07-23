export const calculateResumeStrength = (data) => {
  if (!data) return { percentage: 0, tips: [] };

  let score = 0;
  let maxScore = 0;
  const tips = [];

  const isFilled = (str) => str && typeof str === 'string' && str.trim() !== "";

  // 1. Personal Info Check
  let personalScore = 0;
  let personalMax = 19;
  maxScore += personalMax;

  if (isFilled(data.name)) personalScore += 5;
  if (isFilled(data.email)) personalScore += 5;
  if (isFilled(data.phone)) personalScore += 5;
  if (isFilled(data.address)) personalScore += 4;
  
  score += personalScore;
  if (personalScore < personalMax) {
    tips.push("📍 Add your full contact info (email, phone, address) so recruiters can reach you.");
  }

  // About Summary Check
  maxScore += 6;
  if (isFilled(data.about) && data.about.trim().length > 20) {
    score += 6;
  } else {
    tips.push("✍️ Write a short 'About' summary (at least 20 characters) introducing your core focus.");
  }

  // 2. Skills Check
  maxScore += 15;
  if (Array.isArray(data.skills) && data.skills.length >= 4) {
    score += 15;
  } else if (Array.isArray(data.skills) && data.skills.length > 0) {
    score += 8;
    tips.push("💡 Add at least 4-5 core skills (languages, frameworks, or tools) to rank better in ATS filters.");
  } else {
    tips.push("🛠️ Your skills section is empty. List your technical proficiencies.");
  }

  // 3. Education Check
  maxScore += 15;
  if (data.education && data.education.length > 0 && data.education[0]) {
    const edu = data.education[0];
    let eduScore = 0;
    if (isFilled(edu.degree)) eduScore += 5;
    if (isFilled(edu.school)) eduScore += 5;
    if (isFilled(edu.year)) eduScore += 5;
    score += eduScore;
    if (eduScore < 15) tips.push("🎓 Complete your educational details (Degree, School, and Graduation Year).");
  } else {
    tips.push("🎓 Add at least one Education milestone.");
  }

  // 4. Experience Check (Conditional)
  if (!data.isFresher) {
    maxScore += 25;
    if (data.experience && data.experience.length > 0 && data.experience[0]) {
      const exp = data.experience[0];
      let expScore = 0;
      if (isFilled(exp.company)) expScore += 5;
      if (isFilled(exp.role)) expScore += 5;
      if (isFilled(exp.duration)) expScore += 5;
      if (isFilled(exp.description) && exp.description.trim().length > 30) expScore += 10;
      
      score += expScore;
      if (expScore < 25) tips.push("💼 Elaborate on your work experience roles and add descriptive bullet points.");
    } else {
      tips.push("💼 Add professional experience or toggle 'Fresher Mode' if you are a student.");
    }
  }

  // 5. Projects Check
  maxScore += 20;
  if (data.projects && data.projects.length > 0 && data.projects[0]) {
    const proj = data.projects[0];
    let projScore = 0;
    if (isFilled(proj.title)) projScore += 5;
    if (isFilled(proj.tech)) projScore += 5;
    
    if (Array.isArray(proj.description) && proj.description.length > 0) {
      const firstBullet = proj.description[0];
      if (isFilled(firstBullet) && firstBullet.trim().length > 15) projScore += 10;
    }
    
    score += projScore;
    if (projScore < 20) tips.push("Expand your project entries with technical descriptions and stack specifications.");
  } else {
    tips.push("Add at least one engineering project to show off your build history.");
  }

  const percentage = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);
  return { percentage, tips };
};