/* Registro Service Worker + Prompt de instalación */
if ('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('✓ SW registered', reg.scope))
      .catch(err => console.warn('✗ SW failed:', err));
  });
}

let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn){
    installBtn.style.display = 'flex';
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Install:', outcome);
      deferredPrompt = null;
      installBtn.style.display = 'none';
    });
  }
});

window.addEventListener('appinstalled', () => {
  console.log('✓ App instalada');
  if (installBtn) installBtn.style.display = 'none';
});

window.addEventListener('load', () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.navigator.standalone === true ||
                       window.matchMedia('(display-mode: standalone)').matches;
  if (isIOS && !isStandalone){
    const seen = localStorage.getItem('nh_ios_hint');
    if (!seen){
      setTimeout(() => {
        const hint = document.getElementById('iosHint');
        if (hint) hint.classList.add('show');
      }, 6000);
    }
  }
});
