import {
  contact,
  experienceEntries,
  navItems,
  pageCopy,
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
      <a className="brand" href="#top" aria-label={pageCopy.headerHomeLabel}>
        LumiEmbed
      </a>

      <nav className="nav-links" aria-label={pageCopy.headerNavLabel}>
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
        <p className="section-note">{pageCopy.hero.note}</p>
        <h1>
          <span>LumiEmbed</span>
          <span>Space</span>
        </h1>
        <p className="hero-subtitle">{pageCopy.hero.subtitle}</p>

        <div className="hero-actions" aria-label={pageCopy.hero.actionsLabel}>
          <a className="button primary" href="#works">
            {pageCopy.hero.primaryCta}
          </a>
          <a className="button ghost" href={`mailto:${contact.email}`}>
            {pageCopy.hero.secondaryCta}
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
          <p className="section-note">{pageCopy.role.note}</p>
          <h2>{pageCopy.role.title}</h2>
        </div>

        <div className="role-copy">
          <p>{pageCopy.role.body}</p>

          <div className="skill-cloud" aria-label={pageCopy.role.skillLabel}>
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
          <p className="section-note">{pageCopy.works.note}</p>
          <h2>{pageCopy.works.title}</h2>
        </div>

        <div className="works-grid">
          {projectCases.map((project, index) => (
            <article
              className={`work-card work-card-${index + 1}`}
              key={project.title}
            >
              <div className={`media-shell media-${project.mediaType}`}>
                <span>{project.mediaLabel}</span>
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
          <p className="section-note">{pageCopy.experience.note}</p>
          <h2>{pageCopy.experience.title}</h2>
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
          <p className="section-note">{pageCopy.contact.note}</p>
          <h2>{pageCopy.contact.title}</h2>
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
