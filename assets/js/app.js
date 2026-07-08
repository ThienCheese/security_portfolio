
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const navToggle = $('.nav-toggle');
const navLinks = $('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => observer.observe(el));

const capData = {
  detect: ['Detection logic', 'Correlating Windows event logs, Sysmon-style telemetry, WAF alerts, vulnerability context, and runtime artifacts into explainable findings.'],
  investigate: ['Investigation workflow', 'Pivoting from alerts to evidence such as Event IDs, threat-intel enrichment, process behavior, memory regions, and firewall actions.'],
  respond: ['Controlled response', 'Demonstrating safe containment through endpoint isolation, IP blocking, file deletion, and analyst documentation.'],
  engineer: ['Detection engineering', 'Building rules, custom active-response actions, and behavioral tooling from red-team observations.']
};
$$('.capability-node').forEach(node => {
  node.addEventListener('click', () => {
    $$('.capability-node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');
    const key = node.dataset.cap;
    if (capData[key]) {
      const title = $('#cap-title');
      const desc = $('#cap-desc');
      if (title) title.textContent = capData[key][0];
      if (desc) desc.textContent = capData[key][1];
    }
  });
});

$$('.scenario-tabs').forEach(tabWrap => {
  const buttons = $$('.tab-btn', tabWrap);
  const panels = $$('.tab-panel', tabWrap);
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = $('#' + btn.dataset.tab, tabWrap);
      if (panel) panel.classList.add('active');
    });
  });
});

const diagram = $('[data-diagram="wazuh"]');
if (diagram) {
  const title = $('.diagram-info h3', diagram);
  const desc = $('.diagram-info p', diagram);
  $$('.diagram-node', diagram).forEach(node => {
    node.addEventListener('click', () => {
      $$('.diagram-node', diagram).forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      if (title) title.textContent = node.dataset.title || node.textContent;
      if (desc) desc.textContent = node.dataset.desc || '';
    });
  });
}

const glow = $('.cursor-glow');
if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

const canvas = $('#noise-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function drawNoise(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const shade = Math.random() * 24;
      imageData.data[i] = shade;
      imageData.data[i+1] = shade;
      imageData.data[i+2] = shade;
      imageData.data[i+3] = 12;
    }
    ctx.putImageData(imageData, 0, 0);
  }
  drawNoise();
  window.addEventListener('resize', drawNoise);
}
