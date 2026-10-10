(function(){
  var $=function(s){return document.querySelector(s)},root=document.documentElement,
  reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* theme */
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
  $('#theme').onclick=function(){
    var c=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'),n=c==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}
  };

  /* marquee: duplicate for seamless loop */
  var mq=$('#mq');mq.innerHTML+=mq.innerHTML;

  /* terminal log */
  var lines=[
   '<span class="m">$</span> git log --oneline --author=gnanesh',
   '<span class="h">f7c1d9e</span> ship: Dhanvantari, offline health platform',
   '<span class="h">e41b0a3</span> intern: Python industrial apps @ Topgrade',
   '<span class="h">d92a6f0</span> feat: TEMPUS event scheduler (vanilla JS)',
   '<span class="h">c58e7b2</span> lead: Secretary, Creative Codex Club',
   '<span class="h">b30f1c8</span> hack: INNO-HACK Summit 2026',
   '<span class="h">a74d2e5</span> intern: Python @ Kodbud, 5 projects shipped',
   '<span class="h">9e1c4b7</span> hack: InnovateX, Drug Tracking system',
   '<span class="h">8b6a0d1</span> award: Meritorious, SGPA 9.0+ in sem 1',
   '<span class="h">7a2f3c9</span> init: B.E. CSE, SIET Tumakuru','',
   '<span class="o">✓</span> <span class="m">status:</span> <span class="a">open to internships</span><span class="cur"></span>'];
  function runLog(){
    var pre=$('#log'),i=0;
    if(reduce){pre.innerHTML=lines.join('\n');return}
    (function n(){if(i>=lines.length)return;pre.innerHTML=lines.slice(0,++i).join('\n');setTimeout(n,i===1?400:240)})();
  }

  /* counters */
  function counters(){
    document.querySelectorAll('[data-to]').forEach(function(el){
      var to=+el.dataset.to,d=+(el.dataset.d||0),s=null;
      if(reduce){el.textContent=to.toFixed(d);return}
      new IntersectionObserver(function(e,o){if(!e[0].isIntersecting)return;o.disconnect();
        (function f(ts){s=s||ts;var p=Math.min((ts-s)/1400,1);el.textContent=(to*(1-Math.pow(1-p,3))).toFixed(d);if(p<1)requestAnimationFrame(f)})(performance.now());
      }).observe(el);
    });
  }

  /* loader */
  var pct=$('#pct'),fill=$('#fill'),v=0,fin=false;
  function finish(){if(fin)return;fin=true;$('#loader').classList.add('done');document.body.classList.remove('lock');runLog();counters()}
  var iv=setInterval(function(){
    v+=reduce?100:Math.random()*14+4;if(v>=100){v=100;clearInterval(iv);setTimeout(finish,250)}
    pct.textContent=Math.floor(v)+'%';fill.style.width=v+'%';
  },90);
  setTimeout(finish,4500);

  /* scroll progress + back-to-top */
  var prog=$('#prog'),tb=$('#top-btn');
  addEventListener('scroll',function(){
    var h=root.scrollHeight-innerHeight;prog.style.width=(h>0?scrollY/h*100:0)+'%';tb.classList.toggle('on',scrollY>700);
  },{passive:true});
  tb.onclick=function(){scrollTo({top:0})};

  /* pointer glow, card spotlight, photo tilt */
  if(matchMedia('(hover:hover)').matches&&!reduce){
    var g=$('#glow');
    addEventListener('pointermove',function(e){g.style.opacity=1;g.style.transform='translate('+(e.clientX-210)+'px,'+(e.clientY-210)+'px)'});
    document.querySelectorAll('.p,.card').forEach(function(c){
      c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')});
    });
    var f=$('#frame');
    f.addEventListener('pointermove',function(e){var r=f.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      f.style.transform='rotateY('+x*14+'deg) rotateX('+-y*14+'deg)'});
    f.addEventListener('pointerleave',function(){f.style.transform=''});
  }

  /* copy email */
  var em='ggnani488@gmail.com',cp=$('#copy');
  cp.onclick=function(){
    (navigator.clipboard?navigator.clipboard.writeText(em):Promise.reject()).then(function(){cp.textContent='Copied: '+em},function(){cp.textContent=em});
    setTimeout(function(){cp.textContent='Copy email address'},2600);
  };
})();
