export default function Projects() {
  return (
    <section className="section" id="projects">
      <h2>Projects</h2>

      <div className="projects-grid">
        <div className="project-card">
          <h3>Student Management System</h3>
          <p>
            An academic project developed using C# that manages student records
            with basic CRUD operations.
          </p>
          <span>Technologies: C#, SQLite</span>
          <a href="#" className="project-link">
            View Project
          </a>
        </div>

        <div className="project-card">
          <h3>Simple Web Application</h3>
          <p>
            A basic web application created to practice frontend fundamentals.
          </p>
          <span>Technologies: HTML, CSS, JavaScript</span>
          <a href="#" className="project-link">
            View Project
          </a>
        </div>

        <div className="project-card">
          <h3>React Portfolio Website</h3>
          <p>
            A personal portfolio built using React to showcase skills and
            academic projects.
          </p>
          <span>Technologies: React, CSS</span>
          <a href="#" className="project-link">
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}
