import {
  contact,
  experienceEntries,
  heroShowcaseItems,
  navItems,
  pageCopy,
  projectCases,
  skillSignals,
} from "./data/portfolio.js";

function HeroVideo() {
  return (
    <div className="hero-video-layer" aria-hidden="true">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/media/hero-wallpaper.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={pageCopy.headerHomeLabel}>
        <span className="brand-mark">L</span>
        <span className="brand-text">LumiEmbed</span>
      </a>

      <nav className="nav-links" aria-label={pageCopy.headerNavLabel}>
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href={`mailto:${contact.email}`}>
        {pageCopy.headerCta}
      </a>
    </header>
  );
}

function HeroShowcase() {
  return (
    <div className="hero-showcase" aria-label="精选入口">
      {heroShowcaseItems.map((item) => {
        const isExternal = item.href.startsWith("http");

        return (
          <a
            className={`showcase-card tone-${item.tone}`}
            href={item.href}
            key={item.title}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            <span className="showcase-tag">{item.tag}</span>
            <strong>{item.title}</strong>
            <p>{item.caption}</p>
          </a>
        );
      })}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-shell" id="top">
      <div className="hero-stage">
        <Header />
        <HeroVideo />
        <div className="hero-orb" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-copy">
            <h1 className="hero-title">
              <span className="hero-line hero-line-primary">
                LUMIEMBED
                <span className="hero-spark hero-spark-large" aria-hidden="true">
                  ✦
                </span>
                <span className="hero-spark hero-spark-small" aria-hidden="true">
                  ✦
                </span>
              </span>
              <span className="hero-line hero-line-secondary">
                PORTFOLIO
                <span className="hero-script">Space</span>
              </span>
            </h1>
            <p className="hero-subtitle">{pageCopy.hero.subtitle}</p>
          </div>

          <div className="hero-meta">
            <span>{pageCopy.hero.note}</span>
            <span>{contact.email}</span>
          </div>
        </div>

        <HeroShowcase />
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
    <main className="app-shell">
      <Hero />
      <RoleSection />
      <WorksSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
