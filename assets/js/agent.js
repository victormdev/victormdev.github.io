/* Victor Macedo — résumé retrieval (shared by the site and the terminal). */
(function (root) {
  "use strict";
  var STOP = ("a o e as os um uma de do da dos das em no na nos nas por para pra com sem que se seu sua voce vc voces eu me meu minha ja foi era sao e ser tem ter qual quais quem como onde quando porque oque o que isso esse essa este esta ai la " +
    "the an and or of to in on at for with is are was were be been you your i me my it its this that what which who how where when why do does did have has can could would will about tell").split(" ");
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[w] = 1; });
  var SOFT = { trabalhou: 1, trabalhar: 1, trabalha: 1, worked: 1, work: 1, works: 1, faz: 1, fazes: 1 };
  var SYN = {
    trabalhou: "empresas experiencia carreira", trabalhar: "contato contratar", contratar: "contato freelancer", freela: "freelancer",
    worked: "companies experience career", hire: "contact freelance", job: "career experience", jobs: "career experience",
    ia: "ai llm rag chatbot", ai: "llm rag chatbot", bot: "chatbot", bots: "chatbot", chatbots: "chatbot", gpt: "llm", genai: "llm ai",
    televisao: "tv", television: "tv", globo: "tv", faz: "trabalho atua", fazes: "trabalho", do: "work role",
    estudou: "formacao", faculdade: "formacao", study: "education", degree: "education",
    mentor: "mentoria mentoring", mentorship: "mentoring", ensina: "mentoria", ajuda: "mentoria",
    tecnologias: "stack", ferramentas: "stack", linguagens: "stack", tools: "stack", languages: "stack", skills: "stack"
  };
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9.+#\- ]+/g, " "); }
  function stem(w) {
    if (w.length > 5) w = w.replace(/(coes|ções|mente|ings|ing|ed|es)$/, "");
    if (w.length > 3) w = w.replace(/s$/, "");
    return w;
  }
  function tokens(s, expand) {
    var hard = [], soft = [];
    norm(s).split(/\s+/).forEach(function (w) {
      if (!w || w.length < 2) return;
      var isSoft = STOPSET[w] || SOFT[w];
      if (!isSoft) hard.push({ t: stem(w), w: 1 });
      if (expand && SYN[w]) SYN[w].split(" ").forEach(function (x) { (isSoft ? soft : hard).push({ t: stem(x), w: 0.35 }); });
    });
    /* Synonyms of filler words ("worked", "do") only count when the question has nothing more specific. */
    return hard.some(function (o) { return o.w === 1; }) ? hard : hard.concat(soft);
  }
  function build(kb) {
    var DOCS = kb.map(function (d) {
      var title = tokens(d.title), keys = tokens(d.keywords), body = tokens(d.text);
      var tf = {};
      function add(list, w) { list.forEach(function (o) { tf[o.t] = (tf[o.t] || 0) + w * o.w; }); }
      add(body, 1); add(keys, 2.2); add(title, 3);
      return { d: d, tf: tf };
    });
    var DF = {};
    DOCS.forEach(function (x) { Object.keys(x.tf).forEach(function (t) { DF[t] = (DF[t] || 0) + 1; }); });
    function search(q) {
      var qt = tokens(q, true);
      if (!qt.length) return [];
      var N = DOCS.length;
      return DOCS.map(function (x) {
        var s = 0;
        qt.forEach(function (o) {
          var t = o.t, v = x.tf[t];
          if (!v) {
            for (var k in x.tf) if (k.length > 3 && t.length > 3 && (k.indexOf(t) === 0 || t.indexOf(k) === 0)) { v = x.tf[k] * 0.6; break; }
          }
          if (v) s += o.w * (1 + Math.log(1 + v)) * Math.log(1 + N / (DF[t] || 1));
        });
        return { d: x.d, s: s / Math.sqrt(qt.filter(function (o) { return o.w === 1; }).length || 1) };
      }).filter(function (r) { return r.s > 0.9; }).sort(function (a, b) { return b.s - a.s; });
    }

    return search;
  }
  var cache = {};
  var KB = [];
  try {
    var raw = JSON.parse(document.getElementById("vm-data").textContent);
    KB = raw.kb || (raw[/^en/i.test(document.documentElement.lang) ? "en" : "pt"] || {}).kb || [];
  } catch (e) {}
  var search = build(KB);
  function searchIn(kb, q) { var k = kb.length + ":" + (kb[0] && kb[0].title); return (cache[k] = cache[k] || build(kb))(q); }
  root.VMAgent = { search: search, searchIn: searchIn, norm: norm };
})(window);
