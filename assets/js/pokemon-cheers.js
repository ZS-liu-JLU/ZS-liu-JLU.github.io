(function () {
  "use strict";
  var section = document.querySelector(".pokemon-cheers");
  if (!section) return;
  var buttons = Array.from(section.querySelectorAll("[data-pokemon]"));
  var countElement = section.querySelector("[data-cheers-count]");
  var statusElement = section.querySelector("[data-cheers-status]");
  var announcement = section.querySelector("[data-cheers-announcement]");
  var key = section.dataset.counterKey;
  var sessionKey = "pokemon-cheers:" + key;
  var canCount = Boolean(key && window.location.hostname.toLowerCase() === section.dataset.siteDomain && !navigator.webdriver && typeof window.fetch === "function");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var attempted = false;
  var state = "";
  var total = null;
  var taps = { psyduck: 0, slowpoke: 0 };
  var cleanupTimers = {};
  var replyTimers = {};
  var particleTimers = {};
  var replies = {
    psyduck: ["Psy… duck?! ♥", "I had a thought. It escaped.", "Head full of hearts.", "Wait… what was I doing?", "One tiny wobble for you!"],
    slowpoke: ["…Oh. Thank you. ♥", "Slow… poke. I felt that.", "Taking my time. As always.", "Is it snack time yet?", "Your smile just arrived."]
  };

  try {
    state = window.sessionStorage.getItem(sessionKey) || "";
    attempted = Boolean(state);
    // Counting needs a persistent visit flag; blocked storage keeps the friends in play mode.
    window.sessionStorage.setItem(sessionKey + ":probe", "1");
    if (window.sessionStorage.getItem(sessionKey + ":probe") !== "1") canCount = false;
    window.sessionStorage.removeItem(sessionKey + ":probe");
  } catch (error) { canCount = false; }

  function remember(value) {
    state = value;
    try { window.sessionStorage.setItem(sessionKey, value); return window.sessionStorage.getItem(sessionKey) === value; } catch (error) { return false; }
  }
  function updateLabels() {
    buttons.forEach(function (button) {
      var name = button.dataset.pokemon === "psyduck" ? "Psyduck" : "Slowpoke";
      button.setAttribute("aria-label", "Play with " + name + (!canCount ? "" : attempted ? "; this visit's like has already been used" : " and send a like"));
    });
  }
  function showTotal(value) {
    // A late initial read must not replace a newer successful like with an older count.
    total = total === null ? value : Math.max(total, value);
    countElement.textContent = total.toLocaleString("en-US");
  }
  function requestCounter(action) {
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timeout = controller ? window.setTimeout(function () { controller.abort(); }, 8000) : null;
    var options = { cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer" };
    if (controller) options.signal = controller.signal;
    return window.fetch("https://countapi.mileshilliard.com/api/v1/" + action + "/" + encodeURIComponent(key), options).then(function (response) {
      // A missing counter means no real visitor has cheered yet. Never seed or send a test like.
      if (action === "get" && response.status === 404) return 0;
      if (!response.ok) throw new Error("Counter unavailable");
      return response.json().then(function (data) {
        if (!data || data.value === null || data.value === "" || (typeof data.value !== "number" && typeof data.value !== "string")) throw new Error("Invalid count");
        var value = Number(data.value);
        if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid count");
        return value;
      });
    }).finally(function () { if (timeout) window.clearTimeout(timeout); });
  }
  function sendLike() {
    if (attempted || !canCount) return;
    // Reserve synchronously, before the request: fast taps on either friend share one slot.
    attempted = true;
    var reserved = remember("pending");
    updateLabels();
    if (!reserved) {
      canCount = false;
      updateLabels();
      statusElement.textContent = "Tap to play! Shared likes aren't available in this browser right now.";
      return;
    }
    statusElement.textContent = "A little love is on its way… Keep tapping to play!";
    requestCounter("hit").then(function (value) {
      remember("counted");
      showTotal(value);
      statusElement.textContent = "One like sent this visit. Both friends can keep playing!";
    }).catch(function () {
      // An interrupted hit may have reached the server. Never retry it during this visit.
      remember("unavailable");
      statusElement.textContent = "The shared counter is taking a break. Both friends can still play!";
    });
  }
  function burst(button) {
    if (reducedMotion.matches) return;
    var layer = button.querySelector(".cheer-particles");
    var symbols = button.dataset.pokemon === "psyduck" ? ["♥", "?", "✦"] : ["♥", "Zz", "✧"];
    for (var i = 0; i < 4; i += 1) {
      while (layer.children.length >= 12) layer.firstElementChild.remove();
      var particle = document.createElement("span");
      particle.className = "cheer-particle";
      particle.textContent = symbols[i % symbols.length];
      particle.style.setProperty("--burst-x", (Math.random() * 90 - 45).toFixed(0) + "px");
      particle.style.setProperty("--burst-y", (-45 - Math.random() * 55).toFixed(0) + "px");
      particle.style.setProperty("--burst-turn", (Math.random() * 36 - 18).toFixed(0) + "deg");
      layer.appendChild(particle);
      particle.addEventListener("animationend", function (event) { event.currentTarget.remove(); }, { once: true });
    }
    // One bounded cleanup timer per friend also covers animations turned off mid-flight.
    window.clearTimeout(particleTimers[button.dataset.pokemon]);
    particleTimers[button.dataset.pokemon] = window.setTimeout(function () { layer.replaceChildren(); }, 1000);
  }
  function play(button) {
    var pokemon = button.dataset.pokemon;
    var index = taps[pokemon] % replies[pokemon].length;
    taps[pokemon] += 1;
    window.clearTimeout(replyTimers[pokemon]);
    window.clearTimeout(cleanupTimers[pokemon]);
    button.classList.remove("is-playing");
    if (!reducedMotion.matches) {
      void button.offsetWidth;
      button.classList.add("is-playing");
      cleanupTimers[pokemon] = window.setTimeout(function () { button.classList.remove("is-playing"); }, 1150);
    }
    function reply() {
      button.querySelector(".cheer-speech").textContent = replies[pokemon][index];
      announcement.textContent = (pokemon === "psyduck" ? "Psyduck: " : "Slowpoke: ") + replies[pokemon][index];
      burst(button);
    }
    if (pokemon === "slowpoke" && !reducedMotion.matches) {
      button.querySelector(".cheer-speech").textContent = "…";
      replyTimers[pokemon] = window.setTimeout(reply, 280);
    } else reply();
  }
  buttons.forEach(function (button) {
    button.disabled = false;
    button.addEventListener("click", function () { play(button); sendLike(); });
  });
  updateLabels();
  if (attempted) {
    statusElement.textContent = state === "counted" ? "One like sent this visit. Both friends can keep playing!" : "This visit's cheer was already attempted. Keep tapping to play!";
  }
  if (canCount) {
    requestCounter("get").then(showTotal).catch(function () {
      if (!attempted) statusElement.textContent = "The shared counter is taking a break. Both friends can still play!";
    });
  } else {
    statusElement.textContent = "Tap to play! Shared likes aren't available in this browser right now.";
  }
})();
