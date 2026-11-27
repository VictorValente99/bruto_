{
  const hero = document.querySelector(".hero");
  const cols = [...document.querySelectorAll(".col")];
  const flavors = [...document.querySelectorAll(".flavor")];
  const slugs = { manga: "manga-sacana", guarana: "guarana-baixaria", acai: "acaizudo", coco: "coco-saliente" };
  const bySlug = Object.fromEntries(Object.entries(slugs).map(([k, v]) => [v, k]));

  const activate = (key, push = true) => {
    if (!slugs[key]) key = "manga";
    hero.dataset.active = key;
    cols.forEach(c => {
      const on = c.dataset.flavor === key;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-selected", on);
    });
    flavors.forEach(f => f.classList.toggle("is-active", f.dataset.flavor === key));
    if (push && location.hash !== "#" + slugs[key]) history.replaceState(null, "", "#" + slugs[key]);
  };

  const hover = (key, on) =>
    flavors.forEach(f => f.dataset.flavor === key && f.classList.toggle("is-hover", on));

  cols.forEach(c => {
    const key = c.dataset.flavor;
    c.addEventListener("click", () => activate(key));
    c.addEventListener("pointerenter", () => hover(key, true));
    c.addEventListener("pointerleave", () => hover(key, false));
    c.addEventListener("focus", () => hover(key, true));
    c.addEventListener("blur", () => hover(key, false));
  });

  // setas do teclado trocam de sabor
  document.addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const keys = Object.keys(slugs);
    const i = keys.indexOf(hero.dataset.active);
    const next = keys[(i + (e.key === "ArrowRight" ? 1 : keys.length - 1)) % keys.length];
    activate(next);
    if (mobile.matches) scrollToFlavor(next, "smooth");
    else cols[keys.indexOf(next)].focus();
  });

  addEventListener("hashchange", () => {
    const key = bySlug[location.hash.slice(1)];
    activate(key, false);
    if (mobile.matches && key) scrollToFlavor(key, "smooth");
  });

  /* ---------- Mobile: rolar troca o sabor ---------- */
  const mobile = matchMedia("(max-width: 600px)");
  const scroller = document.querySelector(".hero__cans");
  const dots = [...document.querySelectorAll(".dots button")];

  const scrollToFlavor = (key, behavior = "auto") => {
    const el = flavors.find(f => f.dataset.flavor === key);
    if (el) scroller.scrollTo({ top: el.offsetTop, behavior });
  };

  const syncDots = key => {
    document.documentElement.dataset.flavor = key;
    dots.forEach(d => d.setAttribute("aria-current", d.dataset.flavor === key));
  };

  const io = new IntersectionObserver(entries => {
    if (!mobile.matches) return;
    entries.forEach(e => { if (e.isIntersecting) activate(e.target.dataset.flavor); });
  }, { root: scroller, threshold: 0.6 });
  flavors.forEach(f => io.observe(f));

  // mesmo tamanho de lata em todos os sabores: o maior que cabe no sabor
  // com menos espaço (nome do sabor acima da tab bar, sem encostar no texto)
  const frames = flavors.map(f => f.querySelector(".can-frame"));
  const sizeCans = () => {
    if (!mobile.matches) return;
    const m = innerWidth / 393;
    // espaço livre abaixo das pílulas em cada sabor, numa tela; o nome do
    // sabor (~86% da lata, já inclinada) termina acima da tab bar
    const screen = scroller.clientHeight;
    const fit = Math.min(...frames.map(fr => (screen - fr.offsetTop - 16 * m - 100 * m) / .86));
    const lv = Math.max(280 * m, Math.min(fit, 600 * m));
    scroller.style.setProperty("--lv", lv + "px");
  };
  sizeCans();
  addEventListener("resize", sizeCans);

  // em telas baixas o sabor pode ser mais longo que a tela: o logo fixo
  // some enquanto a pessoa rola dentro dele, para não cobrir o título
  const logo = document.querySelector(".logo");
  let ticking = false;
  scroller.addEventListener("scroll", () => {
    if (ticking || !mobile.matches) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scroller.scrollTop;
      const into = Math.min(...flavors.map(f => Math.abs(y - f.offsetTop)));
      logo.style.opacity = Math.max(0, 1 - into / 40);
      ticking = false;
    });
  }, { passive: true });
  document.fonts?.ready.then(sizeCans);

  dots.forEach(d => d.addEventListener("click", () => scrollToFlavor(d.dataset.flavor, "smooth")));

  // pontinhos e cor do logo acompanham o sabor ativo (desktop e mobile)
  new MutationObserver(() => syncDots(hero.dataset.active))
    .observe(hero, { attributes: true, attributeFilter: ["data-active"] });

  const start = bySlug[location.hash.slice(1)] || "manga";
  activate(start, false);
  syncDots(start);
  if (mobile.matches) scrollToFlavor(start);
}
