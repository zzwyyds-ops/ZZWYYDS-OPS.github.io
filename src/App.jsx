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
      <span className="particle particle-a" />
      <span className="particle particle-b" />
      <span className="particle particle-c" />
      <span className="particle particle-d" />
      <span className="particle particle-e" />
      <span className="particle particle-f" />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="LumiEmbed Space home">
        <span className="brand-symbol">LE</span>
        <span className="brand-name">LumiEmbed Space</span>
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
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
        <p className="eyebrow">Embedded portfolio / Edge vision lab</p>
        <h1>LumiEmbed Space</h1>
        <p className="identity-line">
          An embedded systems and machine vision portfolio shaped around calm
          interaction, edge-device experiments, and luminous technical craft.
        </p>

        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href="#works">
            View works
          </a>
          <a className="button button-secondary" href={`mailto:${contact.email}`}>
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}

function RoleSection() {
  return (
    <section className="section role-section" id="role">
      <div className="section-kicker">Role</div>
      <div className="section-grid">
        <div>
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

          <div className="signal-list" aria-label="Skill signals">
            {skillSignals.map((signal) => (
              <span className="signal-pill" key={signal}>
                {signal}
              </span>
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
      <div className="section-heading">
        <div className="section-kicker">Works</div>
        <h2>Selected project cases</h2>
      </div>

      <div className="work-grid">
        {projectCases.map((project) => (
          <article className="work-card" key={project.title}>
            <div className={`media-frame media-${project.mediaType}`}>
              <span>{project.mediaType}</span>
            </div>
            <div className="work-card-body">
              <p className="work-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience">
      <div className="section-heading">
        <div className="section-kicker">Experience</div>
        <h2>Interactive spaces in progress</h2>
      </div>

      <div className="experience-list">
        {experienceEntries.map((entry) => {
          const isExternal = entry.href.startsWith("http");

          return (
            <article className="experience-card" key={entry.title}>
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </div>
              <a
                className="text-link"
                href={entry.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                {entry.action}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-panel">
        <div>
          <div className="section-kicker">Contact</div>
          <h2>Let the next device, demo, or visual system take shape.</h2>
        </div>
        <a className="contact-email" href={`mailto:${contact.email}`}>
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
