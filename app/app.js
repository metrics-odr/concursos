/* Área do Concurseiro — app estático que lê e edita o repositório metrics-odr/concursos.
 * Leitura: API do GitHub (com token) → raw.githubusercontent.com → arquivos do próprio Pages.
 * Escrita: API de conteúdo do GitHub com o token salvo no navegador. */
(() => {
  "use strict";

  const CFG = {
    owner: "metrics-odr",
    repo: "concursos",
    branch: "main",
    concurso: "cgu-affc",
    dataProva: "2026-12-13T08:00:00-03:00",
    progresso: "concursos/cgu-affc/PROGRESSO.md",
    registro: "concursos/concursos.json",
    template: "_templates/nota-topico.md",
  };
  const OCULTOS = /^(\.|app\/|index\.html$|indice\.json$|_site\/)|\/\.gitkeep$/;
  // Infra do site/build: escondida do explorer por padrão (botão 🔧 no rodapé mostra de novo)
  const TECNICOS = /^(scripts\/|_indices\/|_templates\/|automacoes\/|flashcards\/(scripts|exportados)\/|CLAUDE\.md$|\.)/;
  const ocultar = (p) => OCULTOS.test(p) || (!store.get("ac:verTecnicos", false) && TECNICOS.test(p));
  const STATUS = ["⬜", "🟨", "✅", "🔁"];
  const STATUS_NOME = { "⬜": "não iniciado", "🟨": "em estudo", "✅": "estudado", "🔁": "revisado" };
  const TASK_RE = /^\s*(?:[-*+]|\d+\.)\s+\[( |x|X)\]/;
  const STATUS_RE = /^(\s*(?:[-*+]|\d+\.)\s+)(⬜|🟨|✅|🔁)/;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(k, def) { try { const v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); } catch { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sem storage */ } },
    del(k) { try { localStorage.removeItem(k); } catch { /* sem storage */ } },
  };
  const token = () => store.get("ac:token", "");

  function toast(msg, ms = 2600) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), ms);
  }

  // ---------- Base64 UTF-8 ----------
  const b64enc = (str) => {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  };
  const b64dec = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\n/g, "")), (c) => c.charCodeAt(0)));

  // ---------- GitHub / leitura ----------
  const api = (p) => `https://api.github.com/repos/${CFG.owner}/${CFG.repo}${p}`;
  const rawUrl = (path) => `https://raw.githubusercontent.com/${CFG.owner}/${CFG.repo}/${CFG.branch}/${encodeURI(path)}`;
  const pagesUrl = (path) => new URL(encodeURI(path), document.baseURI).href;
  const githubUrl = (path) => `https://github.com/${CFG.owner}/${CFG.repo}/blob/${CFG.branch}/${encodeURI(path)}`;

  async function gh(path, opts = {}) {
    const headers = { Accept: "application/vnd.github+json", ...(opts.headers || {}) };
    if (token()) headers.Authorization = `Bearer ${token()}`;
    const r = await fetch(api(path), { ...opts, headers, cache: "no-store" });
    if (!r.ok) {
      const corpo = await r.json().catch(() => ({}));
      const e = new Error(corpo.message || `HTTP ${r.status}`);
      e.status = r.status;
      throw e;
    }
    return r.status === 204 ? null : r.json();
  }

  const estado = { arquivos: [], shas: {}, cache: {}, fonteArvore: "", raizMobile: false };
  const celular = () => matchMedia("(max-width: 860px)").matches;

  async function carregarArvore() {
    try {
      const t = await gh(`/git/trees/${CFG.branch}?recursive=1`);
      estado.arquivos = t.tree.filter((n) => n.type === "blob").map((n) => n.path);
      t.tree.forEach((n) => { if (n.type === "blob") estado.shas[n.path] = n.sha; });
      estado.fonteArvore = "api";
    } catch {
      const r = await fetch(pagesUrl("indice.json"), { cache: "no-store" });
      const j = await r.json();
      estado.arquivos = j.arquivos;
      estado.fonteArvore = "indice";
    }
    estado.arquivos.sort((a, b) => a.localeCompare(b, "pt-BR"));
  }

  async function lerArquivo(path, { fresco = false } = {}) {
    if (!fresco && estado.cache[path] !== undefined) return estado.cache[path];
    let texto;
    if (token()) {
      try {
        const j = await gh(`/contents/${encodeURI(path)}?ref=${CFG.branch}`);
        estado.shas[path] = j.sha;
        texto = j.content ? b64dec(j.content) : await (await fetch(j.download_url)).text();
      } catch (e) { if (e.status === 404) throw e; }
    }
    if (texto === undefined) {
      for (const url of [`${rawUrl(path)}?t=${Date.now()}`, pagesUrl(path)]) {
        try {
          const r = await fetch(url, { cache: "no-store" });
          if (r.ok) { texto = await r.text(); break; }
        } catch { /* tenta a próxima fonte */ }
      }
    }
    if (texto === undefined) throw new Error(`Não consegui ler ${path}`);
    estado.cache[path] = texto;
    return texto;
  }

  async function salvarArquivo(path, texto, mensagem) {
    if (!token()) {
      abrirConfig();
      throw new Error("Configure o token do GitHub para salvar.");
    }
    if (!estado.shas[path] && estado.arquivos.includes(path)) {
      const j = await gh(`/contents/${encodeURI(path)}?ref=${CFG.branch}`);
      estado.shas[path] = j.sha;
    }
    const corpo = { message: mensagem || `Área do Concurseiro: atualiza ${path}`, content: b64enc(texto), branch: CFG.branch };
    if (estado.shas[path]) corpo.sha = estado.shas[path];
    let r;
    try {
      r = await gh(`/contents/${encodeURI(path)}`, { method: "PUT", body: JSON.stringify(corpo) });
    } catch (e) {
      if (e.status === 409 || e.status === 422) {
        throw new Error("O arquivo mudou no GitHub desde que foi aberto. Recarregue a página e refaça a alteração.");
      }
      throw e;
    }
    estado.shas[path] = r.content.sha;
    estado.cache[path] = texto;
    if (!estado.arquivos.includes(path)) {
      estado.arquivos.push(path);
      estado.arquivos.sort((a, b) => a.localeCompare(b, "pt-BR"));
      renderArvore();
    }
    return r;
  }

  // ---------- Caminhos ----------
  const dirname = (p) => (p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "");
  const basename = (p) => p.split("/").pop();
  const semExt = (p) => basename(p).replace(/\.[^.]+$/, "");
  function resolver(base, rel) {
    const partes = (rel.startsWith("/") ? [] : dirname(base).split("/").filter(Boolean));
    for (const seg of rel.replace(/^\//, "").split("/")) {
      if (seg === "..") partes.pop();
      else if (seg && seg !== ".") partes.push(seg);
    }
    return partes.join("/");
  }
  function alvoDePasta(p) {
    const limpo = p.replace(/\/$/, "");
    if (estado.arquivos.includes(limpo)) return limpo;
    const readme = `${limpo}/README.md`;
    return estado.arquivos.includes(readme) ? readme : `${limpo}/`;
  }
  function resolverWiki(alvo) {
    const nome = alvo.split("#")[0].trim().toLowerCase();
    if (!nome) return null;
    return estado.arquivos.find((p) => p.toLowerCase() === nome || p.toLowerCase() === `${nome}.md`)
      || estado.arquivos.find((p) => semExt(p).toLowerCase() === nome.replace(/\.md$/, "") && p.endsWith(".md"))
      || estado.arquivos.find((p) => basename(p).toLowerCase() === nome)
      || estado.arquivos.find((p) => p.toLowerCase().endsWith(`/${nome}.md`) || p.toLowerCase().endsWith(`/${nome}`));
  }
  const rotaNota = (p) => `#/nota/${encodeURI(p)}`;

  // ---------- Markdown estilo Obsidian ----------
  function frontmatter(texto) {
    const m = texto.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!m) return { props: null, corpo: texto };
    const props = m[1].split("\n").map((l) => l.match(/^([\w-]+):\s*(.*)$/)).filter(Boolean).map((x) => [x[1], x[2]]);
    return { props, corpo: texto.slice(m[0].length) };
  }

  function preprocessar(md) {
    // Não mexe em blocos de código
    return md.split(/(```[\s\S]*?```|`[^`\n]*`)/g).map((trecho, i) => {
      if (i % 2) return trecho;
      return trecho
        .replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, a, alt) => `![${alt || a}](wiki:${encodeURIComponent(a.trim())})`)
        .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, a, alias) => `[${alias || a}](wiki:${encodeURIComponent(a.trim())})`);
    }).join("");
  }

  function configurarMarked() {
    const r = new marked.Renderer();
    r.code = (code, info) => {
      if ((info || "").trim() === "mermaid") return `<pre class="mermaid">${esc(code)}</pre>`;
      return `<pre><code class="language-${esc(info || "")}">${esc(code)}</code></pre>`;
    };
    r.listitem = (text, task, checked) => task
      ? `<li class="task${checked ? " feito" : ""}">${text}</li>`
      : `<li>${text}</li>`;
    r.checkbox = (checked) => `<input type="checkbox" class="tarefa"${checked ? " checked" : ""}>`;
    marked.use({ renderer: r, gfm: true, breaks: false });
  }

  function linkInterno(href, base) {
    if (/^(https?:|mailto:)/.test(href)) return { href, externo: true };
    if (href.startsWith("#")) return { href, ancora: true };
    if (href.startsWith("wiki:")) {
      const alvo = resolverWiki(decodeURIComponent(href.slice(5)));
      return alvo ? { href: rotaNota(alvo), wiki: true, alvo } : { href: "#", wiki: true, quebrado: true };
    }
    const [caminho, ancora] = decodeURI(href).split("#");
    const alvo = alvoDePasta(resolver(base, caminho));
    return { href: rotaNota(alvo) + (ancora ? `::${ancora}` : ""), alvo };
  }

  function srcImagem(src, base) {
    if (/^(https?:|data:)/.test(src)) return src;
    const alvo = src.startsWith("wiki:") ? resolverWiki(decodeURIComponent(src.slice(5))) : resolver(base, decodeURI(src));
    return alvo ? rawUrl(alvo) : src;
  }

  function slugTitulo(t) {
    return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
  }

  function renderMarkdown(texto, base, el) {
    const { props, corpo } = frontmatter(texto);
    const html = DOMPurify.sanitize(marked.parse(preprocessar(corpo)), {
      ADD_TAGS: ["input"], ADD_ATTR: ["checked", "target"], ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|wiki|data):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
    });
    el.innerHTML = (props ? `<div class="props">${props.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div>` : "") + html;

    // Links
    $$("a[href]", el).forEach((a) => {
      const info = linkInterno(a.getAttribute("href"), base);
      if (info.externo) { a.target = "_blank"; a.rel = "noopener"; return; }
      if (info.ancora) {
        a.addEventListener("click", (ev) => { ev.preventDefault(); rolarPara(info.href.slice(1)); });
        return;
      }
      a.setAttribute("href", info.href);
      if (info.wiki) a.classList.add("wiki");
      if (info.quebrado || (info.alvo && !info.alvo.endsWith("/") && !estado.arquivos.includes(info.alvo))) a.classList.add("quebrado");
    });
    $$("img", el).forEach((img) => { img.src = srcImagem(img.getAttribute("src") || "", base); img.loading = "lazy"; });
    $$("h1,h2,h3,h4", el).forEach((h) => { h.id = slugTitulo(h.textContent); });

    // Callouts > [!TIPO] Título
    $$("blockquote", el).forEach((bq) => {
      const p = bq.querySelector("p");
      const m = p && p.innerHTML.match(/^\s*\[!(\w+)\]([+-]?)[ \t]*([^\n<]*)(?:<br>|\n)?/);
      if (!m) return;
      const tipo = m[1].toLowerCase();
      const titulo = m[3].trim() || m[1][0] + m[1].slice(1).toLowerCase();
      p.innerHTML = p.innerHTML.slice(m[0].length);
      if (!p.innerHTML.trim()) p.remove();
      const div = document.createElement("div");
      div.className = `callout ${tipo}`;
      div.innerHTML = `<div class="callout-titulo">${esc(titulo)}</div>`;
      div.append(...bq.childNodes);
      bq.replaceWith(div);
    });

    // #tags
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement.closest("code,pre,a,.mermaid") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const nos = [];
    while (walker.nextNode()) if (/(^|\s)#[\p{L}][\p{L}\w/-]*/u.test(walker.currentNode.nodeValue)) nos.push(walker.currentNode);
    nos.forEach((n) => {
      const span = document.createElement("span");
      span.innerHTML = esc(n.nodeValue).replace(/(^|\s)(#[\p{L}][\p{L}\w/-]*)/gu, '$1<span class="tag">$2</span>');
      n.replaceWith(...span.childNodes);
    });

    // Mermaid
    const mers = $$("pre.mermaid", el);
    if (mers.length && window.mermaid) {
      try {
        mermaid.initialize({ startOnLoad: false, theme: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default" });
        mermaid.run({ nodes: mers }).catch(() => {});
      } catch { /* diagrama inválido fica como texto */ }
    }
  }

  // Liga checkboxes e emojis de status às linhas do arquivo-fonte (na ordem em que aparecem)
  function linhasFora(texto, re) {
    const idx = [];
    let cerca = false;
    texto.split("\n").forEach((l, i) => {
      if (/^\s*```/.test(l)) cerca = !cerca;
      else if (!cerca && re.test(l)) idx.push(i);
    });
    return idx;
  }

  function ligarInterativos(el, path, onChange) {
    const fonte = () => estado.cache[path];
    $$("input.tarefa", el).forEach((cb, n) => {
      cb.addEventListener("change", async () => {
        const linhas = fonte().split("\n");
        const i = linhasFora(fonte(), TASK_RE)[n];
        if (i === undefined) return;
        linhas[i] = linhas[i].replace(/\[( |x|X)\]/, cb.checked ? "[x]" : "[ ]");
        cb.closest("li")?.classList.toggle("feito", cb.checked);
        await persistir(path, linhas.join("\n"), cb.checked ? "Marca tarefa como concluída" : "Desmarca tarefa", () => { cb.checked = !cb.checked; });
        onChange?.();
      });
    });
    // Emojis de status no início de itens de lista
    const lis = $$("li", el).filter((li) => STATUS.some((s) => (li.firstChild?.textContent || "").trimStart().startsWith(s)));
    lis.forEach((li, n) => {
      const no = li.firstChild;
      const txt = no.textContent;
      const emoji = STATUS.find((s) => txt.trimStart().startsWith(s));
      const span = document.createElement("span");
      span.className = "status";
      span.textContent = emoji;
      span.title = `${STATUS_NOME[emoji]} — clique para avançar (⬜→🟨→✅→🔁)`;
      if (no.nodeType === 3) {
        no.textContent = txt.replace(emoji, "");
        li.insertBefore(span, no);
      } else {
        return;
      }
      span.addEventListener("click", async () => {
        const linhas = fonte().split("\n");
        const i = linhasFora(fonte(), STATUS_RE)[n];
        if (i === undefined) return;
        const atual = linhas[i].match(STATUS_RE)[2];
        const prox = STATUS[(STATUS.indexOf(atual) + 1) % STATUS.length];
        linhas[i] = linhas[i].replace(STATUS_RE, `$1${prox}`);
        span.textContent = prox;
        span.title = `${STATUS_NOME[prox]} — clique para avançar`;
        await persistir(path, linhas.join("\n"), `Progresso: ${STATUS_NOME[prox]}`, () => { span.textContent = atual; });
        onChange?.();
      });
    });
  }

  async function persistir(path, texto, msg, desfazer) {
    if (!token()) {
      desfazer?.();
      toast("Para salvar, configure o token do GitHub (⚙️).", 4000);
      abrirConfig();
      return false;
    }
    const anterior = estado.cache[path];
    estado.cache[path] = texto;
    try {
      await salvarArquivo(path, texto, `${msg} (${path})`);
      toast("✅ Salvo no GitHub");
      return true;
    } catch (e) {
      estado.cache[path] = anterior;
      desfazer?.();
      toast(`⚠️ ${e.message}`, 5000);
      return false;
    }
  }

  function rolarPara(id) {
    const alvo = document.getElementById(slugTitulo(decodeURIComponent(id)));
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- Explorer ----------
  function montarArvore(paths) {
    const raiz = { pastas: {}, arquivos: [] };
    paths.forEach((p) => {
      const partes = p.split("/");
      let no = raiz;
      partes.slice(0, -1).forEach((seg) => { no = no.pastas[seg] ||= { pastas: {}, arquivos: [] }; });
      no.arquivos.push(p);
    });
    return raiz;
  }
  const icone = (p) => {
    const ext = p.split(".").pop().toLowerCase();
    return { md: "📝", pdf: "📕", csv: "🃏", json: "🧾", py: "🐍", png: "🖼️", jpg: "🖼️", jpeg: "🖼️", txt: "📄", yml: "⚙️" }[ext] || "📄";
  };

  function renderArvore() {
    const filtro = ($("#filtro").value || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const visiveis = estado.arquivos.filter((p) => !ocultar(p))
      .filter((p) => !filtro || p.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(filtro));
    const abertas = store.get("ac:pastas", { concursos: true, [`concursos/${CFG.concurso}`]: true, disciplinas: true });
    const atual = rotaAtual().path || "";
    const html = (no, prefixo) => {
      const pastas = Object.keys(no.pastas).sort((a, b) => a.localeCompare(b, "pt-BR")).map((nome) => {
        const caminho = prefixo ? `${prefixo}/${nome}` : nome;
        const aberto = filtro || abertas[caminho] || atual.startsWith(`${caminho}/`);
        return `<details data-pasta="${esc(caminho)}"${aberto ? " open" : ""}><summary class="item"><span class="seta">▶</span>📁 ${esc(nome)}</summary><div class="filhos">${html(no.pastas[nome], caminho)}</div></details>`;
      }).join("");
      const arqs = no.arquivos.map((p) => `<a class="item${p === atual ? " ativo" : ""}" href="${rotaNota(p)}" title="${esc(p)}">${icone(p)} <span class="nome">${esc(semExt(p))}<span class="ext">${esc(basename(p).slice(semExt(p).length))}</span></span></a>`).join("");
      return pastas + arqs;
    };
    const RAIZ = "__navegar__";
    // No celular a árvore começa recolhida a cada visita (as páginas do concurso ficam em primeiro plano)
    const raizAberta = filtro || (celular() ? estado.raizMobile : abertas[RAIZ] !== false);
    $("#tree").innerHTML = visiveis.length
      ? `<details class="raiz" data-pasta="${RAIZ}"${raizAberta ? " open" : ""}><summary class="item"><span class="seta">▶</span>🗂️ Navegar em Arquivos</summary><div class="filhos">${html(montarArvore(visiveis), "")}</div></details>`
      : '<p class="muted pad">Nada encontrado.</p>';
    $$("#tree details").forEach((d) => d.addEventListener("toggle", () => {
      if (d.dataset.pasta === RAIZ && celular()) { if (!filtro) estado.raizMobile = d.open; return; }
      const a = store.get("ac:pastas", {});
      a[d.dataset.pasta] = d.open;
      store.set("ac:pastas", a);
    }));
    $("#status-conexao").textContent = token()
      ? `🔐 Conectado (edição ativa) · ${estado.arquivos.length} arquivos`
      : `👀 Somente leitura · ${estado.arquivos.length} arquivos · ⚙️ para editar`;
  }

  // ---------- Concursos e bancas ----------
  // Registro em concursos/concursos.json. Toda tela de questões mostra o selo da banca (bancaBadge).
  let CONCURSOS = [];
  const slugBanca = (b) => String(b || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const bancaBadge = (banca, extra = "") => `<span class="banca-badge b-${slugBanca(banca)}" title="Banca organizadora">🏛️ ${esc(banca)}${extra ? ` · ${esc(extra)}` : ""}</span>`;
  const conc = () => CONCURSOS.find((c) => c.slug === CFG.concurso) || CONCURSOS[0]
    || { slug: CFG.concurso, codigo: CFG.concurso, banca: "Cebraspe", formato: "Certo/Errado", dataProva: "2026-12-13", cargo: "", orgao: "", status: "ativo" };
  const fmtDataISO = (iso) => iso.split("-").reverse().join("/");

  async function carregarConcursos() {
    try { CONCURSOS = JSON.parse(await lerArquivo(CFG.registro, { fresco: true })).concursos; } catch { CONCURSOS = []; }
  }

  function ativarConcurso(slug) {
    const c = CONCURSOS.find((x) => x.slug === slug);
    if (!c) return false;
    CFG.concurso = slug;
    CFG.dataProva = `${c.dataProva}T08:00:00-03:00`;
    CFG.progresso = `concursos/${slug}/PROGRESSO.md`;
    NIV_DIR = `concursos/${slug}/nivelamento`;
    NIV_RES = `${NIV_DIR}/resultados`;
    store.set("ac:concurso", slug);
    return true;
  }

  function montarAbas() {
    const c = conc(), base = `concursos/${c.slug}`;
    const abas = [["inicio", `#/c/${c.slug}`, "🏠 Início"], ["desafios", "#/desafios", "🎯 Desafios"], ["flashcards", "#/flashcards", "🃏 Flashcards"],
      ["nivelamento", "#/nivelamento", "📊 Nivelamento"], ["progresso", rotaNota(`${base}/PROGRESSO.md`), "✅ Progresso"],
      ["acervo", rotaNota(`${base}/acervo/README.md`), "🔎 Acervo"], ["provas", rotaNota(`${base}/revisao/provas-cebraspe.md`), "📝 Provas"]];
    $("#tabs").innerHTML = abas.map(([t, h, r]) => `<a href="${h}" data-tab="${t}">${r}</a>`).join("");
    // No celular, as mesmas páginas aparecem no topo do explorador (entre o filtro e os arquivos)
    $("#paginas").innerHTML = `<a class="voltar-concursos" href="#/" title="Voltar para a lista de concursos">‹ Todos os concursos</a>`
      + `<div class="paginas-titulo">📌 Páginas do concurso · ${esc(c.orgao || c.slug)}</div>`
      + `<div class="paginas-grade">${abas.map(([t, h, r]) => `<a class="pag" href="${h}" data-tab="${t}">${r}</a>`).join("")}</div>`;
    $("#chip-concurso").innerHTML = `<a href="#/" title="Trocar de concurso">🔄 ${esc(c.orgao)}</a>${bancaBadge(c.banca)}`;
  }

  // ---------- Rotas ----------
  function rotaAtual() {
    const h = decodeURI(location.hash.slice(1) || "/");
    if (h.startsWith("/nota/")) {
      const [path, ancora] = h.slice(6).split("::");
      return { nome: "nota", path, ancora };
    }
    if (h.startsWith("/c/")) return { nome: "inicio", slug: h.slice(3).replace(/\/$/, "") };
    if (h.startsWith("/editar/")) return { nome: "editar", path: h.slice(8) };
    if (h.startsWith("/desafios")) return { nome: "desafios" };
    if (h.startsWith("/flashcards")) return { nome: "flashcards" };
    if (h.startsWith("/nivelamento")) return { nome: "nivelamento", sub: h.slice(13) };
    return { nome: "selecao" };
  }

  function marcarAba(r) {
    const mapa = { inicio: "inicio", desafios: "desafios", flashcards: "flashcards", nivelamento: "nivelamento" };
    let aba = mapa[r.nome];
    if (r.path === CFG.progresso) aba = "progresso";
    else if (r.path?.includes("/acervo/")) aba = "acervo";
    else if (r.path?.includes("provas-cebraspe")) aba = "provas";
    $$("#tabs a, #paginas a").forEach((a) => a.classList.toggle("ativo", a.dataset.tab === aba));
    return aba;
  }

  async function navegar() {
    const r = rotaAtual();
    if (!CONCURSOS.length) await carregarConcursos();
    if (r.nome === "inicio" && !ativarConcurso(r.slug)) { location.hash = "#/"; return; }
    if (r.nome !== "inicio" && r.nome !== "selecao") ativarConcurso(store.get("ac:concurso", CFG.concurso)) || ativarConcurso(CONCURSOS[0]?.slug);
    const nivel = r.nome === "selecao";
    $("#chip-concurso").hidden = nivel;
    document.body.dataset.banca = nivel ? "" : slugBanca(conc().banca);
    document.body.classList.toggle("tela-selecao", nivel);  // seleção: só o concurso, sem abas/arquivos
    montarAbas();
    const aba = marcarAba(r);
    renderArvore();
    if (matchMedia("(max-width: 860px)").matches) { $("#sidebar").classList.remove("aberta"); $("#seta-arquivos").textContent = "▸"; }
    const main = $("#main");
    main.scrollTop = 0;
    try {
      if (r.nome === "nota") await telaNota(main, r.path, r.ancora);
      else if (r.nome === "editar") await telaEditor(main, r.path);
      else if (r.nome === "desafios") await telaDesafios(main);
      else if (r.nome === "flashcards") await telaFlashcards(main);
      else if (r.nome === "nivelamento") await telaNivelamento(main, r.sub);
      else if (r.nome === "inicio") await telaInicio(main);
      else await telaSelecao(main);
    } catch (e) {
      main.innerHTML = `<div class="conteudo"><h2>⚠️ Não foi possível abrir</h2><p>${esc(e.message)}</p><p><a href="#/">Voltar ao início</a></p></div>`;
    }
    mostrarTitulo(r, aba);
  }

  // Celular: a topbar mostra só o nome da página atual (os links ficam no explorador, ☰)
  const NOME_ABA = { inicio: "Início", desafios: "Desafios", flashcards: "Flashcards", nivelamento: "Nivelamento",
    progresso: "Progresso", acervo: "Acervo", provas: "Provas" };
  function mostrarTitulo(r, aba) {
    const h1 = $("#main h1")?.textContent.replace(/\s+/g, " ").replace(/^[^\p{L}\p{N}]+/u, "").trim();
    // Página de aba → nome da aba; subpáginas (ex.: uma disciplina do acervo) e notas → título da nota
    const ehAba = aba && (aba !== "acervo" || r.path?.endsWith("/acervo/README.md"));
    let nome;
    if (r.nome === "selecao") nome = "Concursos";
    else if (ehAba) nome = NOME_ABA[aba];
    else nome = h1 || (r.path ? semExt(r.path.replace(/\/$/, "")).replace(/-/g, " ") : "");
    nome = nome.charAt(0).toUpperCase() + nome.slice(1);
    const el = $("#titulo-pagina");
    el.textContent = nome;
    el.title = nome;
    if (nome) document.title = `${nome} · Área do Concurseiro`;
  }

  // ---------- Tela: nota ----------
  async function telaNota(main, path, ancora) {
    if (path.endsWith("/")) return telaPasta(main, path);
    const ext = path.split(".").pop().toLowerCase();
    const barra = (extra = "") => `<div class="nota-barra"><div class="caminho">${migalhas(path)}</div>${extra}
      <a class="btn ghost" href="${githubUrl(path)}" target="_blank" rel="noopener" title="Abrir no GitHub">GitHub ↗</a></div>`;

    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) {
      main.innerHTML = `<div class="conteudo">${barra()}<img src="${rawUrl(path)}" alt="${esc(path)}" style="max-width:100%"></div>`;
      return;
    }
    if (ext === "pdf") {
      main.innerHTML = `<div class="conteudo largo">${barra(`<a class="btn" href="${pagesUrl(path)}" target="_blank" rel="noopener">Abrir PDF ↗</a>`)}
        <iframe src="${pagesUrl(path)}" title="${esc(path)}" style="width:100%;height:calc(100vh - 150px);border:1px solid var(--border);border-radius:8px"></iframe></div>`;
      return;
    }
    main.innerHTML = `<div class="conteudo">${barra()}<p class="muted">Carregando…</p></div>`;
    const texto = await lerArquivo(path);
    if (ext === "csv") {
      const linhas = parseCSV(texto);
      main.innerHTML = `<div class="conteudo largo">${barra('<a class="btn" href="#/flashcards">Estudar 🃏</a>')}<div class="md"><table><thead><tr>${linhas[0].map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${linhas.slice(1).map((l) => `<tr>${l.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
      return;
    }
    if (ext !== "md") {
      main.innerHTML = `<div class="conteudo">${barra(editarBtn(path))}<div class="md"><pre><code>${esc(texto)}</code></pre></div></div>`;
      return;
    }
    main.innerHTML = `<div class="conteudo">${barra(editarBtn(path))}<article class="md" id="nota"></article><div class="painel-lateral" id="backlinks"></div></div>`;
    const el = $("#nota");
    const redesenhar = () => {
      renderMarkdown(estado.cache[path], path, el);
      ligarInterativos(el, path);
    };
    redesenhar();
    if (ancora) setTimeout(() => rolarPara(ancora), 50);
    document.title = `${semExt(path)} · Área do Concurseiro`;
    mostrarBacklinks(path);
  }

  const editarBtn = (path) => `<a class="btn primary" href="#/editar/${encodeURI(path)}">✏️ Editar</a>`;

  function migalhas(path) {
    const partes = path.split("/");
    return partes.map((p, i) => {
      if (i === partes.length - 1) return `<b>${esc(p)}</b>`;
      const pasta = partes.slice(0, i + 1).join("/");
      return `<a href="${rotaNota(`${pasta}/`)}">${esc(p)}</a>`;
    }).join(" / ");
  }

  function telaPasta(main, pasta) {
    const p = pasta.replace(/\/$/, "");
    const filhos = new Set();
    estado.arquivos.filter((a) => a.startsWith(`${p}/`) && !ocultar(a)).forEach((a) => {
      const resto = a.slice(p.length + 1);
      filhos.add(resto.includes("/") ? `${resto.split("/")[0]}/` : resto);
    });
    const itens = [...filhos].sort((a, b) => (b.endsWith("/") - a.endsWith("/")) || a.localeCompare(b, "pt-BR"));
    main.innerHTML = `<div class="conteudo"><div class="nota-barra"><div class="caminho">${migalhas(`${p}/`)}</div>
      <button class="btn" id="nova-aqui">＋ Nova nota aqui</button></div>
      <h1>📁 ${esc(basename(p))}</h1>
      ${itens.length ? `<ul>${itens.map((i) => `<li><a href="${rotaNota(i.endsWith("/") ? alvoDePasta(`${p}/${i}`) : `${p}/${i}`)}">${i.endsWith("/") ? "📁" : icone(i)} ${esc(i)}</a></li>`).join("")}</ul>` : '<p class="muted">Pasta vazia.</p>'}</div>`;
    $("#nova-aqui").addEventListener("click", () => novaNota(p));
  }

  async function mostrarBacklinks(path) {
    const box = $("#backlinks");
    if (!box) return;
    const nome = semExt(path).toLowerCase();
    const candidatos = Object.entries(estado.cache).filter(([p, t]) => p !== path && p.endsWith(".md") && typeof t === "string"
      && (t.toLowerCase().includes(`[[${nome}`) || t.includes(basename(path))));
    box.innerHTML = candidatos.length
      ? `<h4>🔗 Mencionado em</h4><ul>${candidatos.map(([p]) => `<li><a href="${rotaNota(p)}">${esc(p)}</a></li>`).join("")}</ul>`
      : "";
  }

  // ---------- Tela: editor ----------
  // Live preview: recolhe os marcadores (**, *, ~~, `, #, [texto](url)) de tudo que não está sob o cursor;
  // ao clicar/navegar para dentro do trecho, o markdown cru reaparece para edição.
  function ligarLivePreview(cm) {
    let marcas = [];
    const tem = (t, c) => t.type && (" " + t.type + " ").includes(" " + c + " ");
    const esconder = (l, a, b) => marcas.push(cm.markText({ line: l, ch: a }, { line: l, ch: b }, { collapsed: true, inclusiveLeft: false, inclusiveRight: false }));
    function desenhar() {
      marcas.forEach((m) => m.clear());
      marcas = [];
      const sel = cm.listSelections();
      const dentro = (l, a, b) => sel.some((r) => {
        const [x, y] = [r.anchor, r.head].sort((p, q) => p.line - q.line || p.ch - q.ch);
        return !(y.line < l || x.line > l || (y.line === l && y.ch < a) || (x.line === l && x.ch > b));
      });
      const { from, to } = cm.getViewport();
      for (let l = from; l < to; l++) {
        const toks = cm.getLineTokens(l);
        const abertos = {};
        let link = null;
        toks.forEach((t) => {
          const s = t.string;
          if (tem(t, "formatting-list-ul")) {
            const n = s.search(/\S/);
            if (n >= 0 && !dentro(l, t.start, t.start + n + 2)) {
              const b = document.createElement("span");
              b.className = "cm-bullet";
              b.textContent = "•";
              marcas.push(cm.markText({ line: l, ch: t.start + n }, { line: l, ch: t.start + n + 1 }, { replacedWith: b }));
            }
            return;
          }
          if (tem(t, "formatting-quote")) { if (!dentro(l, 0, t.end + 1)) esconder(l, t.start, Math.min(t.end + 1, cm.getLine(l).length)); return; }
          if (tem(t, "formatting-header")) { if (!dentro(l, 0, t.end)) esconder(l, t.start, t.end); return; }
          for (const k of ["strong", "em", "strikethrough", "code"]) {
            if (!tem(t, "formatting-" + k)) continue;
            if (abertos[k]) {
              const a = abertos[k];
              if (!dentro(l, a.start, t.end)) { esconder(l, a.start, a.end); esconder(l, t.start, t.end); }
              abertos[k] = null;
            } else abertos[k] = t;
            return;
          }
          if (tem(t, "formatting-link") && s === "[" && !link) link = { ini: t, meio: null };
          else if (link && tem(t, "formatting-link") && s.startsWith("]") && !link.meio) link.meio = t;
          else if (link && link.meio && tem(t, "formatting-link-string") && s === ")") {
            if (!dentro(l, link.ini.start, t.end)) { esconder(l, link.ini.start, link.ini.end); esconder(l, link.meio.start, t.end); }
            link = null;
          }
        });
      }
    }
    let raf;
    const agendar = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => cm.operation(desenhar)); };
    cm.on("cursorActivity", agendar);
    cm.on("change", agendar);
    cm.on("viewportChange", agendar);
    agendar();
  }

  async function telaEditor(main, path) {
    const existe = estado.arquivos.includes(path);
    const texto = existe ? await lerArquivo(path, { fresco: !!token() }) : (estado.cache[path] ?? "");
    const ehMd = path.endsWith(".md");
    main.innerHTML = `<div class="conteudo largo">
      <div class="nota-barra"><div class="caminho">${migalhas(path)} ${existe ? "" : '<span class="tag">nova</span>'}</div>
        ${ehMd ? '<button class="btn" id="ed-preview">👁️ Prévia</button>' : ""}
        <a class="btn" href="${existe ? rotaNota(path) : "#/"}">Cancelar</a>
        <button class="btn primary" id="ed-salvar">💾 Salvar (Ctrl+S)</button></div>
      ${token() ? "" : '<div class="aviso">Modo somente leitura: configure o token em ⚙️ para salvar no GitHub.</div>'}
      <div class="editor-wrap${ehMd ? "" : " so-editor"}" id="ed-wrap">
        <textarea class="editor" id="ed-texto" spellcheck="true">${esc(texto)}</textarea>
        ${ehMd ? '<div class="preview md" id="ed-prev"></div>' : ""}
      </div>
      <p class="muted" style="font-size:13px">Dicas: <code>[[nome-da-nota]]</code> cria link interno · <code>&gt; [!TIP]</code> cria callout · <code>- [ ]</code> cria tarefa · blocos <code>\`\`\`mermaid</code> viram diagramas.</p></div>`;
    const ta = $("#ed-texto");
    const prev = $("#ed-prev");
    let original = texto;
    // Editor "live preview" (estilo Obsidian): CodeMirror esconde os marcadores fora da linha do cursor.
    // Sem CDN (ou arquivo não-md), cai no textarea simples.
    const cm = ehMd && window.CodeMirror ? CodeMirror.fromTextArea(ta, {
      mode: { name: "markdown", highlightFormatting: true },
      lineWrapping: true, styleActiveLine: true, spellcheck: true, inputStyle: "contenteditable",
      gutters: ["CodeMirror-foldgutter"], foldGutter: true,
      extraKeys: {
        Enter: "newlineAndIndentContinueMarkdownList",
        Tab: (c) => (c.somethingSelected() ? c.indentSelection("add") : c.replaceSelection("  ")),
        "Shift-Tab": (c) => c.indentSelection("subtract"),
        "Ctrl-S": () => salvar(), "Cmd-S": () => salvar(),
      },
    }) : null;
    if (cm) { $("#ed-wrap").classList.add("live", "so-editor"); ligarLivePreview(cm); }
    const valor = () => (cm ? cm.getValue() : ta.value);
    const atualizar = () => prev && renderMarkdown(valor(), path, prev);
    let t;
    if (!cm) ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(atualizar, 250); });
    cm?.on("change", () => { clearTimeout(t); t = setTimeout(atualizar, 250); });
    atualizar();
    $("#ed-preview")?.addEventListener("click", () => { $("#ed-wrap").classList.toggle("so-editor"); cm?.refresh(); });
    const salvar = async () => {
      if (valor() === original && existe) { toast("Nada mudou."); return; }
      const btn = $("#ed-salvar");
      btn.disabled = true;
      btn.textContent = "Salvando…";
      const conteudo = valor();
      if (await persistir(path, conteudo, existe ? "Edita nota" : "Cria nota")) {
        original = conteudo;
        location.hash = rotaNota(path);
      }
      btn.disabled = false;
      btn.textContent = "💾 Salvar (Ctrl+S)";
    };
    $("#ed-salvar").addEventListener("click", salvar);
    ta.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); salvar(); }
      if (e.key === "Tab") { e.preventDefault(); ta.setRangeText("  ", ta.selectionStart, ta.selectionEnd, "end"); }
    });
    if (cm) { cm.focus(); cm.execCommand("goDocEnd"); } else ta.focus();
  }

  async function novaNota(pastaPadrao) {
    const sugestao = `${pastaPadrao || "disciplinas"}/nova-nota.md`;
    let path = prompt("Caminho da nova nota (kebab-case, sem acentos):", sugestao);
    if (!path) return;
    path = path.trim().replace(/^\/+/, "");
    if (!path.endsWith(".md")) path += ".md";
    if (estado.arquivos.includes(path)) { location.hash = rotaNota(path); return; }
    let modelo = `# ${semExt(path)}\n\n`;
    try { modelo = (await lerArquivo(CFG.template)).replace(/^# .*$/m, `# ${semExt(path).replace(/^\d+-/, "").replace(/-/g, " ")}`); } catch { /* sem modelo */ }
    estado.cache[path] = modelo;
    location.hash = `#/editar/${encodeURI(path)}`;
  }

  // ---------- Progresso (PROGRESSO.md) ----------
  function lerProgresso(texto) {
    const disc = [];
    let atual = null;
    let prova = "";
    texto.split("\n").forEach((l) => {
      const p = l.match(/^## (P\d)\b/);
      if (p) prova = p[1];
      const h = l.match(/^### (.+)/);
      if (h) { atual = { prova, nome: h[1].trim(), cont: { "⬜": 0, "🟨": 0, "✅": 0, "🔁": 0 }, total: 0 }; disc.push(atual); return; }
      const m = l.match(STATUS_RE);
      if (m && atual) { atual.cont[m[2]]++; atual.total++; }
    });
    return disc.filter((d) => d.total);
  }

  function barraProgresso(c, total) {
    const pct = (n) => (total ? (100 * n) / total : 0);
    return `<div class="barra" title="✅ ${c["✅"]} · 🔁 ${c["🔁"]} · 🟨 ${c["🟨"]} · ⬜ ${c["⬜"]}"><span class="b-rev" style="width:${pct(c["🔁"])}%"></span><span class="b-ok" style="width:${pct(c["✅"])}%"></span><span class="b-em" style="width:${pct(c["🟨"])}%"></span></div>`;
  }

  // ---------- Desafios ----------
  const hojeISO = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo" }).format(new Date());
  const arquivosDesafio = () => estado.arquivos.filter((p) => /^desafios\/\d{4}-\d{2}-\d{2}\.md$/.test(p)).sort().reverse();
  function contarTarefas(texto) {
    const idx = linhasFora(texto, TASK_RE);
    const linhas = texto.split("\n");
    const feitas = idx.filter((i) => /\[(x|X)\]/.test(linhas[i])).length;
    return { feitas, total: idx.length };
  }

  async function telaDesafios(main) {
    const lista = arquivosDesafio();
    const hoje = hojeISO();
    main.innerHTML = `<div class="conteudo"><h1>🎯 Desafios diários</h1><div id="ds-cal"></div><div id="ds-hoje"><p class="muted">Carregando…</p></div><div id="ds-hist" class="painel-lateral"></div></div>`;
    if (!lista.length) {
      $("#ds-hoje").innerHTML = `<div class="aviso">Ainda não há desafios. O primeiro é gerado pela rotina diária (GitHub Actions) — ou rode o workflow <b>Desafio diário</b>.</div>`;
      return;
    }
    const path = lista.includes(`desafios/${hoje}.md`) ? `desafios/${hoje}.md` : lista[0];
    await lerArquivo(path, { fresco: true });
    const el = document.createElement("article");
    el.className = "md";
    $("#ds-hoje").innerHTML = path.endsWith(`${hoje}.md`) ? "" : `<div class="aviso">O desafio de hoje (${hoje}) ainda não foi gerado. Mostrando o último: ${esc(basename(path))}.</div>`;
    $("#ds-hoje").append(el);
    const redesenhar = () => { renderMarkdown(estado.cache[path], path, el); ligarInterativos(el, path, desenharCalendario); };
    redesenhar();

    async function desenharCalendario() {
      const ult = lista.slice(0, 28);
      await Promise.all(ult.map((p) => lerArquivo(p).catch(() => "")));
      let sequencia = 0;
      for (const p of ult) {
        const { feitas, total } = contarTarefas(estado.cache[p] || "");
        if (total && feitas === total) sequencia++;
        else if (!p.endsWith(`${hoje}.md`)) break;
      }
      const dias = ult.slice().reverse().map((p) => {
        const { feitas, total } = contarTarefas(estado.cache[p] || "");
        const r = total ? feitas / total : 0;
        const cls = r === 1 ? "p3" : r >= 0.5 ? "p2" : r > 0 ? "p1" : "";
        const d = basename(p).slice(8, 10);
        return `<a class="dia ${cls}" href="${rotaNota(p)}" title="${semExt(p)}: ${feitas}/${total}">${d}</a>`;
      }).join("");
      $("#ds-cal").innerHTML = `<div class="card"><h3>🔥 Sequência: ${sequencia} dia(s) com tudo concluído</h3><div class="calendario">${dias}</div></div>`;
    }
    desenharCalendario();
    $("#ds-hist").innerHTML = `<h4>📅 Histórico</h4><ul>${lista.slice(0, 60).map((p) => `<li><a href="${rotaNota(p)}">${esc(basename(p))}</a></li>`).join("")}</ul>`;
  }

  // ---------- Flashcards ----------
  function parseCSV(texto) {
    const linhas = [];
    let linha = [], campo = "", aspas = false;
    for (let i = 0; i < texto.length; i++) {
      const c = texto[i];
      if (aspas) {
        if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') aspas = false;
        else campo += c;
      } else if (c === '"') aspas = true;
      else if (c === ",") { linha.push(campo); campo = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && texto[i + 1] === "\n") i++;
        linha.push(campo); campo = "";
        if (linha.some((x) => x !== "")) linhas.push(linha);
        linha = [];
      } else campo += c;
    }
    if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
    return linhas;
  }

  async function carregarCards() {
    const arqs = estado.arquivos.filter((p) => /^flashcards\/banco\/[^/]+\.csv$/.test(p));
    const cards = [];
    await Promise.all(arqs.map(async (p) => {
      const linhas = parseCSV(await lerArquivo(p));
      const cab = linhas[0] || [];
      linhas.slice(1).forEach((l) => {
        const c = Object.fromEntries(cab.map((k, i) => [k, l[i] || ""]));
        if (!c.id) return;
        c.disciplina = semExt(p);
        c.exemplo = basename(p).startsWith("_");
        cards.push(c);
      });
    }));
    return cards;
  }

  const srs = {
    get: (id) => store.get(`ac:fc:${id}`, null),
    set: (id, v) => store.set(`ac:fc:${id}`, v),
    devido: (c) => { const s = srs.get(c.id); return s && s.due <= Date.now(); },
    novo: (c) => !srs.get(c.id),
    novosHoje() { const r = store.get("ac:fc:novos", {}); return r.dia === hojeISO() ? r.n : 0; },
    contarNovo() { store.set("ac:fc:novos", { dia: hojeISO(), n: srs.novosHoje() + 1 }); },
    responder(c, nota) {
      const DIA = 86400000;
      const s = srs.get(c.id) || { ivl: 0, ef: 2.5, reps: 0 };
      if (!srs.get(c.id)) srs.contarNovo();
      if (nota === 0) { s.reps = 0; s.ivl = 0; s.ef = Math.max(1.3, s.ef - 0.2); s.due = Date.now() + 10 * 60000; }
      else {
        if (nota === 1) { s.ivl = Math.max(1, Math.round((s.ivl || 1) * 1.2)); s.ef = Math.max(1.3, s.ef - 0.15); }
        else if (nota === 2) s.ivl = s.reps === 0 ? 1 : s.reps === 1 ? 3 : Math.round(s.ivl * s.ef);
        else { s.ivl = s.reps === 0 ? 4 : Math.round(Math.max(s.ivl, 1) * s.ef * 1.3); s.ef += 0.15; }
        s.reps++;
        s.due = Date.now() + s.ivl * DIA;
      }
      srs.set(c.id, s);
    },
  };

  const renderCloze = (t, revelar) => esc(t).replace(/\{\{c\d+::(.*?)(?:::(.*?))?\}\}/g, (_, r, dica) => (revelar ? `<span class="cloze">${r}</span>` : `<span class="cloze">[${dica || "…"}]</span>`));

  // Itens Cebraspe (Certo/Errado): o gabarito é a primeira palavra do verso ("Certo." / "Errado.").
  const GAB_RE = /^\s*\**\s*(certo|errado)\b\**[\s.:;,—–-]*/i;
  const ehCE = (c) => (c.tipo === "ce" || c.tipo === "vf") && GAB_RE.test(c.verso);
  const gabarito = (c) => GAB_RE.exec(c.verso)[1][0].toUpperCase();
  const justificativa = (c) => c.verso.replace(GAB_RE, "");
  const semPrefixoCE = (t) => t.replace(/^\s*\(C\/E\)\s*/i, "");
  const embaralhar = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  async function materiasEdital() {
    try {
      const j = JSON.parse(await lerArquivo(`concursos/${CFG.concurso}/edital/topicos.json`));
      return j.disciplinas.map((d) => ({ slug: d.slug, nome: d.disciplina, prova: d.prova, grupo: d.grupo_nome }));
    } catch { return []; }
  }

  async function telaFlashcards(main) {
    main.innerHTML = '<div class="conteudo"><h1>🃏 Flashcards</h1><p class="muted">Carregando…</p></div>';
    const [todos, materias] = await Promise.all([carregarCards(), materiasEdital()]);
    const limiteNovos = store.get("ac:novosDia", 20);
    const reais = todos.filter((c) => !c.exemplo);
    const base = reais.length ? reais : todos;
    const porMateria = {};
    base.forEach((c) => { (porMateria[c.disciplina] ||= []).push(c); });
    const extras = Object.keys(porMateria).filter((d) => !materias.some((m) => m.slug === d));
    const novosRest = Math.max(0, limiteNovos - srs.novosHoje());
    const provas = [...new Set(materias.map((m) => m.prova))];
    const n = (slug) => (porMateria[slug] || []).length;
    let escolha = store.get("ac:fc:materia", "*");
    if (escolha !== "*" && !n(escolha) && !provas.includes(escolha)) escolha = "*";

    const opcao = (valor, rotulo, qtd) => `<option value="${esc(valor)}"${qtd ? "" : " disabled"}${valor === escolha ? " selected" : ""}>${esc(rotulo)} (${qtd})</option>`;
    main.innerHTML = `<div class="conteudo"><h1>🃏 Flashcards · Certo ou Errado</h1>
      ${reais.length ? "" : '<div class="aviso">Ainda não há cards reais — mostrando o baralho de <b>exemplo</b>. Peça ao Claude para criar cards de um tópico (eles vão para <code>flashcards/banco/</code>).</div>'}
      <p class="muted">Modelo Cebraspe: julgue o item como <b>Certo</b> ou <b>Errado</b>. Cada erro anula um acerto (+1 / −1); em branco vale 0. Revisão espaçada neste navegador (o Anki continua sendo o principal — <a href="${rotaNota("flashcards/primeiros-passos-anki.md")}">guia</a>). Novos hoje: ${srs.novosHoje()}/${limiteNovos}.</p>
      <div class="decks">
        <label class="fc-filtro"><span>Matéria</span>
          <select id="fc-materia">
            ${opcao("*", "Todas as matérias", base.length)}
            ${provas.map((p) => {
              const ms = materias.filter((m) => m.prova === p);
              return `<optgroup label="${esc(p)} · ${esc(ms[0].grupo)}">${opcao(p, `${p} · todas de ${p}`, ms.reduce((s, m) => s + n(m.slug), 0))}${ms.map((m) => opcao(m.slug, `${m.prova} · ${m.nome}`, n(m.slug))).join("")}</optgroup>`;
            }).join("")}
            ${extras.length ? `<optgroup label="Fora do edital">${extras.map((d) => opcao(d, d, n(d))).join("")}</optgroup>` : ""}
          </select></label>
        <div class="card deck"><div><b id="fc-nome"></b><br><small class="muted" id="fc-resumo"></small></div>
          <div class="fc-acoes"><button class="btn primary" id="fc-estudar">Estudar</button><button class="btn" id="fc-simulado" title="Todos os itens da matéria, em ordem aleatória, sem mexer na revisão espaçada">Simulado</button></div></div>
      </div>
      <div class="fc-area" id="fc-sessao"></div></div>`;

    const selecionados = () => {
      const v = $("#fc-materia").value;
      if (v === "*") return base;
      if (provas.includes(v)) return materias.filter((m) => m.prova === v).flatMap((m) => porMateria[m.slug] || []);
      return porMateria[v] || [];
    };
    const atualizar = () => {
      const cs = selecionados();
      const devidos = cs.filter(srs.devido).length, novos = cs.filter(srs.novo).length;
      $("#fc-nome").textContent = $("#fc-materia").selectedOptions[0].textContent.replace(/ \(\d+\)$/, "");
      $("#fc-resumo").textContent = `${cs.length} itens · ${devidos} para revisar · ${novos} novos`;
      $("#fc-estudar").disabled = !(devidos || (novos && novosRest));
      $("#fc-simulado").disabled = !cs.length;
    };
    $("#fc-materia").addEventListener("change", () => { store.set("ac:fc:materia", $("#fc-materia").value); atualizar(); });
    $("#fc-estudar").addEventListener("click", () => {
      const cs = selecionados();
      sessao([...cs.filter(srs.devido), ...cs.filter(srs.novo).slice(0, novosRest)], { srs: true });
    });
    $("#fc-simulado").addEventListener("click", () => sessao(embaralhar([...selecionados()]), { srs: false }));
    atualizar();
  }

  function sessao(fila, { srs: usarSrs }) {
    const box = $("#fc-sessao");
    $(".decks").style.display = "none";
    let i = 0, virado = false, resposta = null;
    const placar = { C: 0, E: 0, B: 0 }, erros = [];
    const tipoNome = { basico: "Básico", invertido: "Invertido", cloze: "Lacuna", vf: "Certo ou Errado", ce: "Certo ou Errado", comparacao: "Comparação" };
    const liquida = () => placar.C - placar.E;
    const barraPlacar = () => `<div class="fc-placar"><span class="ok">✔ ${placar.C} certos</span><span class="bad">✘ ${placar.E} errados</span><span>○ ${placar.B} em branco</span><b>Nota líquida: ${liquida()}</b></div>`;
    const desenhar = () => {
      if (i >= fila.length) {
        const julgados = placar.C + placar.E + placar.B;
        box.innerHTML = `${barraPlacar()}<div class="fc-card" style="text-align:center"><div class="big">${liquida() > 0 ? "🎉" : "📚"}</div>
          <p>Sessão concluída! ${fila.length} item(ns)${julgados ? ` · nota líquida <b>${liquida()}</b> de ${julgados} (${Math.round((100 * liquida()) / julgados)}%)` : ""}.</p>
          ${erros.length ? `<div class="fc-erros"><b>Revise os itens que você errou:</b><ul>${erros.map((c) => `<li>${bancaBadge(conc().banca)} ${esc(semPrefixoCE(c.frente))}<br><small>Gabarito: ${gabarito(c) === "C" ? "Certo" : "Errado"} — ${esc(justificativa(c))}</small></li>`).join("")}</ul></div>` : ""}
          <p><a class="btn" href="#/flashcards" onclick="location.reload()">Voltar às matérias</a></p></div>`;
        return;
      }
      const c = fila[i];
      const selo = ehCE(c) ? `${bancaBadge(conc().banca, "Certo/Errado")} ` : "";
      const meta = `<div class="fc-meta"><span>${selo}${esc(c.disciplina)} · ${esc(c.topico)} · ${tipoNome[c.tipo] || c.tipo}</span><span>${i + 1}/${fila.length}</span></div>`;
      const fonte = c.fonte ? `<br><small>Fonte: ${esc(c.fonte)}</small>` : "";
      if (ehCE(c)) {
        const g = gabarito(c);
        let resultado = "";
        if (resposta) {
          const r = resposta === "B" ? ["", "○ Em branco (0)"] : resposta === g ? ["ok", "✔ Acertou (+1)"] : ["bad", "✘ Errou (−1)"];
          resultado = `<div class="fc-verso"><div class="fc-res ${r[0]}">${r[1]} · Gabarito: <b>${g === "C" ? "CERTO" : "ERRADO"}</b></div>${esc(justificativa(c))}${fonte}</div>`;
        }
        box.innerHTML = `${barraPlacar()}<div class="fc-card">${meta}<div>${esc(semPrefixoCE(c.frente))}</div>${resultado}</div>
          ${resposta
            ? '<div class="fc-botoes" style="grid-template-columns:1fr"><button class="btn primary" id="fc-prox">Próximo (espaço)</button></div>'
            : '<div class="fc-botoes ce"><button class="btn b-certo" data-ce="C">C · Certo</button><button class="btn b-errado" data-ce="E">E · Errado</button><button class="btn" data-ce="B">B · Em branco</button></div>'}`;
        $$("[data-ce]", box).forEach((b) => b.addEventListener("click", () => julgar(b.dataset.ce)));
        $("#fc-prox")?.addEventListener("click", proximo);
        return;
      }
      const frente = c.tipo === "cloze" ? renderCloze(c.frente, false) : esc(c.frente);
      const verso = c.tipo === "cloze" ? `${renderCloze(c.frente, true)}${c.verso ? `<br><small>${esc(c.verso)}</small>` : ""}` : esc(c.verso);
      box.innerHTML = `${barraPlacar()}<div class="fc-card">${meta}
        <div>${frente}</div>
        ${virado ? `<div class="fc-verso">${verso}${fonte}</div>` : ""}</div>
        ${virado
          ? `<div class="fc-botoes"><button class="btn b-errei" data-n="0">1 · Errei</button><button class="btn" data-n="1">2 · Difícil</button><button class="btn" data-n="2">3 · Bom</button><button class="btn b-facil" data-n="3">4 · Fácil</button></div>`
          : '<div class="fc-botoes" style="grid-template-columns:1fr"><button class="btn primary" id="fc-virar">Mostrar resposta (espaço)</button></div>'}`;
      $("#fc-virar")?.addEventListener("click", () => { virado = true; desenhar(); });
      $$("[data-n]", box).forEach((b) => b.addEventListener("click", () => responder(+b.dataset.n)));
    };
    const julgar = (r) => {
      const c = fila[i];
      resposta = r;
      if (r === "B") placar.B++;
      else if (r === gabarito(c)) placar.C++;
      else { placar.E++; erros.push(c); }
      // Acerto → "Bom"; erro ou branco → volta em 10 min
      if (usarSrs) srs.responder(c, r === gabarito(c) ? 2 : 0);
      desenhar();
    };
    const proximo = () => { i++; resposta = null; desenhar(); };
    const responder = (n) => {
      if (usarSrs) srs.responder(fila[i], n);
      if (n === 0) fila.push(fila[i]);
      i++; virado = false; desenhar();
    };
    document.onkeydown = (e) => {
      if (!$("#fc-sessao") || e.target.matches("input,textarea,select") || i >= fila.length) return;
      const k = e.key.toUpperCase();
      if (ehCE(fila[i])) {
        if (!resposta && "CEB".includes(k) && k.length === 1) julgar(k);
        else if (resposta && (e.key === " " || e.key === "Enter")) { e.preventDefault(); proximo(); }
      } else if (e.key === " " && !virado) { e.preventDefault(); virado = true; desenhar(); }
      else if (virado && "1234".includes(e.key)) responder(+e.key - 1);
    };
    desenhar();
  }

  // ---------- Nivelamento ----------
  let NIV_DIR = "concursos/cgu-affc/nivelamento";
  let NIV_RES = `${NIV_DIR}/resultados`;
  const NIV_JSON_RE = /<!-- nivelamento:(\{[\s\S]*?\}) -->/;
  const niv = {
    andamento: () => store.get("ac:niv:andamento", null),
    salvarAndamento: (a) => store.set("ac:niv:andamento", a),
    historico: () => store.get("ac:niv:hist", []),
    guardar(res) { store.set("ac:niv:hist", [...niv.historico().filter((r) => r.id !== res.id), res]); },
  };

  async function carregarNivelamento() {
    const est = JSON.parse(await lerArquivo(`${NIV_DIR}/estrutura.json`));
    const edital = JSON.parse(await lerArquivo(`concursos/${CFG.concurso}/edital/topicos.json`));
    const disc = Object.fromEntries(edital.disciplinas.map((d) => [d.slug, d]));
    const bancos = {};
    await Promise.all(est.disciplinas.map(async (d) => {
      bancos[d.slug] = JSON.parse(await lerArquivo(`${NIV_DIR}/banco/${d.slug}.json`)).itens;
    }));
    const porId = {};
    Object.values(bancos).flat().forEach((it) => { porId[it.id] = it; });
    const prova = Object.fromEntries(est.provas.map((p) => [p.id, p]));
    const itensNiv = {};
    est.disciplinas.forEach((d) => { itensNiv[d.prova] = (itensNiv[d.prova] || 0) + d.itens; });
    return { est, disc, bancos, porId, prova, itensNiv };
  }

  // Resultados: os do navegador + os salvos no repositório (resultados/*.md trazem o JSON num comentário)
  async function historicoNivelamento() {
    const todos = Object.fromEntries(niv.historico().map((r) => [r.id, r]));
    const arqs = estado.arquivos.filter((p) => p.startsWith(`${NIV_RES}/`) && p.endsWith(".md"));
    await Promise.all(arqs.map(async (p) => {
      try {
        const m = (await lerArquivo(p)).match(NIV_JSON_RE);
        if (!m) return;
        const r = JSON.parse(m[1]);
        todos[r.id] = { ...r, ...(todos[r.id] || {}), salvo: p };
      } catch { /* arquivo ilegível: ignora */ }
    }));
    return Object.values(todos).sort((a, b) => a.fim - b.fim);
  }

  // Mesma estrutura sempre (cota de itens por disciplina); muda o sorteio: a cada item escolhe-se o tópico
  // menos visto (histórico + esta prova) e, nele, o item menos visto, equilibrando gabaritos C/E.
  function montarProva(ctx, vistos) {
    const itens = [];
    let nC = 0, nE = 0;
    for (const d of ctx.est.disciplinas) {
      const pool = embaralhar(ctx.bancos[d.slug].filter((it) => d.topicos.includes(it.t)));
      const visTopico = {};
      pool.forEach((it) => { visTopico[it.t] = (visTopico[it.t] || 0) + (vistos[it.id] || 0); });
      for (let k = 0; k < d.itens && pool.length; k++) {
        const topicos = [...new Set(pool.map((it) => it.t))];
        const menor = Math.min(...topicos.map((t) => visTopico[t]));
        const t = embaralhar(topicos.filter((x) => visTopico[x] === menor))[0];
        const cand = pool.filter((it) => it.t === t).sort((x, y) => (vistos[x.id] || 0) - (vistos[y.id] || 0));
        const min = vistos[cand[0].id] || 0;
        const quer = nC - nE > 1 ? "E" : nE - nC > 1 ? "C" : null;
        const it = (quer && cand.find((x) => x.g === quer && (vistos[x.id] || 0) === min)) || cand[0];
        pool.splice(pool.indexOf(it), 1);
        visTopico[t] += 1000;
        if (it.g === "C") nC++; else nE++;
        itens.push({ id: it.id, d: d.slug, t: it.t, p: d.prova, g: it.g, r: "" });
      }
    }
    return itens;
  }

  function apurar(res, ctx) {
    const zero = () => ({ n: 0, ac: 0, er: 0, br: 0, liq: 0, max: 0 });
    const somar = (o, it) => {
      const w = ctx.prova[it.p]?.peso || 1;
      o.n++; o.max += w;
      if (!it.r) o.br++;
      else if (it.r === it.g) { o.ac++; o.liq += w; }
      else { o.er++; o.liq -= w; }
    };
    const total = zero(), provas = {}, discs = {}, topicos = {};
    res.itens.forEach((it) => {
      somar(total, it);
      somar(provas[it.p] ||= zero(), it);
      somar(discs[it.d] ||= zero(), it);
      somar(topicos[`${it.d}:${it.t}`] ||= zero(), it);
    });
    // Projeção para a prova real: mesma proporção de acertos/erros nos itens reais de cada prova
    let projTotal = 0;
    const proj = {};
    for (const [pid, o] of Object.entries(provas)) {
      const p = ctx.prova[pid];
      const fator = p.itens_reais / o.n;
      proj[pid] = { nota: o.liq * fator, max: p.itens_reais * p.peso, minimo: p.minimo_real };
      projTotal += proj[pid].nota;
    }
    return { total, provas, discs, topicos, proj, projTotal, maxReal: ctx.est.provas.reduce((a, p) => a + p.itens_reais * p.peso, 0) };
  }

  const pct = (x) => `${Math.round(100 * x)}%`;
  const fmt = (x) => (Math.round(x * 10) / 10).toLocaleString("pt-BR");
  const aprov = (o) => (o.max ? Math.max(0, o.liq / o.max) : 0); // errar mais que acertar não passa de 0%
  const faixa = (a) => (a >= 0.7 ? { cls: "ok", rot: "🟢 Manter" } : a >= 0.4 ? { cls: "em", rot: "🟡 Reforçar" } : { cls: "ruim", rot: "🔴 Prioridade" });
  const duracao = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h ? `${h}h${String(m).padStart(2, "0")}` : `${m} min`; };
  const relogio = (s) => [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, "0")).join(":");
  const dataRes = (r) => new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }).format(new Date(r.fim));

  // Onde está a pontuação perdida: peso da disciplina na prova real × o quanto falta para o aproveitamento máximo
  function diagnosticar(ap, ctx, statusProg) {
    const discs = ctx.est.disciplinas.map((d) => {
      const o = ap.discs[d.slug];
      if (!o) return null;
      const p = ctx.prova[d.prova];
      const emJogo = o.max * (p.itens_reais / ctx.itensNiv[d.prova]);
      const a = aprov(o);
      const topicos = ctx.disc[d.slug].topicos.map((t) => {
        const ot = ap.topicos[`${d.slug}:${t.num}`];
        return ot ? { ...ot, num: t.num, titulo: t.titulo, status: statusProg[`${ctx.disc[d.slug].disciplina}|${t.num}`] || "⬜" } : null;
      }).filter(Boolean);
      return { slug: d.slug, nome: ctx.disc[d.slug].disciplina, prova: d.prova, o, a, emJogo, perda: emJogo * (1 - a), topicos, faixa: faixa(a) };
    }).filter(Boolean).sort((x, y) => y.perda - x.perda);
    const somaPerda = discs.reduce((s, d) => s + Math.max(d.perda, 0), 0) || 1;
    discs.forEach((d) => { d.tempo = Math.max(d.perda, 0) / somaPerda; });

    const t = ap.total;
    const resp = t.ac + t.er;
    const dicas = [];
    if (resp && t.er / resp > 0.35 && t.er >= 5) {
      dicas.push(`Você errou ${pct(t.er / resp)} dos itens que marcou. No Cebraspe, marcar só compensa com mais de 50% de chance de acerto (ganho esperado = 2p − 1): deixe em branco o que for chute.`);
    }
    if (t.br / t.n > 0.3) {
      dicas.push(`${pct(t.br / t.n)} dos itens ficaram em branco: há conteúdo ainda não visto. A prioridade agora é cobrir o edital, começando pelas disciplinas 🔴 abaixo.`);
    }
    if (resp && t.er / resp <= 0.2 && t.br / t.n > 0.15) {
      dicas.push("Sua taxa de acerto nas marcadas é alta: você pode estar deixando em branco itens que sabe. Arrisque mais quando tiver segurança razoável.");
    }
    const p3 = ap.proj.P3;
    if (p3 && p3.nota < p3.minimo) dicas.push(`A P3 (específicos, peso 2) está abaixo do mínimo eliminatório projetado (${fmt(p3.nota)} de ${p3.minimo}). Ela vale 69% das objetivas: comece por ela.`);
    return { discs, dicas };
  }

  async function statusProgresso() {
    const st = {};
    try {
      let disc = null;
      (await lerArquivo(CFG.progresso)).split("\n").forEach((l) => {
        const h = l.match(/^### (.+)/);
        if (h) disc = h[1].trim();
        const m = l.match(/^- (⬜|🟨|✅|🔁) \*\*(\d+)\*\*/);
        if (m && disc) st[`${disc}|${m[2]}`] = m[1];
      });
    } catch { /* sem progresso: tudo ⬜ */ }
    return st;
  }

  function acaoTopico(t) {
    if (t.er && (t.status === "✅" || t.status === "🔁")) return "revisar — marcado como estudado, mas errou";
    if (t.status === "🟨") return "continuar o estudo";
    if (t.status === "⬜") return "estudar (não iniciado)";
    return "revisar os itens";
  }

  // ---------- Telas do nivelamento ----------
  async function telaNivelamento(main, sub) {
    document.title = "Nivelamento · Área do Concurseiro";
    main.innerHTML = '<div class="conteudo"><h1>📊 Prova de nivelamento</h1><p class="muted">Carregando banco de questões…</p></div>';
    const ctx = await carregarNivelamento();
    if (sub === "prova") return telaNivelamentoProva(main, ctx);
    if (sub?.startsWith("resultado/")) return telaNivelamentoResultado(main, ctx, sub.slice(10));

    const hist = await historicoNivelamento();
    const and = niv.andamento();
    const totalItens = Object.values(ctx.itensNiv).reduce((a, b) => a + b, 0);
    const totalBanco = Object.values(ctx.bancos).reduce((a, b) => a + b.length, 0);
    const pendentes = hist.filter((r) => !r.salvo);
    const linhasProva = ctx.est.provas.map((p) => {
      const n = ctx.itensNiv[p.id];
      return `<tr><td><b>${p.id}</b> · ${esc(p.nome)}</td><td>${n}</td><td>${p.peso}</td><td>${n * p.peso}</td><td>${p.itens_reais} itens, mín. ${p.minimo_real}/${p.itens_reais * p.peso}</td></tr>`;
    }).join("");
    const linhasDisc = ctx.est.disciplinas.map((d) => {
      return `<tr><td>${d.prova}</td><td>${esc(ctx.disc[d.slug].disciplina)}</td><td>${d.itens}</td><td>${d.topicos.length}</td><td class="muted">${ctx.bancos[d.slug].length}</td></tr>`;
    }).join("");
    const linhasHist = hist.slice().reverse().map((r) => {
      const ap = apurar(r, ctx);
      const pp = (pid) => (ap.provas[pid] ? pct(aprov(ap.provas[pid])) : "—");
      const ok = ap.projTotal >= ctx.est.minimo_total_real && Object.values(ap.proj).every((x) => x.nota >= x.minimo);
      return `<tr><td><a href="#/nivelamento/resultado/${esc(r.id)}">${dataRes(r)}</a></td><td><b>${fmt(ap.total.liq)}</b>/${ap.total.max}</td><td>${pp("P1")}</td><td>${pp("P2")}</td><td>${pp("P3")}</td><td>${fmt(ap.projTotal)}/${ap.maxReal} ${ok ? "✅" : "❌"}</td><td>${r.salvo ? `<a href="${rotaNota(r.salvo)}" title="Salvo no repositório">📄</a>` : '<span title="Só neste navegador">💾</span>'}</td></tr>`;
    }).join("");

    main.innerHTML = `<div class="conteudo">
      <h1>📊 Prova de nivelamento</h1>
      <p class="muted">Itens Certo/Errado no estilo Cebraspe cobrindo todos os tópicos do edital. A estrutura é sempre a mesma (20 itens, com os pesos da prova real: P1 e P2 valem 1, P3 vale 2); os itens mudam a cada execução — os que você já viu ficam por último.</p>
      ${and ? `<div class="card niv-andamento"><div><b>Prova em andamento</b><br><small class="muted">${and.itens.filter((i) => i.r).length}/${and.itens.length} respondidos · ${relogio(and.seg || 0)}</small></div><div class="row"><a class="btn primary" href="#/nivelamento/prova">Continuar</a><button class="btn" id="niv-descartar">Descartar</button></div></div>` : ""}
      <div class="row" style="margin:14px 0">${and ? "" : `<button class="btn primary" id="niv-iniciar">▶️ Iniciar nova prova (${totalItens} itens)</button>`}
        <span class="muted">Tempo sugerido: ${duracao(ctx.est.tempo_sugerido_min * 60)} · banco com ${totalBanco} itens</span></div>
      ${pendentes.length ? `<div class="aviso">💾 ${pendentes.length} resultado(s) salvos só neste navegador. <button class="btn" id="niv-sync">Salvar no GitHub</button></div>` : ""}
      <h2>📈 Histórico</h2>
      ${hist.length ? `<div class="tabela-rolagem"><table class="niv-tabela"><thead><tr><th>Data</th><th>Nota</th><th>P1</th><th>P2</th><th>P3</th><th>Projeção (prova real)</th><th></th></tr></thead><tbody>${linhasHist}</tbody></table></div>
        <p class="muted" style="font-size:13px">P1/P2/P3 = aproveitamento líquido (certos − errados) ÷ máximo. Projeção = nota líquida extrapolada para os 170 itens reais; ✅ quando passa em todos os mínimos do edital.</p>` : '<p class="muted">Nenhuma prova feita ainda.</p>'}
      <h2>🧮 Estrutura e pesos</h2>
      <p>${esc(ctx.est.regra)}</p>
      <div class="tabela-rolagem"><table class="niv-tabela"><thead><tr><th>Prova</th><th>Itens</th><th>Peso</th><th>Pontos</th><th>Na prova real</th></tr></thead><tbody>${linhasProva}</tbody></table></div>
      <details><summary>Itens por disciplina (cota fixa)</summary><div class="tabela-rolagem"><table class="niv-tabela"><thead><tr><th>Prova</th><th>Disciplina</th><th>Itens</th><th>Tópicos no edital</th><th>No banco</th></tr></thead><tbody>${linhasDisc}</tbody></table></div></details>
      <p class="muted" style="font-size:13px">Banco e estrutura: <a href="${rotaNota(`${NIV_DIR}/README.md`)}">${NIV_DIR}/</a>. Peça ao Claude para incluir itens novos.</p>
    </div>`;

    $("#niv-iniciar")?.addEventListener("click", () => {
      const vistos = {};
      hist.forEach((r) => r.itens.forEach((it) => { vistos[it.id] = (vistos[it.id] || 0) + 1; }));
      const agora = new Date();
      const id = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }).format(agora).replace(" ", "-").replace(":", "");
      niv.salvarAndamento({ id, inicio: agora.getTime(), seg: 0, itens: montarProva(ctx, vistos) });
      location.hash = "#/nivelamento/prova";
    });
    $("#niv-descartar")?.addEventListener("click", () => {
      if (!confirm("Descartar a prova em andamento? As respostas serão perdidas.")) return;
      store.del("ac:niv:andamento");
      navegar();
    });
    $("#niv-sync")?.addEventListener("click", async (ev) => {
      if (!token()) { abrirConfig(); return; }
      ev.target.disabled = true;
      for (const r of pendentes) await salvarResultadoNoRepo(r, ctx).catch((e) => toast(`⚠️ ${e.message}`, 5000));
      navegar();
    });
  }

  let nivTimer = null;
  function telaNivelamentoProva(main, ctx) {
    const and = niv.andamento();
    if (!and) { location.hash = "#/nivelamento"; return; }
    document.title = "Nivelamento em andamento · Área do Concurseiro";
    let blocoAtual = "";
    const html = and.itens.map((it, i) => {
      const item = ctx.porId[it.id];
      const d = ctx.disc[it.d];
      const topico = d.topicos.find((t) => t.num === it.t);
      let cab = "";
      if (blocoAtual !== it.p) {
        blocoAtual = it.p;
        const p = ctx.prova[it.p];
        cab = `<h2 class="niv-secao">${p.id} · ${esc(p.nome)} <small class="muted">(peso ${p.peso})</small></h2>`;
      }
      return `${cab}<div class="niv-item${it.r ? " respondido" : ""}" data-i="${i}">
        <div class="niv-meta">${bancaBadge(conc().banca, "Certo/Errado")} <b>${i + 1}</b> · ${esc(d.disciplina)} · ${esc(it.t)} ${esc(topico?.titulo || "")}</div>
        <p>${esc(item?.q || "(item removido do banco)")}</p>
        <div class="niv-resp">${["C", "E", ""].map((r) => `<button class="btn${it.r === r && (r || it.r === "") && (r !== "" || it.b) ? " sel" : ""}" data-r="${r}">${r === "C" ? "C · Certo" : r === "E" ? "E · Errado" : "Em branco"}</button>`).join("")}</div>
      </div>`;
    }).join("");
    main.innerHTML = `<div class="conteudo" id="niv-prova">
      <div class="niv-barra"><span id="niv-relogio">⏱ ${relogio(and.seg || 0)}</span><span id="niv-cont"></span><button class="btn primary" id="niv-fim">Finalizar</button></div>
      <h1>📊 Nivelamento</h1>
      <p class="muted">Julgue cada item. Certo soma o peso, errado subtrai, em branco vale zero. As respostas ficam salvas neste navegador enquanto você faz a prova — pode fechar e continuar depois.</p>
      ${html}
      <div class="row" style="justify-content:center;margin-top:24px"><button class="btn primary" id="niv-fim2">Finalizar e ver diagnóstico</button></div>
    </div>`;

    const contar = () => {
      const c = and.itens.filter((i) => i.r === "C").length, e = and.itens.filter((i) => i.r === "E").length;
      $("#niv-cont").textContent = `${c + e}/${and.itens.length} marcados · C ${c} · E ${e}`;
    };
    contar();
    $$(".niv-item").forEach((el) => el.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-r]");
      if (!b) return;
      const it = and.itens[+el.dataset.i];
      it.r = b.dataset.r;
      it.b = it.r === "";
      $$("[data-r]", el).forEach((x) => x.classList.toggle("sel", x === b));
      el.classList.toggle("respondido", true);
      niv.salvarAndamento(and);
      contar();
    }));

    clearInterval(nivTimer);
    nivTimer = setInterval(() => {
      if (!document.getElementById("niv-prova")) { clearInterval(nivTimer); return; }
      if (document.hidden) return;
      and.seg = (and.seg || 0) + 1;
      $("#niv-relogio").textContent = `⏱ ${relogio(and.seg)}`;
      if (and.seg % 10 === 0) niv.salvarAndamento(and);
    }, 1000);

    const finalizar = async () => {
      const brancos = and.itens.filter((i) => !i.r).length;
      if (!confirm(brancos ? `${brancos} item(ns) sem marcação (valem zero). Finalizar a prova?` : "Finalizar a prova?")) return;
      clearInterval(nivTimer);
      const res = { id: and.id, inicio: and.inicio, fim: Date.now(), seg: and.seg || 0, itens: and.itens.map(({ id, d, t, p, g, r }) => ({ id, d, t, p, g, r })) };
      niv.guardar(res);
      store.del("ac:niv:andamento");
      if (token()) {
        toast("Salvando resultado no GitHub…");
        await salvarResultadoNoRepo(res, ctx).catch((e) => toast(`⚠️ Salvo só neste navegador: ${e.message}`, 6000));
      }
      location.hash = `#/nivelamento/resultado/${res.id}`;
    };
    $("#niv-fim").addEventListener("click", finalizar);
    $("#niv-fim2").addEventListener("click", finalizar);
  }

  async function telaNivelamentoResultado(main, ctx, id) {
    const hist = await historicoNivelamento();
    const i = hist.findIndex((r) => r.id === id);
    const res = hist[i];
    if (!res) throw new Error(`Resultado ${id} não encontrado.`);
    const anterior = hist[i - 1];
    const ap = apurar(res, ctx);
    const diag = diagnosticar(ap, ctx, await statusProgresso());
    document.title = `Nivelamento ${dataRes(res)} · Área do Concurseiro`;

    const apAnt = anterior ? apurar(anterior, ctx) : null;
    const delta = apAnt ? ap.projTotal - apAnt.projTotal : null;
    const okTotal = ap.projTotal >= ctx.est.minimo_total_real;
    const cardsProva = ctx.est.provas.map((p) => {
      const o = ap.provas[p.id], pj = ap.proj[p.id];
      if (!o) return "";
      const ok = pj.nota >= pj.minimo;
      return `<div class="card"><h3>${p.id} · ${esc(p.nome)}</h3><div class="big">${fmt(o.liq)}<small class="muted">/${o.max}</small></div>
        <div class="muted">✔ ${o.ac} · ✘ ${o.er} · ○ ${o.br}</div>
        <div>Projeção: <b>${fmt(pj.nota)}</b>/${pj.max} ${ok ? "✅" : "❌"} <small class="muted">mín. ${pj.minimo}</small></div></div>`;
    }).join("");

    const linhasDisc = diag.discs.map((d, n) => `<tr>
      <td>${n + 1}</td><td><a href="${rotaNota(`concursos/${CFG.concurso}/acervo/${d.slug}.md`)}" title="Abrir o acervo da disciplina">${esc(d.nome)}</a> <small class="muted">${d.prova}</small></td>
      <td><div class="niv-aprov"><span class="${d.faixa.cls}" style="width:${Math.max(0, Math.round(100 * d.a))}%"></span></div><small>${pct(d.a)} · ✔${d.o.ac} ✘${d.o.er} ○${d.o.br}</small></td>
      <td>${fmt(d.emJogo)}</td><td><b>${fmt(Math.max(d.perda, 0))}</b></td><td>${d.faixa.rot}</td><td>${d.tempo >= 0.005 ? pct(d.tempo) : "—"}</td></tr>`).join("");

    const focos = diag.discs.filter((d) => d.faixa.cls !== "ok").slice(0, 6).map((d) => {
      const tops = d.topicos.filter((t) => t.er || t.br).sort((a, b) => (b.er * 2 + b.br) - (a.er * 2 + a.br));
      if (!tops.length) return "";
      return `<li><b>${esc(d.nome)}</b> <small class="muted">(${d.prova}, ${fmt(Math.max(d.perda, 0))} pts em jogo)</small><ul>${tops.map((t) =>
        `<li>${t.status} <b>${esc(t.num)}</b> ${esc(t.titulo)} — <small>✔${t.ac} ✘${t.er} ○${t.br}</small> → ${acaoTopico(t)}</li>`).join("")}</ul></li>`;
    }).join("");

    const correcao = ctx.est.disciplinas.map((d) => {
      const its = res.itens.map((it, k) => ({ ...it, k })).filter((it) => it.d === d.slug);
      if (!its.length) return "";
      const o = ap.discs[d.slug];
      return `<details><summary><b>${esc(ctx.disc[d.slug].disciplina)}</b> <small class="muted">✔${o.ac} ✘${o.er} ○${o.br}</small></summary>${its.map((it) => {
        const item = ctx.porId[it.id] || {};
        const cls = !it.r ? "branco" : it.r === it.g ? "certo" : "errado";
        const sinal = !it.r ? "○ em branco" : it.r === it.g ? "✔ acertou" : "✘ errou";
        return `<div class="niv-corr ${cls}"><div class="niv-meta"><b>${it.k + 1}</b> · tópico ${esc(it.t)} · ${sinal} · você: ${it.r || "—"} · gabarito: <b>${it.g}</b></div>
          <p>${esc(item.q || "(item removido do banco)")}</p>${item.j ? `<p class="muted">💡 ${esc(item.j)}</p>` : ""}${item.f ? `<p class="muted"><small>Fonte: ${esc(item.f)}</small></p>` : ""}</div>`;
      }).join("")}</details>`;
    }).join("");

    main.innerHTML = `<div class="conteudo">
      <p><a href="#/nivelamento">← Nivelamento</a></p>
      <h1>📊 Resultado · ${dataRes(res)}</h1>
      <p class="muted">${res.itens.length} itens · ${duracao(res.seg || 0)} · ${res.salvo ? `salvo em <a href="${rotaNota(res.salvo)}">${esc(basename(res.salvo))}</a>` : `💾 salvo só neste navegador <button class="btn" id="niv-salvar">Salvar no GitHub</button>`}</p>
      <div class="grid">
        <div class="card"><h3>🧮 Nota líquida</h3><div class="big">${fmt(ap.total.liq)}<small class="muted">/${ap.total.max}</small></div><div class="muted">${pct(aprov(ap.total))} de aproveitamento</div></div>
        <div class="card"><h3>🎯 Projeção na prova real</h3><div class="big">${fmt(ap.projTotal)}<small class="muted">/${ap.maxReal}</small></div>
          <div>${okTotal ? "✅" : "❌"} mínimo ${ctx.est.minimo_total_real} ${delta !== null ? `· ${delta >= 0 ? "▲" : "▼"} ${fmt(Math.abs(delta))} vs. anterior` : ""}</div></div>
        ${cardsProva}
      </div>
      <h2>🩺 Diagnóstico — onde direcionar o estudo</h2>
      ${diag.dicas.length ? `<ul class="niv-dicas">${diag.dicas.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
      <p class="muted" style="font-size:13px">Ordenado pelos <b>pontos da prova real que você está deixando na mesa</b> = pontos da disciplina na prova real × (1 − aproveitamento). A coluna “Tempo” sugere como dividir as horas de estudo. Com só 20 itens, P1/P2 têm 1 item por disciplina e a P3 de 2 a 3: leia o resultado como indício e refaça a prova de tempos em tempos (os itens mudam).</p>
      <div class="tabela-rolagem"><table class="niv-tabela"><thead><tr><th>#</th><th>Disciplina</th><th>Aproveitamento</th><th>Pts reais</th><th>Pts a recuperar</th><th>Situação</th><th>Tempo</th></tr></thead><tbody>${linhasDisc}</tbody></table></div>
      ${focos ? `<h3>📌 Tópicos a atacar primeiro</h3><ul class="niv-focos">${focos}</ul>
        <p class="muted" style="font-size:13px">Status ao lado de cada tópico = seu <a href="${rotaNota(CFG.progresso)}">checklist do edital</a>. Os links das disciplinas abrem o acervo (onde estudar).</p>` : '<p>🎉 Nenhuma disciplina em 🟡/🔴. Mantenha a revisão espaçada e faça provas Cebraspe completas.</p>'}
      <h2>📝 Correção item a item</h2>
      ${correcao}
    </div>`;

    $("#niv-salvar")?.addEventListener("click", async (ev) => {
      if (!token()) { abrirConfig(); return; }
      ev.target.disabled = true;
      try { await salvarResultadoNoRepo(res, ctx); navegar(); }
      catch (e) { ev.target.disabled = false; toast(`⚠️ ${e.message}`, 5000); }
    });
  }

  function resultadoMarkdown(res, ctx, ap, diag) {
    const linhas = [];
    const data = dataRes(res);
    linhas.push("---", "tipo: nivelamento", `data: ${data}`, `nota: ${fmt(ap.total.liq)} de ${ap.total.max} (${pct(aprov(ap.total))})`,
      `projecao: ${fmt(ap.projTotal)} de ${ap.maxReal}`, `duracao: ${duracao(res.seg || 0)}`, "---", "",
      `# 📊 Nivelamento — ${data}`, "",
      `> Gerado pela [Área do Concurseiro](https://metrics-odr.github.io/concursos/#/nivelamento/resultado/${res.id}). Certo soma o peso, errado subtrai, branco vale zero.`, "",
      "| Prova | ✔ | ✘ | ○ | Nota líquida | Projeção na prova real | Mínimo |", "|---|:-:|:-:|:-:|:-:|:-:|:-:|");
    ctx.est.provas.forEach((p) => {
      const o = ap.provas[p.id], pj = ap.proj[p.id];
      if (o) linhas.push(`| ${p.id} · ${p.nome} (peso ${p.peso}) | ${o.ac} | ${o.er} | ${o.br} | ${fmt(o.liq)}/${o.max} | ${fmt(pj.nota)}/${pj.max} ${pj.nota >= pj.minimo ? "✅" : "❌"} | ${pj.minimo} |`);
    });
    linhas.push(`| **Total** | ${ap.total.ac} | ${ap.total.er} | ${ap.total.br} | **${fmt(ap.total.liq)}/${ap.total.max}** | **${fmt(ap.projTotal)}/${ap.maxReal}** ${ap.projTotal >= ctx.est.minimo_total_real ? "✅" : "❌"} | ${ctx.est.minimo_total_real} |`, "",
      "## 🩺 Diagnóstico — onde direcionar o estudo", "");
    diag.dicas.forEach((d) => linhas.push(`> [!TIP]\n> ${d}\n`));
    linhas.push("| # | Disciplina | Prova | Aproveitamento | Pts a recuperar | Situação | Tempo sugerido |", "|:-:|---|:-:|:-:|:-:|---|:-:|");
    diag.discs.forEach((d, n) => linhas.push(`| ${n + 1} | [${d.nome}](../../acervo/${d.slug}.md) | ${d.prova} | ${pct(d.a)} | ${fmt(Math.max(d.perda, 0))} | ${d.faixa.rot} | ${d.tempo >= 0.005 ? pct(d.tempo) : "—"} |`));
    linhas.push("", "### 📌 Tópicos a atacar", "");
    diag.discs.filter((d) => d.faixa.cls !== "ok").forEach((d) => {
      const tops = d.topicos.filter((t) => t.er || t.br);
      if (!tops.length) return;
      linhas.push(`- **${d.nome}** (${d.prova})`);
      tops.forEach((t) => linhas.push(`  - ${t.status} **${t.num}** ${t.titulo} — ✔${t.ac} ✘${t.er} ○${t.br} → ${acaoTopico(t)}`));
    });
    const errados = res.itens.map((it, k) => ({ ...it, k })).filter((it) => it.r && it.r !== it.g);
    if (errados.length) {
      linhas.push("", "## ❌ Itens errados", "");
      errados.forEach((it) => {
        const item = ctx.porId[it.id] || {};
        linhas.push(`${it.k + 1}. *${ctx.disc[it.d]?.disciplina} · tópico ${it.t}* — ${item.q || it.id}`,
          `   → Gabarito **${it.g}** (você marcou ${it.r}).${item.j ? ` ${item.j}` : ""}${item.f ? ` _Fonte: ${item.f}_` : ""}`);
      });
    }
    const dados = { id: res.id, inicio: res.inicio, fim: res.fim, seg: res.seg, itens: res.itens };
    linhas.push("", `<!-- nivelamento:${JSON.stringify(dados)} -->`, "");
    return linhas.join("\n");
  }

  async function salvarResultadoNoRepo(res, ctx) {
    const ap = apurar(res, ctx);
    const diag = diagnosticar(ap, ctx, await statusProgresso());
    const path = `${NIV_RES}/${res.id}.md`;
    await salvarArquivo(path, resultadoMarkdown(res, ctx, ap, diag), `Nivelamento: resultado de ${dataRes(res)} (${fmt(ap.total.liq)}/${ap.total.max})`);
    niv.guardar({ ...res, salvo: path });
    toast("✅ Resultado salvo no GitHub");
  }

  // ---------- Tela: seleção de concurso (home) ----------
  async function percentualEstudo(slug) {
    try {
      const disc = lerProgresso(await lerArquivo(`concursos/${slug}/PROGRESSO.md`, { fresco: true }));
      const tot = disc.reduce((a, d) => a + d.total, 0);
      const feitos = disc.reduce((a, d) => a + d.cont["✅"] + d.cont["🔁"], 0);
      return tot ? `${Math.round((100 * feitos) / tot)}%` : "—";
    } catch { return "—"; }
  }

  async function telaSelecao(main) {
    document.title = "Selecionar concurso · Área do Concurseiro";
    const card = (c) => `<a class="conc-card ${c.status}" href="#/c/${esc(c.slug)}">
        <div class="conc-radio"><span class="radio${c.status === "ativo" ? " on" : ""}"></span>${c.status === "ativo" ? "Ativo" : "Passado"}</div>
        <div class="conc-corpo">
          <div class="conc-codigo">${esc(c.codigo)}</div>
          <div class="conc-linha"><span class="muted">Banca:</span> ${bancaBadge(c.banca, c.formato)}</div>
          <div class="conc-linha"><span class="muted">Data da prova:</span> <b>${fmtDataISO(c.dataProva)}</b></div>
          <div class="conc-linha"><span class="muted">Percentual de estudo:</span> <b class="conc-pct" data-slug="${esc(c.slug)}">…</b></div>
        </div></a>`;
    const ativos = CONCURSOS.filter((c) => c.status === "ativo").sort((a, b) => a.dataProva.localeCompare(b.dataProva));
    const passados = CONCURSOS.filter((c) => c.status !== "ativo").sort((a, b) => b.dataProva.localeCompare(a.dataProva));
    main.innerHTML = `<div class="conteudo"><h1>🎓 Selecionar concurso</h1>
      <h2 class="conc-secao">Ativos</h2>${ativos.map(card).join("") || '<p class="muted">Nenhum concurso ativo.</p>'}
      <h2 class="conc-secao">Passados</h2>${passados.map(card).join("") || '<p class="muted">Nenhum concurso passado ainda.</p>'}</div>`;
    $$(".conc-pct", main).forEach((el) => percentualEstudo(el.dataset.slug).then((p) => { el.textContent = p; }));
  }

  // ---------- Tela: home do concurso ----------
  async function telaInicio(main) {
    const c = conc();
    document.title = `${c.orgao} · Área do Concurseiro`;
    const dias = Math.ceil((new Date(CFG.dataProva) - new Date()) / 86400000);
    main.innerHTML = `<div class="conteudo">
      <div class="conc-cab"><a href="#/" class="muted">← Selecionar outro concurso</a>
        <h1>📚 ${esc(c.orgao)} — ${esc(c.cargo)}</h1>
        <p class="muted">${esc(c.codigo)} · ${bancaBadge(c.banca, c.formato)}</p>
        <p class="aviso-banca">Todas as questões deste concurso são no estilo da banca <b>${esc(c.banca)}</b> (${esc(c.formato)}) e vêm identificadas com o nome dela.</p></div>
      <div class="grid">
        <div class="card"><h3>⏳ Prova (${fmtDataISO(c.dataProva)})</h3><div class="big">${dias > 0 ? dias : 0}</div><div class="muted">dias restantes</div></div>
        <div class="card"><h3>🎯 Desafio de hoje</h3><div id="in-desafio" class="big">…</div><a href="#/desafios">abrir →</a></div>
        <div class="card"><h3>🃏 Flashcards</h3><div id="in-fc" class="big">…</div><a href="#/flashcards">estudar →</a></div>
        <div class="card"><h3>✅ Edital</h3><div id="in-prog" class="big">…</div><a href="${rotaNota(CFG.progresso)}">checklist →</a></div>
      </div>
      <div class="card"><h3>📊 Progresso por disciplina</h3><div id="in-disc"><p class="muted">Carregando…</p></div>
        <div class="legenda"><span><i style="background:var(--accent)"></i>revisado</span><span><i style="background:var(--ok)"></i>estudado</span><span><i style="background:var(--warn)"></i>em estudo</span></div></div>
      <div class="grid">
        <a class="card" href="#/nivelamento"><h3>📊 Nivelamento</h3>Prova de 20 itens C/E com peso e diagnóstico de onde estudar <div>${bancaBadge(c.banca)}</div></a>
        <a class="card" href="${rotaNota(`concursos/${c.slug}/acervo/README.md`)}"><h3>🔎 Acervo</h3>Onde e como estudar cada tópico do edital</a>
        <a class="card" href="${rotaNota(`concursos/${c.slug}/revisao/provas-cebraspe.md`)}"><h3>📝 Provas ${esc(c.banca)}</h3>Ciência de Dados + discursivas <div>${bancaBadge(c.banca)}</div></a>
        <a class="card" href="${rotaNota(`concursos/${c.slug}/README.md`)}"><h3>📄 Ficha do concurso</h3>Datas, vagas, pesos</a>
        <a class="card" href="${rotaNota(`concursos/${c.slug}/edital/edital-cgu-2026-12.md`)}"><h3>📜 Edital</h3>Texto completo em Markdown</a>
      </div></div>`;

    lerArquivo(CFG.progresso, { fresco: true }).then((t) => {
      const disc = lerProgresso(t);
      const tot = disc.reduce((a, d) => a + d.total, 0);
      const feitos = disc.reduce((a, d) => a + d.cont["✅"] + d.cont["🔁"], 0);
      $("#in-prog").textContent = `${tot ? Math.round((100 * feitos) / tot) : 0}%`;
      $("#in-disc").innerHTML = disc.map((d) => {
        const ok = d.cont["✅"] + d.cont["🔁"];
        return `<div class="disc-linha"><a href="${rotaNota(CFG.progresso)}::${slugTitulo(d.nome)}" title="${esc(d.nome)}"><b class="tag-prova">${esc(d.prova)}</b> ${esc(d.nome)}</a>${barraProgresso(d.cont, d.total)}<span class="muted">${ok}/${d.total}</span></div>`;
      }).join("");
    }).catch(() => { $("#in-disc").textContent = "Não consegui ler o PROGRESSO.md."; });

    const lista = arquivosDesafio();
    const pHoje = `desafios/${hojeISO()}.md`;
    if (lista.includes(pHoje)) {
      lerArquivo(pHoje, { fresco: true }).then((t) => { const r = contarTarefas(t); $("#in-desafio").textContent = `${r.feitas}/${r.total}`; });
    } else $("#in-desafio").textContent = "—";

    carregarCards().then((cs) => {
      const reais = cs.filter((c) => !c.exemplo);
      $("#in-fc").textContent = reais.length ? `${reais.filter(srs.devido).length} p/ revisar` : "0 cards";
    });
  }

  // ---------- Busca rápida (Ctrl+K) ----------
  function abrirBusca() {
    const dlg = $("#dlg-busca");
    const inp = $("#busca-input");
    const ul = $("#busca-lista");
    let sel = 0, res = [];
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const pontuar = (p, q) => {
      const n = norm(p), b = norm(basename(p));
      if (!q) return 1;
      if (b.includes(q)) return 3 - b.indexOf(q) / 100;
      if (n.includes(q)) return 2;
      let j = 0;
      for (const ch of n) if (ch === q[j]) j++;
      return j === q.length ? 1 : 0;
    };
    const desenhar = () => {
      const q = norm(inp.value.trim());
      res = estado.arquivos.filter((p) => !ocultar(p)).map((p) => [p, pontuar(p, q)]).filter((x) => x[1] > 0)
        .sort((a, b) => b[1] - a[1] || a[0].length - b[0].length).slice(0, 40).map((x) => x[0]);
      sel = Math.min(sel, Math.max(0, res.length - 1));
      ul.innerHTML = res.map((p, i) => `<li class="${i === sel ? "sel" : ""}" data-i="${i}">${icone(p)} ${esc(basename(p))}<small>${esc(dirname(p))}</small></li>`).join("");
    };
    const ir = (i) => { if (res[i]) { location.hash = rotaNota(res[i]); dlg.close(); } };
    inp.value = "";
    inp.oninput = () => { sel = 0; desenhar(); };
    inp.onkeydown = (e) => {
      if (e.key === "ArrowDown") { sel = Math.min(sel + 1, res.length - 1); desenhar(); e.preventDefault(); }
      if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); desenhar(); e.preventDefault(); }
      if (e.key === "Enter") ir(sel);
    };
    ul.onclick = (e) => { const li = e.target.closest("li"); if (li) ir(+li.dataset.i); };
    desenhar();
    dlg.showModal();
    inp.focus();
  }

  function abrirConfig() {
    $("#cfg-token").value = token();
    $("#cfg-novos").value = store.get("ac:novosDia", 20);
    const dlg = $("#dlg-config");
    if (!dlg.open) dlg.showModal();
  }

  async function validarToken(tk) {
    const r = await fetch(api(""), { headers: { Authorization: `Bearer ${tk}`, Accept: "application/vnd.github+json" } });
    if (!r.ok) throw new Error("Token inválido ou sem acesso ao repositório.");
    const j = await r.json();
    if (!j.permissions?.push) throw new Error("O token não tem permissão de escrita (Contents: Read and write).");
  }

  // ---------- Versão publicada / forçar build ----------
  const fmtData = (iso) => new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

  async function mostrarVersao() {
    const el = $("#versao-site");
    try {
      const v = await (await fetch(`${pagesUrl("versao.json")}?t=${Date.now()}`, { cache: "no-store" })).json();
      let estadoTxt = "";
      try {
        const head = await gh(`/commits/${CFG.branch}`);
        estadoTxt = head.sha === v.commit
          ? "✅ em dia com a main"
          : "⚠️ a main tem alterações ainda não publicadas";
      } catch { /* sem API: mostra só a versão */ }
      el.innerHTML = `Publicado em ${esc(fmtData(v.data))} · commit <code>${esc(v.curto)}</code>${estadoTxt ? `<br>${estadoTxt}` : ""}`;
    } catch {
      el.textContent = "Versão do site indisponível (build anterior a este recurso).";
    }
  }

  async function forcarPublicacao() {
    const btn = $("#btn-publicar");
    if (!token()) { abrirConfig(); toast("Configure o token (com Actions: Read and write) para disparar a build.", 4500); return; }
    btn.disabled = true;
    const inicio = Date.now();
    try {
      await gh("/actions/workflows/pages.yml/dispatches", { method: "POST", body: JSON.stringify({ ref: CFG.branch }) });
    } catch (e) {
      btn.disabled = false;
      toast(e.status === 403 || e.status === 404
        ? "⚠️ Token sem permissão Actions: Read and write. Edite o token no GitHub e salve de novo."
        : `⚠️ ${e.message}`, 6000);
      return;
    }
    toast("🚀 Build disparada. Acompanhando…", 4000);
    for (let i = 0; i < 36; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      try {
        const j = await gh(`/actions/workflows/pages.yml/runs?event=workflow_dispatch&per_page=1`);
        const run = j.workflow_runs?.[0];
        if (!run || new Date(run.created_at).getTime() < inicio - 60000) { btn.textContent = "⏳ Aguardando início…"; continue; }
        if (run.status !== "completed") { btn.textContent = `⏳ ${run.status === "queued" ? "Na fila" : "Construindo"}…`; continue; }
        btn.disabled = false;
        btn.textContent = "🔄 Forçar atualização do site";
        if (run.conclusion === "success") { toast("✅ Site publicado. Recarregando…", 3000); setTimeout(() => location.reload(), 2500); }
        else toast(`❌ Build terminou com "${run.conclusion}". Veja em GitHub → Actions.`, 8000);
        return;
      } catch { /* tenta de novo */ }
    }
    btn.disabled = false;
    btn.textContent = "🔄 Forçar atualização do site";
    toast("A build está demorando; acompanhe em GitHub → Actions.", 6000);
  }

  // ---------- Início ----------
  async function iniciar() {
    $("#btn-publicar").addEventListener("click", forcarPublicacao);
    mostrarVersao();
    configurarMarked();
    const sb = $("#sidebar"), btnSb = $("#btn-sidebar");
    const mobile = () => matchMedia("(max-width: 860px)").matches;
    const marcarSb = () => {
      const aberta = mobile() ? sb.classList.contains("aberta") : !sb.classList.contains("oculta");
      btnSb.setAttribute("aria-expanded", aberta);
      $("#seta-arquivos").textContent = aberta ? "▾" : "▸";
    };
    if (!mobile() && store.get("ac:sidebarOculta", false)) sb.classList.add("oculta");
    marcarSb();
    btnSb.addEventListener("click", () => {
      if (mobile()) sb.classList.toggle("aberta");
      else { sb.classList.toggle("oculta"); store.set("ac:sidebarOculta", sb.classList.contains("oculta")); }
      marcarSb();
    });
    $("#filtro").addEventListener("input", renderArvore);
    $("#btn-busca").addEventListener("click", abrirBusca);
    $("#btn-config").addEventListener("click", abrirConfig);
    $("#btn-nova").addEventListener("click", () => {
      const p = rotaAtual().path;
      novaNota(p ? dirname(p) || p.replace(/\/$/, "") : "disciplinas");
    });
    $("#dlg-config").addEventListener("close", async () => {
      const acao = $("#dlg-config").returnValue;
      store.set("ac:novosDia", Math.max(0, +$("#cfg-novos").value || 20));
      if (acao === "limpar") { store.del("ac:token"); toast("Token removido."); }
      if (acao === "salvar") {
        const tk = $("#cfg-token").value.trim();
        if (tk && tk !== token()) {
          try { await validarToken(tk); store.set("ac:token", tk); toast("🔐 Token salvo: edição ativada."); }
          catch (e) { toast(`⚠️ ${e.message}`, 5000); return; }
        }
      }
      await carregarArvore().catch(() => {});
      navegar();
    });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); abrirBusca(); }
    });
    window.addEventListener("hashchange", navegar);
    try {
      await carregarArvore();
    } catch {
      $("#main").innerHTML = '<div class="conteudo"><h2>⚠️ Não consegui listar os arquivos</h2><p>Verifique a conexão e recarregue a página.</p></div>';
      return;
    }
    navegar();
  }

  iniciar();
})();
