/* ═══════════════════════════════════════════════════════
   NUESTRA HISTORIA v3.0 - PRO
   Con manejo de errores robusto y fallbacks
═══════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // Fallback si CFG no existe
  if (!window.NUESTRA_HISTORIA_CONFIG){
    console.error('CONFIG no cargado');
    document.body.innerHTML = '<div style="padding:2rem;text-align:center;font-family:sans-serif"><h1>Error al cargar configuración</h1><p>Verifica que config.js exista.</p></div>';
    return;
  }

  const CFG = window.NUESTRA_HISTORIA_CONFIG;
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // Función safe wrapper
  function safe(fn, name){
    return function(){
      try { return fn.apply(this, arguments); }
      catch(e){ console.warn(`Error en ${name}:`, e); }
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    safe(injectConfig, 'injectConfig')();
    safe(buildTimeline, 'buildTimeline')();
    safe(buildGallery, 'buildGallery')();
    safe(buildStats, 'buildStats')();
    safe(buildReasons, 'buildReasons')();
    safe(buildPromises, 'buildPromises')();
    safe(buildLetter, 'buildLetter')();
    safe(setupLoader, 'setupLoader')();
    safe(setupIntroKey, 'setupIntroKey')();
    safe(setupCustomCursor, 'setupCustomCursor')();
    safe(setupPetals, 'setupPetals')();
    safe(setupStars, 'setupStars')();
    safe(setupControls, 'setupControls')();
    safe(setupHeroButton, 'setupHeroButton')();
    safe(setupCountdown, 'setupCountdown')();
    safe(setupLightbox, 'setupLightbox')();
    safe(setupEnvelope, 'setupEnvelope')();
    safe(setupLoveCounter, 'setupLoveCounter')();
    safe(setupClickHearts, 'setupClickHearts')();
    safe(setupTimelineReveal, 'setupTimelineReveal')();
    safe(setupReasonsFlip, 'setupReasonsFlip')();
    safe(setupSongPlayer, 'setupSongPlayer')();
    safe(setupSecretMessage, 'setupSecretMessage')();
    safe(setupHeartRainOnEnd, 'setupHeartRainOnEnd')();
    safe(setupCelebrateButton, 'setupCelebrateButton')();
    safe(setupKonamiCode, 'setupKonamiCode')();
    safe(setupIOSHint, 'setupIOSHint')();
    // Después de 500ms setup GSAP y Tilt (por defer)
    setTimeout(() => {
      safe(setupParallax, 'setupParallax')();
      safe(setupTiltCards, 'setupTiltCards')();
    }, 500);
  });

  function injectConfig(){
    const el = id => $('#'+id);
    if (el('nameA')) el('nameA').textContent = CFG.nameA;
    if (el('nameB')) el('nameB').textContent = CFG.nameB;
    if (el('heroSubtitle')) el('heroSubtitle').textContent = `Celebrando ${CFG.yearsTogether} años de nuestra historia`;
    if (el('finalMsg1')) el('finalMsg1').textContent = CFG.finalMessage;
    if (el('songTitle')) el('songTitle').textContent = CFG.songTitle || 'Nuestra Canción';
    if (el('songArtist')) el('songArtist').textContent = CFG.songArtist || '';
    if (el('anniYear')) el('anniYear').textContent = new Date().getFullYear();
    if (el('fYear')) el('fYear').textContent = new Date().getFullYear();
    if (el('bgMusic')) el('bgMusic').src = CFG.musicFile;
    document.title = `${CFG.nameA} y ${CFG.nameB} - Nuestra Historia`;
  }

  function setupLoader(){
    const bar = $('#loaderProgress'), loader = $('#loader');
    if (!bar || !loader) return;
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100){
        p = 100; clearInterval(tick);
        setTimeout(() => {
          loader.classList.add('hidden');
          setTimeout(() => loader.remove(), 1200);
        }, 500);
      }
      bar.style.width = p + '%';
    }, 180);
    // Failsafe
    setTimeout(() => {
      if (loader && loader.parentNode){
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 1000);
      }
    }, 8000);
  }

  function setupIntroKey(){
    const intro = $('#introKey'), key = $('#floatingKey'), heart = $('#bigHeart');
    if (!intro || !key || !heart) return;
    let opened = false;
    const open = () => {
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
    key.addEventListener('click', open);
    key.addEventListener('touchstart', open, {passive:true});
    // Failsafe: si no se hace nada en 12s, cerrar
    setTimeout(() => {
      if (!opened && intro && intro.parentNode){
        intro.classList.add('hidden');
        setTimeout(() => intro.remove(), 1000);
      }
    }, 12000);
  }

  function setupCustomCursor(){
    if (!CFG.enableCustomCursor || matchMedia('(hover: none)').matches){
      const d = $('#cursorDot'), r = $('#cursorRing');
      if (d) d.style.display = 'none';
      if (r) r.style.display = 'none';
      return;
    }
    const dot = $('#cursorDot'), ring = $('#cursorRing');
    if (!dot || !ring) return;
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

  function setupParallax(){
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    try {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.hero-ring').forEach((el, i) => {
        gsap.to(el, {
          y: (i+1) * 30, ease:'none',
          scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:true }
        });
      });
    } catch(e){ console.warn('Parallax skipped:', e); }
  }

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

  function setupStars(){
    const c = $('#bgStars');
    if (!c) return;
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

  function setupControls(){
    const audio = $('#bgMusic'), mBtn = $('#musicBtn');
    if (mBtn && audio){
      mBtn.addEventListener('click', () => {
        if (audio.paused){ audio.volume = 0.6; audio.play().catch(()=>{}); }
        else audio.pause();
      });
      audio.addEventListener('play', () => {
        mBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        const v = $('#vinyl'); if (v) v.classList.add('playing');
        const s = $('#songPlayBtn'); if (s) s.innerHTML = '<i class="fa-solid fa-pause"></i>';
      });
      audio.addEventListener('pause', () => {
        mBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        const v = $('#vinyl'); if (v) v.classList.remove('playing');
        const s = $('#songPlayBtn'); if (s) s.innerHTML = '<i class="fa-solid fa-play"></i>';
      });
    }
    const tBtn = $('#themeBtn');
    if (tBtn){
      tBtn.addEventListener('click', () => {
        const night = document.body.classList.toggle('theme-night');
        document.body.classList.toggle('theme-day', !night);
        tBtn.innerHTML = night ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        const tc = document.querySelector('meta[name="theme-color"]');
        if (tc) tc.setAttribute('content', night ? '#1a1016' : '#6b1e2b');
      });
    }
    const fBtn = $('#fxBtn');
    if (fBtn){
      fBtn.addEventListener('click', () => {
        const off = document.body.classList.toggle('fx-off');
        fBtn.innerHTML = off ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-wand-magic-sparkles"></i>';
      });
    }
  }

  function setupHeroButton(){
    const btn = $('#startBtn');
    if (!btn) return;
    btn.addEventListener('click', e => {
      makeRipple(btn, e);
      const a = $('#bgMusic');
      if (a){
        a.volume = 0;
        a.play().then(() => {
          let v = 0;
          const f = setInterval(() => { v += 0.05; a.volume = Math.min(v, 0.65); if (v >= 0.65) clearInterval(f); }, 100);
        }).catch(()=>{});
      }
      const cs = document.querySelector('.countdown-section');
      if (cs) cs.scrollIntoView({behavior:'smooth'});
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

  function setupCountdown(){
    const start = new Date(CFG.anniversaryDate.replace(' ','T'));
    if (isNaN(start)){ console.warn('Fecha inválida'); return; }
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
      const set = (id, val) => { const e = $('#'+id); if (e) e.textContent = val; };
      set('cdYears', y);
      set('cdMonths', m);
      set('cdDays', d);
      set('cdHours', String(h).padStart(2,'0'));
      set('cdMinutes', String(mi).padStart(2,'0'));
      set('cdSeconds', String(s).padStart(2,'0'));
    };
    tick(); setInterval(tick, 1000);
  }

  function buildTimeline(){
    const c = $('#timelineItems');
    if (!c || !CFG.timeline) return;
    CFG.timeline.forEach(item => {
      const div = document.createElement('div');
      div.className = 'tl-item tl-hidden';
      div.innerHTML = `
        <div class="tl-photo-wrap">
          <img class="tl-photo" src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.style.background='linear-gradient(135deg,#fadadd,#f7e7ce)';this.src='';">
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
    const items = $$('.tl-item');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)){
      // Fallback: mostrar todo inmediatamente
      items.forEach(el => { el.classList.remove('tl-hidden'); el.classList.add('visible'); });
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting){
          e.target.classList.remove('tl-hidden');
          e.target.classList.add('visible');
        }
      });
    }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});
    items.forEach(el => obs.observe(el));
    // Failsafe: revelar todos después de 3s
    setTimeout(() => {
      items.forEach(el => { el.classList.remove('tl-hidden'); el.classList.add('visible'); });
    }, 3000);
  }

  function buildGallery(){
    const m = $('#masonry');
    if (!m || !CFG.gallery) return;
    CFG.gallery.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'mas-item';
      const cap = (CFG.galleryCaptions && CFG.galleryCaptions[i]) || '';
      div.innerHTML = `<img src="${src}" alt="${cap}" loading="lazy" data-index="${i}" data-caption="${cap}" onerror="this.style.background='linear-gradient(135deg,#fadadd,#f7e7ce)';this.src='';">`;
      m.appendChild(div);
    });
  }

  function buildStats(){
    const c = $('#statsGrid');
    if (!c || !CFG.stats) return;
    CFG.stats.forEach(s => {
      const div = document.createElement('div');
      div.className = 'stat-item';
      div.innerHTML = `
        <div class="stat-icon"><i class="fa-solid ${s.icon}"></i></div>
        <div class="stat-number">${s.number}</div>
        <div class="stat-label">${s.label}</div>`;
      c.appendChild(div);
    });
  }

  function buildReasons(){
    const c = $('#reasonsGrid');
    if (!c || !CFG.reasons) return;
    CFG.reasons.forEach(r => {
      const card = document.createElement('div');
      card.className = 'reason-card';
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

  function buildPromises(){
    const c = $('#promisesList');
    if (!c || !CFG.promises) return;
    CFG.promises.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'promise-item';
      div.innerHTML = `<div class="promise-num">${i+1}</div><p class="promise-text">${p}</p>`;
      c.appendChild(div);
    });
  }

  function setupLightbox(){
    const lb = $('#lightbox'), img = $('#lbImage'), cap = $('#lbCaption'), counter = $('#lbCounter');
    if (!lb || !img) return;
    const imgs = CFG.gallery || [];
    let cur = 0;
    setTimeout(() => {
      $$('.mas-item img').forEach(el => {
        el.addEventListener('click', () => { cur = parseInt(el.dataset.index); show(); });
      });
    }, 300);
    const close = $('#lbClose'); if (close) close.addEventListener('click', hide);
    const prev = $('#lbPrev'); if (prev) prev.addEventListener('click', () => { cur = (cur-1+imgs.length)%imgs.length; show(); });
    const next = $('#lbNext'); if (next) next.addEventListener('click', () => { cur = (cur+1)%imgs.length; show(); });
    lb.addEventListener('click', e => { if (e.target === lb) hide(); });
    window.addEventListener('keydown', e => {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowRight' && next) next.click();
      if (e.key === 'ArrowLeft' && prev) prev.click();
    });
    function show(){
      img.src = imgs[cur];
      if (cap) cap.textContent = (CFG.galleryCaptions && CFG.galleryCaptions[cur]) || '';
      if (counter) counter.textContent = `${cur+1} / ${imgs.length}`;
      lb.classList.add('active');
    }
    function hide(){ lb.classList.remove('active'); }
  }

  function buildLetter(){
    const p = $('#paperText');
    if (p) p.textContent = CFG.letter || '';
  }

  function setupEnvelope(){
    const env = $('#envelope');
    if (!env) return;
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

  function setupLoveCounter(){
    if (!CFG.enableTeAmoCounter) return;
    const el = $('#loveCounter'), num = $('#loveNum');
    if (!el || !num) return;
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
      if (sc >= (CFG.secretClicksKey || 7)){ showSecret(); sc = 0; }
      setTimeout(() => sc = Math.max(0, sc-1), 1500);
    });
  }

  function setupClickHearts(){
    if (!CFG.enableClickHearts) return;
    document.addEventListener('click', e => {
      if (e.target.closest('#envelope, #loveCounter, .fc-btn, button, .reason-card, .ios-hint')) return;
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

  function setupTiltCards(){
    if (typeof VanillaTilt === 'undefined' || window.innerWidth < 700) return;
    try {
      VanillaTilt.init(document.querySelectorAll('.tl-photo-wrap, .cd-item, .mas-item, .stat-item'), {
        max:8, glare:true, 'max-glare':0.15, speed:500
      });
    } catch(e){ console.warn('Tilt skipped:', e); }
  }

  function setupSongPlayer(){
    const btn = $('#songPlayBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const a = $('#bgMusic');
      if (!a) return;
      if (a.paused){ a.volume = 0.6; a.play().catch(()=>{}); }
      else a.pause();
    });
  }

  function setupSecretMessage(){
    setTimeout(showSecret, CFG.secretDelayMs || 90000);
    const close = $('#secretClose');
    if (close) close.addEventListener('click', () => {
      const m = $('#secretModal'); if (m) m.classList.remove('active');
    });
  }

  function showSecret(){
    const m = $('#secretModal');
    if (!m || m.classList.contains('active')) return;
    m.classList.add('active');
    burstHearts(m);
  }

  function setupHeartRainOnEnd(){
    const scene = $('#finalScene');
    if (!scene || !('IntersectionObserver' in window)) return;
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

  function setupCelebrateButton(){
    const btn = $('#celebrateBtn'), scene = $('#finalScene');
    if (btn) btn.addEventListener('click', () => { launchFireworks(7000); heartRain(); });
    if (scene && 'IntersectionObserver' in window){
      const obs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting && !btn.dataset.fired){ btn.dataset.fired='1'; launchFireworks(5000); }
        });
      }, {threshold: 0.6});
      obs.observe(scene);
    }
  }

  function launchFireworks(duration=5000){
    const cvs = $('#fireworks');
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const parent = cvs.parentElement;
    const resize = () => { cvs.width = parent.clientWidth; cvs.height = parent.clientHeight; };
    resize(); window.addEventListener('resize', resize);
    let particles = [];
    const colors = ['#c9a96b','#e6c789','#e6394d','#fadadd','#ffffff','#f7e7ce','#ff8fa3'];
    let running = true;
    const end = performance.now() + duration;
    const spawn = () => {
      const x = Math.random()*cvs.width, y = Math.random()*cvs.height*0.55 + 40;
      const n = 70 + Math.floor(Math.random()*40);
      const col = colors[Math.floor(Math.random()*colors.length)];
      for (let i=0; i<n; i++){
        const ang = (Math.PI*2*i)/n + Math.random()*0.2;
        const sp = Math.random()*5 + 2.5;
        particles.push({x,y,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,alpha:1,color:col,size:Math.random()*2.5+1.2,decay:0.008+Math.random()*0.015,gravity:0.04});
      }
    };
    const iv = setInterval(() => { if (!running) return; spawn(); if (Math.random() > 0.5) setTimeout(spawn, 250); }, 500);
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

  function setupIOSHint(){
    const hint = $('#iosHint');
    const close = $('#iosHintClose');
    if (close && hint){
      close.addEventListener('click', () => {
        hint.classList.remove('show');
        localStorage.setItem('nh_ios_hint', '1');
      });
    }
  }

})();
