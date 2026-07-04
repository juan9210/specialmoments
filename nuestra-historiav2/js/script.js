/* ═══════════════════════════════════════════════════════
   NUESTRA HISTORIA v2.0 - Lógica completa
   Juan y Amgie - 6 años de amor
═══════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const CFG = window.NUESTRA_HISTORIA_CONFIG;
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  document.addEventListener('DOMContentLoaded', () => {
    injectConfig();
    buildTimeline();
    buildGallery();
    buildStats();
    buildReasons();
    buildPromises();
    buildLetter();
    setupLoader();
    setupIntroKey();
    setupCustomCursor();
    setupParallax();
    setupPetals();
    setupStars();
    setupControls();
    setupHeroButton();
    setupCountdown();
    setupLightbox();
    setupEnvelope();
    setupLoveCounter();
    setupClickHearts();
    setupTiltCards();
    setupAOS();
    setupTimelineReveal();
    setupReasonsFlip();
    setupSongPlayer();
    setupSecretMessage();
    setupHeartRainOnEnd();
    setupCelebrateButton();
    setupKonamiCode();
  });

  /* ═══════ CONFIG INJECT ═══════ */
  function injectConfig(){
    $('#nameA').textContent = CFG.nameA;
    $('#nameB').textContent = CFG.nameB;
    $('#heroSubtitle').textContent = `Celebrando ${CFG.yearsTogether} años de nuestra historia`;
    $('#finalMsg1').textContent = CFG.finalMessage;
    $('#songTitle').textContent = CFG.songTitle || 'Nuestra Canción';
    $('#songArtist').textContent = CFG.songArtist || '';
    $('#anniYear').textContent = new Date().getFullYear();
    $('#bgMusic').src = CFG.musicFile;
    document.title = `${CFG.nameA} y ${CFG.nameB} - Nuestra Historia`;
  }

  /* ═══════ LOADER ═══════ */
  function setupLoader(){
    const bar = $('#loaderProgress'), loader = $('#loader');
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100){ p = 100; clearInterval(tick); setTimeout(() => { loader.classList.add('hidden'); setTimeout(() => loader.remove(), 1200); }, 500); }
      bar.style.width = p + '%';
    }, 180);
  }

  /* ═══════ INTRO KEY ═══════ */
  function setupIntroKey(){
    const intro = $('#introKey'), key = $('#floatingKey'), heart = $('#bigHeart');
    let opened = false;
    const open = () => {
      if (opened) return; opened = true;
      key.classList.add('turning');
      setTimeout(() => {
        heart.classList.add('opening');
        setTimeout(() => { intro.classList.add('hidden'); setTimeout(() => intro.remove(), 1000); }, 800);
      }, 800);
    };
    key.addEventListener('click', open);
    key.addEventListener('touchstart', open, {passive:true});
  }

  /* ═══════ CURSOR ═══════ */
  function setupCustomCursor(){
    if (!CFG.enableCustomCursor || matchMedia('(hover: none)').matches){
      $('#cursorDot').style.display = 'none';
      $('#cursorRing').style.display = 'none';
      return;
    }
    const dot = $('#cursorDot'), ring = $('#cursorRing');
    let mx=0, my=0, rx=0, ry=0, scale=1;
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
    setTimeout(() => {
      $$('button, a, .mas-item, .envelope, .fc-btn, .loveCounter, .reason-card').forEach(el => {
        el.addEventListener('mouseenter', () => scale = 1.7);
        el.addEventListener('mouseleave', () => scale = 1);
      });
    }, 500);
  }

  function spawnCursorHeart(x, y){
    const h = document.createElement('i');
    h.className = 'fa-solid fa-heart cursor-heart';
    h.style.left = x+'px'; h.style.top = y+'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 900);
  }

  /* ═══════ PARALLAX ═══════ */
  function setupParallax(){
    if (window.gsap && window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.hero-ring').forEach((el, i) => {
        gsap.to(el, {
          y: (i+1) * 30, ease:'none',
          scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:true }
        });
      });
    }
  }

  /* ═══════ PÉTALOS ═══════ */
  function setupPetals(){
    if (!CFG.enablePetals) return;
    const icons = ['🌸','🌺','💗','✨','🦋','🌹','💕','⭐'];
    const spawn = () => {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = icons[Math.floor(Math.random()*icons.length)];
      p.style.left = Math.random()*100 + 'vw';
      p.style.fontSize = (0.9 + Math.random()*1.2) + 'rem';
      p.style.animationDuration = (10 + Math.random()*12) + 's';
      p.style.opacity = 0.7;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 22000);
    };
    setInterval(spawn, 1200);
    for (let i=0; i<6; i++) setTimeout(spawn, i*300);
  }

  /* ═══════ ESTRELLAS ═══════ */
  function setupStars(){
    const c = $('#bgStars');
    for (let i=0; i<90; i++){
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random()*100 + 'vw';
      s.style.top = Math.random()*100 + 'vh';
      s.style.width = s.style.height = (Math.random()*2.2 + 0.6) + 'px';
      s.style.animationDelay = Math.random()*3 + 's';
      c.appendChild(s);
    }
  }

  /* ═══════ CONTROLES ═══════ */
  function setupControls(){
    const audio = $('#bgMusic'), mBtn = $('#musicBtn');
    mBtn.addEventListener('click', () => {
      if (audio.paused){ audio.volume = 0.6; audio.play().catch(()=>{}); }
      else audio.pause();
    });
    audio.addEventListener('play', () => {
      mBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      $('#vinyl').classList.add('playing');
      $('#songPlayBtn').innerHTML = '<i class="fa-solid fa-pause"></i>';
    });
    audio.addEventListener('pause', () => {
      mBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      $('#vinyl').classList.remove('playing');
      $('#songPlayBtn').innerHTML = '<i class="fa-solid fa-play"></i>';
    });

    $('#themeBtn').addEventListener('click', () => {
      const night = document.body.classList.toggle('theme-night');
      document.body.classList.toggle('theme-day', !night);
      $('#themeBtn').innerHTML = night ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
    $('#fxBtn').addEventListener('click', () => {
      const off = document.body.classList.toggle('fx-off');
      $('#fxBtn').innerHTML = off ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-wand-magic-sparkles"></i>';
    });
  }

  /* ═══════ BOTÓN HERO ═══════ */
  function setupHeroButton(){
    const btn = $('#startBtn');
    btn.addEventListener('click', e => {
      makeRipple(btn, e);
      const a = $('#bgMusic');
      a.volume = 0;
      a.play().then(() => {
        let v = 0;
        const f = setInterval(() => { v += 0.05; a.volume = Math.min(v, 0.65); if (v >= 0.65) clearInterval(f); }, 100);
      }).catch(()=>{});
      document.querySelector('.countdown-section').scrollIntoView({behavior:'smooth'});
    });
    $$('.btn-cinema').forEach(b => b.addEventListener('click', e => makeRipple(b, e)));
  }

  function makeRipple(btn, e){
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size+'px';
    r.style.left = (e.clientX - rect.left - size/2)+'px';
    r.style.top = (e.clientY - rect.top - size/2)+'px';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 800);
  }

  /* ═══════ CONTADOR ═══════ */
  function setupCountdown(){
    const start = new Date(CFG.anniversaryDate.replace(' ','T'));
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
      if (d < 0){ d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); m--; }
      if (m < 0){ m += 12; y--; }
      $('#cdYears').textContent = y;
      $('#cdMonths').textContent = m;
      $('#cdDays').textContent = d;
      $('#cdHours').textContent = String(h).padStart(2,'0');
      $('#cdMinutes').textContent = String(mi).padStart(2,'0');
      $('#cdSeconds').textContent = String(s).padStart(2,'0');
    };
    tick(); setInterval(tick, 1000);
  }

  /* ═══════ TIMELINE ═══════ */
  function buildTimeline(){
    const c = $('#timelineItems');
    CFG.timeline.forEach(item => {
      const div = document.createElement('div');
      div.className = 'tl-item';
      div.innerHTML = `
        <div class="tl-photo-wrap">
          <img class="tl-photo" src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="tl-dot"></div>
        <div class="tl-content">
          <span class="tl-moment">${item.moment}</span>
          <div class="tl-year">${item.year}</div>
          <h3 class="tl-title">${item.title}</h3>
          <p class="tl-text">${item.text}</p>
        </div>`;
      c.appendChild(div);
    });
  }

  function setupTimelineReveal(){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold: 0.15});
    $$('.tl-item').forEach(el => obs.observe(el));
  }

  /* ═══════ GALERÍA ═══════ */
  function buildGallery(){
    const m = $('#masonry');
    CFG.gallery.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'mas-item';
      div.setAttribute('data-aos', 'fade-up');
      div.setAttribute('data-aos-delay', (i % 4) * 100);
      const cap = (CFG.galleryCaptions && CFG.galleryCaptions[i]) || '';
      div.innerHTML = `<img src="${src}" alt="${cap}" loading="lazy" data-index="${i}" data-caption="${cap}">`;
      m.appendChild(div);
    });
  }

  /* ═══════ STATS ═══════ */
  function buildStats(){
    const c = $('#statsGrid');
    (CFG.stats || []).forEach((s, i) => {
      const div = document.createElement('div');
      div.className = 'stat-item';
      div.setAttribute('data-aos', 'fade-up');
      div.setAttribute('data-aos-delay', i * 100);
      div.innerHTML = `
        <div class="stat-icon"><i class="fa-solid ${s.icon}"></i></div>
        <div class="stat-number">${s.number}</div>
        <div class="stat-label">${s.label}</div>`;
      c.appendChild(div);
    });
  }

  /* ═══════ RAZONES ═══════ */
  function buildReasons(){
    const c = $('#reasonsGrid');
    (CFG.reasons || []).forEach((r, i) => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      card.setAttribute('data-aos', 'zoom-in');
      card.setAttribute('data-aos-delay', (i % 6) * 80);
      card.innerHTML = `
        <div class="reason-inner">
          <div class="reason-front">
            <i class="fa-solid fa-heart"></i>
            <span>${r.title}</span>
          </div>
          <div class="reason-back">
            <p>${r.text}</p>
          </div>
        </div>`;
      c.appendChild(card);
    });
  }

  function setupReasonsFlip(){
    setTimeout(() => {
      $$('.reason-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
      });
    }, 400);
  }

  /* ═══════ PROMESAS ═══════ */
  function buildPromises(){
    const c = $('#promisesList');
    (CFG.promises || []).forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'promise-item';
      div.setAttribute('data-aos', 'fade-right');
      div.setAttribute('data-aos-delay', i * 80);
      div.innerHTML = `
        <div class="promise-num">${i+1}</div>
        <p class="promise-text">${p}</p>`;
      c.appendChild(div);
    });
  }

  /* ═══════ LIGHTBOX ═══════ */
  function setupLightbox(){
    const lb = $('#lightbox'), img = $('#lbImage'), cap = $('#lbCaption'), imgs = CFG.gallery;
    let cur = 0;
    setTimeout(() => {
      $$('.mas-item img').forEach(el => {
        el.addEventListener('click', () => { cur = parseInt(el.dataset.index); show(); });
      });
    }, 300);
    $('#lbClose').addEventListener('click', hide);
    $('#lbPrev').addEventListener('click', () => { cur = (cur-1+imgs.length)%imgs.length; show(); });
    $('#lbNext').addEventListener('click', () => { cur = (cur+1)%imgs.length; show(); });
    lb.addEventListener('click', e => { if (e.target === lb) hide(); });
    window.addEventListener('keydown', e => {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowRight') $('#lbNext').click();
      if (e.key === 'ArrowLeft') $('#lbPrev').click();
    });
    function show(){
      img.src = imgs[cur];
      cap.textContent = (CFG.galleryCaptions && CFG.galleryCaptions[cur]) || '';
      lb.classList.add('active');
    }
    function hide(){ lb.classList.remove('active'); }
  }

  /* ═══════ CARTA ═══════ */
  function buildLetter(){ $('#paperText').textContent = CFG.letter; }
  function setupEnvelope(){
    const env = $('#envelope');
    env.addEventListener('click', () => {
      if (env.classList.contains('opened')) return;
      env.classList.add('opened');
      burstHearts(env);
    });
  }

  function burstHearts(el){
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    for (let i=0; i<24; i++){
      const h = document.createElement('i');
      h.className = 'fa-solid fa-heart click-heart';
      h.style.left = cx+'px'; h.style.top = cy+'px';
      h.style.setProperty('--dx', (Math.random()*260-130)+'px');
      h.style.color = ['#6b1e2b','#c9a96b','#e6394d','#fadadd'][i%4];
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1400);
    }
  }

  /* ═══════ LOVE COUNTER ═══════ */
  function setupLoveCounter(){
    if (!CFG.enableTeAmoCounter) return;
    const el = $('#loveCounter'), num = $('#loveNum');
    let count = parseInt(localStorage.getItem('nh_teamo')||'0');
    let sc = 0;
    num.textContent = count;
    el.addEventListener('click', () => {
      count++; num.textContent = count;
      localStorage.setItem('nh_teamo', count);
      el.classList.add('pop');
      setTimeout(() => el.classList.remove('pop'), 400);
      burstHearts(el);
      sc++;
      if (sc >= CFG.secretClicksKey){ showSecret(); sc = 0; }
      setTimeout(() => sc = Math.max(0, sc-1), 1500);
    });
  }

  /* ═══════ CLICK HEARTS ═══════ */
  function setupClickHearts(){
    if (!CFG.enableClickHearts) return;
    document.addEventListener('click', e => {
      if (e.target.closest('#envelope, #loveCounter, .fc-btn, button, .reason-card')) return;
      for (let i=0; i<5; i++){
        const h = document.createElement('i');
        h.className = 'fa-solid fa-heart click-heart';
        h.style.left = e.clientX+'px'; h.style.top = e.clientY+'px';
        h.style.setProperty('--dx', (Math.random()*100-50)+'px');
        h.style.color = ['#6b1e2b','#c9a96b','#e6394d','#fadadd'][i%4];
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1400);
      }
    });
  }

  /* ═══════ AOS + TILT ═══════ */
  function setupAOS(){
    if (typeof AOS !== 'undefined') AOS.init({ duration:1000, once:true, easing:'ease-out-cubic', offset:80 });
  }
  function setupTiltCards(){
    if (typeof VanillaTilt === 'undefined' || window.innerWidth < 700) return;
    setTimeout(() => {
      VanillaTilt.init(document.querySelectorAll('.tl-photo-wrap, .cd-item, .mas-item, .stat-item'), {
        max:8, glare:true, 'max-glare':0.15, speed:500
      });
    }, 400);
  }

  /* ═══════ SONG PLAYER ═══════ */
  function setupSongPlayer(){
    $('#songPlayBtn').addEventListener('click', () => {
      const a = $('#bgMusic');
      if (a.paused){ a.volume = 0.6; a.play().catch(()=>{}); }
      else a.pause();
    });
  }

  /* ═══════ SECRETO ═══════ */
  function setupSecretMessage(){
    setTimeout(showSecret, CFG.secretDelayMs);
    $('#secretClose').addEventListener('click', () => $('#secretModal').classList.remove('active'));
  }
  function showSecret(){
    const m = $('#secretModal');
    if (m.classList.contains('active')) return;
    m.classList.add('active');
    burstHearts(m);
  }

  /* ═══════ HEART RAIN ═══════ */
  function setupHeartRainOnEnd(){
    const scene = $('#finalScene');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) heartRain(); });
    }, {threshold: 0.4});
    obs.observe(scene);
  }
  function heartRain(){
    for (let i=0; i<70; i++){
      setTimeout(() => {
        const h = document.createElement('div');
        h.className = 'petal';
        h.textContent = ['❤️','💗','💖','🌹','✨','💕'][i%6];
        h.style.left = Math.random()*100+'vw';
        h.style.animationDuration = (5+Math.random()*6)+'s';
        h.style.fontSize = (1+Math.random()*1.4)+'rem';
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 12000);
      }, i*70);
    }
  }

  /* ═══════ FIREWORKS ═══════ */
  function setupCelebrateButton(){
    const btn = $('#celebrateBtn');
    btn.addEventListener('click', () => { launchFireworks(7000); heartRain(); });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && !btn.dataset.fired){ btn.dataset.fired='1'; launchFireworks(5000); }
      });
    }, {threshold: 0.6});
    obs.observe($('#finalScene'));
  }

  function launchFireworks(duration=5000){
    const cvs = $('#fireworks'), ctx = cvs.getContext('2d'), parent = cvs.parentElement;
    const resize = () => { cvs.width = parent.clientWidth; cvs.height = parent.clientHeight; };
    resize(); window.addEventListener('resize', resize);
    let particles = [];
    const colors = ['#c9a96b','#e6c789','#e6394d','#fadadd','#ffffff','#f7e7ce','#ff8fa3'];
    let running = true;
    const end = performance.now() + duration;
    const spawn = () => {
      const x = Math.random()*cvs.width;
      const y = Math.random()*cvs.height*0.55 + 40;
      const n = 70 + Math.floor(Math.random()*40);
      const col = colors[Math.floor(Math.random()*colors.length)];
      for (let i=0; i<n; i++){
        const ang = (Math.PI*2*i)/n + Math.random()*0.2;
        const sp = Math.random()*5 + 2.5;
        particles.push({
          x, y,
          vx: Math.cos(ang)*sp, vy: Math.sin(ang)*sp,
          alpha:1, color:col,
          size: Math.random()*2.5+1.2,
          decay: 0.008+Math.random()*0.015,
          gravity: 0.04
        });
      }
    };
    const iv = setInterval(() => {
      if (!running) return;
      spawn();
      if (Math.random() > 0.5) setTimeout(spawn, 250);
    }, 500);
    const animate = () => {
      ctx.fillStyle = 'rgba(20,10,15,0.18)';
      ctx.fillRect(0,0,cvs.width,cvs.height);
      ctx.globalCompositeOperation = 'lighter';
      particles.forEach((p, idx) => {
        p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.alpha -= p.decay;
        if (p.alpha <= 0){ particles.splice(idx,1); return; }
        ctx.beginPath();
        ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
        ctx.shadowBlur = 12; ctx.shadowColor = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over';
      if (performance.now() < end || particles.length) requestAnimationFrame(animate);
      else { running = false; clearInterval(iv); ctx.clearRect(0,0,cvs.width,cvs.height); }
    };
    setTimeout(() => { running = false; clearInterval(iv); }, duration);
    animate();
  }

  /* ═══════ KONAMI ═══════ */
  function setupKonamiCode(){
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    window.addEventListener('keydown', e => {
      const k = e.key.toLowerCase();
      if (k === seq[idx].toLowerCase()){
        idx++;
        if (idx === seq.length){ idx = 0; launchFireworks(6000); heartRain(); showSecret(); }
      } else idx = 0;
    });
  }

})();
