(function () {
  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Copy buttons (citations, email)
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var label = btn.textContent;
      var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = label; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
      } else { fallback(text); done(); }
    });
  });
  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  // Project filters
  var filterBtns = document.querySelectorAll('.filters button');
  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      filterBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      document.querySelectorAll('[data-cat]').forEach(function (el) {
        var cats = el.getAttribute('data-cat').split(' ');
        el.classList.toggle('hidden', f !== 'all' && cats.indexOf(f) === -1);
      });
      document.querySelectorAll('[data-group]').forEach(function (g) {
        var visible = g.querySelectorAll('[data-cat]:not(.hidden)').length > 0;
        g.classList.toggle('hidden', !visible);
      });
    });
  });

  // Constellation background: nodes drift slowly and link when close (neural net / star map)
  var canvases = document.querySelectorAll('canvas.sky');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  canvases.forEach(function (c) {
    var ctx = c.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pts = [], w = 0, h = 0;
    function size() {
      var r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, (w * h) / 11000));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, r: Math.random() * 1.4 + .4, gold: Math.random() < .08 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 13000) {
            ctx.strokeStyle = 'rgba(140,182,236,' + (0.16 * (1 - d / 13000)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      for (var k = 0; k < pts.length; k++) {
        var s = pts[k];
        ctx.fillStyle = s.gold ? 'rgba(224,164,58,.9)' : 'rgba(220,232,250,.75)';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.gold ? s.r + .8 : s.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    function step() {
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
      }
      draw();
      requestAnimationFrame(step);
    }
    size(); draw();
    window.addEventListener('resize', function () { size(); draw(); });
    if (!reduce) requestAnimationFrame(step);
  });
})();

// Certificate lightbox
(function () {
  var dlg = document.getElementById('lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var img = document.getElementById('lb-img'), title = document.getElementById('lb-title');
  document.querySelectorAll('.cert-thumb').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      img.src = a.getAttribute('data-full');
      img.alt = a.getAttribute('data-title') + ' certificate';
      title.textContent = a.getAttribute('data-title');
      dlg.showModal();
    });
  });
  document.getElementById('lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();
