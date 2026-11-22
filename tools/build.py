#!/usr/bin/env python3
"""Gera o site estático a partir de content.json.

Uso:  python3 tools/build.py
Saída: index.html (PT), en/index.html (EN), 404.html, terminal/index.html,
       sitemap.xml e robots.txt. Sem dependências além do Python 3.
"""
import json
from datetime import date
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "content.json").read_text(encoding="utf-8"))
SITE = DATA["site"]
VERSION = date.today().strftime("%Y%m%d")


def e(s):
    return escape(str(s), quote=True)


def head(c, other, *, title=None, description=None, canonical=None, noindex=False, extra=""):
    title = title or c["meta"]["title"]
    description = description or c["meta"]["description"]
    canonical = canonical or SITE["url"] + c["path"]
    img = SITE["url"] + "/assets/img/og.png"
    alt = "" if noindex else f"""
<link rel="alternate" hreflang="{e(c['lang'])}" href="{e(SITE['url'] + c['path'])}">
<link rel="alternate" hreflang="{e(other['lang'])}" href="{e(SITE['url'] + other['path'])}">
<link rel="alternate" hreflang="x-default" href="{e(SITE['url'])}/">"""
    robots = '<meta name="robots" content="noindex">' if noindex else ""
    return f"""<!doctype html>
<html lang="{e(c['lang'])}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(description)}">
<meta name="author" content="{e(SITE['name'])}">
<meta name="theme-color" content="#0B0C14">
<meta name="color-scheme" content="dark">
{robots}
<link rel="canonical" href="{e(canonical)}">{alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="{e(SITE['name'])}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(description)}">
<meta property="og:url" content="{e(canonical)}">
<meta property="og:image" content="{img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{e(SITE['name'])}">
<meta property="og:locale" content="{e(c['ogLocale'])}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{e(title)}">
<meta name="twitter:description" content="{e(description)}">
<meta name="twitter:image" content="{img}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/instrument-serif.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v={VERSION}">
<script>document.documentElement.classList.replace('no-js','js')</script>
{extra}
</head>"""


def json_ld(c):
    data = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": SITE["name"],
        "url": SITE["url"],
        "image": SITE["url"] + "/assets/img/og.png",
        "email": "mailto:" + SITE["email"],
        "jobTitle": "AI Developer" if c["lang"] == "en" else "Engenheiro de IA conversacional",
        "worksFor": {"@type": "Organization", "name": "Compass"},
        "founder": {"@type": "Organization", "name": "Nugo"},
        "alumniOf": {"@type": "CollegeOrUniversity", "name": "Instituto Federal da Bahia"},
        "address": {"@type": "PostalAddress", "addressLocality": "Salvador", "addressRegion": "BA", "addressCountry": "BR"},
        "knowsAbout": ["Generative AI", "Conversational AI", "Chatbots", "RAG", "LLM", "NLP", "Python", "Node.js", "TypeScript", "Angular"],
        "sameAs": [SITE["linkedin"], SITE["github"], SITE["instagram"]],
    }
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False) + "</script>"


def header(c, other):
    n = c["nav"]
    return f"""<a class="skip" href="#conteudo">{e(c['skip'])}</a>
<div class="progress" aria-hidden="true"><span id="progress"></span></div>
<header class="bar bar--top" id="bar">
  <a class="mark" href="{e(c['path'])}" aria-label="{e(SITE['name'])}">VM<span>.</span></a>
  <span class="bar__scene mono" id="scene" aria-hidden="true">{e(c['hero']['scene'])}</span>
  <nav class="bar__nav" aria-label="{e('Sections' if c['lang'] == 'en' else 'Seções')}">
    <a href="#cases" data-nav="cases">{e(n['cases'])}</a>
    <a href="#bastidores" data-nav="bastidores">{e(n['backstage'])}</a>
    <a href="#creditos" data-nav="creditos">{e(n['credits'])}</a>
    <a href="#elenco" data-nav="elenco">{e(n['cast'])}</a>
    <a href="#contato" data-nav="contato" class="accent">{e(n['contact'])}</a>
  </nav>
  <div class="bar__tools">
    <button type="button" class="kbd" id="open-palette" aria-label="{e(n['menu'])}" title="{e(n['search'])}" aria-haspopup="dialog"><span class="only-fine">⌘K</span><span class="only-touch">Menu</span></button>
    <a class="kbd" href="{e(other['path'])}" hreflang="{e(other['lang'])}" lang="{e(other['lang'])}" aria-label="{e(n['langLabel'])}" data-lang-switch="{e(other['lang'])}">{e(n['lang'])}</a>
  </div>
</header>"""


def hero(c):
    h = c["hero"]
    return f"""<section class="hero" id="top" data-scene="{e(h['scene'])}">
  <div class="hero__light" id="light" aria-hidden="true"></div>
  <svg class="grain" aria-hidden="true"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>
  <div class="wrap hero__body">
    <p class="kicker mono"><span class="rec" aria-hidden="true"></span>{e(h['kicker'])}</p>
    <h1 class="hero__title"><span class="line">{e(h['first'])}</span><span class="line"><em>{e(h['last'])}</em></span></h1>
    <p class="hero__logline">{e(h['logline'])}</p>
    <p class="billing"><span class="mono">{e(h['starring'])}</span> <span class="billing__names">{e(h['starringList'])}</span></p>
  </div>
  <div class="bar bar--hero mono" aria-hidden="true">
    <span>▼ {e(h['scroll'])}</span><span>{e(h['act'])}</span><span><span id="timecode">00:00:00:00</span> · <span id="clock">--:--</span> BRT</span>
  </div>
</section>"""


def case_card(cs, labels):
    frame = ""
    if cs.get("soon"):
        frame = f"""<div class="frame frame--soon"><span class="mono amber">{e(labels['soon'])}</span><span class="frame__title">{e(cs['name'])}</span><span class="mono dim">{e(labels['inProduction'])} · {e(cs['period'])}</span></div>"""
    else:
        bubbles = "".join(f'<span class="bubble bubble--{e(who)}">{e(text)}</span>' for who, text in cs.get("chat", []))
        src = f'<span class="frame__source mono">{e(cs["source"])}</span>' if cs.get("source") else ""
        frame = f'<div class="frame frame--{e(cs["id"])}"><div class="frame__chat">{bubbles}{src}</div></div>'
    desc = f'<p class="case__desc">{e(cs["desc"])}</p>' if cs.get("desc") else ""
    result = f'<p class="case__result"><span class="mono">{e(labels["resultLabel"])}</span> {e(cs["result"])}</p>' if cs.get("result") else ""
    tags = "".join(f"<li>{e(t)}</li>" for t in cs.get("tags", []))
    tags = f'<ul class="tags" aria-label="Stack">{tags}</ul>' if tags else ""
    link = f'<a class="case__link" href="{e(cs["url"])}" target="_blank" rel="noopener">→</a>' if cs.get("url") else ""
    return f"""<article class="case reveal" id="case-{e(cs['id'])}">
  <div class="letterbox">{frame}</div>
  <p class="meta mono"><span>{e(cs['client'])}</span><span>{e(cs['period'])}</span></p>
  <h3 class="case__name">{e(cs['name'])}{link}</h3>
  {desc}{result}{tags}
</article>"""


def cases(c):
    k = c["cases"]
    cards = "\n".join(case_card(cs, k) for cs in k["items"])
    rows = []
    for r in k["catalog"]:
        link = f' <a href="{e(r["url"])}" target="_blank" rel="noopener">{e(r["linkLabel"])} ↗</a>' if r.get("url") else ""
        rows.append(f'<li class="row reveal"><span class="row__year mono">{e(r["year"])}</span><span class="row__name">{e(r["name"])}</span><span class="row__desc">{e(r["desc"])}{link}</span></li>')
    return f"""<section class="section wrap" id="cases" data-scene="{e(k['act'])} · {e(c['nav']['cases'])}" aria-labelledby="cases-title">
  <div class="section__head reveal">
    <div><p class="act mono">{e(k['act'])}</p><h2 id="cases-title" class="display">{e(k['titleA'])} <em>{e(k['titleEm'])}</em></h2></div>
    <p class="lede">{e(k['intro'])}</p>
  </div>
  <div class="cases">{cards}</div>
  <div class="catalog"><h3 class="label mono">{e(k['catalogLabel'])}</h3><ul>{''.join(rows)}</ul></div>
</section>"""


def backstage(c):
    b = c["backstage"]
    return f"""<section class="backstage" id="bastidores" data-scene="{e(b['label'])}" aria-label="{e(c['nav']['backstage'])}">
  <div class="backstage__inner reveal">
    <p class="act mono">{e(b['label'])}</p>
    <blockquote class="backstage__quote">{e(b['quoteA'])} <em>{e(b['quoteEm'])}</em>{e(b['quoteB'])}</blockquote>
    <p class="lede">{e(b['body'])}</p>
  </div>
</section>"""


def credits(c):
    k = c["credits"]
    items = []
    for it in k["items"]:
        desc = f'<span class="credit__desc">{e(it["desc"])}</span>' if it.get("desc") else ""
        items.append(f'<li class="credit reveal"><span class="credit__role">{e(it["role"])}</span><span class="credit__year mono">{e(it["period"])}</span><span class="credit__org"><span class="credit__name">{e(it["org"])}</span>{desc}</span></li>')
    edu = "".join(f'<li><span class="credit__name">{e(x["course"])}</span><span class="mono dim">{e(x["org"])} · {e(x["period"])}</span></li>' for x in k["education"])
    cert = SITE["certification"].get(c["lang"][:2], "")
    cert_html = f'<p class="label mono">{e(k["certificationLabel"])}</p><p class="credit__name">{e(cert)}</p>' if cert else ""
    return f"""<section class="credits" id="creditos" data-scene="{e(k['act'])} · {e(k['title'])}" aria-labelledby="credits-title">
  <div class="credits__inner">
    <div class="center reveal"><p class="act mono">{e(k['act'])}</p><h2 id="credits-title" class="display">{e(k['title'])}</h2><p class="lede">{e(k['intro'])}</p></div>
    <ol class="credits__list">{''.join(items)}</ol>
    <div class="center education reveal"><p class="label mono">{e(k['educationLabel'])}</p><ul>{edu}</ul>{cert_html}</div>
  </div>
</section>"""


def cast(c):
    k = c["cast"]
    tiers = []
    for i, t in enumerate(k["tiers"]):
        items = "".join(f"<li>{e(x)}</li>" for x in t["items"])
        tiers.append(f'<div class="tier tier--{i + 1} reveal"><h3 class="label mono">{e(t["label"])}</h3><ul>{items}</ul></div>')
    return f"""<section class="section wrap" id="elenco" data-scene="{e(k['act'])} · {e(c['nav']['cast'])}" aria-labelledby="cast-title">
  <div class="section__head reveal"><div><p class="act mono">{e(k['act'])}</p><h2 id="cast-title" class="display">{e(k['titleA'])} <em>{e(k['titleEm'])}</em></h2></div><p class="lede">{e(k['intro'])}</p></div>
  {''.join(tiers)}
</section>"""


def contact(c):
    k = c["contact"]
    wa = f"https://wa.me/{SITE['whatsapp']}"
    return f"""<section class="contact" id="contato" data-scene="{e(k['label'])}" aria-labelledby="contact-title">
  <div class="contact__inner reveal">
    <p class="act mono">{e(k['label'])}</p>
    <h2 id="contact-title" class="display display--xl">{e(k['titleA'])}<br><em>{e(k['titleEm'])}</em></h2>
    <p class="lede">{e(k['body'])}</p>
    <form class="message" id="message" data-subject="{e(k['subject'])}" data-greeting="{e(k['greeting'])}">
      <label class="label mono" for="message-text">{e(k['messageLabel'])}</label>
      <div class="message__field"><span class="prompt mono" aria-hidden="true">&gt;</span><textarea id="message-text" rows="3" placeholder="{e(k['messagePlaceholder'])}"></textarea></div>
      <div class="actions">
        <button type="submit" class="btn btn--light">{e(k['emailCta'])}</button>
        <a class="btn btn--ghost" id="whatsapp" href="{wa}" target="_blank" rel="noopener">{e(k['whatsapp'])}</a>
        <button type="button" class="btn btn--ghost" data-copy-email>{e(k['copyEmail'])}</button>
      </div>
    </form>
    <ul class="socials">
      <li><a href="{e(SITE['linkedin'])}" target="_blank" rel="noopener me">LinkedIn ↗</a></li>
      <li><a href="{e(SITE['github'])}" target="_blank" rel="noopener me">GitHub ↗</a></li>
      <li><a href="{e(SITE['instagram'])}" target="_blank" rel="noopener me">Instagram ↗</a></li>
      <li><a href="mailto:{e(SITE['email'])}">{e(SITE['email'])}</a></li>
    </ul>
  </div>
</section>"""


def footer(c, other):
    f = c["footer"]
    return f"""<footer class="bar bar--bottom mono">
  <span>{e(f['copy'])}</span>
  <span>{e(f['note'])}</span>
  <span class="bar__links"><a href="/terminal/">{e(f['terminal'])}</a> · <a href="{e(other['path'])}" hreflang="{e(other['lang'])}" data-lang-switch="{e(other['lang'])}">{e(c['nav']['lang'])}</a></span>
</footer>"""


def palette(c):
    p = c["palette"]
    return f"""<dialog class="palette" id="palette" aria-label="{e(p['title'])}">
  <div class="palette__field"><span class="mono accent" aria-hidden="true">⌘</span><input id="palette-input" type="text" role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" placeholder="{e(p['placeholder'])}" autocomplete="off"><button type="button" class="kbd" id="palette-close" aria-label="{e(p['close'])}">ESC</button></div>
  <ul class="palette__list" id="palette-list" role="listbox"></ul>
</dialog>
<div class="toast" id="toast" role="status" aria-live="polite"></div>"""


def client_data(c):
    sections = [
        {"id": "top", "label": "Victor Macedo" if c["lang"] == "en" else "Início"},
        {"id": "cases", "label": c["nav"]["cases"]},
        {"id": "bastidores", "label": c["nav"]["backstage"]},
        {"id": "creditos", "label": c["nav"]["credits"]},
        {"id": "elenco", "label": c["nav"]["cast"]},
        {"id": "contato", "label": c["nav"]["contact"]},
    ]
    return {
        "lang": c["lang"],
        "path": c["path"],
        "otherPath": "/en/" if c["lang"] != "en" else "/",
        "email": SITE["email"],
        "whatsapp": SITE["whatsapp"],
        "palette": c["palette"],
        "contact": {"copied": c["contact"]["copied"]},
        "sections": sections,
        "cases": [{"id": cs["id"], "label": cs["name"] + " · " + cs["client"]} for cs in c["cases"]["items"]],
    }


def data_script(obj):
    raw = json.dumps(obj, ensure_ascii=False).replace("</", "<\\/")
    return f'<script type="application/json" id="vm-data">{raw}</script>'


def page(lang):
    c = DATA[lang]
    other = DATA["en" if lang == "pt" else "pt"]
    body = "\n".join([
        header(c, other),
        '<main id="conteudo">',
        hero(c), cases(c), backstage(c), credits(c), cast(c), contact(c),
        "</main>",
        footer(c, other),
        palette(c),
        data_script(client_data(c)),
        f'<script src="/assets/js/site.js?v={VERSION}" defer></script>',
    ])
    return head(c, other, extra=json_ld(c)) + f'\n<body>\n{body}\n</body>\n</html>\n'


def not_found():
    c, other = DATA["pt"], DATA["en"]
    nf, nf_en = c["notFound"], other["notFound"]
    return head(c, other, title=nf["title"] + " — Victor Macedo", canonical=SITE["url"] + "/404.html", noindex=True) + f"""
<body class="nf">
<header class="bar bar--top"><a class="mark" href="/">VM<span>.</span></a><span class="mono">404 · {e(nf['title'])}</span></header>
<main class="nf__main" id="conteudo">
  <p class="act mono">404</p>
  <h1 class="display display--xl"><em>{e(nf['title'])}</em></h1>
  <p class="lede">{e(nf['body'])}</p>
  <p class="lede dim" lang="en">{e(nf_en['body'])}</p>
  <div class="actions"><a class="btn btn--light" href="/">{e(nf['back'])}</a><a class="btn btn--ghost" href="/en/" lang="en">{e(nf_en['back'])}</a></div>
</main>
</body>
</html>
"""


def terminal():
    c, other = DATA["pt"], DATA["en"]
    payload = {"site": {k: SITE[k] for k in ("email", "whatsapp", "linkedin", "github", "instagram")}}
    for lang in ("pt", "en"):
        d = DATA[lang]
        payload[lang] = {
            "who": d["who"],
            "cases": [{"name": x["name"], "client": x["client"], "period": x["period"], "desc": x.get("desc") or d["cases"]["soon"]} for x in d["cases"]["items"]] + [{"name": r["name"], "client": "", "period": r["year"], "desc": r["desc"]} for r in d["cases"]["catalog"]],
            "credits": [{"role": x["role"], "org": x["org"], "period": x["period"]} for x in d["credits"]["items"]],
            "stack": [{"label": t["label"], "items": t["items"]} for t in d["cast"]["tiers"]],
            "backstage": d["backstage"]["body"],
        }
    title = "Victor Macedo — terminal"
    desc = "Versão terminal do portfólio de Victor Macedo. Digite help."
    return head(c, other, title=title, description=desc, canonical=SITE["url"] + "/terminal/") + f"""
<body class="term">
<a class="skip" href="#term-input">Pular para o prompt</a>
<header class="bar bar--top"><a class="mark" href="/">VM<span>.</span></a><span class="mono">victor@macedo: ~ · tty1</span><a class="kbd" href="/">GUI ↗</a></header>
<main class="term__main" id="conteudo">
  <div class="term__screen" id="term-out" aria-live="polite"></div>
  <form class="term__line" id="term-form" autocomplete="off">
    <label for="term-input" class="mono accent">visitante@vm:~$</label>
    <input id="term-input" class="mono" type="text" spellcheck="false" autocapitalize="off" enterkeyhint="send" aria-label="Comando">
  </form>
</main>
{data_script(payload)}
<script src="/assets/js/terminal.js?v={VERSION}" defer></script>
</body>
</html>
"""


def write(rel, text):
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")
    print("  ✓", rel)


if __name__ == "__main__":
    print("Gerando site…")
    write("index.html", page("pt"))
    write("en/index.html", page("en"))
    write("404.html", not_found())
    write("terminal/index.html", terminal())
    today = date.today().isoformat()
    urls = "".join(f"<url><loc>{SITE['url']}{p}</loc><lastmod>{today}</lastmod></url>" for p in ("/", "/en/", "/terminal/"))
    write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n')
    write("robots.txt", f"User-agent: *\nAllow: /\nSitemap: {SITE['url']}/sitemap.xml\n")
    print("Pronto.")
