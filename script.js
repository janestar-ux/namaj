// ─── DATA ───
const CITIES = [
  { name:'Dhaka',      lat:23.8103, lon:90.4125, qibla:277.5 },
  { name:'Chittagong', lat:22.3569, lon:91.7832, qibla:276.8 },
  { name:'Sylhet',     lat:24.8949, lon:91.8687, qibla:278.1 },
  { name:'Rajshahi',   lat:24.3745, lon:88.6042, qibla:279.2 },
  { name:'Khulna',     lat:22.8456, lon:89.5403, qibla:277.9 },
  { name:'Barishal',   lat:22.7010, lon:90.3535, qibla:277.6 },
  { name:'Comilla',    lat:23.4607, lon:91.1809, qibla:277.3 },
  { name:'Mymensingh', lat:24.7471, lon:90.4203, qibla:278.0 },
  { name:'Rangpur',    lat:25.7439, lon:89.2752, qibla:279.5 },
  { name:'Ishwardi',   lat:24.1264, lon:89.0665, qibla:279.3 },
  { name:'Gazipur',    lat:23.9999, lon:90.4203, qibla:277.6 },
];

const PRAYER_META = [
  { key:'Fajr',    icon:'🌙', arabic:'الفجر',  desc:'Pre-dawn prayer' },
  { key:'Sunrise', icon:'🌅', arabic:'الشروق', desc:'Sunrise (not a prayer)', info:true },
  { key:'Dhuhr',   icon:'☀️', arabic:'الظهر',  desc:'Midday prayer' },
  { key:'Asr',     icon:'🌤', arabic:'العصر',  desc:'Afternoon prayer' },
  { key:'Maghrib', icon:'🌆', arabic:'المغرب', desc:'Sunset prayer' },
  { key:'Isha',    icon:'🌃', arabic:'العشاء', desc:'Night prayer' },
];

const ARABIC_DAYS = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];

// ─── MADHAB DATA (accurate per fiqh) ───
const MADHAB_DATA = {
  hanafi: {
    note: '<strong style="color:var(--gold)">Ḥanafī:</strong> All voluntary (nafl) and makeup (qaḍā) prayers strictly prohibited. Fard with a cause (janāzah, sajdah) permitted except at istiwa\'. Category: <em>Makrūh Taḥrīmān</em>.',
    windows: [
      { windowBefore: 0, windowAfter: 20, label:'Sunrise', name:'At Sunrise (Shurūq)', arabic:'عند الشروق', icon:'🌅', desc:'From when sun begins to rise until it clears the horizon and turns white (~20 min). Hadith: "Do not pray at sunrise or sunset." — Sahih Muslim 831.' },
      { windowBefore: 10, windowAfter: 0, label:'Dhuhr',   name:'Solar Noon (Istiwa\')', arabic:'عند الاستواء', icon:'☀️', desc:'~10 min before Dhuhr when sun is at zenith. Makrūh Taḥrīmān for ALL prayers including fard. Ends when Dhuhr time begins. — Abu Dawud 3192.' },
      { windowBefore: 15, windowAfter: 0, label:'Maghrib', name:'Before Sunset (Ghurūb)', arabic:'عند الغروب', icon:'🌇', desc:'From ~15 min before sunset until sun sets. Asr fard already prayed is not affected. Nafl & qaḍā prohibited. — Sahih Muslim 831.' },
    ]
  },
  shafi: {
    note: '<strong style="color:var(--gold)">Shāfiʿī:</strong> Three times prohibited. Importantly, <em>Asr fard of the day</em> may be prayed at sunset if not yet performed. Nafl is prohibited at all three times. Category: <em>Ḥarām</em> (per Nawawī).',
    windows: [
      { windowBefore: 0, windowAfter: 15, label:'Sunrise', name:'At Sunrise (Shurūq)', arabic:'عند الشروق', icon:'🌅', desc:'From beginning of sunrise until sun fully rises and turns white (~15 min). Based on Sahih Muslim 831 & Bukhari 585.' },
      { windowBefore: 5, windowAfter: 0,  label:'Dhuhr',   name:'Solar Noon (Istiwa\')', arabic:'عند الاستواء', icon:'☀️', desc:'Exact moment sun is at zenith (~5 min). Shortest of the three windows. Applies to nafl; Shāfiʿī fard is debated but generally avoided. — Nawawī, Al-Majmūʿ.' },
      { windowBefore: 15, windowAfter: 0, label:'Maghrib', name:'Before Sunset (Ghurūb)', arabic:'عند الغروب', icon:'🌇', desc:'~15 min before sunset. Exception: Asr fard of that day is permitted to be performed even here. Nafl strictly prohibited.' },
    ]
  },
  maliki: {
    note: '<strong style="color:var(--gold)">Mālikī:</strong> Two primary prohibited times (sunrise & sunset). Solar noon only <em>disliked</em> on non-Friday days. Fard prayers are generally NOT prohibited at any time — only nafl. Category: <em>Makrūh Tanzīhī</em> (less severe).',
    windows: [
      { windowBefore: 0, windowAfter: 15, label:'Sunrise', name:'At Sunrise (Shurūq)', arabic:'عند الشروق', icon:'🌅', desc:'From sunrise until sun rises a spear\'s length (~15 min). Applies to nafl prayers. Fard prayers with a cause are permitted per Mālikī fiqh. — Mukhtasar Khalīl.' },
      { windowBefore: 10, windowAfter: 0, label:'Dhuhr',   name:'Solar Noon (Istiwa\')', arabic:'عند الاستواء', icon:'☀️', desc:'Disliked (makrūh tanzīhī) before Dhuhr on non-Friday days only. Friday (Jumu\'ah): permitted to pray nafl until adhan. Lighter prohibition than other madhabs.' },
      { windowBefore: 15, windowAfter: 0, label:'Maghrib', name:'Before Sunset (Ghurūb)', arabic:'عند الغروب', icon:'🌇', desc:'From ~15 min before sunset. Asr fard must be prayed even if it falls here. Only nafl is disliked. — Ibn Rushd, Bidāyat al-Mujtahid.' },
    ]
  },
  hanbali: {
    note: '<strong style="color:var(--gold)">Ḥanbalī:</strong> Three prohibited times, strictly applied. Both nafl AND fard without a cause are prohibited. Fard with a cause (janāzah on the ground, making up missed prayer) is <em>permitted</em>. Category: <em>Ḥarām</em>.',
    windows: [
      { windowBefore: 0, windowAfter: 20, label:'Sunrise', name:'At Sunrise (Shurūq)', arabic:'عند الشروق', icon:'🌅', desc:'From when sun\'s disc appears until it fully rises and turns white (~20 min). Ḥanbalī is strictest here — even fard without cause is prohibited. — Ibn Qudāmah, Al-Mughnī.' },
      { windowBefore: 10, windowAfter: 0, label:'Dhuhr',   name:'Solar Noon (Istiwa\')', arabic:'عند الاستواء', icon:'☀️', desc:'~10 min before Dhuhr. All prayers (fard & nafl) prohibited without a cause. Exception: Jumu\'ah day — permitted to pray nafl before Jumu\'ah salat.' },
      { windowBefore: 20, windowAfter: 0, label:'Maghrib', name:'Before Sunset (Ghurūb)', arabic:'عند الغروب', icon:'🌇', desc:'From ~20 min before sunset (Ḥanbalī uses a wider window). All prayers without cause prohibited. Exception: if Asr was missed due to forgetfulness, pray immediately.' },
    ]
  }
};

let selectedCity   = CITIES.find(c=>c.name==='Dhaka') || CITIES[0];
let prayerTimes    = {};
let nextPrayer     = null;
let muteState      = {};
let selectedDate   = new Date();
let selectedMadhab = 'hanafi';

// ─── CALC ENGINE ───
const DEG = Math.PI/180, RAD = 180/Math.PI;

function calcPrayerTimes(date, lat, lon){
  const Y=date.getFullYear(), M=date.getMonth()+1, D=date.getDate();
  const A=Math.floor((14-M)/12), y=Y+4800-A, m=M+12*A-3;
  const JD=D+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)
           -Math.floor(y/100)+Math.floor(y/400)-32045;
  const n=JD-2451545.0, T=n/36525.0;
  const L0=((280.46646+36000.76983*T)%360+360)%360;
  const M0=((357.52911+35999.05029*T-0.0001537*T*T)%360+360)%360;
  const Mr=M0*DEG;
  const C=(1.914602-0.004817*T-0.000014*T*T)*Math.sin(Mr)
         +(0.019993-0.000101*T)*Math.sin(2*Mr)
         +0.000289*Math.sin(3*Mr);
  const sunLon=L0+C;
  const appLon=sunLon-0.00569-0.00478*Math.sin((125.04-1934.136*T)*DEG);
  const eps0=23.439291111-0.013004167*T-0.0000001639*T*T+0.0000005036*T*T*T;
  const eps=(eps0+0.00256*Math.cos((125.04-1934.136*T)*DEG))*DEG;
  const sinDec=Math.sin(eps)*Math.sin(appLon*DEG);
  const dec=Math.asin(sinDec);
  const RA_rad=Math.atan2(Math.cos(eps)*Math.sin(appLon*DEG),Math.cos(appLon*DEG));
  const RA_h=(RA_rad*RAD/15+24)%24;
  const EqT=(L0/15)-RA_h;
  const solarNoonUTC=12-lon/15-EqT;

  function hourAngle(altDeg){
    const cosH=(Math.sin(altDeg*DEG)-Math.sin(lat*DEG)*sinDec)/(Math.cos(lat*DEG)*Math.cos(dec));
    if(cosH<-1||cosH>1)return null;
    return Math.acos(cosH)*RAD/15;
  }

  const asrAlt=Math.atan(1/(2+Math.tan(Math.abs(lat*DEG-dec))))*RAD;
  const asrHA=hourAngle(asrAlt);
  const fajrHA=hourAngle(-18), sunriseHA=hourAngle(-0.8333), ishaHA=hourAngle(-18);

  return {
    Fajr:    hrsToFmt(solarNoonUTC-(fajrHA??1.5)+6),
    Sunrise: hrsToFmt(solarNoonUTC-(sunriseHA??0.1)+6),
    Dhuhr:   hrsToFmt(solarNoonUTC+0.0333+6),
    Asr:     hrsToFmt(solarNoonUTC+(asrHA??4)+6),
    Maghrib: hrsToFmt(solarNoonUTC+(sunriseHA??0.1)+0.0333+6),
    Isha:    hrsToFmt(solarNoonUTC+(ishaHA??1.5)+6),
  };
}

function hrsToFmt(h){
  h=((h%24)+24)%24;
  const totalMin=Math.round(h*60), fH=Math.floor(totalMin/60)%24, fM=totalMin%60;
  const ap=fH<12?'AM':'PM', h12=fH%12||12;
  return `${h12}:${String(fM).padStart(2,'0')} ${ap}`;
}

function parseTime12(t){
  const [time,ap]=t.split(' ');
  let [h,m]=time.split(':').map(Number);
  if(ap==='PM'&&h!==12)h+=12;
  if(ap==='AM'&&h===12)h=0;
  return h*60+m;
}

// ─── HIJRI ───
function getHijri(date){
  return new Intl.DateTimeFormat('en-u-ca-islamic',{day:'numeric',month:'long',year:'numeric'}).format(date);
}

// ─── DATE HELPERS ───
function isToday(d){
  const t=new Date();
  return d.getFullYear()===t.getFullYear()&&d.getMonth()===t.getMonth()&&d.getDate()===t.getDate();
}
function toDateInputVal(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function onDateChange(val){
  if(!val){resetToToday();return;}
  const[y,m,d]=val.split('-').map(Number);
  selectedDate=new Date(y,m-1,d);
  loadAll(); updateViewingLabel();
}
function resetToToday(){
  selectedDate=new Date();
  const dp=document.getElementById('datePicker');
  if(dp)dp.value=toDateInputVal(selectedDate);
  loadAll(); updateViewingLabel();
}
function updateViewingLabel(){
  const el=document.getElementById('viewingLabel');
  if(el)el.textContent=isToday(selectedDate)?'':
    `Viewing ${selectedDate.toLocaleDateString('en-BD',{day:'numeric',month:'short',year:'numeric'})}`;
}

// ─── CITY GRID ───
function buildCityGrid(){
  document.getElementById('cityGrid').innerHTML=CITIES.map(c=>`
    <button class="city-btn ${c.name===selectedCity.name?'active':''}"
      onclick="selectCity('${c.name}')"
      aria-pressed="${c.name===selectedCity.name?'true':'false'}">${c.name}</button>
  `).join('');
}
function selectCity(name){
  selectedCity=CITIES.find(c=>c.name===name);
  buildCityGrid(); loadAll(); updateQibla();
}

// ─── LOAD ALL ───
function loadAll(){
  prayerTimes=calcPrayerTimes(selectedDate,selectedCity.lat,selectedCity.lon);
  buildPrayerGrid();
  buildWeeklyTable();
  buildProhibitedGrid();
  updateHeader(selectedDate);
  updateStats();
  updateCountdown();
}

// ─── HEADER ───
function updateHeader(date){
  document.getElementById('arabicDay').textContent=ARABIC_DAYS[date.getDay()];
  document.getElementById('engDate').textContent=date.toLocaleDateString('en-BD',{
    weekday:'long',year:'numeric',month:'long',day:'numeric'
  });
  const h=getHijri(date);
  document.getElementById('hijriDate').textContent=h;
  document.getElementById('hijriDateMob').textContent=h;
}

// ─── PRAYER GRID ───
function buildPrayerGrid(){
  const grid=document.getElementById('prayerGrid');
  const now=new Date(), nowMin=now.getHours()*60+now.getMinutes();
  const viewingToday=isToday(selectedDate);
  const order=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
  let active=null; nextPrayer=null;
  if(viewingToday){
    for(let i=0;i<order.length;i++){
      const t=parseTime12(prayerTimes[order[i]]);
      if(nowMin<t){nextPrayer={name:order[i],min:t};break;}
      active=order[i];
    }
    if(!nextPrayer)nextPrayer={name:'Fajr',min:parseTime12(prayerTimes['Fajr'])+1440};
  }
  grid.innerHTML=PRAYER_META.filter(p=>p.key!=='Sunrise').map(p=>{
    const isActive=viewingToday&&p.key===active;
    const isNext=viewingToday&&nextPrayer&&p.key===nextPrayer.name;
    return `
    <div class="prayer-card p-5 ${isActive?'active-prayer':''}" role="listitem"
      style="${isActive?'border-color:var(--gold-light);background:var(--gold-pale);':''}"
      aria-label="${p.key} prayer at ${prayerTimes[p.key]}">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="text-3xl mb-1" aria-hidden="true">${p.icon}</div>
          <div class="amiri text-base mb-0.5" style="color:var(--ink-dim)">${p.arabic}</div>
          <div class="text-prayer-name">${p.key}</div>
          <div class="text-xs mt-0.5" style="color:var(--ink-dim)">${p.desc||''}</div>
        </div>
        <div class="flex flex-col items-end gap-2">
          ${isActive?`<span class="badge-current">Current</span>`:''}
          ${isNext?`<span class="badge-next">Next</span>`:''}
          <button class="adhan-btn ${muteState[p.key]?'muted':''}"
            onclick="toggleMute('${p.key}',this)"
            aria-label="${muteState[p.key]?'Unmute':'Mute'} ${p.key} alert"
            title="${muteState[p.key]?'Unmute alert':'Mute alert'}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              ${muteState[p.key]
                ?'<line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>'
                :'<path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>'}
            </svg>
          </button>
        </div>
      </div>
      <div class="text-prayer-time">${prayerTimes[p.key]}</div>
    </div>`;
  }).join('');
}

function toggleMute(prayer){
  muteState[prayer]=!muteState[prayer];
  buildPrayerGrid();
}

// ─── STATS ───
function updateStats(){
  document.getElementById('statSunrise').textContent=prayerTimes['Sunrise'];
  document.getElementById('statSunset').textContent=prayerTimes['Maghrib'];
  const rise=parseTime12(prayerTimes['Sunrise']), set=parseTime12(prayerTimes['Maghrib']);
  const diff=set-rise;
  document.getElementById('statDayLength').textContent=`${Math.floor(diff/60)}h ${diff%60}m`;
}

// ─── COUNTDOWN ───
function updateCountdown(){
  if(!isToday(selectedDate)){
    document.getElementById('cdH').textContent='--';
    document.getElementById('cdM').textContent='--';
    document.getElementById('cdS').textContent='--';
    document.getElementById('nextPrayerLabel').textContent='—';
    document.getElementById('dayProgress').style.width='0%';
    return;
  }
  const now=new Date(), nowMin=now.getHours()*60+now.getMinutes()+now.getSeconds()/60;
  const order=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
  let found=null;
  for(const p of order){
    const t=parseTime12(prayerTimes[p]);
    if(nowMin<t){found={name:p,min:t};break;}
  }
  if(!found)found={name:'Fajr',min:parseTime12(prayerTimes['Fajr'])+1440};

  const diffSec=Math.max(0,Math.round((found.min-nowMin)*60));
  const h=Math.floor(diffSec/3600), m=Math.floor((diffSec%3600)/60), s=diffSec%60;
  document.getElementById('cdH').textContent=String(h).padStart(2,'0');
  document.getElementById('cdM').textContent=String(m).padStart(2,'0');
  document.getElementById('cdS').textContent=String(s).padStart(2,'0');
  document.getElementById('nextPrayerLabel').textContent=found.name;

  const fajr=parseTime12(prayerTimes['Fajr']), isha=parseTime12(prayerTimes['Isha']);
  const pct=Math.min(100,Math.max(0,(nowMin-fajr)/(isha-fajr)*100));
  document.getElementById('dayProgress').style.width=pct+'%';

  const nowM=now.getHours()*60+now.getMinutes();
  for(const p of order){
    const t=parseTime12(prayerTimes[p]);
    if(nowM===t&&now.getSeconds()<5&&!muteState[p]){
      showNotif(`🕌 ${p} time has begun — ${prayerTimes[p]}`);
    }
  }
  if(now.getSeconds()<2)buildProhibitedGrid();
}

function showNotif(msg){
  const b=document.getElementById('notifBanner');
  document.getElementById('notifText').textContent=msg;
  b.classList.remove('hidden');
  setTimeout(()=>b.classList.add('hidden'),8000);
}

// ─── MADHAB ───
function switchMadhab(id, btn){
  selectedMadhab=id;
  document.querySelectorAll('.madhab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('madhabNoteText').innerHTML=MADHAB_DATA[id].note;
  buildProhibitedGrid();
}

// ─── PROHIBITED TIMES ───
function fmtMinutes(m){
  m=((m%1440)+1440)%1440;
  const h=Math.floor(m/60),mn=m%60,ap=h<12?'AM':'PM',h12=h%12||12;
  return `${h12}:${String(mn).padStart(2,'0')} ${ap}`;
}

function buildProhibitedGrid(){
  const grid=document.getElementById('prohibitedGrid');
  const now=new Date(), nowM=now.getHours()*60+now.getMinutes();
  const madhab=MADHAB_DATA[selectedMadhab];
  const zones=madhab.windows.map(w=>{
    const anchor=parseTime12(prayerTimes[w.label]);
    return {...w, start:anchor+(-w.windowBefore||0), end:anchor+(w.windowAfter||0)};
  });
  grid.innerHTML=zones.map(z=>{
    const isNow=nowM>=z.start&&nowM<z.end;
    return `
    <div class="prohibited-card ${isNow?'active-prohibited':''}" role="listitem"
      aria-label="${z.name}${isNow?' — currently in effect':''}">
      <div class="flex items-start justify-between mb-3">
        <span class="text-2xl" aria-hidden="true">${z.icon}</span>
        ${isNow?`<span class="badge-now">🚫 Now</span>`:`<span class="badge-forbidden">Forbidden</span>`}
      </div>
      <div class="amiri text-base mb-1" style="color:var(--red-dark)">${z.arabic}</div>
      <div class="lora text-base font-semibold mb-1" style="color:var(--ink)">${z.name}</div>
      <div class="lora text-lg font-bold mb-2" style="color:var(--red-dark)">
        ${fmtMinutes(z.start)} – ${fmtMinutes(z.end)}
      </div>
      <p class="text-sm leading-relaxed" style="color:var(--ink-mid)">${z.desc}</p>
    </div>`;
  }).join('');
}

// ─── WEEKLY TABLE ───
function buildWeeklyTable(){
  const body=document.getElementById('weeklyBody');
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today=new Date();
  let rows='';
  for(let i=0;i<7;i++){
    const d=new Date(selectedDate); d.setDate(selectedDate.getDate()+i);
    const pt=calcPrayerTimes(d,selectedCity.lat,selectedCity.lon);
    const isSel=i===0;
    const isRT=d.getFullYear()===today.getFullYear()&&d.getMonth()===today.getMonth()&&d.getDate()===today.getDate();
    const isFri=d.getDay()===5;
    rows+=`<tr class="weekly-row ${isSel?'selected':''}" ${isSel?'aria-current="date"':''}>
      <td class="py-3 pr-4">
        <span class="lora text-sm font-semibold ${isFri?'':''}${isRT?' text-teal-600':''}" style="${isFri?'color:var(--gold);font-weight:700;':''}">${days[d.getDay()]}</span>
        <span class="block text-xs" style="color:var(--ink-dim)">${d.getDate()}${isRT?' <span style="color:var(--gold);font-size:0.5rem">●</span>':''}</span>
      </td>
      ${['Fajr','Dhuhr','Asr','Maghrib','Isha'].map(p=>`
        <td class="py-3 px-2 text-center text-sm ${isSel?'font-bold':'font-normal'}" style="${isSel?'color:var(--gold);':''}">${pt[p]}</td>
      `).join('')}
    </tr>`;
  }
  body.innerHTML=rows;
}

// ─── QIBLA ───
function updateQibla(){
  const q=selectedCity.qibla;
  document.getElementById('qiblaAngle').textContent=q+'°';
  document.getElementById('qiblaCity').textContent=`from ${selectedCity.name}`;
  document.getElementById('qiblaNeedle').style.transform=`translate(-50%,-100%) rotate(${q}deg)`;
  document.getElementById('qiblaGrid').innerHTML=CITIES.map(c=>`
    <div class="qibla-city-card ${c.name===selectedCity.name?'active':''}" onclick="selectCity('${c.name}')"
      role="button" tabindex="0" aria-label="${c.name} qibla ${c.qibla} degrees">
      <div class="text-xs mb-1" style="color:var(--ink-dim)">${c.name}</div>
      <div class="lora text-base font-bold" style="color:var(--gold)">${c.qibla}°</div>
    </div>
  `).join('');
}

// ─── TABS ───
function switchTab(tab, btn){
  document.querySelectorAll('.tab-content').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el=>{el.classList.remove('active');el.setAttribute('aria-selected','false');});
  document.getElementById('tab-'+tab).classList.add('active');
  btn.classList.add('active'); btn.setAttribute('aria-selected','true');
}
function switchTabMob(tab, btn){
  document.querySelectorAll('.tab-content').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.mob-nav-btn').forEach(el=>el.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  btn.classList.add('active');
}

// ─── FADE IN ───
function animateIn(){
  document.querySelectorAll('.fade-up').forEach((el,i)=>{
    el.style.transition=`opacity 0.55s ease ${i*0.1}s, transform 0.55s ease ${i*0.1}s`;
    setTimeout(()=>{el.style.opacity='1';el.style.transform='translateY(0)';},30);
  });
}

// ─── INIT ───
window.addEventListener('load',()=>{
  selectedDate=new Date();
  const dp=document.getElementById('datePicker');
  if(dp)dp.value=toDateInputVal(selectedDate);
  buildCityGrid();
  loadAll();
  updateQibla();
  animateIn();
  setInterval(()=>{ if(isToday(selectedDate))updateCountdown(); },1000);
});