const ADMIN_SAMPLE_APPLICATIONS = [
 {id:'ET-2026-001',name:'Amara Okafor',email:'amara.okafor@example.com',vehicle:'Toyota Corolla',plate:'ABC 123 XY',color:'Black',make:'Toyota',model:'Corolla',submitted:'2026-10-12',status:'Pending',note:''},
 {id:'ET-2026-002',name:'Daniel Williams',email:'daniel.w@example.com',vehicle:'Honda Civic',plate:'KJA 456 AB',color:'White',make:'Honda',model:'Civic',submitted:'2026-10-11',status:'Approved',note:'Documents checked.'},
 {id:'ET-2026-003',name:'Zainab Bello',email:'z.bello@example.com',vehicle:'Hyundai Tucson',plate:'LND 802 QZ',color:'Silver',make:'Hyundai',model:'Tucson',submitted:'2026-10-09',status:'Pending',note:''},
 {id:'ET-2026-004',name:'Michael Adeyemi',email:'m.adeyemi@example.com',vehicle:'Kia Sportage',plate:'GWA 441 TR',color:'Blue',make:'Kia',model:'Sportage',submitted:'2026-10-06',status:'Rejected',note:'Please provide a clearer ownership document.'},
 {id:'ET-2026-005',name:'Grace Thompson',email:'grace.t@example.com',vehicle:'Toyota Yaris',plate:'FST 100 MN',color:'Red',make:'Toyota',model:'Yaris',submitted:'2026-10-02',status:'Approved',note:''}
];
const ADMIN_SAMPLE_RESIDENTS = [
 {id:'RES-001',name:'Amara Okafor',email:'amara.okafor@example.com',phone:'+44 7700 900123',status:'Active'},
 {id:'RES-002',name:'Daniel Williams',email:'daniel.w@example.com',phone:'+44 7700 900234',status:'Active'},
 {id:'RES-003',name:'Zainab Bello',email:'z.bello@example.com',phone:'+44 7700 900345',status:'Active'},
 {id:'RES-004',name:'Michael Adeyemi',email:'m.adeyemi@example.com',phone:'+44 7700 900456',status:'Inactive'},
 {id:'RES-005',name:'Grace Thompson',email:'grace.t@example.com',phone:'+44 7700 900567',status:'Active'}
];
const ADMIN_SAMPLE_VEHICLES = [
 {id:'VEH-001',plate:'ABC 123 XY',make:'Toyota',model:'Corolla',resident:'Amara Okafor',status:'Active'},
 {id:'VEH-002',plate:'KJA 456 AB',make:'Honda',model:'Civic',resident:'Daniel Williams',status:'Active'},
 {id:'VEH-003',plate:'LND 802 QZ',make:'Hyundai',model:'Tucson',resident:'Zainab Bello',status:'Active'},
 {id:'VEH-004',plate:'GWA 441 TR',make:'Kia',model:'Sportage',resident:'Michael Adeyemi',status:'Inactive'},
 {id:'VEH-005',plate:'FST 100 MN',make:'Toyota',model:'Yaris',resident:'Grace Thompson',status:'Active'}
];
const ADMIN_KEYS={applications:'etagApplications',residents:'etagResidents',vehicles:'etagVehicles'};
function readAdminData(key,seed){try{const raw=localStorage.getItem(key);if(raw!==null)return JSON.parse(raw);localStorage.setItem(key,JSON.stringify(seed));return seed.map(x=>({...x}));}catch{return seed.map(x=>({...x}));}}
function saveAdminData(key,data){localStorage.setItem(key,JSON.stringify(data));}
function getApplications(){return readAdminData(ADMIN_KEYS.applications,ADMIN_SAMPLE_APPLICATIONS);}
function saveApplications(rows){saveAdminData(ADMIN_KEYS.applications,rows);}
function getResidents(){return readAdminData(ADMIN_KEYS.residents,ADMIN_SAMPLE_RESIDENTS);}
function saveResidents(rows){saveAdminData(ADMIN_KEYS.residents,rows);}
function getVehicles(){return readAdminData(ADMIN_KEYS.vehicles,ADMIN_SAMPLE_VEHICLES);}
function saveVehicles(rows){saveAdminData(ADMIN_KEYS.vehicles,rows);}
function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function initials(name){return String(name||'?').split(/\s+/).filter(Boolean).slice(0,2).map(s=>s[0].toUpperCase()).join('');}
function statusPill(status){const cls=String(status||'').toLowerCase();return `<span class="status-pill ${['pending','approved','rejected','active','inactive'].includes(cls)?cls:''}">${esc(status||'Unknown')}</span>`;}
function fmtDate(date){if(!date)return '—';const d=new Date(date+'T12:00:00');return Number.isNaN(d.getTime())?esc(date):d.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});}
function showToast(message){const el=document.getElementById('toast');if(!el)return;el.textContent=message;el.hidden=false;clearTimeout(window.__etagToastTimer);window.__etagToastTimer=setTimeout(()=>el.hidden=true,3000);}
function downloadCSV(filename,rows){if(!rows.length){showToast('There is no data to export yet.');return;}const keys=[...new Set(rows.flatMap(r=>Object.keys(r)))];const csv=[keys.join(','),...rows.map(r=>keys.map(k=>'"'+String(r[k]??'').replace(/"/g,'""')+'"').join(','))].join('\r\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast('CSV export prepared.');}
function initAdminPage(){const session=requireSession();if(!session)return null;renderUserChip(session);if(session.role!=='admin'){const main=document.querySelector('.admin-main');if(main)main.innerHTML='<section class="admin-card"><h2>Administrator access required</h2><p>This workspace is intended for the Estate Administrator role. Please sign out and sign in using the administrator demo role.</p><a class="admin-btn primary" href="login.html">Go to sign in</a></section>';document.querySelectorAll('.admin-sidebar-nav a').forEach(a=>a.setAttribute('aria-disabled','true'));return null;}wireLogout();return session;}
