/* Country-level visitor statistics, with a small Poké Ball hello. */
(function () {
  "use strict";
  var card = document.querySelector("[data-visitor-map]");
  if (!card) return;
  var canvas = card.querySelector("[data-map-canvas]");
  var markers = card.querySelector("[data-visitor-markers]");
  var tosses = card.querySelector("[data-visitor-tosses]");
  var details = card.querySelector("[data-map-detail]");
  var regionList = card.querySelector("[data-visitor-region-list]");
  var total = card.querySelector("[data-visitor-total]");
  var regions = card.querySelector("[data-visitor-regions]");
  var domain = (card.dataset.siteDomain || "").toLowerCase();
  var siteId = card.dataset.siteId || "";
  var countryData = null;
  var counts = [];
  var selectedCode = null;
  var lastTotal = null;
  var refreshTimer = null;
  var isVisible = false;
  var loading = false;
  var pixel = null;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function integer(value) {
    return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : null;
  }

  function format(value) { return value.toLocaleString("en"); }

  function pokeball() {
    var span = document.createElement("span");
    span.className = "map-pokeball";
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  function position(button, longitude, latitude) {
    button.style.left = ((longitude + 180) / 360 * 100) + "%";
    button.style.top = ((90 - latitude) / 180 * 100) + "%";
  }

  function showRegion(code, focusMarker) {
    var country = counts.find(function (entry) { return entry.code === code; });
    if (!country) return;
    selectedCode = code;
    details.textContent = country.name + " · " + format(country.count) + (country.count === 1 ? " visit" : " visits") + " in the past 30 days. Hello!";
    markers.querySelectorAll("[data-country]").forEach(function (button) {
      var selected = button.dataset.country === code;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
      if (selected && focusMarker) button.focus({ preventScroll: true });
    });
    regionList.querySelectorAll("[data-country]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.country === code));
    });
  }

  function normaliseCountries(data) {
    if (!data || !Array.isArray(data.countries)) throw new Error("Visitor statistics unavailable");
    var grouped = new Map();
    data.countries.forEach(function (entry) {
      if (!entry || typeof entry.country_code !== "string") return;
      var code = entry.country_code.toUpperCase();
      if (!/^[A-Z]{2}$/.test(code)) return;
      var count = integer(entry.count);
      if (!count) return;
      var previous = grouped.get(code);
      var fallback = countryData && countryData[code];
      var name = fallback ? fallback.name : (typeof entry.country_name === "string" ? entry.country_name.slice(0, 100) : code);
      grouped.set(code, { code: code, name: name, count: count + (previous ? previous.count : 0) });
    });
    return Array.from(grouped.values()).sort(function (a, b) { return b.count - a.count || a.name.localeCompare(b.name); });
  }

  function render(data) {
    var active = document.activeElement;
    var focusedCode = active && active.dataset ? active.dataset.country : null;
    var focusedList = focusedCode && regionList.contains(active);
    var focusedMarker = focusedCode && markers.contains(active);
    var previousCounts = new Map(counts.map(function (entry) { return [entry.code, entry.count]; }));
    counts = normaliseCountries(data);
    var count = integer(data.total_visits);
    lastTotal = count;
    total.textContent = count === null ? "—" : format(count);
    regions.textContent = format(counts.length);
    markers.replaceChildren();
    regionList.replaceChildren();
    card.querySelectorAll(".visitor-country.has-visitors").forEach(function (country) { country.classList.remove("has-visitors"); });
    counts.forEach(function (country) {
      var location = countryData[country.code];
      var listButton = document.createElement("button");
      listButton.type = "button";
      listButton.className = "visitor-region-button";
      listButton.dataset.country = country.code;
      listButton.setAttribute("aria-pressed", "false");
      listButton.append(pokeball(), document.createTextNode(country.name + " · " + format(country.count)));
      listButton.addEventListener("click", function () { showRegion(country.code, false); });
      regionList.appendChild(listButton);
      if (!location || !Number.isFinite(location.lon) || !Number.isFinite(location.lat) || Math.abs(location.lon) > 180 || Math.abs(location.lat) > 90) return;
      var button = document.createElement("button");
      button.type = "button";
      button.className = "visitor-marker";
      if (!reducedMotion.matches && !previousCounts.has(country.code)) button.classList.add("is-new");
      button.dataset.country = country.code;
      button.title = country.name + " · " + format(country.count) + " visits";
      button.setAttribute("aria-label", button.title);
      button.setAttribute("aria-pressed", "false");
      position(button, location.lon, location.lat);
      button.appendChild(pokeball());
      button.addEventListener("click", function () { showRegion(country.code, false); });
      markers.appendChild(button);
      card.querySelectorAll('.visitor-country[data-code="' + country.code + '"]').forEach(function (shape) { shape.classList.add("has-visitors"); });
    });
    if (selectedCode && counts.some(function (entry) { return entry.code === selectedCode; })) showRegion(selectedCode, false);
    else {
      selectedCode = null;
      details.textContent = counts.length ? "Hello from " + format(counts.length) + " visiting " + (counts.length === 1 ? "region!" : "regions!") + " Select a Poké Ball to explore." : (count > 0 ? "Visitor check-ins received — region information will appear when available." : "A new adventure begins — waiting for the first visitor check-ins.");
    }
    if (focusedCode && (focusedList || focusedMarker)) {
      var container = focusedList ? regionList : markers;
      var replacement = container.querySelector('[data-country="' + focusedCode + '"]');
      if (replacement) replacement.focus({ preventScroll: true });
    }
  }

  function toss(x, y) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "visitor-marker is-tossed" + (reducedMotion.matches ? "" : " is-new");
    button.style.left = (Math.max(.03, Math.min(.97, x)) * 100) + "%";
    button.style.top = (Math.max(.06, Math.min(.94, y)) * 100) + "%";
    button.setAttribute("aria-label", "Your Poké Ball — a hello, just for fun");
    button.title = "Your Poké Ball — just for fun";
    button.appendChild(pokeball());
    button.addEventListener("click", function () { details.textContent = "A little hello from your Poké Ball! Tosses are just for fun."; });
    tosses.appendChild(button);
    while (tosses.childElementCount > 5) tosses.firstElementChild.remove();
    details.textContent = "Poké Ball landed! A little hello, just for fun.";
  }

  canvas.addEventListener("click", function (event) {
    if (event.target.closest(".visitor-marker")) return;
    var bounds = canvas.getBoundingClientRect();
    if (bounds.width && bounds.height) toss((event.clientX - bounds.left) / bounds.width, (event.clientY - bounds.top) / bounds.height);
  });
  card.querySelector("[data-toss-ball]").addEventListener("click", function () { toss(.12 + Math.random() * .76, .18 + Math.random() * .64); });

  function getJSON(url) {
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timer = controller ? window.setTimeout(function () { controller.abort(); }, 10000) : null;
    return window.fetch(url, { credentials: "omit", signal: controller ? controller.signal : undefined }).then(function (response) {
      if (!response.ok) throw new Error("Visitor statistics unavailable");
      return response.json();
    }).finally(function () { if (timer) window.clearTimeout(timer); });
  }

  function refresh() {
    if (loading || !countryData || !domain) return Promise.resolve();
    loading = true;
    return getJSON("https://feed-pulse.com/api/public/site/" + encodeURIComponent(domain)).then(render).catch(function () {
      // A service outage never produces invented visitors or hides the map.
      if (lastTotal === null && !counts.length) details.textContent = "Visitor check-ins are taking a break. You can still toss a Poké Ball!";
      else details.textContent = "Showing the last loaded check-ins. New visits will appear when the service reconnects.";
    }).finally(function () { loading = false; });
  }

  function scheduleRefresh() {
    if (refreshTimer) window.clearInterval(refreshTimer);
    refreshTimer = null;
    if (isVisible && !document.hidden) refreshTimer = window.setInterval(refresh, 60000);
  }
  document.addEventListener("visibilitychange", function () {
    scheduleRefresh();
    if (!document.hidden && isVisible) refresh();
  });
  if (typeof window.IntersectionObserver === "function") {
    var observer = new IntersectionObserver(function (entries) {
      isVisible = entries.some(function (entry) { return entry.isIntersecting; });
      scheduleRefresh();
      if (isVisible) refresh();
    }, { rootMargin: "150px", threshold: 0 });
    observer.observe(card);
  } else {
    isVisible = true;
    scheduleRefresh();
  }

  function trackVisit() {
    // Keep previews and automated validation out of the site's visitor data.
    if (!siteId || window.location.hostname.toLowerCase() !== domain || navigator.webdriver || navigator.globalPrivacyControl === true || navigator.doNotTrack === "1" || window.doNotTrack === "1") return;
    var key = "visitor-map-visit:" + siteId;
    try {
      var previous = Number(window.sessionStorage.getItem(key));
      if (previous && Date.now() - previous < 30 * 60 * 1000) return;
    } catch (error) { /* Storage restrictions do not block the homepage. */ }
    var query = new URLSearchParams({ path: window.location.pathname || "/", title: (document.title || "").slice(0, 160), host: window.location.host, ref: "" });
    pixel = new Image(1, 1);
    pixel.onload = function () {
      try { window.sessionStorage.setItem(key, String(Date.now())); } catch (error) { /* Optional session deduplication. */ }
      // The data request also runs independently if this pixel is blocked.
      if (countryData) window.setTimeout(refresh, 1800);
    };
    pixel.src = "https://feed-pulse.com/api/track-pixel/" + encodeURIComponent(siteId) + "?" + query.toString();
  }
  trackVisit();
  if (typeof window.fetch !== "function") {
    details.textContent = "Visitor check-ins are unavailable in this browser. You can still toss a Poké Ball!";
    return;
  }
  getJSON(card.dataset.countriesUrl).then(function (data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Map data unavailable");
    countryData = data;
    return refresh();
  }).catch(function () {
    details.textContent = "Visitor check-ins are taking a break. You can still toss a Poké Ball!";
  });
})();
