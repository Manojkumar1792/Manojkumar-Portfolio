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

// ── Background music toggle ──────────────────────────
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
if (musicToggle && bgMusic) {
  bgMusic.volume = 0.25;
  const musicIco = musicToggle.querySelector('.music-ico');

  function setMusicState(playing) {
    musicToggle.classList.toggle('playing', playing);
    musicToggle.setAttribute('aria-pressed', String(playing));
    if (musicIco) musicIco.textContent = playing ? '🔊' : '🎵';
    localStorage.setItem('bgMusicPlaying', String(playing));
  }

  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
    } else {
      bgMusic.pause();
      setMusicState(false);
    }
  });

  // Resume automatically only if the visitor had music on earlier in this browser —
  // browsers still require a prior user gesture, so this quietly no-ops if blocked.
  if (localStorage.getItem('bgMusicPlaying') === 'true') {
    bgMusic.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
  }
}

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
  'AI Agent Engineer · 9 Production Systems',
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

// ── Code showcase minimize/expand ────────────────────
function expandShowcase(card) {
  if (!card) return;
  card.classList.remove('collapsed');
  const btn = card.querySelector('.cs-toggle');
  if (btn) {
    btn.textContent = '⌄ Minimize';
    btn.setAttribute('aria-expanded', 'true');
  }
}

const allShowcases = document.querySelectorAll('.code-showcase');
// Start every showcase collapsed so opening one doesn't look like "all agents expanded".
allShowcases.forEach(card => {
  if ('#' + card.id === window.location.hash) {
    expandShowcase(card); // a direct deep link should land already expanded
    return;
  }
  card.classList.add('collapsed');
  const btn = card.querySelector('.cs-toggle');
  if (btn) {
    btn.textContent = '⌃ Expand';
    btn.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('.cs-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.code-showcase');
    const collapsed = card.classList.toggle('collapsed');
    btn.textContent = collapsed ? '⌃ Expand' : '⌄ Minimize';
    btn.setAttribute('aria-expanded', String(!collapsed));
  });
});

// Clicking "View code showcase" expands only that agent's showcase, not every one.
document.querySelectorAll('.cs-view-link').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    expandShowcase(target);
  });
});

// "← Back to AI Work" links collapse the showcase they leave, for a clean re-visit.
document.querySelectorAll('.code-showcase a[href="#ai-agents"]').forEach(link => {
  link.addEventListener('click', () => {
    const card = link.closest('.code-showcase');
    if (!card) return;
    card.classList.add('collapsed');
    const btn = card.querySelector('.cs-toggle');
    if (btn) {
      btn.textContent = '⌃ Expand';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

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

// ── FAQ Chat Bot ──────────────────────────────────────
const chatbot = document.getElementById('chatbot');
if (chatbot) {
  const toggle = document.getElementById('chatbotToggle');
  const closeBtn = document.getElementById('chatbotClose');
  const body = document.getElementById('chatbotBody');
  const chipsWrap = document.getElementById('chatbotChips');
  const chatForm = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');

  const faq = {
    skills: "QA Leadership, QA Strategy & Governance, AI Agent Engineering, and AI-Augmented Testing — backed by 7× Tricentis TOSCA certification, CSM Scrum certification, Playwright automation, and prompt engineering / GenAI workflows.",
    agents: "9 production AI agents engineered and shipped into live enterprise workflows — including the NSSPAR Playwright Agent, which replaced Tricentis TOSCA for a key testing workflow.",
    experience: "11+ years in Banking & FinTech QA at Fiserv, hands-on leading a 12-member Agile squad, owning QA strategy, UAT coordination, and release governance across 3 major banking releases.",
    contact: "Best via the Contact form below, or email mkmanojmsc@gmail.com / connect on LinkedIn — both linked in the Contact section.",
    certifications: "7× Tricentis TOSCA certified (AS1, AS2, AE1, TDS1, TDS2, TQM, TA1) and CSM certified Scrum practitioner.",
    resume: "Role-specific resumes are linked at the bottom of the Contact section — QA Lead, QA Manager, AI Engineer, and AI Tester versions.",
    education: "Details are in the Education section further down the page, alongside certifications and key achievements."
  };

  function addMsg(text, who) {
    const div = document.createElement('div');
    div.className = 'cb-msg ' + (who === 'user' ? 'cb-user' : 'cb-bot');
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function answerFor(raw) {
    const q = raw.toLowerCase();
    if (/skill/.test(q)) return faq.skills;
    if (/agent|ai work|automat/.test(q)) return faq.agents;
    if (/experience|year|fiserv|work history/.test(q)) return faq.experience;
    if (/contact|email|reach|linkedin/.test(q)) return faq.contact;
    if (/cert/.test(q)) return faq.certifications;
    if (/resume|cv/.test(q)) return faq.resume;
    if (/education|degree|study/.test(q)) return faq.education;
    return "I'm just a simple FAQ bot — try asking about skills, AI agents, experience, certifications, or how to get in touch. You can also scroll down to explore the full portfolio.";
  }

  toggle.addEventListener('click', () => chatbot.classList.toggle('open'));
  closeBtn.addEventListener('click', () => chatbot.classList.remove('open'));
  document.addEventListener('click', e => {
    if (!chatbot.contains(e.target)) chatbot.classList.remove('open');
  });

  chipsWrap.addEventListener('click', e => {
    const chip = e.target.closest('.cb-chip');
    if (!chip) return;
    const key = chip.dataset.q;
    addMsg(chip.textContent, 'user');
    setTimeout(() => addMsg(faq[key] || answerFor(key), 'bot'), 300);
  });

  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    addMsg(val, 'user');
    input.value = '';
    setTimeout(() => addMsg(answerFor(val), 'bot'), 300);
  });
}

