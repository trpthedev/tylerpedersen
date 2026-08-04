import './App.css'
import profileImage from './assets/profile.jpg'

function App() {
  const techStack = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Terraform',
    'Kubernetes',
    'GitHub Actions',
    'Playwright',
  ]

  return (
    <div className="page-shell">
      <main className="content" aria-label="Portfolio">
        <section className="hero-section">
          <img
            className="profile-photo"
            src={profileImage}
            alt="TRP profile"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">Salt Lake City, Utah</p>
            <h1>Hi, I&apos;m TRP</h1>
            <p className="lead">
              Full-stack web developer engineering production software in banking.
              I focus on reliable delivery, modern cloud infrastructure, and
              practical automation.
            </p>
          </div>
        </section>

        <section className="panel">
          <h2>Tech Stack</h2>
          <ul className="chip-grid" aria-label="Tech stack list">
            {techStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>What I Do</h2>
          <ul className="summary-list">
            <li>
              Build production frontend and backend systems with React,
              TypeScript, Express, and PostgreSQL.
            </li>
            <li>
              Ship infrastructure as code using Terraform with automated
              deployment workflows.
            </li>
            <li>
              Improve release confidence with CI/CD hardening and end-to-end
              test automation.
            </li>
          </ul>
        </section>

        <section className="two-column">
          <article className="panel compact">
            <h2>Currently Learning</h2>
            <p>
              Going deeper on Kubernetes operations, Terraform patterns, and AI
              tooling for product engineering workflows.
            </p>
          </article>
          <article className="panel compact">
            <h2>Off the Clock</h2>
            <p>
              Hiking, fishing, and getting outside whenever possible. Building
              software is the work, the mountains are the reset.
            </p>
          </article>
        </section>

        <section className="panel">
          <h2>Reach Me</h2>
          <div className="link-row" role="list" aria-label="Contact links">
            <a role="listitem" href="https://trp.dev" target="_blank" rel="noreferrer">
              tylerpedersen.com
            </a>
            <a role="listitem" href="mailto:t@trp.dev">
              tyler@tylerpedersen.com
            </a>
            <a
              role="listitem"
              href="https://github.com/trpthedev"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              role="listitem"
              href="https://www.linkedin.com/in/traypedersen/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>
      <footer>
        <p>© 2026 TRP · Salt Lake City, Utah</p>
      </footer>
    </div>
  )
}

export default App
