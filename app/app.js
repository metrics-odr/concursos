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
    template: "_templates/nota-topico.md",
  };
  const OCULTOS = /^(\.|app\/|index\.html$|indice\.json$|_site\/)|\/\.gitkeep$/;
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

  const estado = { arquivos: [], shas: {}, cache: {}, fonteArvore: "" };

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
    const visiveis = estado.arquivos.filter((p) => !OCULTOS.test(p))
      .filter((p) => !filtro || p.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(filtro));
    const abertas = store.get("ac:pastas", { concursos: true, "concursos/cgu-affc": true, disciplinas: true });
    const atual = rotaAtual().path || "";
    const html = (no, prefixo) => {
      const pastas = Object.keys(no.pastas).sort((a, b) => a.localeCompare(b, "pt-BR")).map((nome) => {
        const caminho = prefixo ? `${prefixo}/${nome}` : nome;
        const aberto = filtro || abertas[caminho] || atual.startsWith(`${caminho}/`);
        return `<details data-pasta="${esc(caminho)}"${aberto ? " open" : ""}><summary class="item"><span class="seta">▶</span>📁 ${esc(nome)}</summary><div class="filhos">${html(no.pastas[nome], caminho)}</div></details>`;
      }).join("");
      const arqs = no.arquivos.map((p) => `<a class="item${p === atual ? " ativo" : ""}" href="${rotaNota(p)}" title="${esc(p)}">${icone(p)} ${esc(basename(p))}</a>`).join("");
      return pastas + arqs;
    };
    $("#tree").innerHTML = visiveis.length ? html(montarArvore(visiveis), "") : '<p class="muted pad">Nada encontrado.</p>';
    $$("#tree details").forEach((d) => d.addEventListener("toggle", () => {
      const a = store.get("ac:pastas", {});
      a[d.dataset.pasta] = d.open;
      store.set("ac:pastas", a);
    }));
    $("#status-conexao").textContent = token()
      ? `🔐 Conectado (edição ativa) · ${estado.arquivos.length} arquivos`
      : `👀 Somente leitura · ${estado.arquivos.length} arquivos · ⚙️ para editar`;
  }

  // ---------- Rotas ----------
  function rotaAtual() {
    const h = decodeURI(location.hash.slice(1) || "/");
    if (h.startsWith("/nota/")) {
      const [path, ancora] = h.slice(6).split("::");
      return { nome: "nota", path, ancora };
    }
    if (h.startsWith("/editar/")) return { nome: "editar", path: h.slice(8) };
    if (h.startsWith("/desafios")) return { nome: "desafios" };
    if (h.startsWith("/flashcards")) return { nome: "flashcards" };
    return { nome: "inicio" };
  }

  function marcarAba(r) {
    const mapa = { inicio: "inicio", desafios: "desafios", flashcards: "flashcards" };
    let aba = mapa[r.nome];
    if (r.path === CFG.progresso) aba = "progresso";
    else if (r.path?.includes("/acervo/")) aba = "acervo";
    else if (r.path?.includes("provas-cebraspe")) aba = "provas";
    $$("#tabs a").forEach((a) => a.classList.toggle("ativo", a.dataset.tab === aba));
  }

  async function navegar() {
    const r = rotaAtual();
    marcarAba(r);
    renderArvore();
    if (matchMedia("(max-width: 860px)").matches) $("#sidebar").classList.remove("aberta");
    const main = $("#main");
    main.scrollTop = 0;
    try {
      if (r.nome === "nota") await telaNota(main, r.path, r.ancora);
      else if (r.nome === "editar") await telaEditor(main, r.path);
      else if (r.nome === "desafios") await telaDesafios(main);
      else if (r.nome === "flashcards") await telaFlashcards(main);
      else await telaInicio(main);
    } catch (e) {
      main.innerHTML = `<div class="conteudo"><h2>⚠️ Não foi possível abrir</h2><p>${esc(e.message)}</p><p><a href="#/">Voltar ao início</a></p></div>`;
    }
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
    estado.arquivos.filter((a) => a.startsWith(`${p}/`) && !OCULTOS.test(a)).forEach((a) => {
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
    const atualizar = () => prev && renderMarkdown(ta.value, path, prev);
    let t;
    ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(atualizar, 250); });
    atualizar();
    $("#ed-preview")?.addEventListener("click", () => $("#ed-wrap").classList.toggle("so-editor"));
    const salvar = async () => {
      if (ta.value === original && existe) { toast("Nada mudou."); return; }
      const btn = $("#ed-salvar");
      btn.disabled = true;
      btn.textContent = "Salvando…";
      if (await persistir(path, ta.value, existe ? "Edita nota" : "Cria nota")) {
        original = ta.value;
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
    ta.focus();
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
    texto.split("\n").forEach((l) => {
      const h = l.match(/^### (.+)/);
      if (h) { atual = { nome: h[1].trim(), cont: { "⬜": 0, "🟨": 0, "✅": 0, "🔁": 0 }, total: 0 }; disc.push(atual); return; }
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

  async function telaFlashcards(main) {
    main.innerHTML = '<div class="conteudo"><h1>🃏 Flashcards</h1><p class="muted">Carregando…</p></div>';
    const todos = await carregarCards();
    const limiteNovos = store.get("ac:novosDia", 20);
    const reais = todos.filter((c) => !c.exemplo);
    const decks = {};
    (reais.length ? reais : todos).forEach((c) => { (decks[c.disciplina] ||= []).push(c); });
    const resumo = (cs) => ({ devidos: cs.filter(srs.devido).length, novos: cs.filter(srs.novo).length, total: cs.length });
    const novosRest = Math.max(0, limiteNovos - srs.novosHoje());

    main.innerHTML = `<div class="conteudo"><h1>🃏 Flashcards</h1>
      ${reais.length ? "" : '<div class="aviso">Ainda não há cards reais — mostrando o baralho de <b>exemplo</b>. Peça ao Claude para criar cards de um tópico (eles vão para <code>flashcards/banco/</code>).</div>'}
      <p class="muted">Revisão espaçada neste navegador (o Anki continua sendo o principal — <a href="${rotaNota("flashcards/primeiros-passos-anki.md")}">guia</a>). Novos hoje: ${srs.novosHoje()}/${limiteNovos}.</p>
      <div class="decks">${Object.entries(decks).map(([d, cs]) => {
        const r = resumo(cs);
        return `<div class="card deck"><div><b>${esc(d)}</b><br><small class="muted">${r.total} cards · ${r.devidos} para revisar · ${r.novos} novos</small></div><button class="btn primary" data-deck="${esc(d)}">Estudar</button></div>`;
      }).join("")}
      <div class="card deck"><div><b>Tudo</b><br><small class="muted">todas as disciplinas</small></div><button class="btn" data-deck="*">Estudar tudo</button></div></div>
      <div class="fc-area" id="fc-sessao"></div></div>`;
    $$("[data-deck]").forEach((b) => b.addEventListener("click", () => {
      const cs = b.dataset.deck === "*" ? Object.values(decks).flat() : decks[b.dataset.deck];
      const fila = [...cs.filter(srs.devido), ...cs.filter(srs.novo).slice(0, novosRest)];
      sessao(fila);
    }));
  }

  function sessao(fila) {
    const box = $("#fc-sessao");
    $(".decks").style.display = "none";
    let i = 0, virado = false;
    const tipoNome = { basico: "Básico", invertido: "Invertido", cloze: "Lacuna", vf: "Certo ou Errado", comparacao: "Comparação" };
    const desenhar = () => {
      if (i >= fila.length) {
        box.innerHTML = `<div class="fc-card" style="text-align:center"><div class="big">🎉</div><p>Sessão concluída! ${fila.length} card(s).</p><p><a class="btn" href="#/flashcards" onclick="location.reload()">Voltar aos baralhos</a></p></div>`;
        return;
      }
      const c = fila[i];
      const frente = c.tipo === "cloze" ? renderCloze(c.frente, false) : esc(c.frente);
      const verso = c.tipo === "cloze" ? `${renderCloze(c.frente, true)}${c.verso ? `<br><small>${esc(c.verso)}</small>` : ""}` : esc(c.verso);
      box.innerHTML = `<div class="fc-card"><div class="fc-meta"><span>${esc(c.disciplina)} · ${esc(c.topico)} · ${tipoNome[c.tipo] || c.tipo}</span><span>${i + 1}/${fila.length}</span></div>
        <div>${frente}</div>
        ${virado ? `<div class="fc-verso">${verso}${c.fonte ? `<br><small>Fonte: ${esc(c.fonte)}</small>` : ""}</div>` : ""}</div>
        ${virado
          ? `<div class="fc-botoes"><button class="btn b-errei" data-n="0">1 · Errei</button><button class="btn" data-n="1">2 · Difícil</button><button class="btn" data-n="2">3 · Bom</button><button class="btn b-facil" data-n="3">4 · Fácil</button></div>`
          : '<div class="fc-botoes" style="grid-template-columns:1fr"><button class="btn primary" id="fc-virar">Mostrar resposta (espaço)</button></div>'}`;
      $("#fc-virar")?.addEventListener("click", () => { virado = true; desenhar(); });
      $$("[data-n]", box).forEach((b) => b.addEventListener("click", () => responder(+b.dataset.n)));
    };
    const responder = (n) => {
      srs.responder(fila[i], n);
      if (n === 0) fila.push(fila[i]);
      i++; virado = false; desenhar();
    };
    document.onkeydown = (e) => {
      if (!$("#fc-sessao") || e.target.matches("input,textarea")) return;
      if (e.key === " " && !virado) { e.preventDefault(); virado = true; desenhar(); }
      else if (virado && "1234".includes(e.key)) responder(+e.key - 1);
    };
    desenhar();
  }

  // ---------- Tela: início ----------
  async function telaInicio(main) {
    document.title = "Área do Concurseiro";
    const dias = Math.ceil((new Date(CFG.dataProva) - new Date()) / 86400000);
    main.innerHTML = `<div class="conteudo">
      <h1>📚 Área do Concurseiro</h1>
      <p class="muted">CGU · Auditor Federal de Finanças e Controle · <b>TI – Ciência de Dados</b> · Cebraspe</p>
      <div class="grid">
        <div class="card"><h3>⏳ Prova (13/12/2026)</h3><div class="big">${dias > 0 ? dias : 0}</div><div class="muted">dias restantes</div></div>
        <div class="card"><h3>🎯 Desafio de hoje</h3><div id="in-desafio" class="big">…</div><a href="#/desafios">abrir →</a></div>
        <div class="card"><h3>🃏 Flashcards</h3><div id="in-fc" class="big">…</div><a href="#/flashcards">estudar →</a></div>
        <div class="card"><h3>✅ Edital</h3><div id="in-prog" class="big">…</div><a href="${rotaNota(CFG.progresso)}">checklist →</a></div>
      </div>
      <div class="card"><h3>📊 Progresso por disciplina</h3><div id="in-disc"><p class="muted">Carregando…</p></div>
        <div class="legenda"><span><i style="background:var(--accent)"></i>revisado</span><span><i style="background:var(--ok)"></i>estudado</span><span><i style="background:var(--warn)"></i>em estudo</span></div></div>
      <div class="grid">
        <a class="card" href="${rotaNota("concursos/cgu-affc/acervo/README.md")}"><h3>🔎 Acervo</h3>Onde e como estudar cada tópico do edital</a>
        <a class="card" href="${rotaNota("concursos/cgu-affc/revisao/provas-cebraspe.md")}"><h3>📝 Provas Cebraspe</h3>Ciência de Dados + discursivas</a>
        <a class="card" href="${rotaNota("concursos/cgu-affc/README.md")}"><h3>📄 Ficha do concurso</h3>Datas, vagas, pesos</a>
        <a class="card" href="${rotaNota("concursos/cgu-affc/edital/edital-cgu-2026-12.md")}"><h3>📜 Edital</h3>Texto completo em Markdown</a>
      </div></div>`;

    lerArquivo(CFG.progresso, { fresco: true }).then((t) => {
      const disc = lerProgresso(t);
      const tot = disc.reduce((a, d) => a + d.total, 0);
      const feitos = disc.reduce((a, d) => a + d.cont["✅"] + d.cont["🔁"], 0);
      $("#in-prog").textContent = `${tot ? Math.round((100 * feitos) / tot) : 0}%`;
      $("#in-disc").innerHTML = disc.map((d) => {
        const ok = d.cont["✅"] + d.cont["🔁"];
        return `<div class="disc-linha"><a href="${rotaNota(CFG.progresso)}::${slugTitulo(d.nome)}" title="${esc(d.nome)}">${esc(d.nome)}</a>${barraProgresso(d.cont, d.total)}<span class="muted">${ok}/${d.total}</span></div>`;
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
      res = estado.arquivos.filter((p) => !OCULTOS.test(p)).map((p) => [p, pontuar(p, q)]).filter((x) => x[1] > 0)
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

  // ---------- Início ----------
  async function iniciar() {
    configurarMarked();
    $("#btn-sidebar").addEventListener("click", () => {
      const sb = $("#sidebar");
      if (matchMedia("(max-width: 860px)").matches) sb.classList.toggle("aberta");
      else sb.classList.toggle("oculta");
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
