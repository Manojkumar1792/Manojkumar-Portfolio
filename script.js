/* ═══════════════════════════════════════════════════
   Manojkumar SA Portfolio — script.js
═══════════════════════════════════════════════════ */

// ── Nav scroll ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile menu ─────────────────────────────────────
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Typed text ──────────────────────────────────────
const phrases = [
  'QA Lead | 11+ Years Experience',
  'Agile Lead | CSM Certified',
  'AI Agent Builder | VS Code',
  'Banking & FinTech QA Expert',
  'TOSCA Expert | 7 Certifications',
  'QA Manager | AI Tester',
];
let pi = 0, ci = 0, del = false;
const typedEl = document.getElementById('typedText');

(function loop() {
  const cur = phrases[pi];
  typedEl.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
  let t = del ? 55 : 95;
  if (!del && ci === cur.length)   { t = 2000; del = true; }
  if ( del && ci === 0)            { del = false; pi = (pi+1) % phrases.length; t = 350; }
  setTimeout(loop, t);
})();

// ── Particle canvas ─────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function mkPt() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .5,
    };
  }

  pts = Array.from({ length: 80 }, mkPt);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,212,170,.35)';
      ctx.fill();

      pts.forEach(q => {
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,170,${.18 * (1 - d/120)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Skill bars on scroll ────────────────────────────
const barFills = document.querySelectorAll('.skfill');
function animateBars() {
  barFills.forEach(f => {
    const r = f.getBoundingClientRect();
    if (r.top < window.innerHeight - 40) f.style.width = f.dataset.w + '%';
  });
}
window.addEventListener('scroll', animateBars, { passive: true });
animateBars();

// ── Scroll reveal ────────────────────────────────────
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
}, { threshold: .1 });

document.querySelectorAll(
  '.about-left, .about-right, .sk-card, .tools-col, .table-wrap, ' +
  '.tl-card, .proj-card, .ai-card, .edu-card, .cert-card, .ach-item, .test-card, .ci, .looking-for'
).forEach(el => { el.classList.add('reveal'); ro.observe(el); });

// ── Testimonials slider ─────────────────────────────
(function slider() {
  const track  = document.getElementById('testTrack');
  const dotsWr = document.getElementById('tcDots');
  const prev   = document.getElementById('tPrev');
  const next   = document.getElementById('tNext');
  const cards  = track.querySelectorAll('.test-card');
  let cur      = 0;
  const vis    = window.innerWidth > 768 ? 2 : 1;
  const total  = Math.ceil(cards.length / vis);

  for (let i = 0; i < total; i++) {
    const d = document.createElement('button');
    d.className = 'tc-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i+1));
    d.onclick = () => go(i);
    dotsWr.appendChild(d);
  }

  function go(i) {
    cur = (i + total) % total;
    const w = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${cur * w * vis}px)`;
    dotsWr.querySelectorAll('.tc-dot').forEach((d,j) => d.classList.toggle('active', j === cur));
  }

  prev.onclick = () => go(cur - 1);
  next.onclick = () => go(cur + 1);

  let auto = setInterval(() => go(cur + 1), 5000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(auto));
  track.parentElement.addEventListener('mouseleave', () => { auto = setInterval(() => go(cur + 1), 5000); });
})();

// ── Contact form ─────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fields = [
    { el: document.getElementById('cfName'),  err: document.getElementById('errName'),  label: 'Name' },
    { el: document.getElementById('cfEmail'), err: document.getElementById('errEmail'), label: 'Email', email: true },
    { el: document.getElementById('cfRole'),  err: document.getElementById('errRole'),  label: 'Role' },
    { el: document.getElementById('cfMsg'),   err: document.getElementById('errMsg'),   label: 'Message' },
  ];

  let ok = true;
  fields.forEach(f => {
    f.el.classList.remove('invalid');
    f.err.textContent = '';
    if (!f.el.value.trim()) { f.err.textContent = f.label + ' is required.'; f.el.classList.add('invalid'); ok = false; return; }
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.el.value)) {
      f.err.textContent = 'Enter a valid email.'; f.el.classList.add('invalid'); ok = false;
    }
  });

  if (!ok) return;

  const txt  = document.getElementById('cfBtnTxt');
  const load = document.getElementById('cfBtnLoad');
  const suc  = document.getElementById('cfSuccess');
  txt.hidden = true; load.hidden = false;

  setTimeout(() => {
    load.hidden = true; txt.hidden = false; suc.hidden = false;
    this.reset();
    setTimeout(() => suc.hidden = true, 7000);
  }, 1400);
});

// ── Active nav highlight ─────────────────────────────
const secs = document.querySelectorAll('section[id]');
const anchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  anchors.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--teal)' : ''; });
}, { passive: true });
