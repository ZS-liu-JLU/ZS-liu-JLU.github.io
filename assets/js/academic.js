/* Small enhancements; the complete academic page also works without JavaScript. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  function closeMenu(restoreFocus) {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) toggle.focus();
  }

  if (nav && toggle && navLinks) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      var opening = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(opening));
      nav.classList.toggle("is-open", opening);
    });
    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu(true);
    });
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target)) closeMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMenu(false);
    });
  }

  // A highlighted tab helps readers find their place without changing history.
  var sectionLinks = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
  var linkedSections = sectionLinks.map(function (link) {
    return document.getElementById(link.getAttribute("href").slice(1));
  }).filter(Boolean);
  if ("IntersectionObserver" in window && linkedSections.length) {
    var visibleSections = new Map();
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.boundingClientRect.top);
        else visibleSections.delete(entry.target.id);
      });
      var active = Array.from(visibleSections.entries()).sort(function (a, b) {
        return Math.abs(a[1]) - Math.abs(b[1]);
      })[0];
      sectionLinks.forEach(function (link) {
        var selected = Boolean(active && link.getAttribute("href") === "#" + active[0]);
        link.classList.toggle("is-active", selected);
        if (selected) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-100px 0px -48% 0px", threshold: 0 });
    linkedSections.forEach(function (section) { navObserver.observe(section); });
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    var entranceObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-revealing");
          entranceObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px 60px 0px", threshold: .05 });
    document.querySelectorAll(".research-card, .news-card, .paper-card, .collaboration-placeholder, .contact-card").forEach(function (element) {
      // Only future content enters; initially visible content is never hidden.
      if (element.getBoundingClientRect().top > window.innerHeight + 30) {
        element.classList.add("reveal", "is-revealing");
        entranceObserver.observe(element);
      }
    });
    var showContent = function () {
      if (!reducedMotion.matches) return;
      document.querySelectorAll(".is-revealing").forEach(function (element) {
        element.classList.remove("is-revealing");
      });
      entranceObserver.disconnect();
    };
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", showContent);
  }

  // Citation data is optional: unavailable data must not create fake counts.
  var citationElements = document.querySelectorAll(".show_paper_citations");
  var citationsUrl = document.body.dataset.citationsUrl;
  if (citationElements.length && citationsUrl && typeof window.fetch === "function") {
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timeout = controller ? window.setTimeout(function () { controller.abort(); }, 8000) : null;
    var options = controller ? { signal: controller.signal } : {};
    window.fetch(citationsUrl, options).then(function (response) {
      if (!response.ok) throw new Error("Citation data unavailable");
      return response.json();
    }).then(function (data) {
      if (!data || !data.publications || typeof data.publications !== "object") return;
      citationElements.forEach(function (element) {
        var key = element.dataset.paperId || element.dataset.citationId || element.dataset.citationKey || element.getAttribute("data");
        var paper = key && data.publications[key];
        var count = paper && paper.num_citations;
        if (typeof count !== "number" || !Number.isFinite(count) || count < 0) return;
        element.textContent = "Citations: " + Math.floor(count);
      });
    }).catch(function () {
      // The source branch may not exist yet. Leave the publication details intact.
    }).finally(function () {
      if (timeout) window.clearTimeout(timeout);
    });
  }
})();
