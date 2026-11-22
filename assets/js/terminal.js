/* Victor Macedo — terminal version. */
(function () {
  "use strict";
  var P = JSON.parse(document.getElementById("vm-data").textContent);
  var out = document.getElementById("term-out"), form = document.getElementById("term-form"), input = document.getElementById("term-input");
  var lang = /^pt/i.test(navigator.language || "pt") ? "pt" : "en";
  try { var s = localStorage.getItem("vm-lang"); if (s === "pt" || s === "en") lang = s; } catch (e) {}
  var hist = [], hi = 0;

  var T = {
    pt: {
      banner: "VM-OS 2026.11 — portfólio de Victor Macedo\nDigite <span class=\"hl\">help</span> para ver os comandos. Experimente <span class=\"hl\">ask o que você faz?</span>",
      help: [["whoami", "quem é o Victor"], ["cases", "projetos e cases"], ["credits", "carreira, do mais recente ao mais antigo"], ["stack", "ferramentas por papel"], ["backstage", "a passagem pela TV"], ["contact", "como falar com ele"], ["ask <pergunta>", "pergunte ao agente"], ["lang en|pt", "trocar idioma"], ["clear", "limpar a tela"], ["gui", "voltar para a versão visual"]],
      unknown: "comando não encontrado: ", hint: " — digite help", source: "fonte", hire: "Permissão concedida. Abrindo o e-mail…", asked: "pergunte algo: ask <pergunta>"
    },
    en: {
      banner: "VM-OS 2026.11 — Victor Macedo's portfolio\nType <span class=\"hl\">help</span> for commands. Try <span class=\"hl\">ask what do you do?</span>",
      help: [["whoami", "who Victor is"], ["cases", "projects and cases"], ["credits", "career, most recent first"], ["stack", "tools by role"], ["backstage", "the TV years"], ["contact", "how to reach him"], ["ask <question>", "ask the agent"], ["lang en|pt", "switch language"], ["clear", "clear the screen"], ["gui", "back to the visual version"]],
      unknown: "command not found: ", hint: " — type help", source: "source", hire: "Permission granted. Opening email…", asked: "ask something: ask <question>"
    }
  };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function print(html) { var d = document.createElement("div"); d.innerHTML = html; out.appendChild(d); window.scrollTo(0, document.body.scrollHeight); }
  function pad(s, n) { s = String(s); while (s.length < n) s += " "; return s; }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " "); }

  function ask(q) {
    var d = P[lang], hits = window.VMAgent.searchIn(d.kb, q);
    if (!hits.length) return esc(d.fallback);
    return esc(hits[0].d.text) + "\n<span class=\"dm\">— " + T[lang].source + ": " + esc(hits[0].d.title) + "</span>";
  }

  var CMDS = {
    help: function () { return T[lang].help.map(function (h) { return "  <span class=\"ac\">" + esc(pad(h[0], 18)) + "</span>" + esc(h[1]); }).join("\n"); },
    whoami: function () { return esc(P[lang].who); },
    cases: function () { return P[lang].cases.map(function (c) { return "<span class=\"hl\">" + esc(pad(c.period, 13)) + "</span><span class=\"cmd\">" + esc(c.name) + "</span>" + (c.client ? " <span class=\"dm\">(" + esc(c.client) + ")</span>" : "") + "\n" + pad("", 13) + esc(c.desc); }).join("\n"); },
    credits: function () { return P[lang].credits.map(function (c) { return "<span class=\"dm\">" + esc(pad(c.period, 14)) + "</span>" + esc(pad(c.role, 28)) + "<span class=\"cmd\">" + esc(c.org) + "</span>"; }).join("\n"); },
    stack: function () { return P[lang].stack.map(function (t) { return "<span class=\"hl\">" + esc(t.label) + "</span>\n  " + esc(t.items.join(" · ")); }).join("\n"); },
    backstage: function () { return esc(P[lang].backstage); },
    contact: function () {
      var s = P.site;
      return "email     <a href=\"mailto:" + esc(s.email) + "\">" + esc(s.email) + "</a>\nwhatsapp  <a href=\"https://wa.me/" + esc(s.whatsapp) + "\" target=\"_blank\" rel=\"noopener\">wa.me/" + esc(s.whatsapp) + "</a>\nlinkedin  <a href=\"" + esc(s.linkedin) + "\" target=\"_blank\" rel=\"noopener\">" + esc(s.linkedin) + "</a>\ngithub    <a href=\"" + esc(s.github) + "\" target=\"_blank\" rel=\"noopener\">" + esc(s.github) + "</a>";
    },
    ask: function (a) { return a ? ask(a) : esc(T[lang].asked); },
    lang: function (a) { if (a === "pt" || a === "en") { lang = a; try { localStorage.setItem("vm-lang", a); } catch (e) {} document.documentElement.lang = a === "pt" ? "pt-BR" : "en"; return T[lang].banner; } return "lang en | lang pt"; },
    clear: function () { out.innerHTML = ""; return null; },
    gui: function () { location.href = lang === "en" ? "/en/" : "/"; return null; },
    ls: function () { return "cases/  credits/  stack/  backstage.txt  contact.txt"; },
    sudo: function (a) { if (/hire/.test(a || "")) { setTimeout(function () { location.href = "mailto:" + P.site.email; }, 600); return esc(T[lang].hire); } return "sudo: " + esc(a || ""); }
  };
  var ALIAS = { sobre: "whoami", about: "whoami", projetos: "cases", projects: "cases", carreira: "credits", creditos: "credits", career: "credits", elenco: "stack", bastidores: "backstage", tv: "backstage", contato: "contact", pergunte: "ask", cls: "clear", exit: "gui", "?": "help", ajuda: "help" };

  function run(line) {
    line = line.trim();
    print("<span class=\"cmd\"><b>visitante@vm:~$</b> " + esc(line) + "</span>");
    if (!line) return;
    var sp = line.indexOf(" "), cmd = (sp < 0 ? line : line.slice(0, sp)).toLowerCase(), arg = sp < 0 ? "" : line.slice(sp + 1).trim();
    cmd = ALIAS[cmd] || cmd;
    var f = CMDS[cmd];
    var res = f ? f(arg) : (/\?$/.test(line) ? ask(line) : esc(T[lang].unknown + cmd) + "<span class=\"dm\">" + esc(T[lang].hint) + "</span>");
    if (res !== null && res !== undefined) print(res + "\n");
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); var v = input.value; if (v.trim()) { hist.push(v); hi = hist.length; } input.value = ""; run(v); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") { if (hi > 0) { hi--; input.value = hist[hi]; e.preventDefault(); } }
    else if (e.key === "ArrowDown") { if (hi < hist.length - 1) { hi++; input.value = hist[hi]; } else { hi = hist.length; input.value = ""; } e.preventDefault(); }
    else if (e.key === "Tab") {
      e.preventDefault();
      var v = input.value.toLowerCase(), m = Object.keys(CMDS).filter(function (k) { return k.indexOf(v) === 0; });
      if (v && m.length === 1) input.value = m[0] + " ";
    }
  });
  document.addEventListener("click", function (e) { if (!window.getSelection().toString() && e.target.tagName !== "A") input.focus(); });
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  print(T[lang].banner + "\n");
  run("whoami");
  input.focus();
})();
