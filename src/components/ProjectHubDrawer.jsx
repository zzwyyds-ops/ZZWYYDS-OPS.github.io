import { useEffect, useRef } from "react";
import { pageCopy } from "../data/portfolio.js";
import {
  fallBackToOriginalImage,
  getOptimizedProjectImageSrc,
} from "../utils/media.js";

function ProjectGallery({ project }) {
  const galleryImages = project.images?.slice(0, 4) ?? [];

  if (!galleryImages.length) {
    return (
      <div className={`media-shell media-${project.mediaType} media-gallery-shell`}>
        <span>{project.mediaLabel}</span>
      </div>
    );
  }

  return (
    <div className={`media-shell media-${project.mediaType} media-gallery-shell media-gallery-sheet project-sheet-gallery-shell`}>
      <div className={`project-gallery project-gallery-${Math.min(galleryImages.length, 4)} project-gallery-${project.id}`}>
        {galleryImages.map((image, index) => (
          <figure className={`project-shot project-shot-${index + 1}`} key={image.src}>
            <img
              alt={image.alt ?? `${project.title}-${image.label}`}
              decoding="async"
              loading={index === 0 ? "eager" : "lazy"}
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

export function ProjectHubDrawer({
  activeProjectId,
  onClose,
  onSelectProject,
  open,
  projects,
}) {
  const panelRef = useRef(null);
  const activeProject =
    projects.find((project) => project.id === activeProjectId) ?? projects[0] ?? null;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="drawer-overlay" onClick={onClose} role="presentation">
      <aside
        aria-labelledby="project-hub-title"
        aria-modal="true"
        className="drawer-panel project-drawer-panel"
        onClick={(event) => event.stopPropagation()}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="drawer-topbar">
          <div className="drawer-copy-block">
            <p className="game-eyebrow">{pageCopy.projectDrawer.note}</p>
            <div className="drawer-title-row">
              <h2 className="drawer-title" id="project-hub-title">
                {pageCopy.projectDrawer.title}
              </h2>
              <span className="drawer-count-pill">{projects.length} 个项目</span>
            </div>
          </div>

          <button className="drawer-close" onClick={onClose} type="button">
            关闭
          </button>
        </div>

        <div className="drawer-body project-drawer-body">
          <div className="drawer-rail">
            <div className="drawer-rail-head">
              <strong>{pageCopy.projectDrawer.railTitle}</strong>
            </div>

            <div className="drawer-rail-list" role="tablist" aria-label="作品切换">
              {projects.map((project, index) => (
                <button
                  aria-selected={activeProject?.id === project.id}
                  className={`project-tab ${activeProject?.id === project.id ? "is-active" : ""}`}
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  role="tab"
                  type="button"
                >
                  <em className="project-tab-index">{String(index + 1).padStart(2, "0")}</em>
                  <strong>{project.title}</strong>
                  <span>{project.category}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="drawer-main project-drawer-main">
            {activeProject ? (
              <article className="project-sheet">
                <ProjectGallery project={activeProject} />

                <div className="project-sheet-copy">
                  <p className="project-sheet-category">{activeProject.category}</p>
                  <h3>{activeProject.title}</h3>
                  <p className="project-sheet-description">{activeProject.description}</p>

                  {activeProject.highlights?.length ? (
                    <div className="project-highlights" aria-label={`${activeProject.title} 项目亮点`}>
                      {activeProject.highlights.map((highlight) => (
                        <span key={highlight}>{highlight}</span>
                      ))}
                    </div>
                  ) : null}

                  {activeProject.specs?.length ? (
                    <div className="project-spec-grid" aria-label={`${activeProject.title} 关键规格`}>
                      {activeProject.specs.map((item) => (
                        <section className="project-spec-card" key={`${activeProject.id}-${item.label}`}>
                          <p>{item.label}</p>
                          <strong>{item.value}</strong>
                        </section>
                      ))}
                    </div>
                  ) : null}

                  {activeProject.detailSections?.length ? (
                    <div className="project-detail-grid" aria-label={`${activeProject.title} 技术细节`}>
                      {activeProject.detailSections.map((section) => (
                        <section className="project-detail-card" key={`${activeProject.id}-${section.title}`}>
                          <h4>{section.title}</h4>
                          <ul>
                            {section.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ) : (
              <div className="project-sheet-empty">
                <p>{pageCopy.projectDrawer.empty}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
