(function () {

  // ── 1. Shared CSS ────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    * { font-family: 'Montserrat', sans-serif; }
    h1, h2, h3, h4, h5, h6 { font-weight: 700; }
    p, li, span, a { font-weight: 500; }
    strong { font-weight: 700; }
    .header-scrolled { background: rgba(13,43,92,0.97) !important; backdrop-filter: blur(12px); box-shadow: 0 2px 20px rgba(0,0,0,0.25); }
    .btn-cta-pulse { animation: pulseCta 2.5s cubic-bezier(0.4,0,0.6,1) infinite; }
    @keyframes pulseCta { 0%,100%{box-shadow:0 0 0 0 rgba(242,194,0,0.45)}50%{box-shadow:0 0 0 14px rgba(242,194,0,0)} }
    #mobile-menu { transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease; }
    #mobile-menu.closed { transform: translateX(100%); opacity: 0; pointer-events: none; }
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  // ── 2. Active page detection ──────────────────────────────────────────────────
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const volunteerHref = currentFile === 'index.html' ? '#hero' : 'index.html#hero';

  // ── 3. Nav link helpers ───────────────────────────────────────────────────────
  function navLink(href, label) {
    return currentFile === href
      ? `<a href="${href}" class="text-amarillo-progreso bg-white/10 px-4 py-2 rounded-md text-sm font-semibold tracking-wide">${label}</a>`
      : `<a href="${href}" class="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors duration-200">${label}</a>`;
  }

  function mobileNavLink(href, label) {
    return currentFile === href
      ? `<a href="${href}" class="text-amarillo-progreso text-xl font-bold py-3 border-b border-white/10">${label}</a>`
      : `<a href="${href}" class="text-white text-xl font-bold py-3 border-b border-white/10 hover:text-amarillo-progreso transition-colors">${label}</a>`;
  }

  // ── 4. SVG logo strings ───────────────────────────────────────────────────────
  const logoSVG = `<svg class="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Logo Partido Central">
          <path d="M67.85 59.50 A34 34 0 0 1 45.90 73.48 L43.65 60.68 A21 21 0 0 0 57.20 52.05Z" fill="white"/>
          <path d="M43.55 73.81 A34 34 0 0 1 18.60 66.42 L26.78 56.32 A21 21 0 0 0 42.19 60.88Z" fill="white"/>
          <path d="M16.81 64.87 A34 34 0 0 1 6.02 41.19 L19.01 40.73 A21 21 0 0 0 25.68 55.36Z" fill="white"/>
          <path d="M6.02 38.81 A34 34 0 0 1 16.81 15.13 L25.68 24.64 A21 21 0 0 0 19.01 39.27Z" fill="#F2C200"/>
          <path d="M18.60 13.58 A34 34 0 0 1 43.55 6.19 L42.19 19.12 A21 21 0 0 0 26.78 23.68Z" fill="white"/>
          <path d="M45.90 6.52 A34 34 0 0 1 67.85 20.50 L57.20 27.95 A21 21 0 0 0 43.65 19.32Z" fill="white"/>
        </svg>`;

  const footerLogoSVG = `<svg class="w-10 h-10 flex-shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M67.85 59.50 A34 34 0 0 1 45.90 73.48 L43.65 60.68 A21 21 0 0 0 57.20 52.05Z" fill="white" opacity="0.9"/>
            <path d="M43.55 73.81 A34 34 0 0 1 18.60 66.42 L26.78 56.32 A21 21 0 0 0 42.19 60.88Z" fill="white" opacity="0.9"/>
            <path d="M16.81 64.87 A34 34 0 0 1 6.02 41.19 L19.01 40.73 A21 21 0 0 0 25.68 55.36Z" fill="white" opacity="0.9"/>
            <path d="M6.02 38.81 A34 34 0 0 1 16.81 15.13 L25.68 24.64 A21 21 0 0 0 19.01 39.27Z" fill="#F2C200"/>
            <path d="M18.60 13.58 A34 34 0 0 1 43.55 6.19 L42.19 19.12 A21 21 0 0 0 26.78 23.68Z" fill="white" opacity="0.9"/>
            <path d="M45.90 6.52 A34 34 0 0 1 67.85 20.50 L57.20 27.95 A21 21 0 0 0 43.65 19.32Z" fill="white" opacity="0.9"/>
          </svg>`;

  // ── 5. Header HTML ────────────────────────────────────────────────────────────
  const headerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">

        <a href="index.html" class="flex items-center gap-3 group">
          ${logoSVG}
          <div class="flex flex-col leading-none">
            <span class="text-white font-black text-xl lg:text-2xl tracking-widest">CENTRAL</span>
            <span class="text-white/60 font-medium text-xs tracking-[0.25em] uppercase">Partido Central</span>
          </div>
        </a>

        <nav class="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
          ${navLink('index.html', 'Inicio')}
          ${navLink('quienes-somos.html', 'Quiénes Somos')}
          ${navLink('propuestas.html', 'Pilares de Gobierno')}
          ${navLink('contacto.html', 'Contacto')}
        </nav>

        <div class="hidden lg:flex items-center gap-3">
          <a href="propuestas.html#donar" class="border border-amarillo-progreso/60 hover:border-amarillo-progreso text-amarillo-progreso hover:bg-amarillo-progreso/10 px-5 py-2 rounded-full text-sm font-black tracking-wide transition-all duration-200">Donar</a>
          <a href="${volunteerHref}" class="bg-amarillo-progreso hover:bg-amarillo-hover text-azul-institucional px-6 py-2 rounded-full text-sm font-black tracking-wide transition-all duration-200 btn-cta-pulse">Ser Voluntario</a>
        </div>

        <button id="menu-toggle" class="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors" aria-label="Abrir menú" aria-expanded="false">
          <svg id="icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg id="icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>

  `;

  // ── 5b. Mobile menu HTML ──────────────────────────────────────────────────────
  // Injected directly into <body> (not inside <header>) so that backdrop-filter
  // on .header-scrolled cannot create a containing block and clip the overlay.
  const mobileMenuHTML = `
    <div id="mobile-menu" class="closed lg:hidden fixed inset-0 h-screen w-screen bg-azul-institucional z-50 flex flex-col pt-16 lg:pt-20 px-6 pb-6 gap-2 overflow-y-auto">
      ${mobileNavLink('index.html', 'Inicio')}
      ${mobileNavLink('quienes-somos.html', 'Quiénes Somos')}
      ${mobileNavLink('propuestas.html', 'Pilares de Gobierno')}
      ${mobileNavLink('contacto.html', 'Contacto')}
      <div class="mt-6 space-y-3">
        <a href="${volunteerHref}" class="block bg-amarillo-progreso text-azul-institucional text-center py-3.5 rounded-full font-black text-lg">Ser Voluntario</a>
        <a href="propuestas.html#donar" class="block border-2 border-amarillo-progreso/70 text-amarillo-progreso text-center py-3 rounded-full font-black text-base hover:bg-amarillo-progreso/10 transition-colors">Donar →</a>
      </div>
    </div>
  `;

  // ── 6. Footer HTML ────────────────────────────────────────────────────────────
  const footerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div class="space-y-3">
          <div class="flex items-center gap-2.5">
            ${footerLogoSVG}
            <div>
              <p class="text-white font-black text-base tracking-widest">CENTRAL</p>
              <p class="text-white/40 text-xs font-medium tracking-wider">Partido Central</p>
            </div>
          </div>
          <p class="text-white/45 text-xs font-medium leading-relaxed">Por un Perú honesto, próspero e inclusivo.</p>
        </div>

        <div>
          <h4 class="text-white font-bold text-xs uppercase tracking-widest mb-3">Navegación</h4>
          <ul class="space-y-2">
            <li><a href="index.html" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Inicio</a></li>
            <li><a href="quienes-somos.html" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Quiénes Somos</a></li>
            <li><a href="propuestas.html" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Pilares de Gobierno</a></li>
            <li><a href="contacto.html" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold text-xs uppercase tracking-widest mb-3">Únete y Apoya</h4>
          <ul class="space-y-2">
            <li><a href="index.html#form-hero-unete" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Ser Voluntario</a></li>
            <li><a href="propuestas.html#donar" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Hacer una Donación</a></li>
          </ul>
        </div>

      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex gap-3">
          <a href="#" aria-label="Facebook" class="w-7 h-7 bg-white/10 hover:bg-amarillo-progreso hover:text-azul-institucional text-white rounded-md flex items-center justify-center transition-all duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Twitter/X" class="w-7 h-7 bg-white/10 hover:bg-amarillo-progreso hover:text-azul-institucional text-white rounded-md flex items-center justify-center transition-all duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="w-7 h-7 bg-white/10 hover:bg-amarillo-progreso hover:text-azul-institucional text-white rounded-md flex items-center justify-center transition-all duration-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" aria-label="YouTube" class="w-7 h-7 bg-white/10 hover:bg-amarillo-progreso hover:text-azul-institucional text-white rounded-md flex items-center justify-center transition-all duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
          </a>
        </div>
        <p class="text-white/40 text-xs font-medium text-center sm:text-right">
          © 2026 Partido Central. Todos los derechos reservados.
        </p>
      </div>
    </div>
  `;

  // ── 7. DOM injection ──────────────────────────────────────────────────────────
  const headerEl = document.getElementById('global-header');
  const footerEl = document.getElementById('global-footer');
  if (headerEl) headerEl.innerHTML = headerHTML;
  if (footerEl) footerEl.innerHTML = footerHTML;
  // Insert menu before <header> so header (same z-50, later in DOM) paints on top,
  // keeping the hamburger/close button always accessible.
  document.body.insertAdjacentHTML('afterbegin', mobileMenuHTML);

  // ── 8. Mobile menu ────────────────────────────────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen   = document.getElementById('icon-open');
  const iconClose  = document.getElementById('icon-close');
  let menuOpen = false;

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('closed', !menuOpen);
      iconOpen.classList.toggle('hidden', menuOpen);
      iconClose.classList.toggle('hidden', !menuOpen);
      menuToggle.setAttribute('aria-expanded', menuOpen);
      document.body.classList.toggle('overflow-hidden', menuOpen);
      document.body.classList.toggle('h-screen', menuOpen);
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => window.closeMenu());
    });
  }

  window.closeMenu = function () {
    menuOpen = false;
    if (mobileMenu) mobileMenu.classList.add('closed');
    if (iconOpen)   iconOpen.classList.remove('hidden');
    if (iconClose)  iconClose.classList.add('hidden');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', false);
    document.body.classList.remove('overflow-hidden', 'h-screen');
  };

  // ── 9. Header scroll effect ───────────────────────────────────────────────────
  if (headerEl) {
    window.addEventListener('scroll', () => {
      headerEl.classList.toggle('header-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

})();
