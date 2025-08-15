import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import './App.css';

const IMAGE_BASE_PATH = '/contents/pictures';

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/contents/profile.yml')
      .then((response) => response.text())
      .then((text) => setProfile(yaml.load(text)));

    fetch('/contents/projects.yml')
      .then((response) => response.text())
      .then((text) => setProjects(yaml.load(text)));

    fetch('/contents/experience.yml')
      .then((response) => response.text())
      .then((text) => setExperience(yaml.load(text)));

    fetch('/contents/skills.yml')
      .then((response) => response.text())
      .then((text) => setSkills(yaml.load(text)));
  }, []);

  return (
    <div className="App">

      <main className="container">
        {profile && (
          <section className="card mb-5 profile-section">
            <nav className="profile-nav text-center mb-4">
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#experience" className="nav-link">Experience</a>
            </nav>
            <div className="card-body d-flex flex-column">
              <div className="row align-items-center flex-grow-1">
                <div className="col-md-4">
                  <h2 className="card-title">Hi there, I'm {profile.name}</h2>
                  <h3 className="card-subtitle mb-3">I'm a {profile.title}</h3>
                </div>
                <div className="col-md-4 text-center">
                  <img src={`${IMAGE_BASE_PATH}/profile.png`} alt="Profile Picture" className="img-fluid rounded-circle profile-picture" />
                  <div className="social-links mt-4">
                    <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer" className="social-icon"><FaEnvelope size={30} /></a>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin size={30} /></a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub size={30} /></a>
                  </div>
                </div>
                <div className="col-md-4">
                  <p className="mb-3">{profile.profile}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="skills" className="card mb-5">
          <div className="card-body">
            <h2 className="card-title section-title">Skills</h2>

            {skills.strongest_skills && skills.strongest_skills.length > 0 && (
              <div className="mb-4">
                <h3 className="skill-category-title">Strongest Skills</h3>
                {skills.strongest_skills.map((skillGroup, groupIndex) => {
                  const groupName = Object.keys(skillGroup)[0];
                  const skillsInGroup = skillGroup[groupName];
                  return (
                    <div key={groupIndex} className="mb-3">
                      <div className="d-flex flex-wrap justify-content-center gap-3">
                        {skillsInGroup.map((skill, skillIndex) => {
                          console.log('Current skill:', skill); // Debugging line
                          return (
                          <div key={skillIndex} className="skill-box text-center p-3" title={skill.fullName}>
                            <img src={`${IMAGE_BASE_PATH}/${skill.name.toLowerCase().replace(/ /g, '_')}.png`} alt={skill.name} className="skill-icon mb-2" onError={(e) => {e.target.style.display = 'none'; }} /> 
                            <p className="mb-0">{skill.name}</p>
                          </div>
                        )})}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {skills.secondary_skills && skills.secondary_skills.length > 0 && (
              <div>
                <h3 className="skill-category-title">Secondary Skills</h3>
                {skills.secondary_skills.map((skillGroup, groupIndex) => {
                  const groupName = Object.keys(skillGroup)[0];
                  const skillsInGroup = skillGroup[groupName];
                  return (
                    <div key={groupIndex} className="mb-3">
                      {/* <h4 className="skill-sub-category-title">{groupName.replace(/_/g, ' ')}</h4> */}
                      <div className="d-flex flex-wrap justify-content-center gap-3">
                        {skillsInGroup.map((skill, skillIndex) => {
                          console.log('Current skill:', skill); // Debugging line
                          return (
                          <div key={skillIndex} className="skill-box text-center p-3" title={skill.fullName}>
                            <img src={`${IMAGE_BASE_PATH}/${skill.name.toLowerCase().replace(/ /g, '_')}.png`} alt={skill.name} className="skill-icon mb-2" onError={(e) => {e.target.style.display = 'none'; }} /> 
                            <p className="mb-0">{skill.name}</p>
                          </div>
                        )})}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>  

        <section id="projects" className="card mb-5">
          <div className="card-body">
            <h2 className="card-title section-title">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4 project-item">
                <h3 className="project-title">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-title-link">
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <h4 className="project-subtitle">{project['sub-title']}</h4>
                <p className="project-description">{project.description}</p>
                {project.technologies && (
                  <div className="technologies-list mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="technology-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="card mb-5">
          <div className="card-body">
            <h2 className="card-title section-title">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4 experience-item">
                <h3>
                  {exp.company_url ? (
                    <a href={exp.company_url} target="_blank" rel="noopener noreferrer" className="company-link">
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
                {exp.role.map((role, roleIndex) => (
                  <div key={roleIndex} className="mb-3 role-item">
                    <h4 className="experience-role">{role.title}</h4>
                    <p className="text-muted">{role.start_date} - {role.end_date}</p>
                    {role.tasks && (
                      <ul className="tasks-list">
                        {role.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    )}
                    {role.technologies && (
                      <div className="technologies-list mt-2">
                        {role.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="technology-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="container py-4 text-center text-muted">
        <p>&copy; {new Date().getFullYear()} {profile ? profile.name : 'My Portfolio'}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;