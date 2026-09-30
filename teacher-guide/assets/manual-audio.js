/* Load before lesson scripts. Audio requires a current, explicit user action. */
(()=>{
  'use strict';
  let generation=0, context=null;
  const media=new Set(), timers=new Set(), nativeIntent=new WeakMap();
  const later=window.setTimeout.bind(window), clear=window.clearTimeout.bind(window);
  const valid=token=>token&&token.generation===generation&&!document.hidden&&token.until>Date.now();
  function stop(preserve=null){
    generation++;context=null;
    timers.forEach(clear);timers.clear();
    media.forEach(m=>{if(m!==preserve){m.pause();try{m.currentTime=0}catch{}}});media.clear();
    document.querySelectorAll('audio,video').forEach(m=>{if(m!==preserve)m.pause()});
    if(preserve instanceof HTMLMediaElement&&!preserve.paused)media.add(preserve);
    window.speechSynthesis?.cancel();
  }
  window.setTimeout=function(fn,delay,...args){
    if(typeof fn!=='function')return later(fn,delay,...args);
    const token=context;
    const id=later(()=>{
      timers.delete(id);
      if(token&&!valid(token))return;
      const previous=context;context=token;
      try{fn(...args)}finally{context=previous}
    },delay);
    if(token)timers.add(id);
    return id;
  };
  // Only buttons that run a game action, or native media controls, grant consent.
  function consent(event){
    if(!event.isTrusted)return;
    const target=event.target instanceof Element?event.target:null;
    const action=target?.closest('button[onclick],[draggable="true"],audio,video');
    const game=action?.closest('.weekly-game-section,.online-game-section');
    // Native controls may dispatch play before click. Authorize on pointer/key down,
    // then let the browser's own play/pause toggle complete without resetting it.
    const native=action?.matches('audio,video');
    if(native&&event.type==='click'&&valid(nativeIntent.get(action)))return;
    stop(native?action:null);
    if(action&&(game||action.matches('audio,video'))){
      const token={generation,until:Date.now()+6000};context=token;
      if(action.matches('audio,video'))nativeIntent.set(action,token);
      later(()=>{if(context===token)context=null},0);
    }
  }
  document.addEventListener('click',consent,true);
  document.addEventListener('pointerdown',event=>{if(event.target instanceof Element&&event.target.closest('audio,video'))consent(event)},true);
  document.addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)&&event.target instanceof Element&&event.target.closest('audio,video'))consent(event)},true);
  document.addEventListener('dragstart',consent,true);
  document.addEventListener('drop',consent,true);
  const play=HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play=function(){
    const token=context;
    if(!valid(token))return Promise.reject(new DOMException('Click a playback or game button first.','NotAllowedError'));
    media.forEach(m=>{if(m!==this)m.pause()});
    window.speechSynthesis?.cancel();media.add(this);
    return play.call(this);
  };
  if(window.speechSynthesis){
    const synth=window.speechSynthesis, speak=synth.speak.bind(synth);
    synth.speak=function(utterance){
      if(!valid(context))return;
      media.forEach(m=>m.pause());synth.cancel();speak(utterance);
    };
  }
  // Promise callbacks must explicitly retain the consent of their originating action.
  window.lessonAudio={stop,capture:()=>context,run(token,fn){
    if(!valid(token))return;
    const previous=context;context=token;
    try{return fn()}finally{context=previous}
  }};
  document.addEventListener('play',event=>{
    if(!(event.target instanceof HTMLMediaElement))return;
    // Chromium's built-in controls can consume pointer events in their closed
    // shadow tree. A focused native control with fresh user activation is still
    // an explicit playback action; detached/programmatic Audio is excluded.
    if(event.isTrusted&&event.target.isConnected&&event.target.controls&&!event.target.autoplay&&document.activeElement===event.target&&navigator.userActivation?.isActive){
      stop(event.target);
      nativeIntent.set(event.target,{generation,until:Date.now()+6000});
      window.speechSynthesis?.cancel();
    }
    if(!valid(context)&&!valid(nativeIntent.get(event.target))&&!media.has(event.target)){event.target.pause();return}
    media.forEach(m=>{if(m!==event.target)m.pause()});media.add(event.target);
  },true);
  window.addEventListener('pageshow',stop);
  window.addEventListener('pagehide',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
  document.addEventListener('change',event=>{if(event.target.matches('select'))stop()},true);
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('audio,video').forEach(m=>{m.autoplay=false;m.removeAttribute('autoplay');m.pause()});
    const button=document.createElement('button');button.type='button';button.textContent='停止所有声音';
    button.id='stopAllLessonAudio';button.onclick=stop;
    button.style.cssText='position:fixed;bottom:16px;right:16px;z-index:10000;padding:10px 16px;border:1px solid #cbd5e1;border-radius:24px;background:white;color:#17284a;cursor:pointer';
    const style=document.createElement('style');style.textContent='@media print{#stopAllLessonAudio{display:none!important}}';
    document.head.append(style);document.body.append(button);
  });
})();
