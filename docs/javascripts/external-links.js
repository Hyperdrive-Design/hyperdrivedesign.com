(() => {
  const setExternalLinks = () => {
    const anchors = document.querySelectorAll("a[href]");
    anchors.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) {
        return;
      }

      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      let url;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener");
      }
    });
  };

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(setExternalLinks);
  } else {
    document.addEventListener("DOMContentLoaded", setExternalLinks);
  }
})();
