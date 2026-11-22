#!/usr/bin/env python3
"""Gera assets/img/og.png (1200x630) e apple-touch-icon.png. Requer: pip install playwright && playwright install chromium"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
FONTS = (ROOT / "assets/css/site.css").read_text().split(":root")[0].replace("/assets/fonts/", (ROOT / "assets/fonts").as_uri() + "/")
OG = f"""<html><head><style>{FONTS}
body{{margin:0;width:1200px;height:630px;background:radial-gradient(ellipse 70% 70% at 70% 35%,#1E1D36 0%,#0B0C14 60%,#07080E 100%);color:#ECEAF2;font-family:Inter;overflow:hidden;position:relative}}
.grid{{position:absolute;inset:0;background-image:linear-gradient(rgba(145,132,217,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(145,132,217,.08) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse 70% 70% at 65% 40%,#000 20%,transparent 80%)}}
.top{{position:absolute;left:72px;right:72px;top:54px;display:flex;justify-content:space-between;align-items:center;font:500 18px 'JetBrains Mono';color:#8A889C}}
.mark{{font:500 30px 'JetBrains Mono';color:#ECEAF2;letter-spacing:-.02em}}
.st{{display:flex;gap:10px;align-items:center;color:#C9C7D6}}.st i{{width:11px;height:11px;border-radius:50%;background:#6EE7B7}}
.k{{position:absolute;left:72px;top:176px;font:400 26px 'JetBrains Mono';color:#C9C7D6}}.k b{{color:#6EE7B7;font-weight:400}}.k u{{display:inline-block;width:13px;height:28px;background:#B3A9EE;vertical-align:-4px;margin-left:4px}}
h1{{position:absolute;left:66px;top:222px;margin:0;font:600 150px/.95 Inter;letter-spacing:-.055em}}
h1 span{{color:#B3A9EE}}
h2{{position:absolute;left:72px;top:400px;margin:0;font:400 30px/1.35 Inter;color:#C9C7D6;max-width:900px}}
p{{position:absolute;left:72px;bottom:64px;margin:0;font:400 22px 'JetBrains Mono';color:#8A889C}}
</style></head><body><div class="grid"></div>
<div class="top"><span class="mark">VM</span><span class="st"><i></i>Chatbots · IA conversacional</span></div>
<div class="k"><b>~/salvador-ba $</b> construindo chatbots em produção<u></u></div>
<h1>Victor <span>Macedo</span></h1>
<h2>Chatbots que atendem clientes de verdade há nove anos — hoje com IA generativa.</h2>
<p>victormdev.github.io · Compass · Take Blip · XP · Localiza</p>
</body></html>"""
ICON = f"""<html><head><style>{FONTS}body{{margin:0;width:180px;height:180px;background:#0B0C14;display:flex;align-items:center;justify-content:center;gap:4px;font:500 66px 'JetBrains Mono';color:#ECEAF2;letter-spacing:-.03em}}b{{display:inline-block;width:28px;height:9px;background:#6EE7B7;align-self:flex-end;margin-bottom:58px}}</style></head><body>VM<b></b></body></html>"""

with sync_playwright() as p:
    br = p.chromium.launch()
    for html, path, w, h in ((OG, "assets/img/og.png", 1200, 630), (ICON, "assets/img/apple-touch-icon.png", 180, 180)):
        pg = br.new_page(viewport={"width": w, "height": h})
        tmp = ROOT / "tools/_render.html"
        tmp.write_text(html, encoding="utf-8")
        pg.goto(tmp.as_uri()); pg.wait_for_timeout(600)
        tmp.unlink()
        pg.screenshot(path=str(ROOT / path)); print("  ✓", path)
    br.close()
