export function getOptimizedProjectImageSrc(src) {
  if (!src?.startsWith("/media/projects/")) {
    return src;
  }

  return src
    .replace("/media/projects/", "/media/optimized/projects/")
    .replace(/\.(jpe?g|png)$/i, ".webp");
}

export function fallBackToOriginalImage(event, originalSrc) {
  const image = event.currentTarget;

  if (image.dataset.fallbackApplied === "true") {
    return;
  }

  image.dataset.fallbackApplied = "true";
  image.src = originalSrc;
}
