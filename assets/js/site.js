/* Victor Macedo — site behaviour. No dependencies. */
(function () {
  "use strict";
  var D = JSON.parse(document.getElementById("vm-data").textContent);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Toast ---------- */
  var toastEl = $("#toast"), toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  function copyEmail() {
    var done = function () { toast(D.contact.copied + " · " + D.email); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(D.email).then(done, function () { location.href = "mailto:" + D.email; });
    else location.href = "mailto:" + D.email;
  }
  $$("[data-copy-email]").forEach(function (b) { b.addEventListener("click", copyEmail); });

  /* ---------- Scroll: progress, active section, scene label ---------- */
  var bar = $("#progress"), scene = $("#scene");
  var sections = $$("main > section[id]");
  var navLinks = $$("[data-nav]");
  var current = null, ticking = false;
  function onScroll() {
    ticking = false;
    var h = document.documentElement;
    var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    if (bar) bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, p)) + ")";
    var active = sections[0];
    for (var i = 0; i < sections.length; i++) if (sections[i].getBoundingClientRect().top <= h.clientHeight * 0.4) active = sections[i];
    if (active && active !== current) {
      current = active;
      if (scene && active.dataset.scene) {
        scene.style.opacity = "0";
        setTimeout(function () { scene.textContent = active.dataset.scene; scene.style.opacity = "1"; }, reduce ? 0 : 200);
      }
      navLinks.forEach(function (a) { a.setAttribute("aria-current", a.dataset.nav === active.id ? "true" : "false"); });
    }
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Reveal ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el, i) {
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.transitionDelay = Math.min(sib, 6) * 70 + "ms";
      io.observe(el);
    });
  } else reveals.forEach(function (el) { el.classList.add("in"); });

  /* ---------- Timecode + Salvador clock ---------- */
  var tc = $("#timecode"), clock = $("#clock"), t0 = performance.now();
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tickClock() {
    if (!clock) return;
    try { clock.textContent = new Date().toLocaleTimeString("en-GB", { timeZone: "America/Bahia", hour: "2-digit", minute: "2-digit" }); } catch (e) {}
  }
  tickClock(); setInterval(tickClock, 30000);
  if (tc) {
    var lastF = -1;
    var frame = function (now) {
      var s = (now - t0) / 1000, f = Math.floor((s % 1) * 24);
      if (f !== lastF) {
        lastF = f;
        tc.textContent = pad(Math.floor(s / 3600)) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(Math.floor(s) % 60) + ":" + pad(f);
      }
      if (!reduce) requestAnimationFrame(frame);
    };
    if (reduce) setInterval(function () { frame(performance.now()); }, 1000); else requestAnimationFrame(frame);
  }

  /* ---------- Projector light follows the pointer ---------- */
  var light = $("#light"), hero = $(".hero");
  if (light && hero && !reduce && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      light.style.transform = "translate3d(" + (e.clientX - r.left) + "px," + (e.clientY - r.top) + "px,0)";
    }, { passive: true });
  }

  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

  /* ---------- Contact: message → prefilled email / WhatsApp ---------- */
  var msg = $("#message"), msgText = $("#message-text"), wa = $("#whatsapp");
  if (msg) {
    var compose = function () { var t = msgText.value.trim(); return msg.dataset.greeting + (t ? "\n\n" + t : ""); };
    msg.addEventListener("submit", function (e) {
      e.preventDefault();
      location.href = "mailto:" + D.email + "?subject=" + encodeURIComponent(msg.dataset.subject) + "&body=" + encodeURIComponent(compose());
    });
    var syncWa = function () { wa.href = "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent(compose()); };
    msgText.addEventListener("input", syncWa); syncWa();
  }

  /* ---------- Language: remember choice, suggest the other one ---------- */
  $$("[data-lang-switch]").forEach(function (a) { a.addEventListener("click", function () { store.set("vm-lang", a.dataset.langSwitch); }); });
  (function () {
    var saved = store.get("vm-lang");
    var browserPt = /^pt/i.test(navigator.language || "");
    var isPt = /^pt/i.test(D.lang);
    if (saved || browserPt === isPt) return;
    var b = document.createElement("div");
    b.className = "lang-banner";
    b.setAttribute("role", "region");
    b.setAttribute("aria-label", isPt ? "Language" : "Idioma");
    var link = document.createElement("a");
    link.className = "btn btn--light"; link.href = D.otherPath;
    link.textContent = isPt ? "Read in English" : "Ler em português";
    link.lang = isPt ? "en" : "pt-BR";
    link.addEventListener("click", function () { store.set("vm-lang", isPt ? "en" : "pt"); });
    var close = document.createElement("button");
    close.type = "button"; close.className = "kbd"; close.textContent = "✕";
    close.setAttribute("aria-label", isPt ? "Dismiss" : "Fechar");
    close.addEventListener("click", function () { store.set("vm-lang", isPt ? "pt" : "en"); b.remove(); });
    b.appendChild(link); b.appendChild(close);
    setTimeout(function () { document.body.appendChild(b); }, 1800);
  })();

  /* ---------- ⌘K command palette ---------- */
  var dlg = $("#palette"), pIn = $("#palette-input"), pList = $("#palette-list");
  if (dlg && typeof dlg.showModal === "function") {
    var P = D.palette, items = [], shown = [], sel = 0;
    var go = function (id) { return function () { dlg.close(); var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }; };
    D.sections.forEach(function (s) { items.push({ label: s.label, group: P.groups.sec, run: go(s.id) }); });
    D.cases.forEach(function (c) { items.push({ label: c.label, group: P.groups["case"], run: go("case-" + c.id) }); });
    items.push({ label: P.actions.copy + " · " + D.email, group: P.groups.act, run: function () { dlg.close(); copyEmail(); } });
    items.push({ label: P.actions.whatsapp, group: P.groups.act, run: function () { dlg.close(); window.open("https://wa.me/" + D.whatsapp, "_blank", "noopener"); } });
    items.push({ label: P.actions.lang, group: P.groups.act, run: function () { store.set("vm-lang", /^pt/i.test(D.lang) ? "en" : "pt"); location.href = D.otherPath; } });
    items.push({ label: P.actions.terminal, group: P.groups.act, run: function () { location.href = "/terminal/"; } });
    items.push({ label: P.actions.top, group: P.groups.act, run: go("top") });

    var render = function () {
      var q = norm(pIn.value).trim();
      shown = q ? items.filter(function (it) { return norm(it.label + " " + it.group).indexOf(q) > -1; }) : items;
      sel = Math.min(sel, Math.max(0, shown.length - 1));
      pList.innerHTML = "";
      if (!shown.length) { var li0 = document.createElement("li"); li0.className = "palette__empty"; li0.textContent = P.empty; pList.appendChild(li0); pIn.removeAttribute("aria-activedescendant"); return; }
      shown.forEach(function (it, i) {
        var li = document.createElement("li");
        li.id = "pi-" + i; li.setAttribute("role", "option"); li.setAttribute("aria-selected", i === sel ? "true" : "false");
        var a = document.createElement("span"); a.textContent = it.label;
        var b = document.createElement("span"); b.className = "mono"; b.textContent = it.group;
        li.appendChild(a); li.appendChild(b);
        li.addEventListener("click", it.run);
        li.addEventListener("mousemove", function () { if (sel !== i) { sel = i; mark(); } });
        pList.appendChild(li);
      });
      mark();
    };
    var mark = function () {
      $$("li[role=option]", pList).forEach(function (li, i) { li.setAttribute("aria-selected", i === sel ? "true" : "false"); });
      var cur = document.getElementById("pi-" + sel);
      if (cur) { pIn.setAttribute("aria-activedescendant", cur.id); cur.scrollIntoView({ block: "nearest" }); }
    };
    var open = function () { if (dlg.open) return; pIn.value = ""; sel = 0; render(); dlg.showModal(); pIn.focus(); };
    pIn.addEventListener("input", function () { sel = 0; render(); });
    pIn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(1, shown.length); mark(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + shown.length) % Math.max(1, shown.length); mark(); }
      else if (e.key === "Enter") { e.preventDefault(); if (shown[sel]) shown[sel].run(); }
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    $("#palette-close").addEventListener("click", function () { dlg.close(); });
    $("#open-palette").addEventListener("click", open);
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); dlg.open ? dlg.close() : open(); }
    });
  } else { var ob = $("#open-palette"); if (ob) ob.hidden = true; }
})();
