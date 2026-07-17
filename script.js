/* ===================================================
   MANOJKUMAR SA · Neural OS Portfolio — Scripts
=================================================== */

// ── Nav ─────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Burger ──────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);
document.addEventListener('click', e => {
  if (!nav.contains(e.target)) navLinks.classList.remove('open');
});

// ── Typed Text ──────────────────────────────────
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

// ── Scroll Reveal ────────────────────────────────
const revEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), 60);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revEls.forEach(el => revObs.observe(el));

// ── Contact Form ─────────────────────────────────
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
      check('cfName',  'errName',  v => v.length >= 2,                            'Enter your name'),
      check('cfEmail', 'errEmail', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),    'Enter a valid email'),
      check('cfRole',  'errRole',  v => v.length >= 3,                            'Describe the role'),
      check('cfMsg',   'errMsg',   v => v.length >= 10,                           'Message too short'),
    ].every(Boolean);
    if (!ok) return;
    document.getElementById('cfTxt').hidden = true;
    document.getElementById('cfLd').hidden = false;
    setTimeout(() => {
      document.getElementById('cfTxt').hidden = false;
      document.getElementById('cfLd').hidden = true;
      document.getElementById('cfOk').hidden = false;
      form.reset();
    }, 1200);
  });
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('invalid'));
  });
}
