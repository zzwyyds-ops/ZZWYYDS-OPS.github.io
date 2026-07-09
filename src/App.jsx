import {
  contact,
  experienceEntries,
  navItems,
  projectCases,
  skillSignals,
} from "./data/portfolio.js";

function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => (
        <span
          className="particle"
          key={index}
          style={{
            "--x": `${8 + ((index * 37) % 88)}%`,
            "--y": `${12 + ((index * 29) % 74)}%`,
            "--delay": `${-(index % 9) * 0.7}s`,
            "--size": `${4 + (index % 5)}px`,
          }}
        />
      ))}
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="LumiEmbed Space home">
        LumiEmbed
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="top">
      <Header />
      <ParticleField />
      <div className="hero-orb" aria-hidden="true" />

      <div className="hero-content">
        <p className="section-note">Embedded portfolio / Edge vision lab</p>
        <h1>LumiEmbed Space</h1>
        <p className="hero-subtitle">
          An embedded systems and machine vision portfolio shaped around calm
          interaction, edge-device experiments, and luminous technical craft.
        </p>

        <div className="hero-actions" aria-label="Primary actions">
          <a className="button primary" href="#works">
            View works
          </a>
          <a className="button ghost" href={`mailto:${contact.email}`}>
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}

function RoleSection() {
  return (
    <section className="section" id="role">
      <div className="section-inner role-grid">
        <div>
          <p className="section-note">Role</p>
          <h2>Embedded engineer building quiet, capable edge experiences.</h2>
        </div>

        <div className="role-copy">
          <p>
            LumiEmbed Space gathers practical projects across embedded control,
            machine vision, wireless communication, and small interactive
            systems. The work leans toward clear interfaces, measured
            experimentation, and devices that feel precise when they meet the
            real world.
          </p>

          <div className="skill-cloud" aria-label="Skill signals">
            {skillSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorksSection() {
  return (
    <section className="section works-section" id="works">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-note">Works</p>
          <h2>Selected project cases</h2>
        </div>

        <div className="works-grid">
          {projectCases.map((project, index) => (
            <article
              className={`work-card work-card-${index + 1}`}
              key={project.title}
            >
              <div className={`media-shell media-${project.mediaType}`}>
                <span>{project.mediaType}</span>
              </div>
              <div className="work-body">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-note">Experience</p>
          <h2>Interactive spaces in progress</h2>
        </div>

        <div className="experience-grid">
          {experienceEntries.map((entry) => {
            const isExternal = entry.href.startsWith("http");

            return (
              <a
                className="experience-card"
                href={entry.href}
                key={entry.title}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                <span>{entry.action}</span>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner contact-panel">
        <div>
          <p className="section-note">Contact</p>
          <h2>Let the next device, demo, or visual system take shape.</h2>
        </div>
        <a className="email-link" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <RoleSection />
      <WorksSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
