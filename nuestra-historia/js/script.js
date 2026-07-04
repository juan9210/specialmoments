/* NUESTRA HISTORIA - Logica completa */
(() => {
  'use strict';
  const CFG = window.NUESTRA_HISTORIA_CONFIG;
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  document.addEventListener('DOMContentLoaded', () => {
    injectConfig();
    buildTimeline();
    buildGallery();
    buildLetter();
    setupLoader();
    setupIntroKey();
    setupCustomCursor();
    setupParticles();
    setupPetals();
    setupStarrySky();
    setupControls();
    setupHeroButton();
    setupCountdown();
    setupQuoteReveal();
    setupLightbox();
    setupEnvelope();
    setupLoveCounter();
    setupClickHearts();
    setupTiltCards();
    setupAOS();
    setupSmoothScroll();
    setupSecretMessage();
    setupHeartRainOnEnd();
    setupCelebrateButton();
    setupKonamiCode();
  });

  function injectConfig(){
    $('#nameA').textContent = CFG.nameA;
    $('#nameB').textContent = CFG.nameB;
    $('#heroSubtitle').textContent = `Celebrando ${CFG.yearsTogether} anios de nuestra historia`;
    $('#finalMsg1').textContent = CFG.finalMessage;
    document.documentElement.style.setProperty('--hero-image', `url('${CFG.heroImage}')`);
    document.documentElement.style.setProperty('--final-image', `url('${CFG.finalImage}')`);
    $('#bgMusic').src = CFG.musicFile;
    if (CFG.soundEnvelope) $('#sfxEnvelope').src = CFG.soundEnvelope;
    if (CFG.soundChime) $('#sfxChime').src = CFG.soundChime;
    document.title = `${CFG.nameA} y ${CFG.nameB} - Nuestra Historia`;
  }

  function setupLoader(){
    const bar = $('#loaderProgress');
    const loader = $('#loader');
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) { p = 100; clearInterval(tick); setTimeout(hideLoader, 500); }
      bar.style.width = p + '%';
    }, 180);
    function hideLoader(){
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 1300);
    }
  }

  function setupIntroKey(){
    const intro = $('#introKey');
    const key = $('#floatingKey');
    const heart = $('#bigHeart');
    let opened = false;
    const openIntro = () => {
      if (opened) return; opened = true;
      key.classList.add('turning');
      setTimeout(() => {
        heart.classList.add('opening');
        setTimeout(() => {
          intro.classList.add('hidden');
          setTimeout(() => intro.remove(), 1000);
        }, 800);
      }, 800);
    };
    key.addEventListener('click', openIntro);
    key.addEventListener('touchstart', openIntro, { passive: true });
  }

  function setupCustomCursor(){
    if (!CFG.enableCustomCursor || matchMedia('(hover: none)').matches) {
      $('#cursorDot').style.display = 'none';
      $('#cursorRing').style.display = 'none';
      return;
    }
    const dot = $('#cursorDot');
    const ring = $('#cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0, scale = 1;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      if (Math.random() < 0.05) spawnCursorHeart(mx, my);
    });
    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${scale})`;
      requestAnimationFrame(animate);
    };
    animate();
    const grow = () => scale = 1.7;
    const shrink = () => scale = 1;
    setTimeout(() => {
      $$('button, a, .mas-item, .envelope, .fc-btn, .loveCounter').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    }, 500);
  }

  function spawnCursorHeart(x, y){
    const h = document.createElement('i');
    h.className = 'fa-solid fa-heart cursor-heart';
    h.style.left = x + 'px'; h.style.top = y + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 900);
  }

  function setupSmoothScroll(){
    if (window.gsap && window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('#heroBg', {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('#finalBg', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '#finalScene', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  }

  async function setupParticles(){
    if (!CFG.enableParticles || typeof tsParticles === 'undefined') return;
    try {
      await tsParticles.load('tsparticles', {
        fullScreen: { enable: false },
        background: { color: 'transparent' },
        fpsLimit: 60,
        particles: {
          number: { value: 45, density: { enable: true, area: 900 } },
          color: { value: ['#c9a96b','#e6c789','#fadadd','#ffffff','#f7e7ce'] },
          shape: { type: 'circle' },
          opacity: { value: { min: 0.15, max: 0.75 }, animation: { enable: true, speed: 0.5 } },
          size: { value: { min: 1, max: 5 } },
          move: { enable: true, speed: 0.6, direction: 'top', outModes: { default: 'out' } }
        },
        detectRetina: true
      });
    } catch(e){ console.warn('tsParticles no cargo:', e); }
  }

  function setupPetals(){
    if (!CFG.enablePetals) return;
    const icons = ['🌸','🌺','💗','✨','🦋','🌹'];
    const spawn = () => {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = icons[Math.floor(Math.random() * icons.length)];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
      p.style.animationDuration = (10 + Math.random() * 12) + 's';
      p.style.opacity = 0.7;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 22000);
    };
    setInterval(spawn, 1400);
    for (let i = 0; i < 5; i++) setTimeout(spawn, i * 400);
  }

  function setupStarrySky(){
    const cont = $('#bgStars');
    for (let i = 0; i < 90; i++){
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.width = s.style.height = (Math.random() * 2.2 + 0.6) + 'px';
      s.style.animationDelay = Math.random() * 3 + 's';
      cont.appendChild(s);
    }
  }

  function setupControls(){
    const audio = $('#bgMusic');
    const btn = $('#musicBtn');
    btn.addEventListener('click', toggleMusic);
    audio.addEventListener('play', () => btn.innerHTML = '<i class="fa-solid fa-pause"></i>');
    audio.addEventListener('pause', () => btn.innerHTML = '<i class="fa-solid fa-play"></i>');

    $('#themeBtn').addEventListener('click', () => {
      const isNight = document.body.classList.toggle('theme-night');
      document.body.classList.toggle('theme-day', !isNight);
      $('#themeBtn').innerHTML = isNight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });

    $('#fxBtn').addEventListener('click', () => {
      document.body.classList.toggle('fx-off');
      const off = document.body.classList.contains('fx-off');
      $('#fxBtn').innerHTML = off
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-wand-magic-sparkles"></i>';
    });
  }

  function toggleMusic(){
    const a = $('#bgMusic');
    if (a.paused){ a.volume = 0.6; a.play().catch(err => console.log('Musica requiere interaccion:', err)); }
    else a.pause();
  }

  function setupHeroButton(){
    const btn = $('#startBtn');
    btn.addEventListener('click', e => {
      makeRipple(btn, e);
      const audio = $('#bgMusic');
      audio.volume = 0;
      audio.play().then(() => {
        let v = 0;
        const fade = setInterval(() => {
          v += 0.05; audio.volume = Math.min(v, 0.65);
          if (v >= 0.65) clearInterval(fade);
        }, 100);
      }).catch(err => console.log('Musica bloqueada:', err));
      document.querySelector('.countdown-section').scrollIntoView({ behavior: 'smooth' });
    });
    $$('.btn-cinema').forEach(b => b.addEventListener('click', e => makeRipple(b, e)));
  }

  function makeRipple(btn, e){
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 800);
  }

  function setupCountdown(){
    const start = new Date(CFG.anniversaryDate.replace(' ', 'T'));
    const tick = () => {
      const now = new Date();
      let y = now.getFullYear() - start.getFullYear();
      let m = now.getMonth() - start.getMonth();
      let d = now.getDate() - start.getDate();
      let h = now.getHours() - start.getHours();
      let mi = now.getMinutes() - start.getMinutes();
      let s = now.getSeconds() - start.getSeconds();
      if (s < 0){ s += 60; mi--; }
      if (mi < 0){ mi += 60; h--; }
      if (h < 0){ h += 24; d--; }
      if (d < 0){
        const prev = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        d += prev; m--;
      }
      if (m < 0){ m += 12; y--; }
      $('#cdYears').textContent = y;
      $('#cdMonths').textContent = m;
      $('#cdDays').textContent = d;
      $('#cdHours').textContent = String(h).padStart(2, '0');
      $('#cdMinutes').textContent = String(mi).padStart(2, '0');
      $('#cdSeconds').textContent = String(s).padStart(2, '0');
    };
    tick();
    setInterval(tick, 1000);
  }

  function buildTimeline(){
    const cont = $('#timelineItems');
    CFG.timeline.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'tl-item';
      div.innerHTML = `
        <div class="tl-photo-wrap" data-aos="${item.anim}" data-aos-duration="1200">
          <img class="tl-photo" src="${item.image}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="tl-dot" data-aos="zoom-in"></div>
        <div class="tl-content" data-aos="${item.anim}" data-aos-delay="200">
          <div class="tl-year">${item.year}</div>
          <h3 class="tl-title">${item.title}</h3>
          <p class="tl-text">${item.text}</p>
        </div>`;
      cont.appendChild(div);
    });
  }

  function buildGallery(){
    const mas = $('#masonry');
    CFG.gallery.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'mas-item';
      div.setAttribute('data-aos', 'fade-up');
      div.setAttribute('data-aos-delay', (i % 4) * 100);
      div.innerHTML = `<img src="${src}" alt="Recuerdo ${i+1}" loading="lazy" data-index="${i}" />`;
      mas.appendChild(div);
    });
  }

  function setupLightbox(){
    const lb = $('#lightbox');
    const img = $('#lbImage');
    const imgs = CFG.gallery;
    let current = 0;
    setTimeout(() => {
      $$('.mas-item img').forEach(el => {
        el.addEventListener('click', () => {
          current = parseInt(el.dataset.index, 10);
          show();
        });
      });
    }, 300);
    $('#lbClose').addEventListener('click', hide);
    $('#lbPrev').addEventListener('click', () => { current = (current - 1 + imgs.length) % imgs.length; show(); });
    $('#lbNext').addEventListener('click', () => { current = (current + 1) % imgs.length; show(); });
    lb.addEventListener('click', e => { if (e.target === lb) hide(); });
    window.addEventListener('keydown', e => {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowRight') $('#lbNext').click();
      if (e.key === 'ArrowLeft') $('#lbPrev').click();
    });
    function show(){ img.src = imgs[current]; lb.classList.add('active'); }
    function hide(){ lb.classList.remove('active'); }
  }

  function buildLetter(){
    $('#paperText').textContent = CFG.letter;
  }

  function setupEnvelope(){
    const env = $('#envelope');
    env.addEventListener('click', () => {
      if (env.classList.contains('opened')) return;
      env.classList.add('opened');
      const sfx = $('#sfxEnvelope');
      if (sfx.src){ sfx.volume = 0.5; sfx.play().catch(()=>{}); }
      burstHearts(env);
    });
  }

  function burstHearts(el){
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 24; i++){
      const h = document.createElement('i');
      h.className = 'fa-solid fa-heart click-heart';
      h.style.left = cx + 'px'; h.style.top = cy + 'px';
      h.style.setProperty('--dx', (Math.random() * 260 - 130) + 'px');
      h.style.color = ['#6b1e2b','#c9a96b','#e6394d','#fadadd'][i % 4];
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1400);
    }
  }

  function setupLoveCounter(){
    if (!CFG.enableTeAmoCounter) return;
    const el = $('#loveCounter');
    const num = $('#loveNum');
    let count = parseInt(localStorage.getItem('nh_teamo') || '0', 10);
    let secretClicks = 0;
    num.textContent = count;
    el.addEventListener('click', () => {
      count++;
      num.textContent = count;
      localStorage.setItem('nh_teamo', count);
      el.classList.add('pop');
      setTimeout(() => el.classList.remove('pop'), 400);
      burstHearts(el);
      secretClicks++;
      if (secretClicks >= CFG.secretClicksKey){
        showSecret();
        secretClicks = 0;
      }
      setTimeout(() => secretClicks = Math.max(0, secretClicks - 1), 1500);
    });
  }

  function setupClickHearts(){
    if (!CFG.enableClickHearts) return;
    document.addEventListener('click', e => {
      if (e.target.closest('#envelope, #loveCounter, .fc-btn, button')) return;
      for (let i = 0; i < 5; i++){
        const h = document.createElement('i');
        h.className = 'fa-solid fa-heart click-heart';
        h.style.left = e.clientX + 'px'; h.style.top = e.clientY + 'px';
        h.style.setProperty('--dx', (Math.random() * 100 - 50) + 'px');
        h.style.color = ['#6b1e2b','#c9a96b','#e6394d','#fadadd'][i % 4];
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1400);
      }
    });
  }

  function setupAOS(){
    if (typeof AOS !== 'undefined'){
      AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic', offset: 80 });
    }
  }

  function setupTiltCards(){
    if (typeof VanillaTilt === 'undefined') return;
    setTimeout(() => {
      VanillaTilt.init(document.querySelectorAll('.tl-photo-wrap, .cd-item, .mas-item'), {
        max: 8, glare: true, 'max-glare': 0.15, speed: 500
      });
    }, 400);
  }

  function setupQuoteReveal(){
    const quotes = $$('.quote');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.done){
          entry.target.dataset.done = '1';
          revealLetters(entry.target);
        }
      });
    }, { threshold: 0.5 });
    quotes.forEach(q => obs.observe(q));
  }

  function revealLetters(el){
    const text = el.textContent;
    el.textContent = '';
    el.classList.add('tw');
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? '\u00a0' : ch;
      el.appendChild(s);
      setTimeout(() => s.classList.add('on'), i * 45);
    });
  }

  function setupSecretMessage(){
    setTimeout(showSecret, CFG.secretDelayMs);
    $('#secretClose').addEventListener('click', () => $('#secretModal').classList.remove('active'));
  }

  function showSecret(){
    const modal = $('#secretModal');
    if (modal.classList.contains('active')) return;
    modal.classList.add('active');
    burstHearts(modal);
  }

  function setupHeartRainOnEnd(){
    const scene = $('#finalScene');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) heartRain(); });
    }, { threshold: 0.4 });
    obs.observe(scene);
  }

  function heartRain(){
    for (let i = 0; i < 60; i++){
      setTimeout(() => {
        const h = document.createElement('div');
        h.className = 'petal';
        h.textContent = ['❤️','💗','💖','🌹','✨'][i % 5];
        h.style.left = Math.random() * 100 + 'vw';
        h.style.animationDuration = (5 + Math.random() * 6) + 's';
        h.style.fontSize = (1 + Math.random() * 1.4) + 'rem';
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 12000);
      }, i * 80);
    }
  }

  function setupCelebrateButton(){
    const btn = $('#celebrateBtn');
    btn.addEventListener('click', () => {
      launchFireworks(7000);
      heartRain();
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && !btn.dataset.fired){
          btn.dataset.fired = '1';
          launchFireworks(5000);
        }
      });
    }, { threshold: 0.6 });
    obs.observe($('#finalScene'));
  }

  function launchFireworks(duration = 5000){
    const cvs = $('#fireworks');
    const ctx = cvs.getContext('2d');
    const parent = cvs.parentElement;
    const resize = () => { cvs.width = parent.clientWidth; cvs.height = parent.clientHeight; };
    resize();
    window.addEventListener('resize', resize);
    let particles = [];
    const colors = ['#c9a96b','#e6c789','#e6394d','#fadadd','#ffffff','#f7e7ce','#ff8fa3'];
    let running = true;
    const endTime = performance.now() + duration;
    const spawnFirework = () => {
      const x = Math.random() * cvs.width;
      const y = Math.random() * cvs.height * 0.55 + 40;
      const n = 70 + Math.floor(Math.random() * 40);
      const col = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < n; i++){
        const angle = (Math.PI * 2 * i) / n + Math.random() * 0.2;
        const speed = Math.random() * 5 + 2.5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1, color: col,
          size: Math.random() * 2.5 + 1.2,
          decay: 0.008 + Math.random() * 0.015,
          gravity: 0.04
        });
      }
    };
    const spawnInterval = setInterval(() => {
      if (!running) return;
      spawnFirework();
      if (Math.random() > 0.5) setTimeout(spawnFirework, 250);
    }, 500);
    const animate = () => {
      ctx.fillStyle = 'rgba(20,10,15,0.18)';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.globalCompositeOperation = 'lighter';
      particles.forEach((p, idx) => {
        p.vy += p.gravity;
        p.x += p.vx; p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0){ particles.splice(idx, 1); return; }
        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';
      if (performance.now() < endTime || particles.length){
        requestAnimationFrame(animate);
      } else {
        running = false;
        clearInterval(spawnInterval);
        ctx.clearRect(0, 0, cvs.width, cvs.height);
      }
    };
    setTimeout(() => { running = false; clearInterval(spawnInterval); }, duration);
    animate();
  }

  function setupKonamiCode(){
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    window.addEventListener('keydown', e => {
      const k = e.key.toLowerCase();
      const expected = seq[idx].toLowerCase();
      if (k === expected){
        idx++;
        if (idx === seq.length){
          idx = 0;
          launchFireworks(6000);
          heartRain();
          showSecret();
        }
      } else { idx = 0; }
    });
  }

})();
