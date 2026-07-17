/* ===================================================
   MANOJKUMAR SA · Neural OS Portfolio — Scripts
=================================================== */

// ── Scroll progress + nav + back-to-top ─────────────
const nav = document.getElementById('nav');
const scrollBar = document.getElementById('scrollBar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = pct + '%';
  nav.classList.toggle('scrolled', window.scrollY > 60);
  backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Cursor glow ─────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ── Burger menu ──────────────────────────────────────
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);
document.addEventListener('click', e => {
  if (!nav.contains(e.target)) navLinks.classList.remove('open');
});

// ── Typed text ───────────────────────────────────────
const phrases = [
  'QA Lead · 11+ Years Experience',
  'Agile Lead · CSM Certified',
  'AI Agent Builder · VS Code',
  'Banking & FinTech QA Expert',
  'TOSCA Expert · 7 Certifications',
  'QA Manager · AI Tester'
];
const typedEl = document.getElementById('typedRole');
let pIdx = 0, cIdx = 0, deleting = false;
function typeLoop() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
    setTimeout(typeLoop, 55);
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeLoop, 350); return; }
    setTimeout(typeLoop, 30);
  }
}
typeLoop();

// ── Animated KPI counters ────────────────────────────
function animateCounter(el, target, suffix) {
  const startTime = performance.now();
  const duration = 1800;
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const kpiData = [
  { suffix: '+', val: 11 },
  { suffix: '',  val: 12 },
  { suffix: '+', val: 5  },
  { suffix: '×', val: 7  },
  { suffix: '%', val: 25 }
];
const kpiNums    = document.querySelectorAll('.hk-n');
let kpiDone = false;
const kpiWrap    = document.querySelector('.hero-kpis');
if (kpiWrap) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !kpiDone) {
      kpiDone = true;
      kpiNums.forEach((el, i) => {
        if (kpiData[i]) animateCounter(el, kpiData[i].val, kpiData[i].suffix);
      });
    }
  }, { threshold: 0.5 }).observe(kpiWrap);
}

// ── Scroll Reveal ────────────────────────────────────
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), 60);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ── Testimonials slider ──────────────────────────────
const slider   = document.getElementById('tslider');
const dotsWrap = document.getElementById('tdots');
const tPrev    = document.getElementById('tPrev');
const tNext    = document.getElementById('tNext');

if (slider) {
  const cards = Array.from(slider.querySelectorAll('.tcard'));
  let curr = 0;
  const perView = () => window.innerWidth < 768 ? 1 : 2;
  const totalPages = () => Math.ceil(cards.length / perView());

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const d = document.createElement('button');
      d.className = 'tdot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(n) {
    curr = ((n % totalPages()) + totalPages()) % totalPages();
    const gap  = 20;
    const slideW = (slider.offsetWidth + gap) * perView();
    slider.style.transform = 'translateX(-' + (curr * slideW) + 'px)';
    dotsWrap.querySelectorAll('.tdot').forEach((d, i) =>
      d.classList.toggle('active', i === curr)
    );
  }

  buildDots();

  tPrev.addEventListener('click', () => goTo(curr - 1));
  tNext.addEventListener('click', () => goTo(curr + 1));

  let autoT = setInterval(() => goTo(curr + 1), 5000);
  [tPrev, tNext].forEach(b => b.addEventListener('click', () => {
    clearInterval(autoT);
    autoT = setInterval(() => goTo(curr + 1), 5000);
  }));
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
}

// ── Contact Form ─────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  const check = (id, errId, fn, msg) => {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    const ok = fn(el.value.trim());
    el.classList.toggle('invalid', !ok);
    err.textContent = ok ? '' : msg;
    return ok;
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = [
      check('cfName',  'errName',  v => v.length >= 2,                          'Enter your name'),
      check('cfEmail', 'errEmail', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),  'Enter a valid email'),
      check('cfRole',  'errRole',  v => v.length >= 3,                          'Describe the role'),
      check('cfMsg',   'errMsg',   v => v.length >= 10,                         'Message too short'),
    ].every(Boolean);
    if (!ok) return;
    document.getElementById('cfTxt').hidden = true;
    document.getElementById('cfLd').hidden  = false;
    setTimeout(() => {
      document.getElementById('cfTxt').hidden = false;
      document.getElementById('cfLd').hidden  = true;
      document.getElementById('cfOk').hidden  = false;
      form.reset();
    }, 1200);
  });
  form.querySelectorAll('input, textarea').forEach(el =>
    el.addEventListener('input', () => el.classList.remove('invalid'))
  );
}
