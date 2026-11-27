# BRUTO — Energia sem filtro

> **Marca fictícia, criada para fins de estudo.** BRUTO não é um produto real nem tem relação com nenhuma empresa. O projeto existe para praticar branding, UX/UI e front-end.

![Layout desktop do sabor Manga Sacana](design/manga-sacana-expanded-preview.jpg)

**Ver no ar:** https://victorvalente99.github.io/bruto_/

## Autoria

Todo o branding e o design são de **Victor Valente**: o nome e o tom da marca, os sabores, a identidade visual e o layout das páginas.

Ferramentas usadas no processo:

- **Figma**: design da landing page (desktop e mobile), tipografia, cores e protótipo
- **Dreamina**: geração das imagens das latas
- **Claude** e **Gemini**: aprimoramento e polimento do design e do código

## O que tem na página

### Desktop
- **Acordeão de sabores:** clique numa coluna para abrir o sabor (Manga Sacana, Guaraná Baixaria, Açaízudo, Coco Saliente). A lata cresce e inclina numa transição contínua.
- **Tela cheia, sem rolagem:** a composição de 1440×1024 do Figma escala para caber em qualquer janela, e as colunas seguem a proporção do design (5fr / 1fr / 1fr / 1fr).
- **Teclado:** as setas ← → trocam de sabor e o Tab navega pelas colunas.

### Mobile
- **Um sabor por tela:** a rolagem encaixa em cada sabor, e a cor de fundo, os textos e a lata trocam juntos.
- **Indicador de sabores** na vertical, no canto superior direito, que também permite tocar para pular de sabor.
- **Latas do mesmo tamanho** em todos os sabores, sempre com o nome do sabor visível acima da barra de navegação flutuante.

### Nos dois
- **Links diretos:** cada sabor tem sua âncora (`#manga-sacana`, `#guarana-baixaria`, `#acaizudo`, `#coco-saliente`).
- HTML, CSS e JavaScript puros, sem frameworks.

## Arquivos

| Caminho | O que é |
|---|---|
| `index.html` | A página inteira (estrutura, estilos e script) |
| `assets/` | Logo e imagens das latas |
| `design/manga-sacana-expanded.pdf` | Export do Figma do layout desktop com o Manga Sacana aberto |

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
```
