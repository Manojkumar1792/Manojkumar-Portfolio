/* ============================================================
   MANOJKUMAR SA — Aurora Portfolio Scripts
============================================================ */

// ── Nav scroll ──────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Burger ──────────────────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { navLinks.classList.remove('open'); burger.classList.remove('active'); });
});
document.addEventListener('click', e => {
  if (!nav.contains(e.target)) { navLinks.classList.remove('open'); burger.classList.remove('active'); }
});

// ── Typed text ──────────────────────────────────────────────
const typedPhrases = [
  'QA Lead | 11+ Years',
  'Agile Lead | CSM',
  'AI Agent Builder',
  'Banking & FinTech QA Expert',
  'TOSCA Expert | 7 Certs',
  'QA Manager | AI Tester'
];
const typedEl = document.getElementById('typedText');
let tIdx = 0, tChar = 0, tDel = false;
function doType() {
  const cur = typedPhrases[tIdx];
  if (!tDel) {
    typedEl.textContent = cur.slice(0, ++tChar);
    if (tChar === cur.length) { tDel = true; setTimeout(doType, 2000); return; }
    setTimeout(doType, 60);
  } else {
    typedEl.textContent = cur.slice(0, --tChar);
    if (tChar === 0) { tDel = false; tIdx = (tIdx + 1) % typedPhrases.length; setTimeout(doType, 300); return; }
    setTimeout(doType, 35);
  }
}
doType();

// ── Particle Canvas ─────────────────────────────────────────
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  function resizeCanvas() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  for (let i = 0; i < 80; i++) {
    pts.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + 1
    });
  }
  function drawCanvas() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139,92,246,.35)';
      ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${.18 * (1 - d / 130)})`;
          ctx.lineWidth = .7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawCanvas);
  }
  drawCanvas();
}

// ── Scroll Reveal ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  });
}, { threshold: .12 });
revealEls.forEach(el => revObs.observe(el));

// ── Skill Bars ──────────────────────────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sbar-fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: .2 });
document.querySelectorAll('.sk-block').forEach(b => barObs.observe(b));

// ── Testimonials Slider ─────────────────────────────────────
const slider = document.getElementById('tslider');
const dotsWrap = document.getElementById('tdots');
const prev = document.getElementById('tPrev');
const next = document.getElementById('tNext');
if (slider) {
  const cards = slider.querySelectorAll('.tcard');
  let curr = 0;
  const total = Math.ceil(cards.length / 2);

  // Build dots
  for (let i = 0; i < total; i++) {
    const d = document.createElement('button');
    d.className = 'tdot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }

  function goTo(n) {
    curr = (n + total) % total;
    const cardW = cards[0].offsetWidth + 20;
    slider.style.transform = `translateX(-${curr * (cardW * 2 + 20)}px)`;
    dotsWrap.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('active', i === curr));
  }

  prev.addEventListener('click', () => goTo(curr - 1));
  next.addEventListener('click', () => goTo(curr + 1));

  // Auto advance
  let autoTimer = setInterval(() => goTo(curr + 1), 5000);
  [prev, next].forEach(b => {
    b.addEventListener('click', () => { clearInterval(autoTimer); autoTimer = setInterval(() => goTo(curr + 1), 5000); });
  });

  window.addEventListener('resize', () => goTo(curr));
}

// ── Contact Form ─────────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;

    function validate(id, errId, check, msg) {
      const el = document.getElementById(id);
      const err = document.getElementById(errId);
      if (!check(el.value.trim())) {
        el.classList.add('invalid'); err.textContent = msg; ok = false;
      } else {
        el.classList.remove('invalid'); err.textContent = '';
      }
    }

    validate('cfName', 'errName', v => v.length >= 2, 'Please enter your name');
    validate('cfEmail', 'errEmail', v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), 'Enter a valid email');
    validate('cfRole', 'errRole', v => v.length >= 3, 'Please describe the role');
    validate('cfMsg', 'errMsg', v => v.length >= 10, 'Message must be at least 10 characters');

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
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) { el.classList.remove('invalid'); }
    });
  });
}
