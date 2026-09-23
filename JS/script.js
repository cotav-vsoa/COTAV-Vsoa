const burger = document.getElementById('burger');
const navlinks = document.getElementById('navlinks');
const mobileOverlay = document.getElementById('mobileMenuOverlay');

function __T(s){
  try { if (window.I18N && I18N.c) return I18N.c(s); } catch(_){}
  return s;
}

function toggleMenu() {
  const isOpen = navlinks.classList.toggle('open');
  burger.classList.toggle('active', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  if (mobileOverlay) mobileOverlay.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

burger.addEventListener('click', toggleMenu);

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', () => {
    navlinks.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navlinks.classList.remove('open');
  burger.classList.remove('active');
  burger.setAttribute('aria-expanded', 'false');
  if (mobileOverlay) mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
}, {threshold:0.15});
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  /* ══════════════════════════════════════════════════════════════════
     PUBLICACIONES DE INSTAGRAM — poné las imágenes en img/posts/
     y completá el array con el path y el link al post.
  ══════════════════════════════════════════════════════════════════ */
  var IG_POSTS = [
    { img: '../img/Instagram/1.jpg', link: 'https://www.instagram.com/p/Daoc9PoimSU/' },
    { img: '../img/Instagram/2.jpg', link: 'https://www.instagram.com/p/DZQX2drERKQ/' },
    { img: '../img/Instagram/3.jpg', link: 'https://www.instagram.com/p/DYYRXvWCts3/' },
    { img: '../img/Instagram/4.jpg', link: 'https://www.instagram.com/p/DYNi5GkEVjW/' },
    { img: '../img/Instagram/5.jpg', link: 'https://www.instagram.com/p/DVUJUmNEaXU/' },
  ];

  function renderIG(){
    var grid = document.getElementById('ig-grid');
    if(!grid || IG_POSTS.length === 0) return;
    grid.innerHTML = '';
    IG_POSTS.forEach(function(p){
      var a = document.createElement('a');
      a.className = 'ig-card lockframe';
      a.href = p.link;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML =
        '<span class="lc-tl"></span><span class="lc-tr"></span><span class="lc-bl"></span><span class="lc-br"></span>' +
        '<div class="ig-img-wrapper">' +
          '<img src="' + p.img + '" alt="Post COTAV" loading="lazy">' +
          '<div class="ig-hover-overlay">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>' +
            '<span>VER EN INSTAGRAM</span>' +
          '</div>' +
        '</div>';
      grid.appendChild(a);
    });
  }
  renderIG();

  /* ══════════════════════════════════════════════════════════════════
     RASTREADOR DE PILOTOS — agregá acá tu roster (ver instrucciones en
     el HTML, justo arriba de <div id="pilot-grid">).
  ══════════════════════════════════════════════════════════════════ */
 
  var PILOTS = [
  { name: 'Juan Pablo G.',cid: 1562806, callsign: 'FAG-212', indicativo: '"CONDOR"' },
  { name: 'Bruno C.',   cid: 1462350, callsign: 'FAG-213', indicativo: '"RAYO"' },
  { name: 'Alexis A.',       cid: 0,        callsign: 'FAG-222', indicativo: '"LOBO"' },
  { name: 'Emiliano P.',   cid: 1665183, callsign: 'FAG-228', indicativo: '"DELTA"' },
  { name: 'Alexis D.',        cid: 1665608, callsign: 'FAG-229', indicativo: '"CUERVO"' },
  { name: 'Thiago P.',    cid: 1502178, callsign: 'FAG-230', indicativo: '"DRAGON"' },
  { name: 'Joaquín Q.',      cid: 1712199, callsign: 'FAG-236', indicativo: '"DAGA"' },
  { name: 'Agustin L.',    cid: 1282428, callsign: 'FAG-246', indicativo: '"PUMA"' },
  { name: 'Emmanuel D.',    cid: 1835877, callsign: 'FAG-251', indicativo: '"TERO"' },
  { name: 'Joel C.',  cid: 2005108, callsign: 'FAG-255', indicativo: '"MAMBA"' },
  { name: 'Facundo B.',    cid: 1785540, callsign: 'FAG-256', indicativo: '"COBRA"' },
];

// ═════════════════════════════════════════════════════════════════
// MAPA — estilo VATSIM Radar
// ══════════════════════════════════════

let map = null;
if(document.getElementById('vatsim-map')){
  map = L.map('vatsim-map', { attributionControl: false }).setView([-34.6, -58.4], 5);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=cb1_3sya_1_43376c38911c7e4517362145', { maxZoom: 19 }).addTo(map);
  map.on('click', clearAllRoutes);
}

let currentMarkers = {};
let previousAltitudes = {};
let routeLayers = {};
let trackHistory = {};
let trackLines = {};
let selectedPilot = null;

// Aeropuertos
let airportsDB = null;
let airportsDBPromise = null;
function loadAirportsDB(){
  if(airportsDBPromise) return airportsDBPromise;
  airportsDBPromise = fetch('https://cdn.jsdelivr.net/gh/mwgg/Airports/airports.json')
    .then(res => res.json())
    .then(data => { airportsDB = data; return data; })
    .catch(() => { airportsDB = {}; return {}; });
  return airportsDBPromise;
}
loadAirportsDB();

function airportDivIcon(code, kind){
  return L.divIcon({
    className: 'vm-airport-marker',
    html: `<div class="vm-apt-dot ${kind === 'arr' ? 'arr' : ''}"></div><div class="vm-apt-code">${code}</div>`,
    iconSize: [0, 0],
    iconAnchor: [4, 4]
  });
}

function findAirport(db, code){
  if(!code || !db) return null;
  if(db[code]) return db[code];
  return Object.values(db).find(a => a.icao === code) || null;
}

// ─── RUTA: volado (dorado) + restante (celeste punteado) + aeropuertos ───
function drawRouteForPilot(cid, fp){
  clearAllRoutes();
  if(!fp) return;
  const depCode = fp.departure;
  const arrCode = fp.arrival;
  if(!depCode && !arrCode) return;

  loadAirportsDB().then(db => {
    const marker = currentMarkers[cid];
    if(!marker) return;
    const curLatLng = marker.getLatLng();
    const dep = depCode ? findAirport(db, depCode) : null;
    const arr = arrCode ? findAirport(db, arrCode) : null;
    const layers = [];

    if(dep){
      // Línea dorada: aeropuerto de salida → posición actual
      layers.push(L.polyline([[dep.lat, dep.lon], curLatLng], { color:'#cc9c5c', weight:3, opacity:0.9 }).addTo(map));
      layers.push(L.marker([dep.lat, dep.lon], { icon: airportDivIcon(depCode, 'dep') }).addTo(map));
    }
    if(arr){
      // Línea celeste punteada: posición actual → aeropuerto de llegada
      layers.push(L.polyline([curLatLng, [arr.lat, arr.lon]], { color:'#7fb8f2', weight:3, opacity:0.85, dashArray:'10 6' }).addTo(map));
      layers.push(L.marker([arr.lat, arr.lon], { icon: airportDivIcon(arrCode, 'arr') }).addTo(map));
    }

    routeLayers[cid] = layers;
    selectedPilot = cid;

    // Encuadrar cámara para ver toda la ruta
    const pts = [curLatLng];
    if(dep) pts.push([dep.lat, dep.lon]);
    if(arr) pts.push([arr.lat, arr.lon]);
    if(pts.length > 1) map.fitBounds(pts, { padding: [80, 80], maxZoom: 8 });
  });
}

function clearAllRoutes(){
  if(!map) return;
  Object.keys(routeLayers).forEach(cid => clearRouteForPilot(cid));
  selectedPilot = null;
}

function clearRouteForPilot(cid){
  if(!map) return;
  if(routeLayers[cid]){
    routeLayers[cid].forEach(layer => map.removeLayer(layer));
    delete routeLayers[cid];
  }
}

// ─── TRACK TRAIL: breadcrumb ───
function updateTrackHistory(cid, lat, lng){
  if(!trackHistory[cid]) trackHistory[cid] = [];
  trackHistory[cid].push([lat, lng]);
  if(trackHistory[cid].length > 40) trackHistory[cid].shift();
}

function drawTrackTrail(cid){
  if(trackLines[cid]) map.removeLayer(trackLines[cid]);
  const pts = trackHistory[cid];
  if(!pts || pts.length < 2) return;
  trackLines[cid] = L.polyline(pts, {
    color: '#cc9c5c', weight: 1.5, opacity: 0.5, dashArray: '3 4', lineCap: 'round'
  }).addTo(map);
}

// ─── SILUETAS DE AERONAVES ───
const FALLBACK_ICONS = {
  f16: `<path d="M2 13.5 L22 13.5 L19 9 Q12 7 5 9 Z M12 4 L13 9 L11 9 Z M8 22 L9 18 L11 18 L10.5 22 Z M13 22 L13.5 18 L15 18 L16 22 Z"/>`,
  a4: `<path d="M2 14 Q12 6 22 14 L20 16 Q12 12 4 16 Z M12 2 L13 8 L11 8 Z M11 22 L12 17.5 L13 22 Z"/>`,
  heli: `<path d="M6 12 Q12 9 18 12 Q12 14 6 12 Z M11 12 L11 18 L9 19 L9 20 L12 19 L15 20 L15 19 L13 18 L13 12 Z M2 12 L8 12 M16 12 L22 12" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
  ga: `<path d="M11 2 L13 2 L13 9 L19 10 L19 12 L13 11 L13 17 L16 18 L16 20 L12 19 L8 20 L8 18 L11 17 L11 11 L5 12 L5 10 L11 9 Z"/>`,
  jet: `<path d="M10 2 L14 2 L14 8 L22 12 L22 14 L14 11 L14 17 L18 19 L18 21 L12 19 L6 21 L6 19 L10 17 L10 11 L2 14 L2 12 L10 8 Z"/>`,
  fighter: `<path d="M7 2 L17 2 L15 8 L22 15 L22 17 L15 13 L14 18 L17 20 L17 22 L12 20 L7 22 L7 20 L10 18 L9 13 L2 17 L2 15 L9 8 Z"/>`,
  milTransport: `<path d="M3 8 Q12 4 21 8 L21 11 L3 11 Z M5 11 L6 19 L10 19 L9 11 Z M14 11 L15 19 L19 19 L20 11 Z M2 11 L2 13 L4 13 L4 11 Z M20 11 L20 13 L22 13 L22 11 Z"/>`,
  c130: `<path d="M1 10 Q12 6 23 10 L23 12 L1 12 Z M4 12 L5 19 L9 19 L8 12 Z M16 12 L15 19 L19 19 L20 12 Z M1 12 L1 14 L3 14 L3 12 Z M21 12 L21 14 L23 14 L23 12 Z M11 5 L13 5 L13 10 L11 10 Z"/>`,
  f18: `<path d="M2 13 L22 13 L19 9 Q12 6 5 9 Z M8 21 L9 18 L12 18 L12 21 Z M16 21 L15 18 L12 18 Z"/>`
};

const SPECIFIC_ICON = {
  F16: 'f16', A4: 'a4', A4AR: 'a4', F18: 'f18', F15: 'f18', F14: 'f18',
  C130: 'c130', C295: 'c130', L100: 'c130', KC130: 'c130', C17: 'c130', C5: 'c130', A400: 'c130',
  H60: 'heli', UH60: 'heli', S70: 'heli', S76: 'heli', B412: 'heli', B212: 'heli',
  CH47: 'heli', A109: 'heli', H125: 'heli', H145: 'heli', R44: 'heli', R22: 'heli',
  C172: 'ga', C152: 'ga', C182: 'ga', PA28: 'ga', PA34: 'ga', SR22: 'ga', DA40: 'ga',
  T6: 'ga', BE36: 'ga', BE20: 'ga', BE58: 'ga', TEX2: 'ga',
  MIRA: 'fighter', IA58: 'fighter', IA63: 'fighter', TUCA: 'fighter',
  TC12: 'ga'
};

/* ─── ESCALAS RELATIVAS DE AERONAVES (referencia: IA-58 Pucará) ───
   Tarjetas/stats/popups: altura proporcional a envergadura real con
   compresión ^0.6 y piso 0.9. El MAPA usa la fórmula de VATSIM Radar:
   ancho = clamp(envergadura/2, 12, 35) px. */
var AC_REF_SPAN = 14.45; // envergadura IA-58 Pucará (m)
var AC_WINGSPAN = {
  IA58: 14.45,
  C130: 40.41, L100: 40.41, KC130: 40.41, C295: 25.81, C17: 51.75, C5: 67.88, A400: 42.40,
  C160: 40.00, IL76: 50.50, B52: 56.39, A300: 44.84, A310: 43.90, K35E: 39.88, E3CF: 44.42,
  F16: 9.45, A4: 8.38, A4AR: 8.38, F18: 13.62, F15: 13.05, F14: 19.55,
  MIRA: 8.22, IA63: 9.69, TUCA: 11.14, TEX2: 10.19, T6: 10.19,
  F35: 10.70, F22: 13.56, EUFI: 9.94, L39: 9.46, PC21: 9.10, HAWK: 9.94, SU27: 14.70, A10: 17.42,
  BE20: 16.61, BE58: 11.53, TC12: 17.65, BE36: 10.19, BE9L: 13.25, BE60: 13.39, B190: 17.64,
  C152: 10.17, C172: 11.00, C182: 10.97, C206: 10.97, C208: 15.92, C310: 11.12,
  C402: 13.45, C414: 13.45, PA28: 10.92, PA32: 10.97, PA34: 11.85, PA44: 11.78,
  SR20: 11.68, SR22: 11.68, DA20: 10.87, DA40: 11.94, DA42: 13.42, M20P: 10.97,
  B737: 34.32, B738: 35.79, B739: 35.79, B752: 38.05, B753: 38.05, B789: 60.12,
  B788: 60.12, B744: 68.40, B748: 68.40, B772: 60.90, B773: 60.90, B762: 47.57, B763: 47.57,
  B721: 32.92, B722: 32.92, B703: 44.42, B712: 28.45, MD80: 32.87, MD11: 51.60, DC10: 50.40,
  A20N: 35.80, A318: 34.10, A319: 34.10, A320: 35.80, A321: 35.80,
  A332: 60.30, A333: 60.30, A343: 60.30, A359: 64.75, A388: 79.75,
  E135: 20.04, E145: 20.04, E170: 26.00, E175: 26.00, E190: 28.72, E195: 28.72,
  CRJ2: 21.44, CRJ7: 23.24, CRJ9: 24.85, AT42: 24.57, AT72: 27.05,
  DH8A: 27.43, DH8C: 27.43, DH8D: 28.42, DHC6: 19.81, DHC7: 28.35,
  SF34: 21.44, SF50: 10.57,
  F28: 25.07, LJ35: 12.04, C25B: 16.26,
  C525: 13.24, C560: 16.26, C56X: 16.26, C680: 20.19, C700: 19.19, C750: 19.22,
  GLF4: 23.72, GLF5: 28.50, GLF6: 28.50, GLEX: 28.50, FA50: 18.86, FA7X: 26.21, FA8X: 26.21,
  PC12: 16.23, PC24: 17.06, P180: 14.03, B350: 14.30,
  H60: 16.36, UH60: 16.36, S70: 16.36, CH47: 18.29, B412: 14.01,
  S76: 13.41, S92: 18.90, B206: 10.16, B407: 10.67, B430: 12.80, B212: 14.63,
  A109: 11.00, A139: 13.80, H125: 10.69, H135: 10.20, H145: 12.80, H160: 12.00, H225: 16.20,
  EC35: 10.20, R44: 10.06, R22: 7.67, R66: 9.45
};
window.acScale = function(code){
  var s = AC_WINGSPAN[String(code || '').toUpperCase()];
  if(!s) return 1;
  return Math.max(0.9, Math.pow(s / AC_REF_SPAN, 0.6));
};
window.acIconStyle = function(code, base){
  return 'height:' + Math.round(base * acScale(code)) + 'px;width:auto;';
};
/* Tamaño de icono en el MAPA, idéntico al de VATSIM Radar:
   ancho = clamp(envergadura/2, 12, 35) px (referencia: radar vatsim, coef*30 clamp 12-35). */
window.mapAcWidth = function(code){
  var s = AC_WINGSPAN[String(code || '').toUpperCase()];
  if(!s) return 24;
  return Math.round(Math.min(35, Math.max(12, s / 2)));
};

let svgCache = {};

function getFallbackIcon(icaoType){
  if(!icaoType) return FALLBACK_ICONS.jet;
  const t = icaoType.toUpperCase();
  const key = SPECIFIC_ICON[t];
  return key ? FALLBACK_ICONS[key] : FALLBACK_ICONS.jet;
}

function loadAircraftSvg(icaoType, containerEl){
  if(!icaoType || !containerEl) return;
  const t = icaoType.toUpperCase();
  if(svgCache[t] === 'loading' || svgCache[t] === '') return;
  if(svgCache[t]){
    containerEl.innerHTML = svgCache[t];
    return;
  }
  svgCache[t] = 'loading';
  const path = `../icons/aircraft/${t.toLowerCase()}.svg`;
  fetch(path)
    .then(r => { if(!r.ok) throw Error(); return r.text(); })
    .then(svg => {
      const wrap = svg.replace(/^<svg([^>]*)>/,
        '<svg$1 fill="currentColor" style="width:100%;height:100%">');
      svgCache[t] = wrap;
      if(containerEl && containerEl.isConnected) containerEl.innerHTML = svgCache[t];
    })
    .catch(() => { svgCache[t] = ''; });
}

// ─── UPDATE MAP: renderizar todo ───
function updateMap(livePilots) {
  if(!map) return;
  Object.keys(currentMarkers).forEach(cid => {
    map.removeLayer(currentMarkers[cid]);
    delete currentMarkers[cid];
  });

  const bounds = [];

  PILOTS.forEach(p => {
    const live = livePilots ? livePilots.find(lp => String(lp.cid) === String(p.cid)) : null;
    if (!live || !live.latitude || !live.longitude) {
      delete previousAltitudes[p.cid];
      delete trackHistory[p.cid];
      if(trackLines[p.cid]) { map.removeLayer(trackLines[p.cid]); delete trackLines[p.cid]; }
      return;
    }

    const heading = live.heading || 0;
    const onGround = (live.groundspeed || 0) < 40 && (live.altitude || 0) < 1000;
    const icaoType = live.flight_plan && live.flight_plan.aircraft_short ? live.flight_plan.aircraft_short : '';
    const fallbackSvg = getFallbackIcon(icaoType);
    const mapW = mapAcWidth(icaoType);

    const rotatedIcon = L.divIcon({
      className: 'vatsim-marker',
      html: `
        <div class="vm-plane ${onGround ? 'vm-ground' : ''}" style="width:${mapW}px;height:${mapW}px;transform:rotate(${heading}deg);"><svg viewBox="0 0 24 24" width="28" height="28">${fallbackSvg}</svg></div>
        <div class="vm-label" style="top:${mapW + 6}px;">
          <span class="vm-callsign">${live.callsign}</span>
        </div>`,
      iconSize: [0, 0],
      iconAnchor: [mapW / 2, mapW / 2]
    });

    const marker = L.marker([live.latitude, live.longitude], { icon: rotatedIcon }).addTo(map);
    requestAnimationFrame(function(){ loadAircraftSvg(icaoType, marker.getElement()?.querySelector('.vm-plane')); });

    updateTrackHistory(p.cid, live.latitude, live.longitude);
    drawTrackTrail(p.cid);

    const fp = live.flight_plan;
    const route = fp ? `${fp.departure || '????'} → ${fp.arrival || '????'}` : 'Sin plan de vuelo';
    const aircraft = fp && fp.aircraft_short ? fp.aircraft_short : '—';
    const prevAlt = previousAltitudes[p.cid];
    const altDelta = (typeof prevAlt === 'number') ? (live.altitude || 0) - prevAlt : 0;
    const trend = altDelta > 150 ? '▲' : altDelta < -150 ? '▼' : '—';
    const trendColor = altDelta > 150 ? '#4ade80' : altDelta < -150 ? '#f87171' : '#7c8ba3';
    previousAltitudes[p.cid] = live.altitude || 0;
    const squawk = live.transponder || '----';

    marker.bindPopup(`
      <div class="vm-popup">
        <div class="vm-popup-head vm-popup-roster">
          <b>${live.callsign}</b>
          <span>${p.name} · ${p.indicativo || ''}</span>
        </div>
        <div class="vm-popup-grid">
          <div class="vm-popup-cell"><span>Aeronave</span><b><span class="ac-cell">${aircraft}<img src="../icons/aircraft/${aircraft.toLowerCase()}.svg?v=3" class="ac-icon" style="${acIconStyle(aircraft, 14)}" onerror="this.style.display=\'none\'"></span></b></div>
          <div class="vm-popup-cell"><span>Squawk</span><b>${squawk}</b></div>
          <div class="vm-popup-cell"><span>Ruta</span><b>${route}</b></div>
          <div class="vm-popup-cell"><span>Altitud</span><b>${onGround ? 'Suelo' : Math.round(live.altitude || 0).toLocaleString('es-AR') + ' ft'}</b></div>
          <div class="vm-popup-cell"><span>Velocidad</span><b>${live.groundspeed || 0} kt</b></div>
          <div class="vm-popup-cell"><span>Rumbo</span><b>${Math.round(heading)}°</b></div>
        </div>
      </div>`, { className: 'vm-popup-wrap', closeButton: true, maxWidth: 320 });

    marker.on('click', () => drawRouteForPilot(p.cid, fp));
    marker.on('popupclose', clearAllRoutes);

    currentMarkers[p.cid] = marker;
    bounds.push([live.latitude, live.longitude]);
  });

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
  }
}

  function renderPilots(livePilots, statusNote){
    const grid = document.getElementById('pilot-grid');
    const onlineCountEl = document.getElementById('tracker-online-count');
    const totalCountEl = document.getElementById('tracker-total-count');
    const trackerSection = document.getElementById('pilotos');
    if(!grid) return;

    if(PILOTS.length === 0){
      grid.innerHTML = `<div class="empty-state"><svg><use href="#ic-headset"/></svg><b>Todavía no hay pilotos cargados en el roster</b><p>Agregalos en PILOTS (nombre + CID), dentro del &lt;script&gt; del archivo — ver instrucciones arriba.</p></div>`;
      onlineCountEl.textContent = '0';
      totalCountEl.textContent = 'Roster vacío';
      if(trackerSection) trackerSection.style.display = 'none';
      return;
    }

    let onlineCount = 0;
    grid.innerHTML = '';

    const sorted = [...PILOTS].sort((a, b) => {
      const aOn = livePilots ? livePilots.some(lp => lp.cid === a.cid) : false;
      const bOn = livePilots ? livePilots.some(lp => lp.cid === b.cid) : false;
      if (aOn !== bOn) return aOn ? -1 : 1;
      return (a.callsign || '').localeCompare(b.callsign || '');
    });
    sorted.forEach(p => {
      const live = livePilots ? livePilots.find(lp => lp.cid === p.cid) : null;
      const card = document.createElement('div');
      card.className = live ? 'pilot-card lockframe pilot-online' : 'pilot-card lockframe pilot-offline';
      let meCs = ''; try { if(!sessionStorage.getItem('cotav_pilot') && sessionStorage.getItem('cotav_pilot')) sessionStorage.removeItem('cotav_pilot'); try{ localStorage.removeItem('cotav_pilot'); }catch(e){} meCs = (sessionStorage.getItem('cotav_pilot') || '').trim(); } catch(e){}
      if(meCs && p.callsign && p.callsign.toUpperCase() === meCs.toUpperCase()) card.classList.add('pilot-me');
      const corners = '<span class="lc-tl"></span><span class="lc-tr"></span><span class="lc-bl"></span><span class="lc-br"></span>';

      const callsignBadge = p.callsign ? ` <span style="color: #ff9d00; font-weight: bold; font-size: 0.85em;">[${p.callsign}]</span>` : '';
      var roleLabel = roleOfCallSign(p.callsign) === 'piloto_escuela' ? 'Piloto Escuela' : 'Piloto';
      const roleBadge = ` <span class="pilot-role${roleLabel === 'Piloto Escuela' ? ' role-school' : ''}">${roleLabel}</span>`;
      const subInfo = [
        p.indicativo ? `"${p.indicativo}"` : ''
      ].filter(Boolean).join(' · ');

      const metaText = subInfo ? `<div style="font-size: 0.75em; opacity: 0.75; margin-top: 2px;">${subInfo}</div>` : '';

      if(live){
        onlineCount++;
        const fp = live.flight_plan;
        const route = fp ? `${fp.departure || '????'} → ${fp.arrival || '????'}` : 'Sin plan de vuelo cargado';
        const aircraft = fp && fp.aircraft_short ? fp.aircraft_short : '—';
        card.innerHTML = `${corners}
          <div class="pilot-top">
            <div>
              <div class="pilot-name">${p.name}${callsignBadge}${roleBadge}</div>
              <div class="pilot-cid">CID ${p.cid}</div>
              ${metaText}
            </div>
            <span class="pilot-status online"><span class="dot"></span>En vuelo</span>
          </div>
          <div class="pilot-flight"><b>${live.callsign}</b> · <span class="ac-cell">${aircraft}<img src="../icons/aircraft/${aircraft.toLowerCase()}.svg?v=3" class="ac-icon" style="${acIconStyle(aircraft, 18)}" onerror="this.style.display=\'none\'"></span><br>${route}<br>FL${Math.round((live.altitude||0)/100)} · ${live.groundspeed||0} kt</div>
          <a href="https://stats.vatsim.net/stats/${p.cid}" target="_blank" rel="noopener" class="op-link">Ver historial <svg style="width:13px;height:13px"><use href="#ic-arrow"/></svg></a>`;
      } else {
        card.innerHTML = `${corners}
          <div class="pilot-top">
            <div>
              <div class="pilot-name">${p.name}${callsignBadge}${roleBadge}</div>
              <div class="pilot-cid">CID ${p.cid}</div>
              ${metaText}
            </div>
            <span class="pilot-status offline"><span class="dot"></span>Sin conexión</span>
          </div>
          <div class="pilot-flight">No está volando en este momento.</div>
          <a href="https://stats.vatsim.net/stats/${p.cid}" target="_blank" rel="noopener" class="op-link">Ver historial <svg style="width:13px;height:13px"><use href="#ic-arrow"/></svg></a>`;
      }
      grid.appendChild(card);
    });

    onlineCountEl.textContent = onlineCount;
    var __LC = function(){ try { if (window.I18N && I18N.locale) return I18N.locale(); } catch(_){} return 'es-AR'; };
    if(statusNote){
      totalCountEl.textContent = PILOTS.length + ' ' + __T('en el roster') + ' · ' + __T('datos de las') + ' ' + statusNote + ' (' + __T('sin conexión') + ')';
    } else {
      totalCountEl.textContent = PILOTS.length + ' ' + __T('en el roster') + ' · ' + __T('actualizado') + ' ' + new Date().toLocaleTimeString(__LC(), {hour:'2-digit', minute:'2-digit'});
    }
    if(trackerSection) trackerSection.style.display = onlineCount > 0 ? '' : 'none';
}

  async function refreshPilots(){
    if(PILOTS.length === 0){ renderPilots(null); updateMap(null); return; }
    try{
      const res = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
      const data = await res.json();
      const cache = { at: new Date().toISOString(), pilots: (data.pilots||[]).filter(p => PILOTS.some(x => p.callsign === x.callsign)) };
      try { localStorage.setItem('cotav_live_cache', JSON.stringify(cache)); } catch(e){}
      renderPilots(data.pilots || []);
      updateMap(data.pilots || []);
    }catch(err){
      let cached = null;
      try { cached = JSON.parse(localStorage.getItem('cotav_live_cache') || 'null'); } catch(e){}
      const totalCountEl = document.getElementById('tracker-total-count');
      const errMsg = err instanceof TypeError
        ? 'Sin conexión a Internet — verificá tu red o abrí desde GitHub Pages (file:// bloquea el fetch).'
        : ('Error de VATSIM: ' + (err.message || 'respuesta inválida — recargá con Ctrl+F5.'));
      if (cached && Array.isArray(cached.pilots) && (Date.now() - new Date(cached.at).getTime()) < 10*60*1000){
        const t = new Date(cached.at).toLocaleTimeString(__LC(), {hour:'2-digit', minute:'2-digit'});
        renderPilots(cached.pilots, t);
        updateMap(cached.pilots);
      } else {
        if(totalCountEl) totalCountEl.textContent = errMsg + ' Reintentando…';
        renderPilots(null);
        updateMap(null);
      }
    }
  }
  refreshPilots();
  setInterval(refreshPilots, 60000);

/* ══════════════════════════════════════════════════════════════════
   CALENDARIO DE EVENTOS
   - COTAV: agregar con isCOTAV: true en COTAV_EVENTS
   - VATSIM ARGENTINA: se sincroniza de la API de VATSIM (división SAM + aeropuertos SA); agregar fijos con isCOTAV: false
   - EVENTOS VSOA: eventos de otras VSOAs, se cargan manualmente con isVSOA: true en COTAV_EVENTS
═════════════════════════════════════════════════════════════════ */
const COTAV_EVENTS = [
  {
    name: 'FERRY F16 II',
    start: '2026-09-26T22:00:00Z',
    end: '2026-09-03T22:00:00Z',
    airports: ['EKSP', 'SAOC'],
    desc: 'Segundo vuelo ferry de los F-16 de la Fuerza Aerea Argentina.',
    link: '',
    isCOTAV: true,
    participating: '',
  },
  {
    name: 'Exercice Pitch Black',
    start: '2026-07-18T17:30:00Z',
    end: '2026-08-01:30:00Z',
    airports: ['YPTN', 'YPDN'],
    desc: 'Welcome to the Northern Territory — where the scenery is spectacular, the weather is unforgiving, and the crocodiles are eagerly waiting for anyone brave enough to ignore the "No Swimming" signs and become their next floating entrée.',
    link: 'https://my.vatsim.net/events/uruguayan-vfr-tour',
    isVSOA: true,
    participating: 'La COTAV estará presente',
  },
  {
    name: 'SABE - SCEL Fly-In',
    start: '2026-08-23T20:00:00Z',
    end: '2026-08-23T23:00:00Z',
    airports: ['SABE', 'SCEL'],
    desc: 'Cruzá los Andes en una de las rutas más impresionantes de Sudamérica. Aeroparque Jorge Newbery (SABE) a Santiago de Chile (SCEL).',
    link: 'https://my.vatsim.net/events/sabe-scel-fly-in',
    isCOTAV: false,
    participating: '',
  },
  {
    name: 'SARR Fly-Inn',
    start: '2026-08-09T20:00:00Z',
    end: '2026-08-09T23:00:00Z',
    airports: ['SARI', 'SARE', 'SARF', 'SARC'],
    desc: 'Operación en la FIR Resistencia (SARR). Aeropuerto principal: SARI – Cataratas del Iguazú. Cobertura ATC completa y vistas espectaculares.',
    link: 'https://my.vatsim.net/events/sarr-fly-inn-2',
    isCOTAV: false,
    participating: 'La COTAV estará presente',
  },
];

function formatDateART(iso) {
  const d = new Date(iso);
  const loc = __LC();
  return d.toLocaleDateString(loc, { weekday:'short', day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', timeZone:'America/Argentina/Buenos_Aires' }).toUpperCase();
}
function __LC(){ try { if (window.I18N && I18N.locale) return I18N.locale(); } catch(_){} return 'es-AR'; }

function stripHTML(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function classifyEvents(vatsimEvents) {
  const cotav = [];
  const vsoa = [];
  const argar = [];

  COTAV_EVENTS.forEach(e => {
    if (e.isCOTAV) { cotav.push({ ...e, isCOTAV: true }); }
    else if (e.isVSOA) { vsoa.push({ ...e, isVSOA: true }); }
    else { argar.push({ ...e, isVatsimAR: true }); }
  });

  const argarLinks = new Set(argar.map(a => a.link));

  vatsimEvents.forEach(e => {
    const isSAM = (e.organisers || []).some(o => o.division === 'SAM');
    if (!isSAM) return;
    const card = {
      name: e.name,
      start: e.startTime || e.start_time,
      end: e.endTime || e.end_time,
      airports: (e.airports || []).map(a => (typeof a === 'string' ? a : a.icao)).filter(Boolean),
      desc: stripHTML(e.shortDescription || e.short_description || ''),
      link: e.link || '',
    };
    if (!card.start) return;
    const hasARG = card.airports.some(code => /^SA/i.test(code));
    if (hasARG && !argarLinks.has(card.link)) { argar.push({ ...card, isVatsimAR: true }); }
  });

  cotav.sort((a, b) => new Date(a.start) - new Date(b.start));
  vsoa.sort((a, b) => new Date(a.start) - new Date(b.start));
  argar.sort((a, b) => new Date(a.start) - new Date(b.start));

  const now = Date.now();
  const isPast = function(e) {
    const t = new Date(e.end || e.start).getTime();
    return (!isNaN(t) ? t : new Date(e.start).getTime()) < now;
  };
  const upcoming = function(arr) { return arr.filter(e => !isPast(e)); };
  const past = cotav.concat(vsoa).concat(argar)
    .filter(isPast)
    .sort((a, b) => new Date(b.start) - new Date(a.start))
    .slice(0, 5);

  return { cotav: upcoming(cotav), vsoa: upcoming(vsoa), argar: upcoming(argar), past };
}

function toGoogleDT(iso){
  if(!iso) return '';
  const d = new Date(iso);
  if(isNaN(d.getTime())) return '';
  const p = function(n){ return String(n).padStart(2, '0'); };
  return d.getUTCFullYear() + p(d.getUTCMonth()+1) + p(d.getUTCDate()) + 'T' + p(d.getUTCHours()) + p(d.getUTCMinutes()) + p(d.getUTCSeconds()) + 'Z';
}
function googleCalLink(e){
  const s = toGoogleDT(e.start);
  if(!s) return '';
  let en = toGoogleDT(e.end);
  if(!en){ en = toGoogleDT(new Date(new Date(e.start).getTime() + 2*3600*1000)); }
  const q = ['text=' + encodeURIComponent(e.name), 'dates=' + s + '/' + en, 'details=' + encodeURIComponent(e.desc || ''), 'location=' + encodeURIComponent((e.airports || []).join(', '))].join('&');
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&' + q;
}

function renderCalendarEvents(events, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  if (events.length === 0) {
    grid.innerHTML = '<div class="cal-empty">No hay eventos programados en este momento.</div>';
    return;
  }
  const logoMap = {
    cotav: '../img/Logo COTAV/Logo Cotav.png?v=4',
    vatsim: '../img/Logo Vatsim Argentina/Logo Vatsim Argentina.png',
    vsoa: '../img/Logo VSOA/Logo VSOA.png'
  };
  grid.innerHTML = '';
  events.forEach(e => {
    const card = document.createElement('div');
    card.className = 'cal-card lockframe';
    const airports = (e.airports || []).map(a => '<span>' + a + '</span>').join('');
    const desc = e.desc ? '<div class="cal-desc">' + e.desc + '</div>' : '';
    const orgClass = e.isCOTAV ? 'cotav' : (e.isVatsimAR ? 'vatsim-ar' : 'vsoa');
    const orgLabel = e.isCOTAV ? 'COTAV' : (e.isVatsimAR ? 'VATSIM ARGENTINA' : 'VSOA');
    const logoKey = e.isCOTAV ? 'cotav' : (e.isVatsimAR ? 'vatsim' : 'vsoa');
    const logoSrc = logoMap[logoKey] || '';
    const logoHtml = logoSrc ? '<img src="' + logoSrc + '" class="cal-logo' + (logoKey === 'vsoa' ? ' cal-logo-lg' : '') + '" alt="' + orgLabel + '">' : '';
    const link = e.link ? '<a href="' + e.link + '" target="_blank" rel="noopener" class="op-link">Ver evento <svg style="width:13px;height:13px"><use href="#ic-arrow"/></svg></a>' : '';
    const gcal = googleCalLink(e) ? '<a href="' + googleCalLink(e) + '" target="_blank" rel="noopener" class="op-link">Agregar a Google Calendar <svg style="width:13px;height:13px"><use href="#ic-arrow"/></svg></a>' : '';
    const badge = e.participating ? '<span class="cal-badge">COTAV PRESENTE</span>' : '';
    const footer = '<div class="cal-footer"><div class="cal-footer-top"><span class="cal-org ' + orgClass + '">' + orgLabel + '</span>' + logoHtml + '</div>' + badge + '<div class="cal-footer-bottom">' + link + gcal + '</div></div>';
    card.innerHTML =
      '<span class="lc-tl"></span><span class="lc-tr"></span><span class="lc-bl"></span><span class="lc-br"></span>' +
      '<div class="cal-date"><span class="dot"></span>' + formatDateART(e.start) + '</div>' +
      '<h4>' + e.name + '</h4>' +
      (airports ? '<div class="cal-airports">' + airports + '</div>' : '') +
      desc +
      footer;
    grid.appendChild(card);
  });
}

function initCalendar() {
  const tabs = document.querySelectorAll('.cal-tab');
  const grids = {
    cotav: document.getElementById('cal-grid-cotav'),
    vsoa: document.getElementById('cal-grid-vsoa'),
    argar: document.getElementById('cal-grid-argar'),
    past: document.getElementById('cal-grid-past'),
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      const target = tab.dataset.tab;
      Object.keys(grids).forEach(key => {
        grids[key].style.display = key === target ? '' : 'none';
      });
    });
  });

  const setCalStatus = function(text){
    const el = document.getElementById('cal-status');
    if(el) el.textContent = text;
  };
  const renderAll = function(result){
    renderCalendarEvents(result.cotav, 'cal-grid-cotav');
    renderCalendarEvents(result.vsoa, 'cal-grid-vsoa');
    renderCalendarEvents(result.argar, 'cal-grid-argar');
    renderCalendarEvents(result.past, 'cal-grid-past');
  };

  fetch('https://my.vatsim.net/api/v2/events/latest')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      const events = data.data || data || [];
      try { localStorage.setItem('cotav_events_cache', JSON.stringify({ at: new Date().toISOString(), events: events })); } catch(e){}
      const result = classifyEvents(events);
      renderAll(result);
      setCalStatus(__T('Sincronizado con VATSIM') + ' · ' + new Date().toLocaleTimeString(__LC(), {hour:'2-digit', minute:'2-digit'}));
    })
    .catch(function() {
      let cached = null;
      try { cached = JSON.parse(localStorage.getItem('cotav_events_cache') || 'null'); } catch(e){}
      if (cached && Array.isArray(cached.events)) {
        const result = classifyEvents(cached.events);
        renderAll(result);
        const t = new Date(cached.at).toLocaleTimeString(__LC(), {hour:'2-digit', minute:'2-digit'});
        setCalStatus(__T('Mostrando eventos guardados de las') + ' ' + t + ' (' + __T('sin conexión') + ')');
      } else {
        const result = classifyEvents([]);
        renderAll(result);
        setCalStatus('No se pudo sincronizar con VATSIM en este momento.');
      }
    });
}
initCalendar();

/* Drag-to-scroll para brig-row */
document.querySelectorAll('.brig-row').forEach(function(el){
  var isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', function(e){
    isDown = true;
    el.classList.add('grabbing');
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener('mouseleave', function(){
    isDown = false;
    el.classList.remove('grabbing');
  });
  el.addEventListener('mouseup', function(){
    isDown = false;
    el.classList.remove('grabbing');
  });
  el.addEventListener('mousemove', function(e){
    if(!isDown) return;
    e.preventDefault();
    var x = e.pageX - el.offsetLeft;
    var walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  });
});

/* ---------- login ---------- */
function normAlnum(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9]/gi,''); }
function normPass(s){ var t = String(s||'').replace(/["'\s]+/g,''); try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g,''); } catch(e){} return t.toUpperCase(); }

/* ---------- usuarios únicos (cuentas registradas en data/usuarios.json) ---------- */
var __usuariosCache = null;
function usuariosJsonUrl(){
  var p = window.location.pathname || '/';
  var segs = p.slice(0, p.lastIndexOf('/') + 1).split('/').filter(Boolean);
  if (segs.length) segs.shift();
  var ups = '';
  for (var i = 0; i < segs.length; i++) ups += '../';
  return ups + 'data/usuarios.json';
}
function fetchUsuarios(){
  if (__usuariosCache) return Promise.resolve(__usuariosCache);
  return fetch(usuariosJsonUrl(), { cache: 'no-cache' })
    .then(function(r){ if (!r.ok) throw new Error('usuarios'); return r.json(); })
    .then(function(list){
      __usuariosCache = Array.isArray(list) ? list : [];
      try { localStorage.setItem('cotav_usuarios_cache', JSON.stringify({ at: Date.now(), users: __usuariosCache })); } catch(e){}
      return __usuariosCache;
    })
    .catch(function(e){
      var cached = null;
      try { cached = JSON.parse(localStorage.getItem('cotav_usuarios_cache') || 'null'); } catch(ex){}
      if (cached && Array.isArray(cached.users) && (Date.now() - cached.at) < 10*60*1000) {
        __usuariosCache = cached.users;
        return __usuariosCache;
      }
      throw e;
    });
}

/* ---------- login contra el backend PHP de www.cotavirtual.com.ar ---------- */
var APP_API_LOGIN = 'https://www.cotavirtual.com.ar/api/login.php';

function apiLogin(callsign, password){
  var controller = null;
  try { controller = new AbortController(); } catch(ex){}
  var opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callsign: callsign, password: password }),
  };
  if (controller) {
    opts.signal = controller.signal;
    setTimeout(function(){ try { controller.abort(); } catch(ex){} }, 8000);
  }
  return fetch(APP_API_LOGIN, opts)
    .then(function(r){
      return r.json().catch(function(){ return null; }).then(function(j){
        return { status: r.status, json: j };
      });
    })
    .catch(function(){ return Promise.reject(); });
}

/* ---------- validación local (fallback cuando la API no responde) ---------- */
function clientLogin(found, pass, localHash){
  var csKey = normAlnum(found.callsign);
  sha256Hex('cotav::' + csKey + '::' + pass).then(function(h){
    h = (h || '').toLowerCase();

    /* 1) Contraseña propia cambiada en este navegador */
    if (localHash && h === String(localHash).toLowerCase()) { loginOk(found); return; }

    /* 2) Cuenta única registrada en data/usuarios.json */
    fetchUsuarios().then(function(list){
      var entry = null;
      for (var j = 0; j < list.length; j++) {
        if (normAlnum(list[j].callsign || '') === csKey) { entry = list[j]; break; }
      }
      if (entry) {
        if (entry.hash && h === String(entry.hash).toLowerCase()) { loginOk(found); return; }
        loginFail(entry);
        return;
      }
      /* 3) Piloto sin registro único: acceso inicial por indicativo */
      if (!localHash && normPass(found.indicativo) === normPass(pass)) { loginOk(found); return; }
      loginFail(null);
    }).catch(function(){
      /* Sin datos de usuarios disponibles: comportamiento original */
      if (!localHash && normPass(found.indicativo) === normPass(pass)) { loginOk(found); return; }
      loginFail(null);
    });
  });
}

function handleLogin(e) {
  e.preventDefault();
  var user = document.getElementById('loginUser').value.trim();
  var pass = document.getElementById('loginPass').value;
  var un = normAlnum(user);
  var found = null;
  for (var i = 0; i < PILOTS.length; i++) {
    var p = PILOTS[i];
    if (un && normAlnum(p.callsign) === un) { found = p; break; }
  }
  if (!found) { loginFail(null); return; }

  var csKey = normAlnum(found.callsign);
  var localHash = null;
  try { localHash = localStorage.getItem('cotav_pass_' + csKey); } catch(ex){}

  /* Paso 1: cuenta única en el backend PHP (las contraseñas reales están ahí) */
  apiLogin(user, pass).then(function(res){
    var j = res.json;
    if (j && res.status === 200 && j.ok === true) { loginOk(found); return; }
    if (j && j.not_registered) {
      /* Todavía no tiene cuenta en la base: se valida en local */
      clientLogin(found, pass, localHash);
      return;
    }
    /* Tiene cuenta pero la contraseña no coincide */
    loginFail(true);
  }).catch(function(){
    /* La API no está disponible (red/CORS): se valida en local */
    clientLogin(found, pass, localHash);
  });
}
function loginOk(p){
  try { 
    // Guardamos tanto en sessionStorage como en localStorage para mayor compatibilidad
    sessionStorage.setItem('cotav_pilot', p.callsign);
    localStorage.setItem('cotav_pilot', p.callsign);
  } catch(e){}

  // Sincronizar el avatar guardado en la navegación antes de redirigir
  try {
    var safeCs = String(p.callsign).replace(/[^a-zA-Z0-9]/g, '_');
    var savedAvatar = localStorage.getItem('cotav_avatar_' + safeCs);
    if (savedAvatar) {
      localStorage.setItem('cotav_active_avatar', savedAvatar);
    }
  } catch(e){}

  window.location.href = 'pilotos.html';
}
function loginFail(entry){
  var err = document.getElementById('loginError');
  var inp = document.getElementById('loginPass');
  if (err) {
    err.style.display = 'block';
    err.textContent = __T('Usuario o contraseña incorrectos.') + ' ' + (entry
      ? __T('(usuario: tu callsign FAG-xxx · contraseña: la que elegiste al registrarte)')
      : __T('(usuario: tu callsign FAG-xxx · contraseña: tu indicativo, ej. COBRA)'));
  }
  if (inp) inp.value = '';
}

function fnvHex(str){
  var h = 0x811c9dc5;
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  var s = h.toString(16);
  while (s.length < 8) s = '0' + s;
  return s;
}
function sha256Hex(str){
  if (window.crypto && crypto.subtle && crypto.subtle.digest) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function(buf){
      var b = new Uint8Array(buf), hex = '';
      for (var i = 0; i < b.length; i++) hex += ((b[i] >>> 4).toString(16)) + (b[i] & 15).toString(16);
      return hex;
    }).catch(function(){ return Promise.resolve(fnvHex(str)); });
  }
  return Promise.resolve(fnvHex(str));
}

/* ---------- roles ---------- */
var rolesCache = null;
function rolesJsonUrl(){
  var p = window.location.pathname || '/';
  var segs = p.slice(0, p.lastIndexOf('/') + 1).split('/').filter(Boolean);
  if (segs.length) segs.shift();
  var ups = '';
  for (var i = 0; i < segs.length; i++) ups += '../';
  return ups + 'data/roles.json';
}
function loadRoles(){
  if (rolesCache) return Promise.resolve(rolesCache);
  return fetch(rolesJsonUrl() + '?t=' + Date.now())
    .then(function(r){ if(!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function(cfg){ rolesCache = cfg || { roles: {}, asignacion: {} }; return rolesCache; })
    .catch(function(){ rolesCache = { roles: {}, asignacion: {} }; return rolesCache; });
}
function roleOfCallSign(cs){
  if (!cs) return 'anonimo';
  var r = rolesCache || {};
  if (r.asignacion && r.asignacion[cs]) return r.asignacion[cs];
  return 'piloto';
}
/* ---------- gate por rol (páginas de storage) ---------- */
/* El snippet inline en <head> de cada página de storage prepara
   window.__COTAV_GATE = { isPil, isEsc, ups } y oculta la página
   (visibility hiddden) mientras se resuelve el rol. */
function resolveStorageGate(){
  var g = window.__COTAV_GATE;
  if (!g) return;
  var cs = ''; try { cs = (sessionStorage.getItem('cotav_pilot') || '').trim(); } catch(e){}
  var role = roleOfCallSign(cs);
  var req = g.isEsc ? 'piloto_escuela' : 'piloto';
  var doc = document.documentElement;
  if (cs && role === req) {
    if (doc) { doc.removeAttribute('data-gate'); doc.style.removeProperty('visibility'); }
    return;
  }
  var dest;
  if (!cs) dest = g.ups + 'HTML/login.html';
  else if (g.isEsc) dest = g.ups + 'storage/pilotos/';
  else dest = g.ups + 'storage/escuela-de-aviacion-militar-virtual/';
  if (doc) doc.setAttribute('data-gate', 'denied');
  window.location.replace(dest);
}
function applySchoolMenu(root, dl, ui){
  console.log('[applySchoolMenu] called, root:', !!root, 'dl:', dl, 'ui:', ui);
  if (!root) return;
  var descSpan = root.querySelector('.acc-sub-btn > span');
  if (descSpan && descSpan.textContent === 'Descargas') descSpan.textContent = 'Descargas Escuela';
  var menu = root.querySelector('.acc-menu');
  if (!menu) return;
  var escuelaRoot = dl.replace(/\/+$/, '') + '/index.html';
  [].slice.call(menu.children).forEach(function(child){
    if (child.tagName !== 'A') return;
    var span = child.querySelector('span');
    if (!span) return;
    var href = child.getAttribute('href') || '';
    if (href.indexOf('index.html#operaciones') !== -1) {
      span.textContent = 'Material Aéreo Escuela';
      child.setAttribute('href', escuelaRoot);
    } else if (href.indexOf('documentacion/') !== -1) {
      span.textContent = 'Documentación Escuela';
    }
  });
}
/* ---------- i18n textos ---------- */

/* ---------- auth navbar (sesion global) ---------- */
function findPilotByCallsign(cs){
  if(!window.PILOTS || !cs) return null;
  try {
    return window.PILOTS.find(function(p){ return p.callsign && normAlnum(p.callsign) === normAlnum(cs); }) || null;
  } catch(e){ return null; }
}

function closeAccDropdown(root){
  root.classList.remove('acc-open');
  var btn = root.querySelector('.acc-btn');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function buildAccDropdown(p){
  console.log('[buildAccDropdown] called for:', p.callsign);
  var inStorage = /\/storage\//.test(location.pathname);
  var inSub = inStorage ? false : /\/brigadas\//i.test(location.pathname);
  var scRole = ''; try { scRole = roleOfCallSign && roleOfCallSign(p.callsign); } catch(e){}
  console.log('[buildAccDropdown] scRole:', scRole, 'inStorage:', inStorage, 'inSub:', inSub);
  var catRoot = (scRole === 'piloto_escuela' ? 'escuela-de-aviacion-militar-virtual/' : 'pilotos/');
  var DL = inStorage ? '../' : (inSub ? '../../storage/' + catRoot : '../storage/' + catRoot);
  var UI = inStorage ? '../HTML/' : (inSub ? '../' : '');
  var loginUrl = inStorage ? '../HTML/login.html' : (inSub ? '../login.html' : 'login.html');
  var cid = p.cid || '';
  var ic = p.indicativo ? p.indicativo.replace(/"/g,'') : '';
  var label = p.callsign + (ic ? ' \u00b7 ' + ic : '');
  var caretd = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="acc-caret-mini"><path d="M6 9l6 6 6-6"/></svg>';

  var root = document.createElement('div');
  root.className = 'nav-acc';
  root.setAttribute('data-auth-nav', '1');

  var isEscuela = scRole === 'piloto_escuela';
  var manualesHref = isEscuela ? DL + 'documentacion/MANUAL%20TEXAN/' : DL + 'documentacion/manuales/';
  var procedimientosHref = isEscuela ? '' : DL + 'documentacion/procedimientos/';
  var documentacionHref = DL + 'documentacion/';
  var materialAereoHref = isEscuela ? DL.replace(/\/+$/, '') + '/index.html' : UI + 'index.html#operaciones';
  var materialAereoLabel = isEscuela ? 'Material Aéreo Escuela' : 'Material Aéreo';

  root.innerHTML =
    '<button type="button" class="acc-btn" aria-haspopup="true" aria-expanded="false">' +
      '<span class="acc-avatar">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.3 0-8 1.7-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.3-4.7-5-8-5z"/></svg>' +
      '</span>' +
      '<span class="acc-label"></span>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="acc-caret"><path d="M6 9l6 6 6-6"/></svg>' +
    '</button>' +
    '<div class="acc-menu" role="menu">' +
      '<a href="' + UI + 'piloto.html?cid=' + cid + '" role="menuitem"><span>Perfil</span></a>' +
      '<div class="acc-sub">' +
        '<button type="button" class="acc-sub-btn"><span>Descargas</span>' + caretd + '</button>' +
        '<div class="acc-sub-body">' +
          '<div class="acc-sub sub2">' +
            '<button type="button" class="acc-sub-btn"><span>Escenarios</span>' + caretd + '</button>' +
            '<div class="acc-sub-body">' +
              '<a href="' + DL + 'escenarios-p3d/"><span>Prepar3D</span></a>' +
              '<a href="' + DL + 'escenarios-mfs/"><span>MFS 2020/24</span></a>' +
            '</div>' +
          '</div>' +
          '<div class="acc-sub sub2">' +
            '<button type="button" class="acc-sub-btn"><span>Aviones</span>' + caretd + '</button>' +
            '<div class="acc-sub-body">' +
              '<a href="' + DL + 'aviones-p3d/"><span>Prepar3D</span></a>' +
              '<a href="' + DL + 'aviones-mfs/"><span>MFS 2020/24</span></a>' +
            '</div>' +
          '</div>' +
          '<a href="' + DL + 'liveries/"><span>Liveries</span></a>' +
          '<a href="' + manualesHref + '"><span>Manuales</span></a>' +
          (procedimientosHref ? '<a href="' + procedimientosHref + '"><span>Procedimientos</span></a>' : '') +
        '</div>' +
      '</div>' +
      '<a href="' + materialAereoHref + '"><span>' + materialAereoLabel + '</span></a>' +
      '<a href="' + documentacionHref + '"><span>Documentación</span></a>' +
      '<button type="button" class="acc-logout"><span>Cerrar sesión</span></button>' +
    '</div>';

  root.querySelector('.acc-label').textContent = label;

  (function loadAccAvatar(){
    try {
      var safeCallsign = p.callsign ? String(p.callsign).replace(/[^a-zA-Z0-9]/g, '_') : 'unknown';
      var saved = localStorage.getItem('cotav_avatar_' + safeCallsign);
      if(saved){
        var avatarEl = root.querySelector('.acc-avatar');
        var img = document.createElement('img');
        img.alt = 'Foto de perfil';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.display = 'block';
        img.onload = function(){ avatarEl.innerHTML = ''; avatarEl.appendChild(img); };
        img.src = saved;
      }
    } catch(e){}
  })();

  var menu = root.querySelector('.acc-menu');
  var btn = root.querySelector('.acc-btn');

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    var open = root.classList.toggle('acc-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  menu.addEventListener('click', function(e){
    e.stopPropagation();
    var target = e.target;
    var subBtn = target.closest ? target.closest('.acc-sub-btn') : null;
    if (subBtn) {
      subBtn.parentElement.classList.toggle('open');
      return;
    }
    if (target.closest && target.closest('.acc-logout')) {
      sessionStorage.removeItem('cotav_pilot'); try{ localStorage.removeItem('cotav_pilot'); }catch(e){}
      window.location.href = loginUrl;
      return;
    }
    closeAccDropdown(root);
  });

  document.addEventListener('click', function(e){
    if (root.isConnected && !root.contains(e.target)) closeAccDropdown(root);
  });

  return root;
}

function initAuthNav() {
  console.log('[initAuthNav] starting, pathname:', location.pathname, 'sessionStorage cotav_pilot:', sessionStorage.getItem('cotav_pilot'));
  if (/login\.html$/i.test(location.pathname)) return;
  var logged = !!sessionStorage.getItem('cotav_pilot');
  console.log('[initAuthNav] logged:', logged);

  function render(btn) {
    if (!btn) return;
    if (logged) {
      btn.textContent = 'Cerrar sesión';
      btn.setAttribute('aria-label', 'Cerrar sesión');
      btn.setAttribute('role', 'button');
      btn.removeAttribute('href');
      btn.onclick = function (e) {
        e.preventDefault();
        sessionStorage.removeItem('cotav_pilot'); try{ localStorage.removeItem('cotav_pilot'); }catch(e){}
        window.location.href = 'index.html';
      };
    } else {
      btn.textContent = 'Ingresar';
      btn.setAttribute('href', 'login.html');
      btn.removeAttribute('role');
      btn.removeAttribute('aria-label');
      btn.onclick = null;
    }
  }

  function apply() {
    var cta = document.querySelector('.navcta');
    if (cta) {
      /* quitar links "Ingresar" estáticos del header (los reemplaza el auth nav) */
      cta.querySelectorAll('a[href*="login.html"]').forEach(function (a) {
        if (!a.getAttribute('data-auth-nav') && a.parentNode) a.parentNode.removeChild(a);
      });
      var oldBtn = cta.querySelector('[data-auth-nav]');
      if (oldBtn && oldBtn.parentNode) oldBtn.parentNode.removeChild(oldBtn);
      var el = null;
      if (logged) {
        var cs = sessionStorage.getItem('cotav_pilot');
        console.log('[initAuthNav] sessionStorage cotav_pilot:', cs);
        var pilot = findPilotByCallsign(cs);
        console.log('[initAuthNav] findPilotByCallsign result:', pilot);
        if (pilot) el = buildAccDropdown(pilot);
      }
      if (!el) {
        el = document.createElement('a');
        el.className = 'btn btn-ghost desktop-only';
        el.setAttribute('data-auth-nav', '1');
        render(el);
      }
      var burger = cta.querySelector('button.burger, #burger, button[id*="burger"]');
      var sumarme = cta.querySelector('a[href*="sumate"], a[data-i18n*="sumarme"], a[data-i18n*="nav.sumarme"]');
      if (sumarme) cta.insertBefore(el, sumarme);
      else if (burger) cta.insertBefore(el, burger);
      else cta.appendChild(el);
    }

    /* CTA "Sumarme": solo se ven para usuarios sin sesión */
    document.querySelectorAll('.navcta a[href="#sumate"], .mobile-nav-btn[href="#sumate"], .hero-actions a[href="#sumate"]').forEach(function (a) {
      a.style.display = logged ? 'none' : '';
    });

    var mobs = document.querySelectorAll('.mobile-nav-btn');
    mobs.forEach(function (m) {
      var href = m.getAttribute('href') || '';
      if (href.indexOf('sumate') !== -1) {
        m.style.display = logged ? 'none' : '';
        return;
      }
      if (!m.getAttribute('data-auth-nav')) {
        m.setAttribute('data-auth-nav', '1');
      }
      render(m);
      if (!logged) m.setAttribute('href', 'login.html');
    });
  }

  /* Esperamos a que carguen los roles (roles.json) ANTES de armar el menú
     desplegable, así el rol (piloto / piloto_escuela) queda bien resuelto
     desde el primer render y no hace falta "corregir" el menú después. */
  console.log('[initAuthNav] about to call apply/logged+loadRoles, logged:', logged, 'loadRoles:', typeof loadRoles);
  if (logged && typeof loadRoles === 'function') {
    loadRoles().then(function(){ console.log('[initAuthNav] loadRoles resolved'); apply(); resolveStorageGate(); }).catch(function(){ console.log('[initAuthNav] loadRoles failed'); apply(); resolveStorageGate(); });
  } else {
    console.log('[initAuthNav] calling apply directly');
    apply();
    resolveStorageGate();
  }
}

/* ---------- visor de documentos (documentacion/) ---------- */
function openDoc(url){
  var m = document.getElementById('docModal');
  if (!m) { window.open(url, '_blank', 'noopener'); return; }
  var f = document.getElementById('docFrame');
  var dl = document.getElementById('docDl');
  if (dl) dl.setAttribute('href', url);
  if (f) f.src = url + (url.indexOf('?') === -1 ? '?' : '&') + 'toolbar=0&view=FitH';
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDoc(){
  var m = document.getElementById('docModal');
  var f = document.getElementById('docFrame');
  if (f) f.removeAttribute('src');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}
(function(){
  var m = document.getElementById('docModal');
  if (!m) return;
  m.addEventListener('click', function(e){ if (e.target === m) closeDoc(); });
  var esc = m.querySelector('.doc-close');
  if (esc) esc.addEventListener('click', closeDoc);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeDoc(); });
})();
document.addEventListener('click', function(e){
  var t = e.target;
  var b = t && t.closest ? t.closest('.doc-view') : null;
  if (b) { e.preventDefault(); openDoc(b.getAttribute('data-f')); }

});

/* ----------------- Gestor de avatar de piloto ----------------- */
function gestionarAvatarPiloto(imageUrl) {
    var imgElement = document.getElementById('p-avatar-img');
    var phElement = document.getElementById('p-avatar-ph');

    if (!imgElement || !phElement) return;

    if (imageUrl && imageUrl.trim() !== "") {
        imgElement.src = imageUrl;
        imgElement.style.display = "block";
        phElement.style.display = "none";
    } else {
        imgElement.src = "";
        imgElement.style.display = "none";
        phElement.style.display = "flex";
    }
}

initAuthNav();
