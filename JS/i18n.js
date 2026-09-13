(function(){
  var I18N = window.I18N = window.I18N || {};
  var D = I18N._dict = I18N._dict || {};
  var STORE = 'faav_lang';

  /* ---------- dictionary (index) ---------- */
  D.DUMMY = { es:'', en:'' };
  D['idx.title'] = { es:'FAAV - VSOA | Fuerzas Armadas Argentinas VSOA', en:'FAAV - VSOA | Argentine Armed Forces VSOA' };
  D['idx.desc'] = { es:'comunidad argentina de simulación aérea en VATSIM. Operaciones, pilotos en vivo, calendario de eventos y brigadas de todo el país.', en:'Argentine flight simulation community on VATSIM. Operations, live pilots, events calendar and brigades across the country.' };

  D['idx.nav.institucion'] = { es:'Institución', en:'Institution' };
  D['idx.nav.operaciones'] = { es:'Operaciones', en:'Operations' };
  D['idx.nav.pilotos'] = { es:'Pilotos', en:'Pilots' };
  D['idx.nav.brigadas'] = { es:'Brigadas', en:'Brigades' };
  D['idx.nav.comunidad'] = { es:'Comunidad', en:'Community' };
  D['idx.nav.calendario'] = { es:'Calendario', en:'Calendar' };
  D['idx.nav.reglamento'] = { es:'Reglamento', en:'Regulations' };
  D['idx.nav.redes'] = { es:'REDES', en:'NETWORKS' };
  D['idx.nav.sumarme'] = { es:'Sumarme', en:'Join us' };

  D['idx.hero.h1'] = { es:'Volamos por los cielos de <em><br>Argentina</em>, en simulador.', en:'We fly the skies of <em><br>Argentina</em>, in the simulator.' };
  D['idx.hero.lead'] = { es:'Comunidad de simulación aérea virtual dedicada a recrear, con respeto y camaradería, las aeronaves y misiones que a lo largo de la historia formaron a los pilotos de las Fuerzas Armadas. Miembro certificado de VATSIM Special Operations (VSOA).', en:'Virtual flight simulation community dedicated to recreating, with respect and camaraderie, the aircraft and missions that throughout history formed the Armed Forces pilots. Certified member of VATSIM Special Operations (VSOA).' };
  D['idx.hero.cta.join'] = { es:'Sumarme a la FAAV', en:'Join the FAAV' };
  D['idx.hero.cta.ops'] = { es:'Ver operaciones', en:'View operations' };

  D['idx.mis.eyebrow'] = { es:'Bienvenida', en:'Welcome' };
  D['idx.mis.h2'] = { es:'Un lugar de entretenimiento, disciplina y compañerismo', en:'A place of entertainment, discipline and camaraderie' };
  D['idx.mis.p1'] = { es:'La FAAV es un espacio de simulación aérea sobre Microsoft Flight Simulator, Prepar3D y DCS World, con especial interés en las aeronaves de combate y transporte que visten los colores celeste y blanco tanto en el hoy como en el ayer.', en:'The FAAV is a flight simulation space on Microsoft Flight Simulator, Prepar3D and DCS World, with a special interest in the combat and transport aircraft that wear the celeste and white colors both today and in the past.' };
  D['idx.mis.p2'] = { es:'Recreamos procedimientos, operaciones y misiones reales con el máximo respeto, sin perder de vista que esto es un pasatiempo.', en:'We recreate real procedures, operations and missions with the utmost respect, keeping in mind that this is a hobby.' };
  D['idx.mis.tag'] = { es:'⚠ Aviso institucional', en:'⚠ Institutional notice' };
  D['idx.mis.notice'] = { es:'La FAAV es una organización de aviación virtual sin fines de lucro y no posee ningún tipo de relación con ningún organismo oficial de la República Argentina. En caso de buscar algún sitio oficial, visitá el siguiente link <a href="https://www.argentina.gob.ar/defensa" target="_blank" rel="noopener">https://www.argentina.gob.ar/defensa</a>.', en:'FAAV is a non-profit virtual aviation organization with no relationship of any kind with any official body of the Argentine Republic. To visit an official website, follow this link: <a href="https://www.argentina.gob.ar/defensa" target="_blank" rel="noopener">https://www.argentina.gob.ar/defensa</a>.' };

  D['idx.ops.h2'] = { es:'CONOCÉ DONDE, CÓMO Y CON QUÉ,<br>OPERAMOS EN LA FAAV', en:'FIND OUT WHERE, HOW AND WITH WHAT<br>WE OPERATE AT THE FAAV' };
  D['idx.ops.card1.p'] = { es:'Registrados como organización de Operaciones Especiales de VATSIM, operando bajo su normativa.', en:'Registered as a VATSIM Special Operations organization, operating under its regulations.' };
  D['idx.ops.card2.h'] = { es:'OPERACIONES', en:'OPERATIONS' };
  D['idx.ops.card2.p'] = { es:'Documentación, reglamentos, briefings y todo lo necesario para las operaciones de la FAAV.', en:'Documentation, regulations, briefings and everything needed for FAAV operations.' };
  D['idx.ops.card2.link'] = { es:'Ver operaciones', en:'View operations' };

  D['idx.bri.h2'] = { es:'Conoce nuestras Brigadas', en:'Meet our Brigades' };

  D['idx.com.h2'] = { es:'Mirá cómo volamos', en:'Watch how we fly' };
  D['idx.com.sub'] = { es:'Videos recomendados del canal y las últimas publicaciones de Instagram de la FAAV.', en:'Recommended videos from the channel and the latest Instagram posts from the FAAV.' };
  D['idx.com.yt.feat'] = { es:'Video destacado del canal', en:'Featured channel video' };
  D['idx.com.yt.h'] = { es:'Canal de YouTube', en:'YouTube channel' };
  D['idx.com.yt.p'] = { es:'Vuelos en formación, demos y coberturas de nuestros eventos y operaciones conjuntas.', en:'Formation flights, demos and coverage of our events and joint operations.' };
  D['idx.com.yt.link'] = { es:'Ver canal completo', en:'Watch full channel' };
  D['idx.com.ig.p'] = { es:'Capturas de cabina, formaciones y el día a día de las brigadas.', en:'Cockpit shots, formations and the day-to-day of the brigades.' };
  D['idx.com.tt.p'] = { es:'Clips de cabina, formaciones y el día a día en formato corto.', en:'Cockpit clips, formations and the day-to-day in short format.' };
  D['idx.com.ig.link'] = { es:'Ir al perfil', en:'Go to profile' };
  D['idx.com.igfeed.h'] = { es:'Publicaciones de Instagram', en:'Instagram posts' };
  D['idx.com.igfeed.link'] = { es:'Ver perfil', en:'View profile' };

  D['idx.cal.h2'] = { es:'Calendario de eventos', en:'Event calendar' };
  D['idx.cal.sub'] = { es:'Próximos eventos de VATSIM y operaciones especiales de la FAAV.', en:'Upcoming VATSIM events and FAAV special operations.' };
  D['idx.cal.tab.vsoa'] = { es:'Eventos VSOA', en:'VSOA Events' };
  D['idx.cal.tab.argar'] = { es:'VATSIM Argentina', en:'VATSIM Argentina' };
  D['idx.cal.tab.past'] = { es:'Finalizados', en:'Past' };
  D['idx.cal.subscribe'] = { es:'Suscribirme al calendario (.ics)', en:'Subscribe to the calendar (.ics)' };
  D['idx.cal.note'] = { es:'Eventos de la FAAV, de la red VATSIM VSOA (Sudamérica) y de VATSIM Argentina. Los horarios se muestran en hora local de Argentina (ART, UTC-3).', en:'Events from the FAAV, the VATSIM VSOA network (South America) and VATSIM Argentina. Times are shown in Argentine local time (ART, UTC-3).' };

  D['idx.sum.h2'] = { es:'Cómo sumarte a la FAAV', en:'How to join the FAAV' };
  D['idx.sum.s1.k'] = { es:'01 — CONTACTO', en:'01 — CONTACT' };
  D['idx.sum.s1.h'] = { es:'Seguinos en Instagram', en:'Follow us on Instagram' };
  D['idx.sum.s1.p'] = { es:'Seguinos para no perderte lo que hacemos en la FAAV, y si tenes alguna consulta, no dudes en escribirnos', en:'Follow us so you never miss what we do at the FAAV, and if you have any questions, don\'t hesitate to write to us.' };
  D['idx.sum.s2.k'] = { es:'02 — INSTRUCCIÓN', en:'02 — TRAINING' };
  D['idx.sum.s2.h'] = { es:'Formación inicial', en:'Initial training' };
  D['idx.sum.s2.p'] = { es:'Un breve proceso de instrucción para conocer procedimientos, comunicaciones y la organización interna. La formación será en Tecnam P2002 y Texan II.', en:'A brief training process to learn procedures, communications and the internal organization. Training will be on the Tecnam P2002 and Texan II.' };
  D['idx.sum.s3.k'] = { es:'03 — DESTINO', en:'03 — ASSIGNMENT' };
  D['idx.sum.s3.h'] = { es:'Asignación de brigada', en:'Brigade assignment' };
  D['idx.sum.s3.p'] = { es:'Vos elegís la brigada que quieras. Si elegís Caza, antes realizás el CEPAC; si elegís Transporte, realizás el CEPAT.', en:'You choose the brigade you want. If you choose Fighter, you complete the CEPAC first; if you choose Transport, you complete the CEPAT.' };
  D['idx.sum.cta.ig'] = { es:'Escribir por Instagram', en:'Message us on Instagram' };
  D['idx.sum.cta.reg'] = { es:'Ver reglamento', en:'View regulations' };
  D['idx.sum.cta.form'] = { es:'Formulario de Inscripción', en:'Enrollment Form' };

  D['idx.foot.p'] = { es:'Comunidad de simulación aérea sin fines de lucro, con presencia federal en brigadas de todo el país.', en:'Non-profit flight simulation community with federal presence in brigades across the country.' };
  D['idx.foot.col1.h'] = { es:'Institución', en:'Institution' };
  D['idx.foot.col1.a1'] = { es:'Bienvenida', en:'Welcome' };
  D['idx.foot.col1.a2'] = { es:'Brigadas', en:'Brigades' };
  D['idx.foot.col1.a3'] = { es:'Reglamento', en:'Regulations' };
  D['idx.foot.col2.h'] = { es:'Operaciones', en:'Operations' };
  D['idx.foot.col2.a1'] = { es:'Sala de pilotos', en:'Pilots\' room' };
  D['idx.foot.col2.a2'] = { es:'Material aéreo', en:'Aircraft' };
  D['idx.foot.col2.a3'] = { es:'Escenarios', en:'Scenarios' };
  D['idx.foot.col3.h'] = { es:'Redes', en:'Social' };
  D['idx.foot.col3.a3'] = { es:'FAA oficial', en:'Official FAA' };

  /* ---------- engine ---------- */
  function norm(v){ return v === 'en' ? 'en' : 'es'; }
  function current(){ try { return norm(localStorage.getItem(STORE)); } catch(e){ return 'es'; } }

  I18N.t = function(key){
    var e = D[key];
    if (!e) return '';
    var l = norm(LANG);
    if (l === 'en' && e.en != null) return e.en;
    return e.es;
  };

  function refreshSelector(){
    [].slice.call(document.querySelectorAll('.lang-btn')).forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang') === LANG);
    });
  }

  I18N.apply = function(){
    [].slice.call(document.querySelectorAll('[data-i18n]')).forEach(function(el){
      el.textContent = I18N.t(el.getAttribute('data-i18n'));
    });
    [].slice.call(document.querySelectorAll('[data-i18n-h]')).forEach(function(el){
      el.innerHTML = I18N.t(el.getAttribute('data-i18n-h'));
    });
    if (D['idx.title'] && /index\.html/.test(location.pathname)){
      document.title = I18N.t('idx.title');
      var list = [
        ['meta[name="description"]', 'idx.desc'],
        ['meta[property="og:title"]', 'idx.title'],
        ['meta[property="og:description"]', 'idx.desc'],
        ['meta[name="twitter:title"]', 'idx.title'],
        ['meta[name="twitter:description"]', 'idx.desc']
      ];
      list.forEach(function(p){
        var el = document.querySelector(p[0]);
        if (el) el.setAttribute('content', I18N.t(p[1]));
      });
    }
    refreshSelector();
  };

  I18N.setLang = function(l){
    LANG = norm(l);
    try { localStorage.setItem(STORE, LANG); } catch(e){}
    document.documentElement.lang = LANG;
    I18N.apply();
  };

  document.addEventListener('click', function(ev){
    var target = ev.target;
    while (target && target !== document && !(target.classList && target.classList.contains('lang-btn'))) target = target.parentNode;
    if (target && target !== document) I18N.setLang(target.getAttribute('data-lang'));
  });

  var LANG = norm(current());
  document.documentElement.lang = LANG;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', I18N.apply); else I18N.apply();
})();