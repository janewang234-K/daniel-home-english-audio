/* Teacher edition: keep implementation history in the separate audit reports. */
(()=>{
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const beforeSpeech=script;
script=(w,i)=>{const doc=document.createElement('div');doc.innerHTML=beforeSpeech(w,i);const rows=doc.querySelectorAll('.flow-table tbody tr');if(rows.length===8){rows[4].cells[0].textContent='23–37';rows[5].cells[0].textContent='37–40';rows[6].innerHTML=[
 '40–47','Mini Speech · 小小展示',
 `老师说 It’s show time! 请每名孩子拿照片、物品或作品，面向大家说本周的两三句，每人约30–40秒。示例：${miniSpeakerLines[w.theme]} 需要帮助时指图或轻声给句头。其他孩子听后指图、做动作或鼓掌回应。按座位顺序邀请，轮到时起身即可。`,
 '拿自己的材料做简短介绍，听同伴介绍并回应。'
 ].map(s=>`<td>${e(s)}</td>`).join('');rows[7].cells[2].textContent='老师说 Time to tidy up.，带孩子收好物品，再唱 Goodbye Song，挥手道别。';}
doc.insertAdjacentHTML('beforeend','<div class="prep-card wide" style="padding:20px;margin-top:16px"><h3>展示安排</h3><p>按6–8名孩子预留7分钟。人数较多时，将前面活动的重复练习时间调给展示，让每名孩子都有一次开口机会。暂时不愿起身的孩子可以坐着展示，老师在旁指图支持。</p></div>');return doc.innerHTML;};
const bring=w=>`<div class="prep-card wide"><h3>发给家长的准备通知</h3><p>${e(w.bring)}</p><p>请标记姓名，展示后带回。老师准备备用图片；孩子忘带也可参加。避免贵重物品和入口小件。</p></div>`;
prep=(w,i)=>`${bring(w)}<div class="prep-grid"><div class="prep-card"><h3>摆好材料</h3><p>${e(w.materials)}</p><p>教师示范材料放前方托盘，孩子的操作材料放各自座位。留出展示物品的位置和清晰的收纳位置。</p></div><div class="prep-card"><h3>确认声音和图片</h3><ul><li>确认 ${e(w.song)} 可完整播放，音量适合教室。</li><li>定位 ${e(w.reading)} 的复述图。</li><li>按顺序放好全部 ${w.words.length} 张核心闪卡。</li><li>试一次播放和停止，随后停止声音，等课堂需要时再播放。</li></ul></div><div class="prep-card"><h3>试说一遍</h3><p>${e(miniSpeakerLines[w.theme])}</p><p>拿起相应物品，边做边说；为需要帮助的孩子准备图片提示。</p></div><div class="prep-card warn"><h3>安全检查</h3><p>检查图卡边角、玩具零件和活动空间。剪刀、打孔由成人操作；使用真实食物前确认过敏情况。照片可用绘画替代。</p></div></div>`;
const sourceResources=resourceMatch;
resourceMatch=(w,i)=>{const doc=document.createElement('div');doc.innerHTML=sourceResources(w,i);const players=[...doc.querySelectorAll('audio')].map(a=>a.closest('label')?.outerHTML||a.outerHTML).join('');return `<div class="prep-grid"><div class="prep-card wide"><h3>本周课堂材料</h3><table class="resource-table"><thead><tr><th>材料</th><th>名称／内容</th><th>课堂使用</th></tr></thead><tbody><tr><td>歌曲</td><td>${e(w.song)}</td><td>完整唱演，配动作或角色教具。</td></tr><tr><td>精读</td><td>${e(w.reading)}</td><td>看复述图一起说，再用物品介绍自己的内容。</td></tr><tr><td>闪卡</td><td>${e(w.words.join(' · '))}</td><td>全部过一遍，孩子听、指、做动作或说词。</td></tr><tr><td>句子</td><td>${w.phrases.map(e).join('<br>')}</td><td>老师边示范边说，再请孩子用自己的物品试说。</td></tr></tbody></table></div><div class="prep-card wide"><h3>示范表达</h3><p>${e(miniSpeakerLines[w.theme])}</p><p>按孩子的照片、物品和真实情况替换内容。</p></div>${players?`<div class="prep-card wide"><h3>配套音频</h3>${players}</div>`:''}<div class="prep-card wide"><p>PDF资源包由老师另行发送。课堂使用机构提供的授权材料。</p></div></div>`;};
const substitutions=[
 ['按本周 Read and tick 逐张过完','逐张出示本周'],['Read and tick 全部核心闪卡都要过一遍','逐张出示本周全部闪卡'],['核心以资源包 Read and tick 为准：','本周闪卡：'],['对照9月20日资源包 Read and tick：','本周闪卡：'],['Read and tick','本周闪卡'],['Read and Tick','本周闪卡'],
 ['从头到尾完整唱完','唱'],['完整唱完固定','唱'],['完整唱完','唱'],['完整唱歌','唱歌'],['完整唱演','唱演'],['完整开场','开场'],['完整唱Goodbye','唱Goodbye'],['完整唱歌、挥手','唱歌、挥手'],['确认完整播放时长','确认播放时长'],['确认完整时长','确认时长'],['完整歌曲','歌曲'],['完整播放','播放'],['完整唱','唱'],['唱完固定','唱'],['固定 Hello Song','Hello Song'],['跟唱完整歌曲','跟唱歌曲'],
 ['官方来源仅作选材参考，不代表品牌背书；价格、库存、年龄与小件警示以当前包装为准。','选购时查看当前包装的适用年龄与小件警示。'],['详情页上次访问受限，购买前核对包装；情绪词未必与本周六词完全相同。','按本周六张情绪卡准备，选购时检查套装中包含的表情。'],['，不使用源包中数量矛盾的风筝题','；数量介绍选用积木或车轮图'],['数字、颜色螺旋复习；star 不替代 oval。','用颜色和数量描述六种形状。'],['train/bike/plane/boat/stop/go 来自生活扩展；本次精读六种车都有轮子，不做水陆空分类考核。','围绕六种车辆观察轮子，边做转动动作边说完整句。'],['05　别买错／别教错','05　准备提醒'],['其他孩子做什么：','全班参与：'],['听介绍后一起指图、举卡或做动作，','听介绍后一起指图、举卡或做动作。'],
 ['，不截取片段',''],['，不因已经熟悉而省略',''],['，也不在中途停下来考词',''],['，老师不截断歌曲',''],['，不中断去讲语法',''],['，不截断歌曲',''],['不分组。',''],['；不分组、不交换规则',''],['；不分组、不计输赢',''],['，不分组竞赛',''],['无需背对背、传话或分组。',''],['不要求全班重新排队展示。',''],['不再安排全班轮流上台。',''],['不安排第二轮排队展示。',''],['，不安排多角色接力规则',''],['，不排队等上台',''],['，不比赛谁开得快',''],['，不再设比赛',''],['，不计输赢',''],['不分组、不计输赢。',''],['不要求孩子判断哪个句式更高级。',''],['，不删成It is a...',''],['，不只说房间词',''],['，不只罗列天气',''],['，不把所有部位都放进This is',''],['；不逐个考单词',''],['，不逐个考单词',''],['不坐着等全部同伴依次讲完。',''],['不排长队。',''],['不要求每名孩子逐个朗读整套。',''],['不把Put some...截成只有食材词。',''],['不购买昂贵套装也可以完成。','可用现有物品和自制图片准备。'],
 ['本周怎么带 · 教师执行版','本周怎么带'],['标准50分钟 · 精读拓展流程','50分钟课堂流程'],['精读句式迁移版 · ',''],['最后留下一个证据','收好物品前，再说一次'],['观察理解、完整表达、互动、换内容迁移四项，分别记录提示程度。',''],['不要求提前背稿。',''],['不必写稿、买东西或透露家庭隐私。','可用照片或绘画，选择愿意分享的内容。'],['，不要求提前背稿',''],['；不必写稿、买东西或透露家庭隐私','；可用绘画替代照片'],['PDF资源包另发，此处不放下载链接。','PDF资源包另发。']
];
function tidy(html,tab){const doc=document.createElement('div');doc.innerHTML=html;
 if(tab==='talk'){const closing=doc.querySelector('.script-callout:last-child');closing?.insertAdjacentHTML('beforebegin',`<div class="script-callout"><b>Mini Speech · 小小展示</b>It’s show time! Show us. Tell us about it.<small>按座位顺序邀请每名孩子拿材料展示。示例：${e(miniSpeakerLines[weeks[current].theme])} 需要时指图或给句头；说完带全班鼓掌。</small></div>`);}
 doc.querySelectorAll('.aid-method').forEach(n=>n.remove());
 doc.querySelectorAll('details').forEach(n=>{if(/核对原材料|备课时核对/.test(n.querySelector('summary')?.textContent||''))n.remove();});
 doc.querySelectorAll('.source-note').forEach(n=>{if(/资源对照：|教研依据：/.test(n.textContent))n.remove();});
 doc.querySelectorAll('p,div').forEach(n=>{if(n.children.length===0&&n.textContent.trim().startsWith('教研依据：'))n.remove();});
 const walker=document.createTreeWalker(doc,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.parentElement.closest('script,style,textarea,option'))continue;let t=n.nodeValue;for(const[a,b]of substitutions)t=t.split(a).join(b);n.nodeValue=t.replace(/；。/g,'。').replace(/，，/g,'，').replace(/。。/g,'。');}
 if(tab==='materials'){
 const timing=doc.querySelectorAll('.aid-step b');timing.forEach(n=>{n.textContent=n.textContent.replace('约16分钟','约14分钟').replace('约4分钟','约3分钟');});
 const last=doc.querySelector('.aid-step:last-child');if(last)last.innerHTML=`<b>Mini Speech · 约7分钟</b>请每名孩子拿自己的照片、物品或作品，面向大家介绍。示例：${e(miniSpeakerLines[weeks[current].theme])} 老师按需指图或给句头。`;
 const steps=doc.querySelectorAll('.aid-step');if(steps.length&&current===0){steps[0].innerHTML='<b>老师先示范</b>拿家人照片和一本书，边展示边说：This is my grandma. My grandma likes to read.';}
 }
 return doc.innerHTML;
}
const previousTab=renderTab;renderTab=(tab,w,i)=>tidy(previousTab(tab,w,i),tab);
weeks.forEach(w=>{w.brief=miniSpeakerLines[w.theme];});
render(current);
})();
