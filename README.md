# Guará Studio — site institucional

Site de página única, feito em HTML, CSS e JavaScript puros (sem build, sem dependências).
Visual escuro, tipografia Sora + Instrument Serif e fotografia real de lobo-guará.

## Como abrir

Dê um duplo clique em `index.html` ou arraste o arquivo para o navegador.
Para recarregar com mais conforto durante edições, rode na pasta:

```powershell
npx serve .
```

## O que personalizar primeiro

| O quê | Onde |
| --- | --- |
| WhatsApp | Procure por `5511999999999` em `index.html` (links) e em `assets/js/main.js` (variável `WHATSAPP_NUMBER`) |
| Telefone exibido | `(11) 99999-9999` em `index.html` |
| E-mail | `contato@guarastudio.com.br` em `index.html` e no JSON-LD |
| Instagram | `instagram.com/guarawolfmarketing` em `index.html` |
| Cases, depoimentos e números | Seção correspondente em `index.html` (dados de exemplo — troque pelos reais) |
| Fotos do lobo-guará | `assets/img/` — troque os arquivos mantendo os nomes, ou atualize os `src` em `index.html` |
| Cores | Variáveis no topo de `assets/css/styles.css` (`--accent`, `--bg`, etc.) |

### Fotografias

As imagens de lobo-guará são fotografias reais de **Max Raffi**, do Parque Nacional da Chapada dos Veadeiros (GO),
publicadas no Wikimedia Commons sob **CC BY-SA 4.0**. O crédito aparece no rodapé do site e deve ser mantido
(caso troque as fotos, atualize o crédito).

- [Lobo-guará — Chapada dos Veadeiros (001)](https://commons.wikimedia.org/wiki/File:Lobo-guar%C3%A1-PARNA_da_Chapada_dos_Veadeiros-Max_Raffi(001).jpg) — foto panorâmica
- [(002)](https://commons.wikimedia.org/wiki/File:Lobo-guar%C3%A1-PARNA_da_Chapada_dos_Veadeiros-Max_Raffi(002).jpg) — foto vertical do estúdio
- [(003)](https://commons.wikimedia.org/wiki/File:Lobo-guar%C3%A1-PARNA_da_Chapada_dos_Veadeiros-Max_Raffi(003).jpg) — retrato do hero e avatar

Arquivos derivados (recortes e tratamento) em `assets/img/`: `guara-hero.jpg`, `guara-sobre.jpg`,
`guara-cerrado.jpg`, `guara-mark.jpg` e `favicon.png`.

## Estrutura

```
guara-studio/
├─ index.html
├─ README.md
└─ assets/
   ├─ css/styles.css
   ├─ js/main.js
   └─ img/
      ├─ guara-hero.jpg
      ├─ guara-sobre.jpg
      ├─ guara-cerrado.jpg
      ├─ guara-mark.jpg
      └─ favicon.png
```

## Recursos incluídos

- Layout responsivo (desktop, tablet e celular) com menu em tela cheia
- Header que muda ao rolar, animações de entrada e contadores
- Faixa fotográfica do Cerrado e card do estúdio com imagem real
- Método em 4 etapas, cases, depoimentos e FAQ em acordeão
- Formulário que monta a mensagem e abre o WhatsApp já preenchido
- SEO básico: meta tags, Open Graph, JSON-LD e HTML semântico
- Respeito a `prefers-reduced-motion`

## Publicar

Opções gratuitas e rápidas:

1. **Netlify Drop** — arraste a pasta em app.netlify.com/drop.
2. **Vercel** — `npx vercel` na pasta do projeto.
3. **GitHub Pages** — suba o repositório e ative Pages na branch principal.

Depois, aponte o domínio (ex.: `guarastudio.com.br`) no painel do serviço escolhido.
