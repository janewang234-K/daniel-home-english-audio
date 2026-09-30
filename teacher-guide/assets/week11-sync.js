/* Week 11 source of truth: user's 2026-09-20 resource pack. No playback on render. */
(()=>{
 const words=['sunny','windy','cloudy','rainy','snowy','rainbow'];
 const phrases=["How's the weather?",'It is sunny.','My hat is blue.','My kite is red.','I open my blue umbrella.','I see a rainbow.'];
 const root='Week11_Weather/';
 const resources=()=>`<div class="prep-card" style="margin:16px 0;padding:18px;border:1px solid #dbe5ee;border-radius:14px;background:#fff"><b>Week 11 · 已同步9月20日资源包</b><p>核心词：${words.join(' · ')}。音频仅在点击播放后开始。</p><p><a href="${root}Week11_资源包.pdf" target="_blank" rel="noopener">打开本周资源包</a>　<a href="${root}My_Weather_Day_Jane_Studio(1).pdf" target="_blank" rel="noopener">打开 My Weather Day 绘本</a></p><label>绘本朗读：My Weather Day<audio controls preload="none" src="${root}My weather day.mp3" style="display:block;width:100%;margin:8px 0"></audio></label><label>家庭启蒙用语<audio controls preload="none" src="${root}Week11_启蒙用语.mp3" style="display:block;width:100%;margin:8px 0"></audio></label><p>练习册：天气挂饰、天气与动作配对、Read and tick、首字母描写、填空、选择、复述。低龄孩子优先看图、听辨、动作和口头表达，描写不是必须完成的门槛。</p><p>顺序提示：练习册复述图为 sunny → windy → cloudy → rainy → snowy → rainbow；绘本正文先 rainbow 再 snowy。按所使用的材料复述，不把两种顺序混作唯一答案。</p></div>`;
 if(typeof resourceSupport!=='undefined'){
   const w=weeks.find(x=>x.theme==='Weather');
   Object.assign(w,{words:[...words],phrases,reading:'My Weather Day',output:'It is sunny. My hat is blue.',
     assessment:'能听辨六个目标词；借助图片说一句天气，再接一句物品颜色或动作。',
     station2:'Weather and Action：对照资源包第4页，把 sunny 配吃冰激凌、rainy 配踩水洼、cloudy 配散步、snowy 配堆雪人。孩子先配对，再选择一个熟悉句子 I can...。',
     outdoor:'Mini Weather Report：先示范 It is sunny. My hat is blue.；孩子选择图片，说 It is...，再接 My... is... 或 I...。彩虹页说 I see a rainbow.，不说 It is rainbow。'});
   for(const key of ['setup','station1','diy'])w[key]=w[key].replaceAll('cold','snowy');
   miniSpeakerLines.Weather='It is sunny. My hat is blue. / It is rainy. I open my blue umbrella. / I see a rainbow.';
   visualKits.Weather=visualKits.Weather.map(row=>row.map(value=>value.replaceAll('cold雪花','snowy雪花')));
   flashcardSets.Weather=flashcardSets.Weather.map(row=>row.map(value=>value==='cold'?'snowy':value));
   flashcardNotes.Weather='对照9月20日资源包 Read and tick：sunny、windy、cloudy、rainy、snowy、rainbow。cold 只作感受表达，不替代 snowy。';
   flashcardArt.Weather=['weather',[...words]];
   weeklyGameConfigs[10].items=words.map((word,i)=>[word,word==='rainbow'?'I see a rainbow.':`It is ${word}.`,word==='rainbow'?'I see a rainbow!':`It is ${word}!`,`assets/flashcards/weather/${String(i+1).padStart(2,'0')}-${word}.webp`,word]);
   const oldResource=resourceMatch;
   resourceMatch=function(w,i){return oldResource(w,i)+(w.theme==='Weather'?resources():'')};
   const oldDraw=drawSlots;
   drawSlots=function(){window.lessonAudio.stop();oldDraw()};
   drawSlots();
 }else if(typeof stage1Weeks!=='undefined'){
   const w=weeks.find(x=>x.stage===1&&x.key==='weather');
   Object.assign(w,{book:['My Weather Day','Jane Studio','9月20日自有资源包'],vocab:[...words],phrases,
     focus:'看图说天气，再结合熟悉的颜色、物品和动作说两句。',
     songTasks:['Make a weather mobile：剪贴并悬挂天气图，说 It is...。','Match：天气与动作配对。','Read and tick：按资源包听辨六个词；首字母描写可选。','按资源包复述图，用 It is... / My... is... / I... 说两句。'],
     bookQ:["How's the weather?",'What color is the hat / kite?','What can you do on a cloudy / snowy day?','Look at the rainbow. What can you see?'],
     video:'任选一个绘本画面说两句：It is sunny. My hat is blue. 或 It is rainy. I open my blue umbrella.',
     offline:'Weather Reporter：天气挂饰、动作配对、图片复述和两句播报。',
     ext1:['Rain Rain Go Away','本周本地泛听视频'],ext2:['Sunny Day (Come And Play With Me)','本周本地泛听视频'],ext3:['The Sun Comes Up!','本周本地泛听视频'],
     map:[['Weather','sunny · windy · cloudy · rainy · snowy'],['After the Rain','rainbow'],['Colors and Things','blue hat · red kite · blue umbrella'],['Actions','walk my dog · open my umbrella · make a snowman']]});
   Object.assign(w.lesson,{station1:'Weather Mobile：沿用资源包第3页天气挂饰；老师控制剪刀和打孔，孩子选图、悬挂、回答天气。',station2:'Weather and Action：按资源包第4页做四组天气与动作配对，再看绘本复现帽子、风筝和雨伞的颜色。',language:phrases.join(' / '),assessment:'能听辨六个词，借助图片说天气，并接一句物品颜色或动作。'});
   retellLibrary.weather=[['Sunny / Windy','It is sunny. My hat is blue. / It is windy. My kite is red.'],['Cloudy / Rainy','I can walk my dog. / I open my blue umbrella.'],['Rainbow / Snowy','I see a rainbow. / I can make a snowman.'],['Happy','I feel happy.']];
   const oldRender=render;
   render=function(){window.lessonAudio.stop();oldRender();if(weeks[current].key==='weather')summary.insertAdjacentHTML('beforeend',resources())};
   render();
 }
})();
