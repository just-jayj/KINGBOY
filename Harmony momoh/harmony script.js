	const tracks = [
    {n:1, title:"Opening Theme", len:"3:12"},
    {n:2, title:"Track Two", len:"2:48"},
    {n:3, title:"Track Three", len:"4:01"},
    {n:4, title:"Track Four", len:"3:35"},
    {n:5, title:"Track Five", len:"2:56"},
    {n:6, title:"Closing Theme", len:"5:10"},
  ];
  function row(t){
    const el = document.createElement('div'); el.className='track';
    el.innerHTML = `<span class="num">${String(t.n).padStart(2,'0')}</span><span class="name">${t.title}</span><span class="len">${t.len}</span>`;
    el.addEventListener('click', ()=>{ document.querySelectorAll('.track').forEach(x=>x.classList.remove('playing')); el.classList.add('playing'); });
    return el;
  }
  const playGrid = document.getElementById('playGrid');
  const trackGrid = document.getElementById('trackGrid');
  tracks.forEach(t=>{ playGrid.appendChild(row(t)); trackGrid.appendChild(row(t)); });

  // dust particles
  const dustHost = document.getElementById('dust');
  for(let i=0;i<18;i++){
    const s = document.createElement('span');
    s.style.left = Math.random()*100+'vw';
    s.style.animationDuration = (14+Math.random()*10)+'s';
    s.style.animationDelay = (Math.random()*14)+'s';
    dustHost.appendChild(s);
  }

  const buttons = Array.from(document.querySelectorAll('#menu button'));
  let idx = 0;
  function select(i){
    buttons[idx].setAttribute('aria-selected','false');
    idx = (i+buttons.length)%buttons.length;
    buttons[idx].setAttribute('aria-selected','true');
    resetIdle();
  }
  function openPanel(name){ document.getElementById('panel-'+name).classList.add('open'); }
  buttons.forEach((b,i)=>{
    b.addEventListener('click', ()=>{ select(i); openPanel(b.dataset.panel); });
    b.addEventListener('mouseenter', ()=> select(i));
  });
  document.querySelectorAll('[data-close]').forEach(btn=>{
    btn.addEventListener('click', e => e.target.closest('.panel').classList.remove('open'));
  });
  document.addEventListener('keydown', e=>{
    resetIdle();
    if(document.querySelector('.panel.open')){ if(e.key==='Escape') document.querySelector('.panel.open').classList.remove('open'); return; }
    if(e.key==='ArrowRight'){ select(idx+1); }
    if(e.key==='ArrowLeft'){ select(idx-1); }
    if(e.key==='Enter'){ openPanel(buttons[idx].dataset.panel); }
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ss = document.getElementById('screensaver');
  const ssLogo = document.getElementById('ssLogo');
  let idleTimer, ssRunning=false, x=40,y=40,dx=1.4,dy=1.1;
  const colors = ['#f2f1ee','#c9c8c2','#e0dfda','#ffffff'];
  function ssStep(){
    if(!ssRunning) return;
    const w = ss.clientWidth - ssLogo.offsetWidth, h = ss.clientHeight - ssLogo.offsetHeight;
    x+=dx; y+=dy;
    if(x<=0||x>=w){ dx*=-1; ssLogo.style.color = colors[Math.floor(Math.random()*colors.length)]; }
    if(y<=0||y>=h){ dy*=-1; ssLogo.style.color = colors[Math.floor(Math.random()*colors.length)]; }
    ssLogo.style.left = x+'px'; ssLogo.style.top = y+'px';
    requestAnimationFrame(ssStep);
  }
  function startScreensaver(){ if(reduceMotion || document.querySelector('.panel.open')) return; ss.classList.add('on'); ssRunning=true; ssStep(); }
  function stopScreensaver(){ ss.classList.remove('on'); ssRunning=false; }
  function resetIdle(){ stopScreensaver(); clearTimeout(idleTimer); idleTimer = setTimeout(startScreensaver, 25000); }
  ['mousemove','mousedown','click','keydown','touchstart'].forEach(ev=>
    document.addEventListener(ev, ()=>{ if(ssRunning) stopScreensaver(); resetIdle(); }));
  resetIdle();

  const vid = document.getElementById('bgVideo');
  const src = vid.querySelector('source').getAttribute('src');
  if(src && src.trim() !== ''){ vid.style.display='block'; document.getElementById('bgFallback').style.display='none'; }
  else { vid.style.display='none'; }