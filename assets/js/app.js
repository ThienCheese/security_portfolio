const root = document.documentElement;
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
  detect: {
    title: 'Detection logic',
    desc: 'Correlating Windows event logs, Sysmon-style telemetry, WAF alerts, vulnerability context, and memory/thread artifacts into explainable security findings.'
  },
  investigate: {
    title: 'Investigation workflow',
    desc: 'Building timelines from source event to alert, mapping evidence to MITRE ATT&CK, and documenting why the signal matters to an analyst.'
  },
  respond: {
    title: 'Response thinking',
    desc: 'Using controlled response paths such as notification, firewall block, file removal, and endpoint isolation while considering false positives and rollback.'
  },
  engineer: {
    title: 'Detection engineering',
    desc: 'Designing rules, detector logic, and architecture diagrams that convert red-team behavior into blue-team monitoring and containment capabilities.'
  }
};

document.querySelectorAll('.capability-node').forEach((node) => {
  node.addEventListener('click', () => {
    document.querySelectorAll('.capability-node').forEach((n) => n.classList.remove('active'));
    node.classList.add('active');
    const content = capabilityData[node.dataset.cap];
    const title = document.getElementById('cap-title');
    const desc = document.getElementById('cap-desc');
    if (content && title && desc) {
      title.textContent = content.title;
      desc.textContent = content.desc;
    }
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
      info.querySelector('h3').textContent = node.dataset.title || node.textContent.trim();
      info.querySelector('p').textContent = node.dataset.desc || '';
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

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      const original = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = original; }, 1300);
    } catch (error) {
      button.textContent = 'Copy manually';
    }
  });
});

const canvas = document.getElementById('noise-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const draw = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const alpha = Math.random() * 0.25;
      ctx.fillStyle = `rgba(83, 229, 255, ${alpha})`;
      ctx.fillRect(x, y, 1, 1);
    }
  };
  draw();
  window.addEventListener('resize', draw);
  setInterval(draw, 2400);
}
