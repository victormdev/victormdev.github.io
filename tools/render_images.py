#!/usr/bin/env python3
"""Gera assets/img/og.png (1200x630) e apple-touch-icon.png. Requer: pip install playwright && playwright install chromium"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
FONTS = (ROOT / "assets/css/site.css").read_text().split(":root")[0].replace("/assets/fonts/", (ROOT / "assets/fonts").as_uri() + "/")
OG = f"""<html><head><style>{FONTS}
body{{margin:0;width:1200px;height:630px;background:radial-gradient(ellipse 70% 70% at 70% 35%,#24223F 0%,#0B0C14 60%,#07080E 100%);color:#ECEAF2;font-family:Inter;overflow:hidden;position:relative}}
.bar{{position:absolute;left:0;right:0;height:46px;background:#000;display:flex;align-items:center;justify-content:space-between;padding:0 56px;font:500 15px 'JetBrains Mono';letter-spacing:.16em;color:#8A889C;text-transform:uppercase}}
.t{{top:0}}.b{{bottom:0}}
.k{{position:absolute;left:72px;top:110px;font:500 17px 'JetBrains Mono';letter-spacing:.2em;color:#F2B866;text-transform:uppercase;display:flex;gap:14px;align-items:center}}
.k i{{width:11px;height:11px;border-radius:50%;background:#F2B866}}
h1{{position:absolute;left:66px;top:150px;margin:0;font:400 172px/.86 'Instrument Serif';letter-spacing:-.035em}}
h1 em{{color:#B3A9EE}}
p{{position:absolute;left:72px;bottom:84px;margin:0;font-size:27px;color:#C9C7D6;max-width:900px;line-height:1.35}}
</style></head><body>
<div class="bar t"><span style="font:400 30px 'Instrument Serif';letter-spacing:0;color:#ECEAF2;text-transform:none">VM<span style="color:#9184D9">.</span></span><span>Cena 01 · Cold open</span></div>
<div class="k"><i></i>Salvador, BA · IA conversacional</div>
<h1>Victor<br><em>Macedo.</em></h1>
<p>Chatbots e agentes de IA que atendem clientes de verdade.</p>
<div class="bar b"><span>victormdev.github.io</span><span>Compass · Take Blip · XP · Localiza</span></div>
</body></html>"""
ICON = f"""<html><head><style>{FONTS}body{{margin:0;width:180px;height:180px;background:#161826;display:flex;align-items:center;justify-content:center;font:400 84px 'Instrument Serif';color:#ECEAF2}}b{{color:#9184D9;font-weight:400}}</style></head><body>VM<b>.</b></body></html>"""

with sync_playwright() as p:
    br = p.chromium.launch()
    for html, path, w, h in ((OG, "assets/img/og.png", 1200, 630), (ICON, "assets/img/apple-touch-icon.png", 180, 180)):
        pg = br.new_page(viewport={"width": w, "height": h})
        pg.set_content(html); pg.wait_for_timeout(400)
        pg.screenshot(path=str(ROOT / path)); print("  ✓", path)
    br.close()
