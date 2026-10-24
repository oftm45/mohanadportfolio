// Sections below the first screen load on demand, so wait briefly for the target to exist.
export function scrollToSection(sectionId: string, timeoutMs = 4000) {
  const start = performance.now();
  const attempt = () => {
    const el = document.getElementById(sectionId);
    if (el) return el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (performance.now() - start < timeoutMs) requestAnimationFrame(attempt);
  };
  attempt();
}
