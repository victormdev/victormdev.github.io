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
| `site.certification.pt` / `.en` | Nos Créditos, abaixo da formação |
| `site.agentEndpoint` | Liga o agente a um LLM de verdade (abaixo) |

## O agente "Pergunte ao meu agente"

Funciona sem servidor: busca por relevância (TF-IDF com sinônimos) sobre a base `kb`, os cases, o catálogo e os créditos, e sempre mostra a fonte com link para a seção. O mesmo módulo (`assets/js/agent.js`) responde ao comando `ask` da versão terminal.

Para respostas geradas por um LLM, publique um endpoint (por exemplo um Cloudflare Worker ou uma função serverless, com a chave da API guardada lá — nunca no site) e coloque a URL em `site.agentEndpoint`. O site faz `POST` com:

```json
{ "question": "…", "lang": "pt-BR", "context": [{ "title": "…", "text": "…" }] }
```

e espera `{ "answer": "…" }`. O `context` já vem com os trechos recuperados, então o endpoint só precisa montar o prompt (RAG). Se o endpoint falhar ou demorar mais de 12 s, o site responde com a busca local.

## Imagens de compartilhamento

`assets/img/og.png` e `apple-touch-icon.png` são geradas por `tools/render_images.py` (requer `pip install playwright && playwright install chromium`). Só é preciso rodar de novo se mudar o visual delas.

## Estrutura

```
content.json            textos PT/EN (fonte única)
tools/build.py          gera as páginas
assets/css/site.css     visual
assets/js/agent.js      busca do agente (site + terminal)
assets/js/site.js       interações: agente, ⌘K, timecode, idioma, contato
assets/js/terminal.js   versão terminal
assets/fonts/           Instrument Serif, Inter, JetBrains Mono (OFL, subconjunto latino)
```

Fontes sob a SIL Open Font License, servidas do próprio domínio.
