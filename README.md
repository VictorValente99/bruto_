# BRUTO — Energia sem filtro

Landing page da marca fictícia de energético **BRUTO**, desenhada no Figma e implementada em HTML/CSS puro (sem frameworks).

- **Acordeão de sabores:** clique numa coluna para expandir o sabor (Manga Sacana, Guaraná Baixaria, Açaízudo, Coco Saliente). As latas se transformam entre os estados com uma transição contínua.
- **Full-page sem scroll:** a composição de 1440×1024 do Figma escala para caber em qualquer janela, e as colunas se dividem em grid na proporção do design (5fr / 1fr / 1fr / 1fr).
- **Links diretos:** cada sabor tem sua âncora (`#manga-sacana`, `#guarana-baixaria`, `#acaizudo`, `#coco-saliente`).
- **Teclado:** setas ← → trocam de sabor; Tab navega pelas colunas.

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
```
