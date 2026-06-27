(function () {

  // ── 0b. Web3Forms — notificación por correo (clave única para todo el sitio) ───
  // Saca tu access key en https://web3forms.com (regístrala con contacto@partidocentral.pe).
  const WEB3FORMS_ACCESS_KEY = '5574592d-337b-48ca-85a0-6cb758c278ff';
  window.enviarNotificacionEmail = async function (asunto, datos) {
    const tokenEl = document.querySelector('[name="h-captcha-response"]');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: asunto,
          from_name: 'Web Partido Central',
          'h-captcha-response': tokenEl ? tokenEl.value : '',
          ...datos,
        }),
      });
      if (window.hcaptcha) { try { hcaptcha.reset(); } catch (e) {} }
      return res.ok;
    } catch (err) {
      console.error('Web3Forms:', err);
      return false;
    }
  };

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
    .dev-credit { position: relative; display: inline-flex; }
    .dev-credit::after {
      content: attr(data-tip);
      position: absolute; bottom: calc(100% + 8px); right: 0;
      white-space: nowrap; background: #fff; color: #0D2B5C;
      font-size: 11px; font-weight: 700; padding: 6px 10px; border-radius: 8px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.35);
      opacity: 0; transform: translateY(4px); pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .dev-credit:hover::after { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  // ── 2. Active page detection ──────────────────────────────────────────────────
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = currentFile === 'index.html' || currentFile === '';
  const volunteerHref = isHome ? '#hero' : '/#hero';

  // Un enlace está "activo" si apunta al archivo actual. El inicio ('/') se
  // considera activo cuando estamos en la raíz o en index.html.
  const esActivo = href => (href === '/' ? isHome : currentFile === href);

  // ── 3. Nav link helpers ───────────────────────────────────────────────────────
  function navLink(href, label) {
    return esActivo(href)
      ? `<a href="${href}" class="text-amarillo-progreso bg-white/10 px-4 py-2 rounded-md text-sm font-semibold tracking-wide">${label}</a>`
      : `<a href="${href}" class="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors duration-200">${label}</a>`;
  }

  function mobileNavLink(href, label) {
    return esActivo(href)
      ? `<a href="${href}" class="text-amarillo-progreso text-xl font-bold py-3 border-b border-white/10">${label}</a>`
      : `<a href="${href}" class="text-white text-xl font-bold py-3 border-b border-white/10 hover:text-amarillo-progreso transition-colors">${label}</a>`;
  }

  // ── 4. SVG logo strings ───────────────────────────────────────────────────────
  const logoSVG = `<svg class="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Logo Partido Central">
          <path d="M69.44 57.00 A34 34 0 0 1 51.63 71.95 L47.18 59.73 A21 21 0 0 0 58.19 50.50 Z" fill="white"/>
          <path d="M49.94 72.51 A34 34 0 0 1 26.72 71.30 L31.79 59.33 A21 21 0 0 0 46.14 60.08 Z" fill="white"/>
          <path d="M25.10 70.56 A34 34 0 0 1 8.94 53.83 L20.82 48.54 A21 21 0 0 0 30.79 58.87 Z" fill="white"/>
          <path d="M8.26 52.18 A34 34 0 0 1 7.85 28.93 L20.14 33.16 A21 21 0 0 0 20.39 47.53 Z" fill="#F2C200"/>
          <path d="M8.48 27.26 A34 34 0 0 1 24.04 9.98 L30.14 21.46 A21 21 0 0 0 20.53 32.13 Z" fill="white"/>
          <path d="M25.63 9.19 A34 34 0 0 1 48.80 7.16 L45.44 19.72 A21 21 0 0 0 31.13 20.97 Z" fill="white"/>
          <path d="M50.51 7.66 A34 34 0 0 1 68.83 21.98 L57.81 28.87 A21 21 0 0 0 46.49 20.03 Z" fill="white"/>
        </svg>`;

  const footerLogoSVG = `<svg class="w-10 h-10 flex-shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.44 57.00 A34 34 0 0 1 51.63 71.95 L47.18 59.73 A21 21 0 0 0 58.19 50.50 Z" fill="white" opacity="0.9"/>
            <path d="M49.94 72.51 A34 34 0 0 1 26.72 71.30 L31.79 59.33 A21 21 0 0 0 46.14 60.08 Z" fill="white" opacity="0.9"/>
            <path d="M25.10 70.56 A34 34 0 0 1 8.94 53.83 L20.82 48.54 A21 21 0 0 0 30.79 58.87 Z" fill="white" opacity="0.9"/>
            <path d="M8.26 52.18 A34 34 0 0 1 7.85 28.93 L20.14 33.16 A21 21 0 0 0 20.39 47.53 Z" fill="#F2C200"/>
            <path d="M8.48 27.26 A34 34 0 0 1 24.04 9.98 L30.14 21.46 A21 21 0 0 0 20.53 32.13 Z" fill="white" opacity="0.9"/>
            <path d="M25.63 9.19 A34 34 0 0 1 48.80 7.16 L45.44 19.72 A21 21 0 0 0 31.13 20.97 Z" fill="white" opacity="0.9"/>
            <path d="M50.51 7.66 A34 34 0 0 1 68.83 21.98 L57.81 28.87 A21 21 0 0 0 46.49 20.03 Z" fill="white" opacity="0.9"/>
          </svg>`;

  // ── 5. Header HTML ────────────────────────────────────────────────────────────
  const headerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">

        <a href="/" class="flex items-center gap-3 group">
          ${logoSVG}
          <div class="flex flex-col leading-none">
            <span class="text-white font-black text-xl lg:text-2xl tracking-widest">CENTRAL</span>
            <span class="text-white/60 font-medium text-xs tracking-[0.25em] uppercase">Partido Central</span>
          </div>
        </a>

        <nav class="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
          ${navLink('/', 'Inicio')}
          ${navLink('quienes-somos.html', 'Quiénes Somos')}
          ${navLink('propuestas.html', 'Pilares de Gobierno')}
          ${navLink('contacto.html', 'Contacto')}
        </nav>

        <div class="hidden lg:flex items-center gap-3">
          <a href="propuestas.html#donar" class="border border-amarillo-progreso/60 hover:border-amarillo-progreso text-amarillo-progreso hover:bg-amarillo-progreso/10 px-5 py-2 rounded-full text-sm font-black tracking-wide transition-all duration-200">Donar</a>
          <a href="${volunteerHref}" class="bg-amarillo-progreso hover:bg-amarillo-hover text-azul-institucional px-6 py-2 rounded-full text-sm font-black tracking-wide transition-all duration-200 btn-cta-pulse">¡Únete!</a>
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
      ${mobileNavLink('/', 'Inicio')}
      ${mobileNavLink('quienes-somos.html', 'Quiénes Somos')}
      ${mobileNavLink('propuestas.html', 'Pilares de Gobierno')}
      ${mobileNavLink('contacto.html', 'Contacto')}
      <div class="mt-6 space-y-3">
        <a href="${volunteerHref}" class="block bg-amarillo-progreso text-azul-institucional text-center py-3.5 rounded-full font-black text-lg">¡Únete!</a>
        <a href="propuestas.html#donar" class="block border-2 border-amarillo-progreso/70 text-amarillo-progreso text-center py-3 rounded-full font-black text-base hover:bg-amarillo-progreso/10 transition-colors">Donar →</a>
      </div>
    </div>
  `;

  // ── 6. Footer HTML ────────────────────────────────────────────────────────────
  const footerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">

        <div class="space-y-3 col-span-2 md:col-span-1">
          <div class="flex items-center gap-2.5">
            ${footerLogoSVG}
            <div>
              <p class="text-white font-black text-base tracking-widest">CENTRAL</p>
              <p class="text-white/40 text-xs font-medium tracking-wider">Partido Central</p>
            </div>
          </div>
          <p class="text-white/45 text-xs font-medium leading-relaxed">Por un Perú desarrollado, honesto y con oportunidades para todos.</p>
        </div>

        <div>
          <h4 class="text-white font-bold text-xs uppercase tracking-widest mb-3">Navegación</h4>
          <ul class="space-y-2">
            <li><a href="/" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Inicio</a></li>
            <li><a href="quienes-somos.html" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Quiénes Somos</a></li>
            <li><a href="propuestas.html" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Pilares de Gobierno</a></li>
            <li><a href="contacto.html" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold text-xs uppercase tracking-widest mb-3">Únete y Apoya</h4>
          <ul class="space-y-2">
            <li><a href="/#form-hero-unete" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">¡Únete!</a></li>
            <li><a href="propuestas.html#donar" class="text-white/50 hover:text-amarillo-progreso text-xs font-medium transition-colors">Hacer una Donación</a></li>
          </ul>
        </div>

      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex gap-3">
          <a href="https://www.tiktok.com/@partidocentral8" target="_blank" rel="noopener" aria-label="TikTok" class="w-7 h-7 bg-white/10 hover:bg-amarillo-progreso hover:text-azul-institucional text-white rounded-md flex items-center justify-center transition-all duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
          <a href="https://www.instagram.com/central.partido" target="_blank" rel="noopener" aria-label="Instagram" class="w-7 h-7 bg-white/10 hover:bg-amarillo-progreso hover:text-azul-institucional text-white rounded-md flex items-center justify-center transition-all duration-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
          <a href="politica-de-privacidad.html" class="text-white/55 hover:text-amarillo-progreso text-xs font-medium transition-colors">Política de Privacidad</a>
          <p class="text-white/40 text-xs font-medium text-center sm:text-right">
            © 2026 Partido Central. Todos los derechos reservados.
          </p>
          <a href="https://www.linkedin.com/in/juanhuamani/" target="_blank" rel="noopener" class="dev-credit" data-tip="Desarrollado por Juan Huamani" aria-label="Desarrollado por Juan Huamani">
            <span class="w-7 h-7 rounded-full bg-white/10 hover:bg-amarillo-progreso text-white/55 hover:text-azul-institucional text-[10px] font-black tracking-tight flex items-center justify-center transition-all duration-300">JH</span>
          </a>
        </div>
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
