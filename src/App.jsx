import { lazy, startTransition, Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  careerTags,
  capabilityFacts,
  contact,
  educationFacts,
  experienceEntries,
  heroShowcaseItems,
  manifestoQuotes,
  navItems,
  pageCopy,
  problemStatements,
  profileFacts,
  projectCases,
  skillSignals,
} from "./data/portfolio.js";
import { GameHubDrawer } from "./components/GameHubDrawer.jsx";
import CountUp from "./components/CountUp.jsx";
import { ProjectHubDrawer } from "./components/ProjectHubDrawer.jsx";
import DotField from "./components/DotField.jsx";
import {
  fallBackToOriginalImage,
  getOptimizedProjectImageSrc,
} from "./utils/media.js";

const ASCIIText = lazy(() =>
  import("./components/ASCIIText.jsx").then((module) => ({
    default: module.ASCIIText,
  })),
);

const INTRO_PROJECT_IDS = [
  "tank-4g",
  "fan-tracking",
  "wheel-force",
  "openmv-car",
];

function useDeferredFeature(delay = 1800) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const connection = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection;
    const saveData = Boolean(connection?.saveData);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (saveData || reducedMotion) {
      return undefined;
    }

    const start = () => setEnabled(true);
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: delay + 1200 })
      : null;
    const timerId = window.setTimeout(start, delay);

    return () => {
      window.clearTimeout(timerId);
      if (idleId != null && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [delay]);

  return enabled;
}

function useDotBackgroundActive(delay = 1200) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const start = () => setActive(!document.hidden);
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: delay + 900 })
      : null;
    const timerId = window.setTimeout(start, delay);
    const onVisibilityChange = () => setActive(!document.hidden);

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(timerId);
      if (idleId != null && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [delay]);

  return active;
}

function useWarmProjectImages(delay = 2600) {
  useEffect(() => {
    const connection = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection;

    if (connection?.saveData) {
      return undefined;
    }

    const imageUrls = [
      ...new Set(
        projectCases
          .flatMap((project) => project.images?.slice(0, 2).map((image) => getOptimizedProjectImageSrc(image.src)) ?? [])
          .filter(Boolean),
      ),
    ].slice(0, 18);

    let cancelled = false;
    let timerId = null;

    const warmNext = (index = 0) => {
      if (cancelled || index >= imageUrls.length) {
        return;
      }

      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = "low";
      image.src = imageUrls[index];
      timerId = window.setTimeout(() => warmNext(index + 1), 140);
    };

    const start = () => warmNext();
    const idleId = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: delay + 1600 }) : null;
    timerId = window.setTimeout(start, delay);

    return () => {
      cancelled = true;
      if (timerId != null) {
        window.clearTimeout(timerId);
      }
      if (idleId != null && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [delay]);
}

function useIntroImagesReady(projectIds = INTRO_PROJECT_IDS) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const imageUrls = projectIds
      .map((projectId) => projectCases.find((project) => project.id === projectId))
      .filter(Boolean)
      .map((project) => project.images?.[0]?.src)
      .filter(Boolean)
      .map((src) => getOptimizedProjectImageSrc(src));

    if (!imageUrls.length) {
      setReady(true);
      return undefined;
    }

    let cancelled = false;
    let completed = 0;
    const preloaders = [];

    const markDone = () => {
      completed += 1;
      if (!cancelled && completed >= imageUrls.length) {
        setReady(true);
      }
    };

    imageUrls.forEach((src) => {
      const image = new Image();
      let settled = false;

      const finish = () => {
        if (settled) {
          return;
        }

        settled = true;
        markDone();
      };

      image.decoding = "async";
      image.fetchPriority = "high";
      image.onload = finish;
      image.onerror = finish;
      image.src = src;
      preloaders.push(image);

      if (image.complete) {
        queueMicrotask(finish);
      }
    });

    return () => {
      cancelled = true;
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [projectIds]);

  return ready;
}

function useIntroSequence(assetsReady) {
  const [countTarget, setCountTarget] = useState(0);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);
  const completedRef = useRef(false);
  const startedAtRef = useRef(Date.now());
  const fadeTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const completeIntro = useCallback(() => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    setCountTarget(100);

    fadeTimerRef.current = window.setTimeout(() => {
      setFading(true);
    }, 860);

    hideTimerRef.current = window.setTimeout(() => {
      startTransition(() => setVisible(false));
    }, 1560);
  }, []);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setCountTarget(24), 120),
      window.setTimeout(() => setCountTarget(48), 560),
      window.setTimeout(() => setCountTarget(72), 1120),
      window.setTimeout(() => setCountTarget(91), 1760),
    ];
    const forceTimerId = window.setTimeout(() => {
      completeIntro();
    }, 5600);

    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
      window.clearTimeout(forceTimerId);
    };
  }, [completeIntro]);

  useEffect(() => {
    if (!assetsReady || completedRef.current) {
      return undefined;
    }

    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(0, 2200 - elapsed);
    const readyTimerId = window.setTimeout(() => {
      completeIntro();
    }, remaining);

    return () => {
      window.clearTimeout(readyTimerId);
    };
  }, [assetsReady, completeIntro]);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current != null) {
        window.clearTimeout(fadeTimerRef.current);
      }
      if (hideTimerRef.current != null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return { countTarget, fading, visible };
}

function HeroTitle() {
  return (
    <h1 className="hero-title">
      <span className="hero-line hero-line-primary">
        EMBEDVISION
        <span aria-hidden="true" className="hero-spark hero-spark-large">
          +
        </span>
        <span aria-hidden="true" className="hero-spark hero-spark-small">
          +
        </span>
      </span>
      <span className="hero-line hero-line-secondary">
        LAB
        <span className="hero-script">Space</span>
      </span>
    </h1>
  );
}

function HeroVideo({ children, introActive, onReadyChange }) {
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const asciiEnabled = useDeferredFeature(2600);

  useEffect(() => {
    const connection = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection;
    const saveData = Boolean(connection?.saveData);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (saveData || reducedMotion) {
      return undefined;
    }

    const loadVideo = () => setShouldLoadVideo(true);
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(loadVideo, { timeout: 1800 })
      : null;
    const timerId = window.setTimeout(loadVideo, 520);

    return () => {
      window.clearTimeout(timerId);
      if (idleId != null && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldLoadVideo) {
      return undefined;
    }

    setVideoReady(false);

    const markReady = () => setVideoReady(true);
    const onError = () => setVideoReady(false);

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", onError);
    video.load();

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", onError);
    };
  }, [shouldLoadVideo]);

  useEffect(() => {
    if (typeof onReadyChange === "function") {
      onReadyChange(videoReady);
    }
  }, [onReadyChange, videoReady]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldLoadVideo || !videoReady) {
      return undefined;
    }

    const updatePlayback = (visible) => {
      if (visible && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => updatePlayback(entry.isIntersecting && entry.intersectionRatio > 0.28),
      { threshold: [0, 0.28, 0.65] },
    );
    const onVisibilityChange = () => {
      const rect = video.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      updatePlayback(visible);
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibilityChange);
    onVisibilityChange();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, [shouldLoadVideo, videoReady]);

  return (
    <div
      className={`hero-video-layer ${videoReady ? "is-loaded" : ""} ${introActive ? "" : "is-unveiled"}`}
    >
      <video
        aria-hidden="true"
        className="hero-video"
        loop
        muted
        playsInline
        poster="/media/hero-poster.png"
        preload={shouldLoadVideo ? "metadata" : "none"}
        ref={videoRef}
      >
        {shouldLoadVideo ? (
          <>
            <source src="/media/hero-cyberpunk-wallpaper-1080p.webm" type="video/webm" />
            <source src="/media/hero-cyberpunk-wallpaper.mp4" type="video/mp4" />
          </>
        ) : null}
      </video>
      <div className="hero-cinematic-haze" aria-hidden="true" />
      <div className="hero-cinematic-sheen" aria-hidden="true" />
      <div className="hero-cinematic-vignette" aria-hidden="true" />
      <div className="hero-video-title">
        <HeroTitle />
        <div className="hero-ascii-panel" aria-hidden="true">
          {asciiEnabled ? (
            <Suspense fallback={<span className="ascii-static">EMBEDVISION</span>}>
              <ASCIIText
                asciiFontSize={8}
                enableWaves={true}
                text="EMBEDVISION"
                textColor="#d8ff3f"
                textFontSize={150}
              />
            </Suspense>
          ) : (
            <span className="ascii-static">EMBEDVISION</span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function IntroSplash({ countTarget, fading }) {
  return (
    <div className={`intro-overlay ${fading ? "is-fading" : ""}`} role="presentation">
      <div className="intro-overlay-grid" aria-hidden="true" />
      <div className="intro-overlay-noise" aria-hidden="true" />
      <div className="intro-overlay-copy">
        <p className="intro-kicker">WELCOME TO</p>
        <h2 className="intro-brand">EMBEDVISION LAB</h2>
        <p className="intro-subline">Embedded Systems / Machine Vision / AI Workflow</p>
        <div className="intro-count-shell" aria-label="开屏动画加载进度">
          <CountUp
            className="count-up-text"
            duration={countTarget >= 100 ? 0.82 : 1.18}
            from={0}
            separator=""
            startWhen={true}
            to={countTarget}
          />
          <span className="intro-count-unit">%</span>
        </div>
        <p className="intro-caption">系统正在同步首屏资源与背景视频</p>
      </div>
    </div>
  );
}

function Header({ onOpenGames }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={pageCopy.headerHomeLabel}>
        <span className="brand-mark">E</span>
        <span className="brand-text">EmbedVision Lab</span>
      </a>

      <nav className="nav-links" aria-label={pageCopy.headerNavLabel}>
        {navItems.map((item) =>
          item.href === "#play" ? (
            <button key={item.label} onClick={() => onOpenGames()} type="button">
              {item.label}
            </button>
          ) : (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ),
        )}
      </nav>

      <a className="header-cta" href={`mailto:${contact.email}`}>
        {pageCopy.headerCta}
      </a>
    </header>
  );
}

function InteractiveEntry({
  children,
  className,
  href,
  onOpenGames,
  title,
}) {
  if (href === "#play") {
    return (
      <button
        aria-label={title}
        className={className}
        onClick={() => onOpenGames()}
        type="button"
      >
        {children}
      </button>
    );
  }

  const isExternal = href.startsWith("http");

  return (
    <a
      className={className}
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

function HeroShowcase({ onOpenGames }) {
  const dockRef = useRef(null);

  const resetDock = useCallback(() => {
    const cards = dockRef.current?.querySelectorAll(".showcase-card");

    cards?.forEach((card) => {
      card.style.removeProperty("--dock-scale");
      card.style.removeProperty("--dock-lift");
      card.style.removeProperty("--dock-glow");
      card.style.removeProperty("--dock-icon-lift");
      card.style.removeProperty("--dock-shadow-y");
      card.style.removeProperty("--dock-glow-size");
      card.style.removeProperty("--dock-glow-alpha");
      card.style.removeProperty("z-index");
    });
  }, []);

  const handleDockMove = useCallback((event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const cards = dockRef.current?.querySelectorAll(".showcase-card");

    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(event.clientX - center);
      const influence = Math.max(0, 1 - distance / (rect.width * 1.45));
      const eased = influence * influence;
      const scale = 1 + eased * 0.18;
      const lift = eased * -18;
      const iconLift = lift * 0.12;
      const shadowY = 14 + eased * 18;
      const glowSize = eased * 34;
      const glowAlpha = 0.05 + eased * 0.12;

      card.style.setProperty("--dock-scale", scale.toFixed(3));
      card.style.setProperty("--dock-lift", `${lift.toFixed(1)}px`);
      card.style.setProperty("--dock-glow", eased.toFixed(3));
      card.style.setProperty("--dock-icon-lift", `${iconLift.toFixed(1)}px`);
      card.style.setProperty("--dock-shadow-y", `${shadowY.toFixed(1)}px`);
      card.style.setProperty("--dock-glow-size", `${glowSize.toFixed(1)}px`);
      card.style.setProperty("--dock-glow-alpha", glowAlpha.toFixed(3));
      card.style.zIndex = String(Math.round(10 + eased * 20));
    });
  }, []);

  return (
    <div
      className="hero-showcase"
      aria-label="精选入口"
      onPointerLeave={resetDock}
      onPointerMove={handleDockMove}
      ref={dockRef}
    >
      {heroShowcaseItems.map((item) => (
        <InteractiveEntry
          className={`showcase-card tone-${item.tone}`}
          href={item.href}
          key={item.title}
          onOpenGames={onOpenGames}
          title={item.title}
        >
          <span
            aria-hidden="true"
            className={`showcase-visual visual-${item.visual}`}
          >
            <span className="visual-part visual-part-a" />
            <span className="visual-part visual-part-b" />
            <span className="visual-part visual-part-c" />
            <span className="visual-part visual-part-d" />
          </span>
          <span className="showcase-tag">{item.tag}</span>
          <strong>{item.title}</strong>
          <p>{item.caption}</p>
        </InteractiveEntry>
      ))}
    </div>
  );
}

function ProjectMedia({ project, variant = "default" }) {
  if (!project.images?.length) {
    return (
      <div className={`media-shell media-${project.mediaType}`}>
        <span>{project.mediaLabel}</span>
      </div>
    );
  }

  return (
    <div className={`media-shell media-${project.mediaType} media-gallery-shell media-gallery-${variant}`}>
      <div
        className={`project-gallery project-gallery-${Math.min(project.images.length, 3)} project-gallery-${variant} project-gallery-${project.id}`}
      >
        {project.images.slice(0, 3).map((image, index) => (
          <figure className={`project-shot project-shot-${index + 1}`} key={image.src}>
            <img
              alt={image.alt ?? `${project.title}-${image.label}`}
              decoding="async"
              loading="lazy"
              onError={(event) => fallBackToOriginalImage(event, image.src)}
              src={getOptimizedProjectImageSrc(image.src)}
              style={{ objectPosition: image.position ?? "center center" }}
            />
            <figcaption>{image.label}</figcaption>
          </figure>
        ))}
      </div>
      <span>{project.mediaLabel}</span>
    </div>
  );
}

function ProjectCard({ project, variant = "default", index, onOpenProject }) {
  return (
    <article className={`work-card work-card-${index + 1} project-card-${variant}`}>
      <ProjectMedia project={project} variant={variant} />

      <div className="work-body">
        <p>{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.homeDescription ?? project.description}</p>

        {project.highlights?.length ? (
          <div className="project-highlights" aria-label={`${project.title} 项目亮点`}>
            {project.highlights.slice(0, 4).map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        ) : null}

        <button
          className="project-card-action"
          onClick={() => onOpenProject(project.id)}
          type="button"
        >
          在作品抽屉中展开
        </button>
      </div>
    </article>
  );
}

function Hero({ introActive, onOpenGames, onVideoReadyChange }) {
  return (
    <section className="hero-shell" id="top">
      <div className="hero-stage">
        <Header onOpenGames={onOpenGames} />
        <HeroVideo introActive={introActive} onReadyChange={onVideoReadyChange}>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="hero-subtitle">{pageCopy.hero.subtitle}</p>
            </div>

            <div className="hero-meta">
              <span className="hero-note">{pageCopy.hero.note}</span>
              <span className="hero-credential">{pageCopy.hero.target}</span>
              <span className="hero-credential">{pageCopy.hero.credential}</span>
              <span className="hero-interest">{pageCopy.hero.interest}</span>
              <span>{pageCopy.hero.author}</span>
              <span>{contact.email}</span>
            </div>
          </div>

          <HeroShowcase onOpenGames={onOpenGames} />
        </HeroVideo>
        <div aria-hidden="true" className="hero-orb" />
      </div>
    </section>
  );
}

function ProjectShowcaseRail({ onOpenProject }) {
  const scrollerRef = useRef(null);
  const isRailVisibleRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const dragRef = useRef({
    active: false,
    scrollLeft: 0,
    startX: 0,
    userControl: false,
    wasDragging: false,
  });
  const preferredProjectIds = [...INTRO_PROJECT_IDS, "pet-feeder", "car-4g-remote"];
  const showcaseProjects = [
    ...preferredProjectIds
      .map((id) => projectCases.find((project) => project.id === id))
      .filter(Boolean),
    ...projectCases.filter((project) => !preferredProjectIds.includes(project.id)),
  ].filter((project) => project.images?.[0]);
  const railProjects = [...showcaseProjects, ...showcaseProjects];
  const railImageOverrides = {
    "tank-4g": "/media/projects/tank-4g/hardware.jpg",
  };
  const hudSignals = [
    { label: "Embedded Core", value: "STM32 / ESP32", status: "多板协同" },
    { label: "Vision Pipeline", value: "OpenMV / ESP32-CAM", status: "图像链路" },
    { label: "Realtime Control", value: "FreeRTOS / MQTT", status: "低延迟控制" },
    { label: "AI Workflow", value: "Agent / Vibe Coding", status: "效率增强" },
  ];

  useEffect(() => {
    let lastTime = Date.now();

    const scroller = scrollerRef.current;
    const observer = scroller
      ? new IntersectionObserver(
          ([entry]) => {
            isRailVisibleRef.current =
              entry.isIntersecting && entry.intersectionRatio > 0.18;
          },
          { threshold: [0, 0.18, 0.5] },
        )
      : null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRailVisibleRef.current = false;
        return;
      }

      const rect = scroller?.getBoundingClientRect();
      isRailVisibleRef.current = Boolean(
        rect && rect.bottom > 0 && rect.top < window.innerHeight,
      );
    };

    if (scroller && observer) {
      observer.observe(scroller);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intervalId = window.setInterval(() => {
      const scroller = scrollerRef.current;
      const now = Date.now();

      if (
        scroller &&
        isRailVisibleRef.current &&
        !document.hidden &&
        !dragRef.current.active &&
        !dragRef.current.userControl
      ) {
        const delta = Math.min(now - lastTime, 48);
        const loopPoint = scroller.scrollWidth / 2;

        scroller.scrollLeft += delta * 0.1;

        if (loopPoint > 0 && scroller.scrollLeft >= loopPoint) {
          scroller.scrollLeft -= loopPoint;
        }
      }

      lastTime = now;
    }, 40);

    return () => {
      window.clearInterval(intervalId);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const resumeAutoScroll = useCallback((delay = 800) => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      dragRef.current.userControl = false;
    }, delay);
  }, []);

  const handleWheel = useCallback((event) => {
    const scroller = scrollerRef.current;

    if (!scroller || Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
      return;
    }

    event.preventDefault();
    dragRef.current.userControl = true;
    scroller.scrollLeft += event.deltaY;
    resumeAutoScroll(900);
  }, [resumeAutoScroll]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return undefined;
    }

    const onNativeWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      dragRef.current.userControl = true;
      scroller.scrollLeft += event.deltaY;
      resumeAutoScroll(900);
    };

    scroller.addEventListener("wheel", onNativeWheel, { passive: false });

    return () => {
      scroller.removeEventListener("wheel", onNativeWheel);
    };
  }, [resumeAutoScroll]);

  const handlePointerDown = useCallback((event) => {
    const scroller = scrollerRef.current;

    if (!scroller || event.button !== 0) {
      return;
    }

    dragRef.current = {
      active: true,
      scrollLeft: scroller.scrollLeft,
      startX: event.clientX,
      userControl: true,
      wasDragging: false,
    };
    scroller.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event) => {
    const scroller = scrollerRef.current;

    if (!scroller || !dragRef.current.active) {
      return;
    }

    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 6) {
      dragRef.current.wasDragging = true;
    }
    scroller.scrollLeft = dragRef.current.scrollLeft - distance;
  }, []);

  const endDrag = useCallback((event) => {
    const scroller = scrollerRef.current;

    if (scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    dragRef.current.active = false;
    resumeAutoScroll(500);
  }, [resumeAutoScroll]);

  return (
    <section className="project-rail-panel" aria-label="作品速览">
      <div className="project-rail-head">
        <div>
          <p className="section-note">作品速览</p>
        </div>
        <div className="project-rail-actions">
          <button
            className="project-rail-detail-button"
            onClick={() => onOpenProject(showcaseProjects[0]?.id)}
            type="button"
          >
            查看完整技术细节
          </button>
        </div>
      </div>

      <div
        className="project-rail-viewport"
        onPointerCancel={endDrag}
        onPointerDown={handlePointerDown}
        onPointerLeave={endDrag}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        ref={scrollerRef}
      >
        <div className="project-rail-track">
          {railProjects.map((project, index) => {
            const overrideSrc = railImageOverrides[project.id];
            const image = overrideSrc
              ? project.images.find((item) => item.src === overrideSrc) ?? project.images[0]
              : project.images[0];

            return (
              <button
                aria-hidden={index >= showcaseProjects.length}
                className="project-rail-card"
                key={`${project.id}-${index}`}
                tabIndex={index >= showcaseProjects.length ? -1 : 0}
                onClick={(event) => {
                  if (dragRef.current.wasDragging) {
                    event.preventDefault();
                    dragRef.current.wasDragging = false;
                    return;
                  }

                  onOpenProject(project.id);
                }}
                type="button"
              >
                <img
                  alt={image.alt ?? project.title}
                  decoding="async"
                  loading={index < 4 ? "eager" : "lazy"}
                  onError={(event) => fallBackToOriginalImage(event, image.src)}
                  src={getOptimizedProjectImageSrc(image.src)}
                  style={{ objectPosition: image.position ?? "center center" }}
                />
                <span>{project.category}</span>
                <strong>{project.title}</strong>
                <div className="project-rail-meta" aria-hidden="true">
                  {(project.highlights ?? []).slice(0, 3).map((highlight) => (
                    <em key={highlight}>{highlight}</em>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="hud-strip" aria-label="能力状态">
        {hudSignals.map((item) => (
          <div className="hud-tile" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <em>{item.status}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function RoleSection({ onOpenProject }) {
  return (
    <section className="section" id="role">
      <div className="section-inner role-grid">
        <ProjectShowcaseRail onOpenProject={onOpenProject} />

        <div className="role-intro-panel">
          <div>
            <p className="section-note">{pageCopy.role.note}</p>
            <h2>{pageCopy.role.title}</h2>
          </div>

          <section className="career-tag-panel role-credential-band" aria-label="简历关键词">
            <p className="role-panel-label">简历关键词</p>
            <div className="career-tag-row">
              <span>本科 / 电子科学与技术</span>
              <span>嵌入式开发 / 机器视觉</span>
              <span>远程控制 / 边缘设备 / AI 工作流</span>
            </div>
          </section>
        </div>

        <div className="role-copy">
          <p>{pageCopy.role.body}</p>
          <p className="role-hobby">{pageCopy.role.hobby}</p>

          <div className="role-insight-grid">
            <section className="role-panel" aria-label={pageCopy.role.profileLabel}>
              <p className="role-panel-label">{pageCopy.role.profileLabel}</p>
              <div className="profile-facts">
                {profileFacts.map((fact) => (
                  <div className="profile-fact" key={fact.label}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="role-panel" aria-label={pageCopy.role.experienceLabel}>
              <p className="role-panel-label">{pageCopy.role.experienceLabel}</p>
              <div className="profile-facts">
                {capabilityFacts.map((fact) => (
                  <div className="profile-fact" key={fact.label}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="role-panel" aria-label={pageCopy.role.educationLabel}>
              <p className="role-panel-label">{pageCopy.role.educationLabel}</p>
              <div className="profile-facts">
                {educationFacts.map((fact) => (
                  <div className={`profile-fact ${fact.subtle ? "is-subtle" : ""}`} key={fact.label}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="skill-cloud" aria-label={pageCopy.role.skillLabel}>
            {skillSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>

          <section className="problem-grid-panel" aria-label={pageCopy.role.problemLabel}>
            <p className="role-panel-label">{pageCopy.role.problemLabel}</p>
            <div className="problem-grid">
              {problemStatements.map((item) => (
                <article className="problem-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="manifesto-inline" aria-label={pageCopy.role.manifestoLabel}>
            <p className="role-panel-label">{pageCopy.role.manifestoLabel}</p>
            <div className="manifesto-list">
              {manifestoQuotes.map((quote) => (
                <p className="manifesto-quote" key={quote}>
                  {quote}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function WorksSection({ onOpenProject, onOpenProjects }) {
  return (
    <section className="section works-section" id="works">
      <div className="section-inner works-entry-panel">
        <div className="section-tools-row works-tools-row">
          <button className="section-cta-button section-cta-strong" onClick={() => onOpenProjects()} type="button">
            {pageCopy.works.cta}
          </button>
        </div>

        <div className="project-index-grid">
          {projectCases.map((project) => (
            <button
              className="project-index-card"
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              type="button"
            >
              <span>{project.mediaLabel}</span>
              <strong>{project.title}</strong>
              <p>{project.homeDescription}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({ onOpenGames }) {
  return (
    <section className="section" id="experience">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-note">{pageCopy.experience.note}</p>
          <h2>{pageCopy.experience.title}</h2>
        </div>

        <div className="experience-grid">
          {experienceEntries.map((entry) => (
            <InteractiveEntry
              className="experience-card"
              href={entry.href}
              key={entry.title}
              onOpenGames={onOpenGames}
              title={entry.title}
            >
              <span>{entry.action}</span>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </InteractiveEntry>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner contact-panel">
        <div className="contact-copy">
          <p className="section-note">{pageCopy.contact.note}</p>
          <h2>{pageCopy.contact.title}</h2>
        </div>

        <div className="contact-link-row" aria-label="联系与开源链接">
          <a className="contact-chip contact-chip-email" href={`mailto:${contact.email}`}>
            <span className="contact-chip-icon" aria-hidden="true">
              <svg
                className="qq-mark"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3.2c-3.62 0-5.86 2.76-5.86 6.52 0 .5.04 1.01.14 1.5-1.48 1.43-2.28 3.31-2.28 5.43 0 1.94 1.18 3.18 2.85 3.18.93 0 1.53-.31 2.32-.98.5 1.13 1.64 1.95 2.83 1.95.77 0 1.55-.34 2-.91.46.57 1.24.91 2 .91 1.2 0 2.34-.82 2.84-1.95.78.67 1.39.98 2.32.98 1.66 0 2.84-1.24 2.84-3.18 0-2.12-.79-4-2.27-5.43.1-.49.14-1 .14-1.5 0-3.76-2.24-6.52-5.87-6.52Zm0 1.86c2.56 0 4.15 1.98 4.15 4.66 0 .58-.08 1.17-.24 1.75l-.11.4.3.28c1.35 1.23 2.07 2.83 2.07 4.53 0 .73-.3 1.32-.95 1.32-.44 0-.82-.18-1.53-.86l-1.27-1.22-.17 1.76c-.1 1.02-.86 1.87-1.48 1.87-.36 0-.69-.16-.93-.46L12 18.4l-.74.85c-.24.3-.57.46-.93.46-.62 0-1.37-.85-1.48-1.87l-.17-1.76-1.27 1.22c-.72.68-1.09.86-1.53.86-.66 0-.96-.59-.96-1.32 0-1.7.73-3.3 2.08-4.53l.3-.28-.12-.4a6.4 6.4 0 0 1-.23-1.75c0-2.68 1.58-4.66 4.15-4.66Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>{contact.email}</span>
          </a>
          <a
            className="contact-chip contact-chip-github"
            href="https://github.com/zzwyyds-ops/ZZWYYDS-OPS.github.io"
            rel="noreferrer"
            target="_blank"
          >
            <span className="contact-chip-icon" aria-hidden="true">
              <svg
                className="github-mark"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.477 2 2 6.589 2 12.25c0 4.53 2.865 8.373 6.839 9.73.5.096.683-.222.683-.494 0-.244-.01-1.053-.014-1.909-2.782.618-3.369-1.214-3.369-1.214-.455-1.18-1.111-1.494-1.111-1.494-.908-.637.069-.624.069-.624 1.004.073 1.532 1.054 1.532 1.054.892 1.568 2.341 1.115 2.91.853.09-.664.349-1.116.635-1.373-2.221-.261-4.556-1.139-4.556-5.071 0-1.12.39-2.036 1.029-2.754-.103-.261-.446-1.313.098-2.738 0 0 .84-.276 2.75 1.052A9.29 9.29 0 0 1 12 6.836c.85.004 1.706.118 2.505.347 1.909-1.328 2.748-1.052 2.748-1.052.546 1.425.203 2.477.1 2.738.64.718 1.028 1.634 1.028 2.754 0 3.942-2.339 4.807-4.565 5.063.359.318.678.941.678 1.896 0 1.37-.012 2.473-.012 2.811 0 .274.18.594.688.493C19.138 20.619 22 16.778 22 12.25 22 6.589 17.523 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>zzwyyds-ops/ZZWYYDS-OPS.github.io</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const revealTargets = document.querySelectorAll(
      ".section-inner, .project-rail-card, .hud-tile, .project-index-card, .experience-card, .contact-chip",
    );

    revealTargets.forEach((target, index) => {
      target.classList.add("reveal-ready");
      target.style.setProperty("--reveal-delay", `${Math.min(index % 8, 5) * 38}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [activeGame, setActiveGame] = useState("2048");
  const [gamesOpen, setGamesOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(projectCases[0]?.id ?? "");
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [heroMediaReady, setHeroMediaReady] = useState(false);
  const introImagesReady = useIntroImagesReady();

  useScrollReveal();
  useWarmProjectImages();
  const dotBackgroundActive = useDotBackgroundActive(1400);
  const introSequence = useIntroSequence(heroMediaReady && introImagesReady);

  const openGames = useCallback((gameId = "2048") => {
    setActiveGame(gameId);
    setGamesOpen(true);
  }, []);

  const closeGames = useCallback(() => {
    setGamesOpen(false);
  }, []);

  const openProjects = useCallback((projectId = projectCases[0]?.id ?? "") => {
    setActiveProjectId(projectId);
    setProjectsOpen(true);
  }, []);

  const closeProjects = useCallback(() => {
    setProjectsOpen(false);
  }, []);

  return (
    <>
      {introSequence.visible ? (
        <IntroSplash countTarget={introSequence.countTarget} fading={introSequence.fading} />
      ) : null}

      <div className="site-dot-background" aria-hidden="true">
        {dotBackgroundActive ? (
          <DotField
            bulgeStrength={54}
            cursorRadius={360}
            dotRadius={1.8}
            dotSpacing={15}
            glowColor="rgba(216, 255, 63, 0.24)"
            glowRadius={220}
            gradientFrom="rgba(216, 255, 63, 0.56)"
            gradientTo="rgba(246, 255, 209, 0.22)"
          />
        ) : null}
      </div>

      <main className="app-shell">
        <Hero
          introActive={introSequence.visible}
          onOpenGames={openGames}
          onVideoReadyChange={setHeroMediaReady}
        />
        <div className="immersive-flow-shell">
          <div className="immersive-flow-backdrop" aria-hidden="true">
            <span className="immersive-flow-glow immersive-flow-glow-a" />
            <span className="immersive-flow-glow immersive-flow-glow-b" />
            <span className="immersive-flow-sheen" />
          </div>

          <div className="immersive-flow-content">
            <RoleSection onOpenProject={openProjects} />
            <WorksSection onOpenProject={openProjects} onOpenProjects={openProjects} />
            <ExperienceSection onOpenGames={openGames} />
            <ContactSection />
          </div>
        </div>
      </main>

      <ProjectHubDrawer
        activeProjectId={activeProjectId}
        onClose={closeProjects}
        onSelectProject={setActiveProjectId}
        open={projectsOpen}
        projects={projectCases}
      />

      <GameHubDrawer
        activeGame={activeGame}
        onClose={closeGames}
        onSelectGame={setActiveGame}
        open={gamesOpen}
      />
    </>
  );
}
