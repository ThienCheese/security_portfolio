const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

const capabilityData = {
  detect: { title: 'Detection logic', desc: 'Correlating endpoint, web, network, identity, and memory artifacts into explainable alerts.' },
  investigate: { title: 'Investigation workflow', desc: 'Building timelines from source telemetry to MITRE context and analyst-ready evidence.' },
  respond: { title: 'Response thinking', desc: 'Designing controlled containment paths such as notification, firewall block, file removal, and endpoint isolation.' },
  engineer: { title: 'Detection engineering', desc: 'Converting offensive behavior into rules, dashboards, detector logic, and visual playbooks.' }
};
document.querySelectorAll('.capability-node').forEach((node) => {
  node.addEventListener('click', () => {
    document.querySelectorAll('.capability-node').forEach((n) => n.classList.remove('active'));
    node.classList.add('active');
    const content = capabilityData[node.dataset.cap];
    const title = document.getElementById('cap-title');
    const desc = document.getElementById('cap-desc');
    if (content && title && desc) { title.textContent = content.title; desc.textContent = content.desc; }
  });
});

document.querySelectorAll('.diagram-node').forEach((node) => {
  node.addEventListener('click', () => {
    const diagram = node.closest('[data-diagram]');
    if (!diagram) return;
    diagram.querySelectorAll('.diagram-node').forEach((n) => n.classList.remove('active'));
    node.classList.add('active');
    const info = diagram.querySelector('.diagram-info');
    if (info) {
      const h = info.querySelector('h3');
      const p = info.querySelector('p');
      if (h) h.textContent = node.dataset.title || node.textContent.trim();
      if (p) p.textContent = node.dataset.desc || '';
    }
  });
});

document.querySelectorAll('.tab-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const root = button.closest('.scenario-tabs');
    if (!root) return;
    root.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
    root.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
    button.classList.add('active');
    const panel = root.querySelector(`#${button.dataset.tab}`);
    if (panel) panel.classList.add('active');
  });
});

const canvas = document.getElementById('noise-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const draw = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = `rgba(83, 229, 255, ${Math.random() * 0.25})`;
      ctx.fillRect(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 1, 1);
    }
  };
  draw();
  window.addEventListener('resize', draw);
  setInterval(draw, 2400);
}
