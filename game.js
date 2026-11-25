const $=id=>document.getElementById(id);
const cars=[
 {name:"Starter",emoji:"🚗",cost:0,speed:1,desc:"Your first ride"},
 {name:"City Bug",emoji:"🚙",cost:60,speed:2,desc:"Little upgrade"},
 {name:"Turbo Hatch",emoji:"🏎️",cost:150,speed:3,desc:"Fast and fun"},
 {name:"Street Racer",emoji:"🚘",cost:300,speed:4,desc:"Built to race"},
 {name:"Supercar",emoji:"🏎️",cost:550,speed:5,desc:"Premium power"},
 {name:"Pixel Legend",emoji:"🚗💨",cost:900,speed:6,desc:"Ultimate champion"}
];
const wordsEN=["apple","river","happy","pixel","racing","orange","window","garden","planet","silver","rocket","friend","music","coffee","dragon","yellow","forest","puzzle","summer","castle","little","banana","shadow","purple","dream","light","keyboard","wonder","energy","sunshine"];
const wordsKH=["សួស្តី","សាលា","ស្រលាញ់","កម្ពុជា","ផ្កា","សត្វ","មិត្ត","ព្រះអាទិត្យ","ទឹក","ផ្ទះ","សៀវភៅ","ឡាន","រីករាយ","តន្ត្រី","កីឡា","មេឃ","ភ្នំ","ផ្លូវ","ពណ៌","គ្រួសារ","កុំព្យូទ័រ","ថ្ងៃ","សន្តិភាព","សុបិន","បេះដូង","ពន្លឺ","ដើមឈើ","សមុទ្រ","សំណាង","ពាក្យ"];
const texts={en:{tag:"TYPE FAST. RACE FASTER.",title:"Ready, Set,<br><span>Type!</span>",desc:"Type the words correctly to boost your car. Win races, earn coins, and unlock your dream ride.",race:"🏁 Race Arena",shop:"🚘 Garage",leader:"🏆 Top 10 Racers",start:"▶ START RACE",ready:"READY",running:"RACING",finish:"FINISHED",prompt:"Press START to begin!",placeholder:"Type the word here…",feedback:"Ready when you are!",note:"Win races to earn coins and unlock cars.",leaderNote:"Scores are saved on this browser/device. Online global rankings need a server.",won:"Race Finished!",winText:"You won! +{coins} coins • {wpm} WPM",tryText:"Race complete! +{coins} coins • {wpm} WPM",accuracy:"ACCURACY",words:"WORDS",coins:"COINS",wins:"WINS",best:"BEST WPM",buy:"BUY",owned:"OWNED",use:"USE",used:"SELECTED",locked:"Need",wrong:"Keep going — type the word exactly!",correct:"Nice! Next word!",khLabel:"Khmer words",english:"English",khmer:"Khmer",language:"LANGUAGE",garageDesc:"Car collection",top:"Top 10 racers",shopTip:"Earn coins from races to buy cars.",buySuccess:"Car unlocked!",need:"Not enough coins.",selected:"Car selected!",raceFail:"You ran out of time. Practice and try again!",reset:"↻ RESET",soundOn:"🔊 SOUND ON",soundOff:"🔇 SOUND OFF",musicOn:"♫ MUSIC ON",musicOff:"♫ MUSIC OFF"},
 kh:{tag:"វាយលឿន។ ប្រណាំងលឿន!",title:"ត្រៀមខ្លួន,<br><span>វាយ!</span>",desc:"វាយពាក្យឱ្យត្រឹមត្រូវដើម្បីបង្កើនល្បឿនឡាន។ ឈ្នះការប្រណាំង ទទួលកាក់ និងដោះសោឡានថ្មី។",race:"🏁 ទីលានប្រណាំង",shop:"🚘 ឃ្លាំងឡាន",leader:"🏆 អ្នកប្រណាំង Top 10",start:"▶ ចាប់ផ្តើម",ready:"ត្រៀម",running:"កំពុងប្រណាំង",finish:"ចប់",prompt:"ចុចចាប់ផ្តើមដើម្បីលេង!",placeholder:"វាយពាក្យនៅទីនេះ…",feedback:"ត្រៀមហើយឬនៅ?",note:"ឈ្នះការប្រណាំង ដើម្បីទទួលកាក់ និងដោះសោឡាន។",leaderNote:"ពិន្ទុរក្សាទុកក្នុង browser/device នេះ។ Leaderboard អនឡាញត្រូវការម៉ាស៊ីន server។",won:"ការប្រណាំងចប់!",winText:"អ្នកឈ្នះ! +{coins} កាក់ • {wpm} WPM",tryText:"ការប្រណាំងចប់! +{coins} កាក់ • {wpm} WPM",accuracy:"ភាពត្រឹមត្រូវ",words:"ពាក្យ",coins:"កាក់",wins:"ឈ្នះ",best:"WPM ល្អបំផុត",buy:"ទិញ",owned:"មានហើយ",use:"ប្រើ",used:"បានជ្រើស",locked:"ត្រូវការ",wrong:"បន្តទៀត—វាយពាក្យឱ្យត្រឹមត្រូវ!",correct:"ល្អណាស់! ពាក្យបន្ទាប់!",khLabel:"ពាក្យខ្មែរ",english:"English",khmer:"ខ្មែរ",language:"ភាសា",garageDesc:"ឡានរបស់អ្នក",top:"អ្នកប្រណាំង Top 10",shopTip:"ប្រណាំងដើម្បីរកកាក់ទិញឡាន។",buySuccess:"ដោះសោឡានបាន!",need:"កាក់មិនគ្រប់គ្រាន់ទេ។",selected:"បានជ្រើសឡាន!",raceFail:"អស់ពេលហើយ។ ហាត់ហើយសាកម្តងទៀត!",reset:"↻ ចាប់ផ្តើមឡើងវិញ",soundOn:"🔊 សំឡេងបើក",soundOff:"🔇 សំឡេងបិទ",musicOn:"♫ តន្ត្រីបើក",musicOff:"♫ តន្ត្រីបិទ"}};
let data=JSON.parse(localStorage.getItem("nakriData")||'{"coins":0,"wins":0,"best":0,"owned":[0],"selected":0,"leaderboard":[]}');
let playerName=localStorage.getItem("nakriPlayerName")||"";
let pendingStartAfterNickname=false;
let lang=localStorage.getItem("nakriLang")||"en",sound=true,musicOn=false,active=false,words=[],index=0,started=0,correct=0,total=0,timeout, audioCtx;
let playMode="multi", cloudReady=false, cloudUid=null, cloudDb=null, matchRef=null, opponentRef=null, queueRef=null, opponentUid=null, cpuTimer=null, cpuProgress=0, raceId=null;
function setupCloud(){
 try{
  const cfg=window.NAKRI_FIREBASE_CONFIG;
  if(!cfg||!cfg.apiKey||String(cfg.apiKey).includes("PASTE_")||!cfg.databaseURL)return;
  if(!firebase.apps.length)firebase.initializeApp(cfg);
  cloudDb=firebase.database(); cloudReady=true;
  firebase.auth().signInAnonymously().then(cred=>{
   cloudUid=cred.user.uid;
   cloudDb.ref("racePlayers/"+cloudUid).onDisconnect().remove();
   cloudDb.ref("racePlayers/"+cloudUid).set({nickname:playerName||"Racer",online:true,updatedAt:Date.now()});
   loadCloudLeaderboard();
  }).catch(e=>console.warn("Cloud sign-in unavailable:",e));
 }catch(e){console.warn("Cloud features need Firebase setup.",e)}
}
function loadCloudLeaderboard(){
 if(!cloudReady||!cloudDb)return;
 cloudDb.ref("leaderboard").orderByChild("score").limitToLast(50).on("value",snap=>{
  const rows=[];snap.forEach(child=>rows.push(child.val()));
  rows.sort((a,b)=>b.score-a.score);
  data.leaderboard=rows.slice(0,10);renderLeader();
  $("leaderBadge").textContent="GLOBAL TOP 10";
  $("leaderNote").textContent="Global Top 10 synced across devices.";
 });
}
function saveCloudScore(score){
 if(!cloudReady||!cloudDb||!cloudUid)return;
 const safeName=playerName||"Racer";
 cloudDb.ref("leaderboard/"+cloudUid).transaction(old=>{
  if(!old||score>Number(old.score||0))return {uid:cloudUid,name:safeName,score,updatedAt:Date.now()};
  return old;
 });
 cloudDb.ref("racePlayers/"+cloudUid).update({nickname:safeName,online:true,car:cars[data.selected].emoji,updatedAt:Date.now()});
}
function setMode(mode){
 playMode=mode;
 $("singleModeBtn").className=mode==="single"?"btn primary":"btn ghost";
 $("multiModeBtn").className=mode==="multi"?"btn primary":"btn ghost";
 $("matchStatus").textContent=mode==="single"?"Single Play: race alone and practice against no opponent.":"Multiplayer: searching for an online racer; CPU fills in if nobody is available.";
 $("rivalLabel").textContent=mode==="single"?"SINGLE PLAY":"RIVAL · Searching…";
 $("rivalCar").style.display=mode==="single"?"none":"block";
}
function cleanupMatch(){
 if(cpuTimer){clearInterval(cpuTimer);cpuTimer=null}
 if(matchRef){matchRef.remove().catch(()=>{});matchRef=null}
 if(opponentRef){opponentRef.off();opponentRef=null}
 if(queueRef){queueRef.off();queueRef=null}
 opponentUid=null;cpuProgress=0;
 $("rivalProgressFill").style.width="0%";
}
function seekOpponent(){
 cleanupMatch();
 if(playMode!=="multi")return;
 $("rivalLabel").textContent="RIVAL · Searching online…";
 if(cloudReady&&cloudDb&&cloudUid){
  matchRef=cloudDb.ref("raceQueue/"+cloudUid);
  matchRef.set({uid:cloudUid,name:playerName,car:cars[data.selected].emoji,progress:0,startedAt:Date.now(),updatedAt:Date.now()});
  matchRef.onDisconnect().remove();
  queueRef=cloudDb.ref("raceQueue");queueRef.on("child_added",snap=>{const v=snap.val();if(snap.key!==cloudUid&&v&&Date.now()-Number(v.updatedAt||Date.now())<45000)connectOpponent(snap.key,v)});
  cloudDb.ref("raceQueue").once("value").then(snap=>{
   let candidate=null;
   snap.forEach(ch=>{const v=ch.val();if(ch.key!==cloudUid&&v&&Date.now()-Number(v.updatedAt||Date.now())<45000&&!candidate)candidate={uid:ch.key,...v}});
   if(candidate){connectOpponent(candidate.uid,candidate)}
   else setTimeout(()=>{if(active&&!opponentUid)startCPU()},6500);
  }).catch(()=>setTimeout(()=>{if(active&&!opponentUid)startCPU()},3000));
 }else setTimeout(()=>{if(active&&!opponentUid)startCPU()},1800);
}
function connectOpponent(uid,info){
 if(opponentUid||!active)return;
 opponentUid=uid;
 $("rivalLabel").textContent="RIVAL · "+(info.name||"Online racer");
 $("rivalCar").textContent=info.car||"🚗";
 if(opponentRef)opponentRef.off();
 opponentRef=cloudDb.ref("raceQueue/"+uid);
 opponentRef.on("value",snap=>{
  const v=snap.val();if(!v)return;
  $("rivalLabel").textContent="RIVAL · "+(v.name||"Online racer");
  $("rivalCar").textContent=v.car||"🚗";
  $("rivalCar").style.left=Math.min(92,Number(v.progress||0)*.92)+"%";
  $("rivalProgressFill").style.width=Math.min(100,Number(v.progress||0))+"%";
 });
 $("matchStatus").textContent="Matched with an online racer!";
}
function startCPU(){
 if(!active||playMode!=="multi"||opponentUid)return;
 $("rivalLabel").textContent="RIVAL · CPU Racer";
 $("rivalCar").textContent=["🤖","🏎️","🚙","🚘"][Math.floor(Math.random()*4)];
 $("matchStatus").textContent="No online racer found. A CPU racer joined your race.";
 const cpuSpeed=0.7+Math.random()*0.6;
 cpuTimer=setInterval(()=>{
  if(!active){clearInterval(cpuTimer);cpuTimer=null;return}
  cpuProgress=Math.min(100,cpuProgress+cpuSpeed);
  $("rivalCar").style.left=Math.min(92,cpuProgress*.92)+"%";
  $("rivalProgressFill").style.width=cpuProgress+"%";
 },650);
}
function updateOnlineProgress(){
 if(matchRef&&cloudUid)matchRef.update({name:playerName,car:cars[data.selected].emoji,progress:Math.min(100,index/20*100),updatedAt:Date.now()}).catch(()=>{});
}

function save(){localStorage.setItem("nakriData",JSON.stringify(data))}
function t(k){return texts[lang][k]||texts.en[k]}
function renderText(){ $("tagline").textContent=t("tag");$("heroTitle").innerHTML=t("title");$("heroText").textContent=t("desc");$("raceHeading").textContent=t("race");$("shopHeading").textContent=t("shop");$("leaderHeading").textContent=t("leader");$("startBtn").textContent=t("start");$("status").textContent=t("ready");$("wordPrompt").textContent=t("prompt");$("typingInput").placeholder=t("placeholder");$("feedback").textContent=t("feedback");$("shopNote").textContent=t("note");$("leaderNote").textContent=t("leaderNote");$("resetBtn").textContent=t("reset");$("soundBtn").textContent=sound?t("soundOn"):t("soundOff");$("musicBtn").textContent=musicOn?t("musicOn"):t("musicOff");$("langBtn").textContent=lang==="en"?"🌐 English / ខ្មែរ":"🌐 ខ្មែរ / English";$("typingInput").lang=lang==="kh"?"km":"en";renderStats();renderCars();renderLeader()}
function renderStats(){$("coins").textContent=data.coins;$("wins").textContent=data.wins;$("best").textContent=data.best;$("garageCar").textContent=cars[data.selected].emoji;$("yourCarName").textContent=cars[data.selected].name;$("playerCar").textContent=cars[data.selected].emoji;$("carName").textContent=cars[data.selected].name;$("carDesc").textContent=cars[data.selected].desc;$("speedStat").textContent=cars[data.selected].speed}
function renderCars(){$("carList").innerHTML=cars.map((c,i)=>{let own=data.owned.includes(i),sel=data.selected===i;return `<div class="car-option ${sel?"selected":""}"><div class="emoji">${c.emoji}</div><div class="details"><b>${c.name}</b><small>${c.desc} · SPEED ${c.speed}★</small></div><button ${own?"":""} data-car="${i}" ${sel?"disabled":""}>${sel?t("used"):own?t("use"):t("buy")+" "+c.cost}</button></div>`}).join("");$("carList").querySelectorAll("button").forEach(b=>b.onclick=()=>carAction(+b.dataset.car))}
function carAction(i){if(data.owned.includes(i)){data.selected=i;showModal("🚘",t("selected"),cars[i].name);soundEffect("buy")}else if(data.coins>=cars[i].cost){data.coins-=cars[i].cost;data.owned.push(i);data.selected=i;showModal("✨",t("buySuccess"),cars[i].name);soundEffect("buy")}else{showModal("🪙",t("need"),`${t("locked")} ${cars[i].cost-data.coins} ${t("coins")}`)}save();renderStats();renderCars()}
function renderLeader(){let arr=[...data.leaderboard].sort((a,b)=>b.score-a.score).slice(0,10);if(!arr.length)arr=[{name:"—",score:0}];$("leaderList").innerHTML=arr.map((p,i)=>`<div class="leader-row"><div class="rank">#${i+1}</div><b>${escapeHtml(p.name||"Player")}${playerName&&(p.name||"").toLowerCase()===playerName.toLowerCase()?' <small class="player-name">(YOU)</small>':''}</b><span>${p.score} WPM</span></div>`).join("")}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function start(){if(!playerName){pendingStartAfterNickname=true;openNickModal();return}cleanupMatch();if(!musicOn)startMusic();active=true;index=0;correct=0;total=0;words=Array.from({length:20},()=>pick(lang==="kh"?wordsKH:wordsEN));started=Date.now();$("typingInput").disabled=false;$("typingInput").value="";$("typingInput").focus();$("status").textContent=t("running");$("startBtn").disabled=true;$("feedback").textContent="";showWord();$("playerCar").textContent=cars[data.selected].emoji;$("playerCar").style.left="0";$("progressFill").style.width="0";$("rivalCar").style.left="0";$("rivalProgressFill").style.width="0";soundEffect("start");if(playMode==="multi")seekOpponent();clearTimeout(timeout);timeout=setTimeout(endRace,60000)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function showWord(){$("wordPrompt").textContent=words[index]||"🏁";$("typedCount").textContent=`${index} / 20`;const queue=$("upcomingWords");if(queue){queue.innerHTML=words.slice(index,index+6).map((word,i)=>`<span class="word-chip ${i===0?"current-word":""}">${escapeHtml(word)}</span>`).join("");} }
function onType(){if(!active)return;let val=$("typingInput").value.trim();total++;if(val===words[index]){correct++;index++;$("typingInput").value="";$("feedback").textContent=t("correct");$("feedback").style.color="var(--cyan)";$("playerCar").style.left=Math.min(92,index/20*92)+"%";$("progressFill").style.width=(index/20*100)+"%";updateOnlineProgress();soundEffect("key");if(index>=20){endRace(true);return}showWord()}else if(val.length>=words[index].length){$("feedback").textContent=t("wrong");$("feedback").style.color="var(--pink)"}updateMetrics()}
function updateMetrics(){let min=Math.max((Date.now()-started)/60000,.01),wpm=Math.round(correct/min);$("wpm").textContent=wpm;$("accuracy").textContent=Math.round(correct/Math.max(total,1)*100)+"%"}
function endRace(finished=false){if(!active)return;active=false;clearTimeout(timeout);$("typingInput").disabled=true;$("startBtn").disabled=false;$("status").textContent=t("finish");updateMetrics();let wpm=+$("wpm").textContent,win=finished&&index>=20;let reward=win?Math.max(30,Math.round(wpm*1.4)+cars[data.selected].speed*5):Math.max(5,Math.round(wpm*.25));data.coins+=reward;if(win)data.wins++;data.best=Math.max(data.best,wpm);data.leaderboard.push({name:playerName||"Racer",score:wpm,at:Date.now()});data.leaderboard.sort((a,b)=>b.score-a.score);data.leaderboard=data.leader.slice(0,10);save();saveCloudScore(wpm);if(matchRef&&cloudUid)matchRef.update({progress:100,finished:true,updatedAt:Date.now()}).catch(()=>{});if(cpuTimer){clearInterval(cpuTimer);cpuTimer=null}renderStats();renderLeader();soundEffect(win?"win":"end");showModal(win?"🏆":"⏱️",t("won"),(win?t("winText"):t("tryText")).replace("{coins}",reward).replace("{wpm}",wpm));$("feedback").textContent=win?"🏆 FINISH!":"Race over";$("feedback").style.color=win?"var(--yellow)":"var(--muted)"}
function showModal(emoji,title,body){$("modalEmoji").textContent=emoji;$("modalTitle").textContent=title;$("modalBody").textContent=body;$("modal").classList.remove("hidden")}
function soundEffect(type){if(!sound)return;try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();let notes={key:660,buy:880,start:440,win:990,end:260};let osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type="square";osc.frequency.value=notes[type]||440;gain.gain.setValueAtTime(.035,audioCtx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.12);osc.connect(gain);gain.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+.13)}catch(e){}}
$("startBtn").onclick=start;$("resetBtn").onclick=()=>{cleanupMatch();if(active){active=false;clearTimeout(timeout)}$("typingInput").disabled=true;$("startBtn").disabled=false;$("status").textContent=t("ready");index=0;$("wordPrompt").textContent=t("prompt");$("typingInput").value="";$("playerCar").style.left="0";$("progressFill").style.width="0";$("wpm").textContent="0";$("accuracy").textContent="100%";$("typedCount").textContent="0 / 20";$("feedback").textContent=t("feedback")};
$("typingInput").addEventListener("input",onType);$("langBtn").onclick=()=>{lang=lang==="en"?"kh":"en";localStorage.setItem("nakriLang",lang);if(active){active=false;clearTimeout(timeout);$("typingInput").disabled=true;$("startBtn").disabled=false}renderText()};$("soundBtn").onclick=()=>{sound=!sound;renderText()};
function startMusic(){const m=$("bgMusic");m.volume=.28;const p=m.play();if(p&&p.then){p.then(()=>{musicOn=true;renderText()}).catch(()=>{musicOn=false;renderText()})}else{musicOn=true;renderText()}}
$("musicBtn").onclick=()=>{const m=$("bgMusic");if(musicOn){m.pause();musicOn=false;renderText()}else{startMusic()}};$("modalClose").onclick=()=>$("modal").classList.add("hidden");$("modal").onclick=e=>{if(e.target===$("modal"))$("modal").classList.add("hidden")};
function openNickModal(){$("nickModal").classList.remove("hidden");$("nicknameInput").value=playerName;$("nicknameInput").focus()}
function saveNickname(){let n=$("nicknameInput").value.trim().replace(/\s+/g," ");if(n.length<2){$("nickError").textContent="Please enter at least 2 characters.";return}if(/[<>]/.test(n)){$("nickError").textContent="Please use a simple nickname.";return}playerName=n;localStorage.setItem("nakriPlayerName",playerName);data.leaderboard=data.leaderboard.map(p=>p.name==="You"?{...p,name:playerName}:p);save();if(cloudReady&&cloudUid)cloudDb.ref("racePlayers/"+cloudUid).update({nickname:playerName,online:true}).catch(()=>{});$("nickModal").classList.add("hidden");$("nickBtn").textContent="👤 "+playerName;renderLeader();if(pendingStartAfterNickname){pendingStartAfterNickname=false;start()}}
$("saveNickBtn").onclick=saveNickname;$("nicknameInput").addEventListener("keydown",e=>{if(e.key==="Enter")saveNickname()});$("nickBtn").onclick=()=>{if(!active)openNickModal()};
if(playerName){$("nickBtn").textContent="👤 "+playerName;$("nickModal").classList.add("hidden")}else{setTimeout(openNickModal,150)}
renderText();

$("singleModeBtn").onclick=()=>setMode("single");$("multiModeBtn").onclick=()=>setMode("multi");setMode("multi");setupCloud();
