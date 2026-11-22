# victormdev.github.io

Portfólio de Victor Macedo — versão cinematográfica. HTML estático, sem framework e sem build obrigatório no deploy (GitHub Pages serve os arquivos como estão).

## Editar o conteúdo

Todo o texto do site, em português e inglês, está em `content.json`. Depois de editar:

```bash
python3 tools/build.py
```

Isso regenera `index.html`, `en/index.html`, `404.html`, `terminal/index.html`, `sitemap.xml` e `robots.txt`. Faça commit dos arquivos gerados junto com o `content.json`.

Campos vazios (`""`) ficam escondidos no site. Os que valem a pena preencher:

| Campo | Onde aparece |
| --- | --- |
| `cases.items[].result` (pt e en) | Linha "Resultado" de cada case — use um número real |
| `cases.items[larmobi].desc` e `.url` | Card da Larmobi (hoje mostra só "Em breve") |

## Imagens de compartilhamento

`assets/img/og.png` e `apple-touch-icon.png` são geradas por `tools/render_images.py` (requer `pip install playwright && playwright install chromium`). Só é preciso rodar de novo se mudar o visual delas.

## Estrutura

```
content.json            textos PT/EN (fonte única)
tools/build.py          gera as páginas
assets/css/site.css     visual
assets/js/site.js       interações: ⌘K, timecode, idioma, contato
assets/js/terminal.js   versão terminal
assets/fonts/           Instrument Serif, Inter, JetBrains Mono (OFL, subconjunto latino)
```

Fontes sob a SIL Open Font License, servidas do próprio domínio.
