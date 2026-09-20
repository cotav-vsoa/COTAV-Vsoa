(function(){
  var I18N = window.I18N = window.I18N || {};
  var D = I18N._dict = I18N._dict || {};
  var STORE = 'faav_lang';

  /* ---------- dictionary (index) ---------- */
  D.DUMMY = { es:'', en:'' };
  D['idx.title'] = { es:'COTA - VSOA | Comando Aéreo Táctico Argentino', en:'COTA - VSOA | Argentine Tactical Air Command' };
  D['idx.desc'] = { es:'comunidad argentina de simulación aérea en VATSIM. Operaciones, pilotos en vivo, calendario de eventos y brigadas de todo el país.', en:'Argentine flight simulation community on VATSIM. Operations, live pilots, events calendar and brigades across the country.' };

  D['idx.nav.institucion'] = { es:'Institución', en:'Institution' };
  D['idx.nav.operaciones'] = { es:'Operaciones', en:'Operations' };
  D['idx.nav.pilotos'] = { es:'Pilotos', en:'Pilots' };
  D['idx.nav.brigadas'] = { es:'Brigadas', en:'Brigades' };
  D['idx.nav.comunidad'] = { es:'Comunidad', en:'Community' };
  D['idx.nav.calendario'] = { es:'Calendario', en:'Calendar' };
  D['idx.nav.reglamento'] = { es:'Reglamento', en:'Regulations' };
  D['idx.nav.redes'] = { es:'REDES', en:'NETWORKS' };
  /* NOTE: idx.nav.documentos removed with DOCUMENTOS section */
  D['idx.nav.sumarme'] = { es:'Sumarme', en:'Join us' };

  D['idx.hero.h1'] = { es:'Volamos por los cielos de <em><br>Argentina</em>, en simulador.', en:'We fly the skies of <em><br>Argentina</em>, in the simulator.' };
  D['idx.hero.lead'] = { es:'Comunidad de simulación aérea virtual dedicada a recrear, con respeto y camaradería, las aeronaves y misiones que a lo largo de la historia formaron a los pilotos de las Fuerzas Armadas. Miembro certificado de VATSIM Special Operations (VSOA).', en:'Virtual flight simulation community dedicated to recreating, with respect and camaraderie, the aircraft and missions that throughout history formed the Armed Forces pilots. Certified member of VATSIM Special Operations (VSOA).' };
  D['idx.hero.cta.join'] = { es:'Sumarme al COTA', en:'Join the COTA' };
  D['idx.hero.cta.ops'] = { es:'Ver operaciones', en:'View operations' };

  D['idx.mis.eyebrow'] = { es:'Bienvenida', en:'Welcome' };
  D['idx.mis.h2'] = { es:'Un lugar de entretenimiento, disciplina y compañerismo', en:'A place of entertainment, discipline and camaraderie' };
  D['idx.mis.p1'] = { es:'El COTA es un espacio de simulación aérea sobre Microsoft Flight Simulator, Prepar3D y DCS World, con especial interés en las aeronaves de combate y transporte que visten los colores celeste y blanco tanto en el hoy como en el ayer.', en:'The COTA is a flight simulation space on Microsoft Flight Simulator, Prepar3D and DCS World, with a special interest in the combat and transport aircraft that wear the celeste and white colors both today and in the past.' };
  D['idx.mis.p2'] = { es:'Recreamos procedimientos, operaciones y misiones reales con el máximo respeto, sin perder de vista que esto es un pasatiempo.', en:'We recreate real procedures, operations and missions with the utmost respect, keeping in mind that this is a hobby.' };
  D['idx.mis.tag'] = { es:'⚠ Aviso institucional', en:'⚠ Institutional notice' };
  D['idx.mis.notice'] = { es:'El COTA es una organización de aviación virtual sin fines de lucro y no posee ningún tipo de relación con ningún organismo oficial de la República Argentina. En caso de buscar algún sitio oficial, visitá el siguiente link <a href="https://www.argentina.gob.ar/defensa" target="_blank" rel="noopener">https://www.argentina.gob.ar/defensa</a>.', en:'COTA is a non-profit virtual aviation organization with no relationship of any kind with any official body of the Argentine Republic. To visit an official website, follow this link: <a href="https://www.argentina.gob.ar/defensa" target="_blank" rel="noopener">https://www.argentina.gob.ar/defensa</a>.' };

  D['idx.ops.h2'] = { es:'CONOCÉ DONDE, CÓMO Y CON QUÉ,<br>OPERAMOS EN EL COTA', en:'FIND OUT WHERE, HOW AND WITH WHAT<br>WE OPERATE AT THE COTA' };
  D['idx.ops.card1.p'] = { es:'Registrados como organización de Operaciones Especiales de VATSIM, operando bajo su normativa.', en:'Registered as a VATSIM Special Operations organization, operating under its regulations.' };
  D['idx.ops.card2.h'] = { es:'OPERACIONES', en:'OPERATIONS' };
  D['idx.ops.card2.p'] = { es:'Documentación, reglamentos, briefings y todo lo necesario para las operaciones del COTA.', en:'Documentation, regulations, briefings and everything needed for COTA operations.' };
  D['idx.ops.card2.link'] = { es:'Ver operaciones', en:'View operations' };

  D['idx.bri.h2'] = { es:'Conoce nuestras Brigadas', en:'Meet our Brigades' };

  D['idx.com.h2'] = { es:'Mirá cómo volamos', en:'Watch how we fly' };
  D['idx.com.sub'] = { es:'Videos recomendados del canal y las últimas publicaciones de Instagram del COTA.', en:'Recommended videos from the channel and the latest Instagram posts from the COTA.' };
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
  D['idx.cal.sub'] = { es:'Próximos eventos de VATSIM y operaciones especiales del COTA.', en:'Upcoming VATSIM events and COTA special operations.' };
  D['idx.cal.tab.vsoa'] = { es:'Eventos VSOA', en:'VSOA Events' };
  D['idx.cal.tab.argar'] = { es:'VATSIM Argentina', en:'VATSIM Argentina' };
  D['idx.cal.tab.past'] = { es:'Finalizados', en:'Past' };
  D['idx.cal.subscribe'] = { es:'Suscribirme al calendario (.ics)', en:'Subscribe to the calendar (.ics)' };
  D['idx.cal.note'] = { es:'Eventos del COTA, Eventos de la red VATSIM VSOA (VATSIM SPECIAL OPERATION ASOCIATED) y Eventos de VATSIM Argentina. Los horarios se muestran en hora local de Argentina (UTC-3).', en:'Events from the COTA, the VATSIM VSOA network (South America) and VATSIM Argentina. Times are shown in Argentine local time (ART, UTC-3).' };

  D['idx.sum.h2'] = { es:'Cómo sumarte al COTA', en:'How to join the COTA' };
  D['idx.sum.s1.k'] = { es:'01 — CONTACTO', en:'01 — CONTACT' };
  D['idx.sum.s1.h'] = { es:'Seguinos en Instagram', en:'Follow us on Instagram' };
  D['idx.sum.s1.p'] = { es:'Seguinos para no perderte lo que hacemos en el COTA, y si tenes alguna consulta, no dudes en escribirnos', en:'Follow us so you never miss what we do at the COTA, and if you have any questions, don\'t hesitate to write to us.' };
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

  /* ---------- shared chrome dictionary (all pages) ---------- */
  var CHROME = {};
  function chromePair(key, es, en){ CHROME[key] = { es: es, en: en }; return CHROME[key]; }
  chromePair('Institución', 'Institución', 'Institution');
  chromePair('Operaciones', 'Operaciones', 'Operations');
  chromePair('Pilotos', 'Pilotos', 'Pilots');
  chromePair('Brigadas', 'Brigadas', 'Brigades');
  chromePair('Comunidad', 'Comunidad', 'Community');
  chromePair('Calendario', 'Calendario', 'Calendar');
  chromePair('Reglamento', 'Reglamento', 'Regulations');
  chromePair('REDES', 'REDES', 'NETWORKS');
  chromePair('DOCUMENTOS', 'DOCUMENTOS', 'DOCUMENTS');
  chromePair('Sumarme', 'Sumarme', 'Join us');
  chromePair('Bienvenida', 'Bienvenida', 'Welcome');
  chromePair('Sala de pilotos', 'Sala de pilotos', "Pilots' room");
  chromePair('Material aéreo', 'Material aéreo', 'Aircraft');
  chromePair('Escenarios', 'Escenarios', 'Scenarios');
  chromePair('Redes', 'Redes', 'Social');
  chromePair('FAA oficial', 'FAA oficial', 'Official FAA');
  chromePair('Documentos VSOA', 'Documentos VSOA', 'VSOA Documents');
  chromePair('Volver', 'Volver', 'Back');
  chromePair('Volver al menú principal', 'Volver al menú principal', 'Back to main menu');
  chromePair('Volver a operaciones', 'Volver a operaciones', 'Back to operations');
  chromePair('Volver a Sala de pilotos', 'Volver a Sala de pilotos', 'Back to the Pilots room');
  chromePair('Comunidad de simulación aérea sin fines de lucro, con presencia federal en brigadas de todo el país.', 'Comunidad de simulación aérea sin fines de lucro, con presencia federal en brigadas de todo el país.', 'Non-profit flight simulation community with federal presence in brigades across the country.');

  function chromePass(){
    var lang = norm(LANG);
    var targets = document.querySelectorAll('header .navlinks a, header .navcta a, footer a, footer h5, .foot-brand p, a.back-link span');
    [].slice.call(targets).forEach(function(el){
      if (el.hasAttribute('data-i18n') || el.hasAttribute('data-i18n-h')) return;
      if (el.childNodes.length !== 1 || el.firstChild.nodeType !== 3) return;
      var node = el.firstChild;
      if (el.__i18nOrig == null) el.__i18nOrig = node.nodeValue;
      var trimmed = el.__i18nOrig.replace(/^\s+|\s+$/g, '');
      var entry = CHROME[trimmed];
      if (!entry) return;
      var value = entry[lang];
      if (value == null) { value = entry.es; }
      if (node.nodeValue !== el.__i18nOrig.replace(trimmed, value)) node.nodeValue = el.__i18nOrig.replace(trimmed, value);
    });
  }

  /* ---------- full content dictionary (all pages) ---------- */
  var CONTENT = {};
  function ct(es, en){ CONTENT[es] = { es: es, en: en }; }
  ct("Volamos por los cielos de", "We fly through the skies of");
  ct(", en simulador.", ", in the simulator.");
  ct("Sumarme al COTA", "Join COTA");
  ct("Ver operaciones", "View operations");
  ct("Un lugar de entretenimiento, disciplina y compañerismo", "A place of entertainment, discipline and camaraderie");
  ct("Recreamos procedimientos, operaciones y misiones reales con el máximo respeto, sin perder de vista que esto es un pasatiempo.", "We recreate real procedures, operations and missions with the utmost respect, without losing sight that this is a hobby.");
  ct("⚠ Aviso institucional", "⚠ Institutional notice");
  ct("CONOCÉ DONDE, CÓMO Y CON QUÉ,", "FIND OUT WHERE, HOW AND WITH WHAT,");
  ct("OPERAMOS EN EL COTA", "WE OPERATE IN COTA");
  ct("Registrados como organización de Operaciones Especiales de VATSIM, operando bajo su normativa.", "Registered as a VATSIM Special Operations organization, operating under its regulations.");
  ct("Documentación, reglamentos, briefings y todo lo necesario para las operaciones del COTA.", "Documentation, regulations, briefings and everything needed for COTA operations.");
  ct("Conoce nuestras Brigadas", "Meet our Brigades");
  ct("Mirá cómo volamos", "See how we fly");
  ct("Videos recomendados del canal y las últimas publicaciones de Instagram del COTA.", "Recommended channel videos and the latest COTA Instagram posts.");
  ct("Video destacado del canal", "Featured channel video");
  ct("Canal de YouTube", "YouTube Channel");
  ct("Vuelos en formación, demos y coberturas de nuestros eventos y operaciones conjuntas.", "Formation flights, demos and coverage of our events and joint operations.");
  ct("Ver canal completo", "Watch full channel");
  ct("Capturas de cabina, formaciones y el día a día de las brigadas.", "Cockpit shots, formations and the day to day of the brigades.");
  ct("Ir al perfil", "Go to profile");
  ct("Clips de cabina, formaciones y el día a día en formato corto.", "Cockpit clips, formations and day to day in short format.");
  ct("Publicaciones de Instagram", "Instagram posts");
  ct("Ver perfil", "View profile");
  ct("Calendario de eventos", "Event calendar");
  ct("Próximos eventos de VATSIM y operaciones especiales del COTA.", "Upcoming VATSIM events and COTA special operations.");
  ct("Eventos VSOA", "VSOA Events");
  ct("VATSIM Argentina", "VATSIM Argentina");
  ct("Finalizados", "Finished");
  ct("Suscribirme al calendario (.ics)", "Subscribe to calendar (.ics)");
  ct("Eventos del COTA, Eventos de la red VATSIM VSOA (VATSIM SPECIAL OPERATION ASOCIATED) y Eventos de VATSIM Argentina. Los horarios se muestran en hora local de Argentina (UTC-3).", "COTA events, VATSIM VSOA network (South America) and VATSIM Argentina events. Times are shown in Argentina local time (ART, UTC-3).");
  ct("Cómo sumarte al COTA", "How to join COTA");
  ct("01 — CONTACTO", "01 — CONTACT");
  ct("Seguinos en Instagram", "Follow us on Instagram");
  ct("Seguinos para no perderte lo que hacemos en el COTA, y si tenes alguna consulta, no dudes en escribirnos", "Follow us so you don't miss what we do in COTA, and if you have any questions, don't hesitate to write to us");
  ct("02 — INSTRUCCIÓN", "02 — TRAINING");
  ct("Formación inicial", "Initial training");
  ct("Un breve proceso de instrucción para conocer procedimientos, comunicaciones y la organización interna. La formación será en Tecnam P2002 y Texan II.", "A brief training process to learn procedures, communications and the internal organization. Training will be in the Tecnam P2002 and Texan II.");
  ct("03 — DESTINO", "03 — DESTINATION");
  ct("Asignación de brigada", "Brigade assignment");
  ct("Vos elegís la brigada que quieras. Si elegís Caza, antes realizás el CEPAC; si elegís Transporte, realizás el CEPAT.", "You choose the brigade you want. If you choose Fighter, you first complete the CEPAC; if you choose Transport, you complete the CEPAT.");
  ct("Escribir por Instagram", "Write on Instagram");
  ct("Ver reglamento", "View regulations");
  ct("Formulario de Inscripción", "Enrollment Form");
  /* brigadas */
  ct("Sobre la brigada", "About the brigade");
  ct("Sobre la unidad", "About the unit");
  ct("Brigada Aérea", "Air Brigade");
  ct("Brigada", "Brigade");
  ct("Base Aérea Militar", "Military Air Base");
  ct("Base Conjunta", "Joint Base");
  ct("Área de Material", "Material Area");
  ct("Base", "Base");
  ct("Escuela", "School");
  ct("Escuela de", "Military Aviation");
  ct("Aviación Militar", "School");
  ct("Unidad", "Unit");
  ct("Creación", "Founded");
  ct("Jurisdicción", "Jurisdiction");
  ct("Provincia", "Province");
  ct("Ubicación", "Location");
  ct("Unidades", "Units");
  ct("Elegí una brigada o unidad para conocer.", "Pick a brigade or unit to explore.");
  ct("Base Aérea de Paraná, Provincia de Entre Ríos.", "Paraná Air Base, Entre Ríos Province.");
  ct("Base Aérea Militar Aeroparque, Ciudad Autónoma de Buenos Aires.", "Aeroparque Military Air Base, Autonomous City of Buenos Aires.");
  ct("Escuela de Aviación Militar, Córdoba.", "Military Aviation School, Córdoba.");
  ct("Zona de Moreno, oeste del Gran Buenos Aires.", "Moreno area, west of Greater Buenos Aires.");
  ct("Base Aérea Militar Morón, Provincia de Buenos Aires.", "Morón Military Air Base, Buenos Aires Province.");
  ct("Base Aérea Militar de El Palomar, Provincia de Buenos Aires.", "El Palomar Military Air Base, Buenos Aires Province.");
  ct("Base Aérea de El Plumerillo, Provincia de Mendoza.", "El Plumerillo Air Base, Mendoza Province.");
  ct("Área de Material de Río Cuarto, Provincia de Córdoba.", "Río Cuarto Material Area, Córdoba Province.");
  ct("Aeropuerto de Villa Reynolds, Provincia de San Luis.", "Villa Reynolds Airport, San Luis Province.");
  ct("Base Aérea Militar Resistencia, Provincia de Chaco.", "Resistencia Military Air Base, Chaco Province.");
  ct("Aeropuerto de Reconquista, Provincia de Santa Fe.", "Reconquista Airport, Santa Fe Province.");
  ct("Aeropuerto de Comodoro Rivadavia, Provincia de Chubut.", "Comodoro Rivadavia Airport, Chubut Province.");
  ct("Base Conjunta Marambio, Isla Marambio, Antártida Argentina.", "Marambio Joint Base, Marambio Island, Argentine Antarctica.");
  ct("Aeropuerto de Río Gallegos, Provincia de Santa Cruz.", "Río Gallegos Airport, Santa Cruz Province.");
  ct("Base Aérea Militar Mar del Plata, Provincia de Buenos Aires.", "Mar del Plata Military Air Base, Buenos Aires Province.");
  ct("Aeropuerto de Tandil, Provincia de Buenos Aires.", "Tandil Airport, Buenos Aires Province.");
  ct("Imagen de la brigada en simulador", "Simulator image of the brigade");
  ct("Reemplazá esta imagen con una captura de la brigada operando", "Replace this image with a screenshot of the brigade in operation");
  ct("En el COTA, la I Brigada Aérea recrea y amplía las capacidades de la unidad real, operando una flota compuesta por el Lockheed C-130 Hércules,", "In COTA, the 1st Air Brigade recreates and expands the capabilities of the real unit, operating a fleet made up of the Lockheed C-130 Hercules,");
  /* documentos */
  ct("DOCUMENTOS VSOA", "VSOA DOCUMENTS");
  ct("Normativa, manuales, formularios y material referido a VATSIM Special Operations (VSOA).", "Regulations, manuals, forms and material related to VATSIM Special Operations (VSOA).");
  ct("¿Buscás un documento puntual? Escribinos a", "Looking for a specific document? Write to us at");
  ct("y lo publicamos.", "and we'll publish it.");
  ct("No hay documentos cargados todavía. Envialos al correo institucional para publicarlos.", "No documents loaded yet. Send them to the institutional email to get them published.");
  ct("No hay documentos cargados todavía.", "No documents loaded yet.");
  /* inscripcion */
  ct("- INSCRIPCIÓN", "- ENROLLMENT");
  ct("Formulario de", "Enrollment");
  ct("inscripción", "form");
  ct("Completá tus datos para iniciar el proceso de ingreso al COTA.", "Fill in your details to start the COTA admission process.");
  ct("Datos personales", "Personal details");
  ct("◆ Datos personales", "◆ Personal details");
  ct("Nombre completo *", "Full name *");
  ct("Edad *", "Age *");
  ct("País *", "Country *");
  ct("Provincia / Estado", "Province / State");
  ct("Ciudad", "City");
  ct("Correo electrónico *", "Email *");
  ct("Usuario de VATSIM (si tenés)", "VATSIM username (if you have one)");
  ct("¿Tenés experiencia en simulación aérea?", "Do you have flight simulation experience?");
  ct("Seleccioná una opción", "Select an option");
  ct("¿Qué simulador usás?", "Which simulator do you use?");
  ct("Seleccioná una opción o más", "Select one or more options");
  ct("Otro", "Other");
  ct("Si tu respuesta fue otro, contanos cuál", "If your answer was other, tell us which");
  ct("¿Tenés Joystick?", "Do you have a joystick?");
  ct("¿Cuál?", "Which one?");
  ct("¿Cómo nos conociste?", "How did you find us?");
  ct("Recomendación de otro piloto", "Recommendation from another pilot");
  ct("Foro / comunidad", "Forum / community");
  ct("¿Por qué querés unirte al COTA?", "Why do you want to join COTA?");
  ct("Formulario enviado. Pronto nos pondremos en contacto.", "Form submitted. We'll be in touch soon.");
  ct("Enviar solicitud", "Send request");
  ct("- SOLICITUD RECIBIDA", "- REQUEST RECEIVED");
  ct("¡Gracias por sumarte al COTA!", "Thanks for joining COTA!");
  ct("Tu solicitud de inscripción fue enviada con éxito. Un miembro de nuestro equipo se pondrá en contacto con vos para coordinar los próximos pasos de tu ingreso.", "Your enrollment request was sent successfully. A team member will get in touch to coordinate the next steps of your admission.");
  ct("Volver al inicio", "Back to home");
  ct("Volver a pilotos en línea", "Back to pilots online");
  /* login */
  ct("- PILOTOS", "- PILOTS");
  ct("Sala de", "Pilots'");
  ct("Accedé con tu usuario del COTA a escenarios, aeronaves, texturas y material exclusivo para pilotos.", "Log in with your COTA account to access scenarios, aircraft, liveries and exclusive pilot material.");
  ct("Iniciar sesión", "Sign in");
  ct("◆ Iniciar sesión", "◆ Sign in");
  ct("Usuario", "Username");
  ct("Contraseña", "Password");
  ct("Usuario o contraseña incorrectos.", "Incorrect username or password.");
  ct("(usuario: tu callsign FAG-xxx · contraseña: tu indicativo, ej. COBRA)", "(username: your callsign FAG-xxx · password: your callsign nickname, e.g. COBRA)");
  ct("Usuario: tu callsign (ej. FAG-212) · Contraseña: tu indicativo (ej. COBRA) — sin comillas.", "Username: your callsign (e.g. FAG-212) · Password: your callsign nickname (e.g. COBRA) — without quotes.");
  ct("Ingresar", "Sign in");
  /* contraseña propia */
  ct("Cambiar contraseña", "Change password");
  ct("Contraseña actual", "Current password");
  ct("Nueva contraseña (mín. 6 caracteres)", "New password (min. 6 characters)");
  ct("Confirmar nueva contraseña", "Confirm new password");
  ct("Guardar contraseña", "Save password");
  ct("Restablecer (usar indicativo)", "Reset (use callsign nickname)");
  ct("Define una contraseña propia para mayor seguridad. Si no la definís, seguís ingresando con tu indicativo.", "Set your own password for extra security. If you don't, you can still sign in with your callsign nickname.");
  ct("Contraseña actualizada.", "Password updated.");
  ct("Contraseña restablecida. Usá tu indicativo para ingresar.", "Password reset. Use your callsign nickname to sign in.");
  ct("La contraseña actual es incorrecta.", "The current password is incorrect.");
  ct("Las contraseñas no coinciden.", "The passwords do not match.");
  ct("La contraseña debe tener al menos 6 caracteres.", "The password must be at least 6 characters long.");
  ct("Ingresá tu contraseña actual.", "Enter your current password.");
  ct("El navegador no permitió guardar la contraseña.", "The browser did not allow saving the password.");
  /* operaciones */
  ct("INSTRUCCIÓN - CAZA - TRANSPORTE", "TRAINING - FIGHTER - TRANSPORT");
  ct("INSTRUCCIÓN", "TRAINING");
  ct("Entrenamiento primario y normativa COTA", "Primary training and COTA regulations");
  ct("Entrenamiento primario, avanzada y normativa COTA.", "Primary and advanced training and COTA regulations.");
  ct("CAZA", "FIGHTER");
  ct("Operaciones tácticas y superioridad aérea", "Tactical operations and air superiority");
  ct("Operaciones tácticas, ataque y superioridad aérea.", "Tactical operations, attack and air superiority.");
  ct("TRANSPORTE", "TRANSPORT");
  ct("Logística y puente aéreo estratégico", "Logistics and strategic air bridge");
  ct("Logística, puente aéreo estratégico y apoyo táctico.", "Logistics, strategic air bridge and tactical support.");
  ct("Normativa, manuales y formularios de VATSIM VSOA", "VATSIM VSOA regulations, manuals and forms");
  /* piloto */
  ct("Cargando…", "Loading…");
  ct("Horas voladas", "Hours flown");
  ct("Último vuelo", "Last flight");
  ct("Aeropuerto + usado", "Most used airport");
  ct("Avión + usado", "Most used aircraft");
  ct("Últimos Vuelos", "Recent Flights");
  ct("Callsign", "Callsign");
  ct("Aeronave", "Aircraft");
  ct("Vuelo", "Flight");
  ct("Fecha", "Date");
  ct("Remark", "Remark");
  ct("No está volando en este momento.", "Not flying right now.");
  ct("No se pudo encontrar el piloto solicitado.", "The requested pilot could not be found.");
  /* pilotos */
  ct("Cerrar sesión", "Log out");
  ct("Sala de pilotos", "Pilots' room");
  ct("Ir a descargas", "Go to downloads");
  ct("Ir a login", "Go to login");
  ct("- ACCESO RESTRINGIDO", "- RESTRICTED ACCESS");
  ct("- SALA DE PILOTOS", "- PILOTS' ROOM");
  ct("No tenés acceso a esta sección. Iniciá sesión con tu usuario del COTA para continuar.", "You don't have access to this section. Sign in with your COTA account to continue.");
  ct("Bienvenido,", "Welcome,");
  ct("Estadísticas de vuelo", "Flight statistics");
  ct("Tus últimos vuelos", "Your recent flights");
  ct("Ver perfil VATSIM", "View VATSIM profile");
  ct("Perfil", "Profile");
  ct("Descargas", "Downloads");
  ct("Escuela", "School");
  ct("Subir foto", "Upload photo");
  ct("Quitar foto", "Remove photo");
  ct("Paquetes de aeropuertos y scenery packs para Prepar3D. Incluye bases aéreas, aeropuertos civiles y escenarios especiales del COTA.", "Airport and scenery packs for Prepar3D. Includes air bases, civil airports and special COTA scenarios.");
  ct("Paquetes de aeropuertos y scenery packs para Microsoft Flight Simulator 2020/24. Incluye bases aéreas, aeropuertos civiles y escenarios especiales del COTA.", "Airport and scenery packs for Microsoft Flight Simulator 2020/24. Includes air bases, civil airports and special COTA scenarios.");
  ct("Ir a descargas", "Go to downloads");
  ct("Escenarios Prepar3D", "P3D Scenarios");
  ct("Escenarios MFS 2020/24", "MFS 2020/24 Scenarios");
  ct("Aviones", "Aircraft");
  ct("Aviones Prepar3D", "P3D Aircraft");
  ct("Aviones MFS 2020/24", "MFS 2020/24 Aircraft");
  ct("Aeronaves disponibles para Prepar3D: IA-63 Pampa, A-4 Skyhawk, FMA SAIA 90, y más. Aeronaves aprobadas para operaciones.", "Aircraft available for Prepar3D: IA-63 Pampa, A-4 Skyhawk, FMA SAIA 90, and more. Aircraft approved for operations.");
  ct("Aeronaves disponibles para Microsoft Flight Simulator 2020/24: IA-63 Pampa, A-4 Skyhawk, FMA SAIA 90, y más.", "Aircraft available for Microsoft Flight Simulator 2020/24: IA-63 Pampa, A-4 Skyhawk, FMA SAIA 90, and more.");
  ct("Liveries", "Liveries");
  ct("Liveries Prepar3D", "P3D Liveries");
  ct("Liveries MFS 2020/24", "MFS 2020/24 Liveries");
  ct("Pinturas oficiales del COTA y de las brigadas para Prepar3D. Material texturas de alta calidad.", "Official COTA and brigade liveries for Prepar3D. High quality texture material.");
  ct("Pinturas oficiales del COTA y de las brigadas para Microsoft Flight Simulator 2020/24.", "Official COTA and brigade liveries for Microsoft Flight Simulator 2020/24.");
  ct("MTL's", "MTLs");
  ct("MTL Prepar3D", "P3D MTL");
  ct("MTL MFS 2020/24", "MFS 2020/24 MTL");
  ct("Modelos de tráfico en línea (MTL) para Prepar3D. Material compartido para operaciones con tráfico virtual en VATSIM.", "Online traffic models (MTL) for Prepar3D. Shared material for operations with virtual traffic on VATSIM.");
  ct("Modelos de tráfico en línea (MTL) para Microsoft Flight Simulator 2020/24. Material compartido para VATSIM.", "Online traffic models (MTL) for Microsoft Flight Simulator 2020/24. Shared material for VATSIM.");
  ct("Material Aéreo", "Aircraft Material");
  ct("Manuales de vuelo", "Flight manuals");
  ct("POH, checklists, y guías de operación de algunas aeronaves del COTA. Material de estudio para pilotos.", "POH, checklists and operation guides for some COTA aircraft. Study material for pilots.");
  ct("Procedimientos estándar, cartas de aproximación, y briefings de operaciones para vuelos.", "Standard procedures, approach charts and operation briefings for flights.");
  ct("Material Escuela", "School Material");
  ct("PROGRAMA DE ENTRENAMIENTO", "TRAINING PROGRAM");
  ct("Material de entrenamiento completo: Tecnam P2002 y Texan II. Temarios, procedimientos y guías de estudio.", "Complete training material: Tecnam P2002 and Texan II. Syllabuses, procedures and study guides.");
  ct("Documentación", "Documentation");
  ct("Reglamento de vuelo", "Flight regulations");
  ct("Normativa interna del COTA: reglas de vuelo, procedimientos de comunicación, y estándares de operación.", "Internal COTA regulations: flight rules, communication procedures and operation standards.");
  ct("Guía del nuevo piloto", "New pilot guide");
  ct("Tutorial de inicio: cómo configurar tu simulador, unirte a VATSIM, y volar con el COTA paso a paso.", "Getting started tutorial: how to set up your simulator, join VATSIM, and fly with COTA step by step.");
  ct("Documentación de la división Argentina de VATSIM: reglamentos, procedimientos, y material de referencia.", "Documentation of the VATSIM Argentina division: regulations, procedures and reference material.");
  ct("VATSIM VSOA", "VATSIM VSOA");
  ct("Documentación de VATSIM Special Operations (VSOA): normativa, estándares, y material para operaciones especiales.", "VATSIM Special Operations (VSOA) documentation: regulations, standards and material for special operations.");
  /* pilotos-en-linea / roster */
  ct("Pilotos en línea", "Pilots online");
  ct("Pilotos del COTA volando ahora mismo en VATSIM.", "COTA pilots flying right now on VATSIM.");
  ct("en vuelo ahora", "flying now");
  ct("No hay pilotos del COTA volando en este momento.", "No COTA pilots flying right now.");
  ct("Listado de pilotos", "Pilot roster");
  ct("Pilotos registrados del COTA.", "Registered COTA pilots.");
  ct("pilotos en el roster", "pilots in the roster");
  ct("Nombre", "Name");
  ct("Indicativo", "Callsign");
  ct("CID VATSIM", "VATSIM CID");
  ct("Estado", "Status");
  /* redes */
  ct("- REDES", "- NETWORKS");
  ct("Nuestras", "Our");
  ct("Seguí al COTA y enterate de operaciones, eventos y novedades de la comunidad.", "Follow COTA and stay up to date with operations, events and community news.");
  ct("Mail", "Email");
  ct("Discord", "Discord");
  ct("Comunidad de simulación Aérea sin fines de lucro, con presencia federal en brigadas de todo el país.", "Non-profit flight simulation community with federal presence in brigades across the country.");
  /* reglamento */
  ct("Normas y", "Regulations and");
  ct("Procedimientos", "Procedures");
  ct("Reglamento interno del COTA: las bases que garantizan el respeto, la disciplina y el buen trato dentro de todas nuestras operaciones y brigadas.", "COTA internal regulations: the foundations that guarantee respect, discipline and good treatment in all our operations and brigades.");
  ct("Leer el reglamento", "Read the regulations");
  ct("Normas de convivencia", "Code of conduct");
  ct("Respeto y buen trato entre todos los miembros, dentro y fuera de las operaciones.", "Respect and good treatment among all members, inside and outside operations.");
  ct("Cumplir la normativa de VATSIM en cada vuelo o control.", "Comply with VATSIM regulations on every flight or ATC position.");
  ct("Sin contenido político, discriminatorio u ofensivo en los canales de la comunidad.", "No political, discriminatory or offensive content in the community channels.");
  ct("Asistencia razonable a los eventos y operaciones de tu brigada.", "Reasonable attendance at your brigade events and operations.");
  ct("Uso responsable del material aéreo y los escenarios compartidos.", "Responsible use of shared aircraft material and scenarios.");
  ct("Ver el reglamento completo", "View full regulations");
  ct("Reglamento básico", "Basic regulations");
  ct("Normas de convivencia dentro del COTA.", "Code of conduct within COTA.");
  ct("Normas de convivencia dentro del COTA. Este es un punto de partida - reemplazalo por el reglamento interno definitivo cuando lo tengan redactado.", "Code of conduct within COTA. This is a starting point — replace it with the final internal regulations once you have them drafted.");
  ct("Asistencia razonable a los eventos y operaciones de la brigada asignada.", "Reasonable attendance at your assigned brigade events and operations.");
  ct("Uso responsable del material aéreo y los escenarios compartidos por el COTA.", "Responsible use of the aircraft material and scenarios shared by COTA.");
  /* storage */
  ct("Archivo", "File");
  ct("Descripción", "Description");
  ct("Tamaño", "Size");
  ct("Sin archivos todavía", "No files yet");
  ct("Descargar", "Download");
  ct("Aeronaves disponibles para Microsoft Flight Simulator 2020/24.", "Aircraft available for Microsoft Flight Simulator 2020/24.");
  ct("Aeronaves disponibles para Prepar3D.", "Aircraft available for Prepar3D.");
  ct("Paquetes de aeropuertos y scenery packs para Microsoft Flight Simulator 2020/24.", "Airport and scenery packs for Microsoft Flight Simulator 2020/24.");
  ct("Paquetes de aeropuertos y scenery packs para Prepar3D.", "Airport and scenery packs for Prepar3D.");
  ct("Programa de Entrenamiento", "Training Program");
  ct("Material de estudio: Tecnam P2002 (TECNAM TEMA 1-3) y Texan II (TEXAN TEMA 1-3).", "Study material: Tecnam P2002 (TECNAM TOPIC 1-3) and Texan II (TEXAN TOPIC 1-3).");
  ct("Programa de entrenamiento COTA", "COTA training program");
  ct("Entrenamiento Tecnam P2002 - Tema 1", "Tecnam P2002 training - Topic 1");
  ct("Entrenamiento Tecnam P2002 - Tema 2", "Tecnam P2002 training - Topic 2");
  ct("Entrenamiento Tecnam P2002 - Tema 3", "Tecnam P2002 training - Topic 3");
  ct("Entrenamiento Texan II - Tema 1", "Texan II training - Topic 1");
  ct("Entrenamiento Texan II - Tema 2", "Texan II training - Topic 2");
  ct("Entrenamiento Texan II - Tema 3", "Texan II training - Topic 3");
  ct("Pinturas oficiales del COTA y las brigadas.", "Official COTA and brigade liveries.");
  ct("Manuales y documentos", "Manuals and documents");
  ct("Manuales de vuelo, checklist, procedimientos y documentación.", "Flight manuals, checklists, procedures and documentation.");
  ct("Mirage IIIB manual (inglés)", "Mirage IIIB manual (English)");
  ct("Procedimientos operativos estandar (POE) para vuelos del COTA.", "Standard operating procedures (SOP) for COTA flights.");
  ct("Procedimiento operativo estandar - Revista", "Standard operating procedure - Magazine");
  ct("POE - Vuelo en red", "SOP - Network flight");
  ct("POE - Vuelos en alerta", "SOP - Alert flights");
  ct("POE - Vuelo en formación", "SOP - Formation flight");
  ct("POE - Circuitos", "SOP - Circuits");
  ct("POE - Comunicaciones", "SOP - Communications");

  /* ---------- page titles & meta ---------- */
  var TITLES = {};
  function tp(es, en){ TITLES[es] = { es: es, en: en }; }
  tp("II Brigada Aérea · Paraná — COTA", "2nd Air Brigade · Paraná — COTA");
  tp("BAM Aeroparque — COTA", "Aeroparque Military Air Base — COTA");
  tp("Escuela de Aviación Militar · Córdoba — COTA", "Military Aviation School · Córdoba — COTA");
  tp("VII Brigada Aérea · Moreno — COTA", "7th Air Brigade · Moreno — COTA");
  tp("BAM Morón — COTA", "Morón Military Air Base — COTA");
  tp("I Brigada Aérea · El Palomar — COTA", "1st Air Brigade · El Palomar — COTA");
  tp("IV Brigada Aérea · El Plumerillo — COTA", "4th Air Brigade · El Plumerillo — COTA");
  tp("Área de Material · Río Cuarto — COTA", "Material Area · Río Cuarto — COTA");
  tp("V Brigada Aérea · Villa Reynolds — COTA", "5th Air Brigade · Villa Reynolds — COTA");
  tp("BAM Resistencia — COTA", "Resistencia Military Air Base — COTA");
  tp("III Brigada Aérea · Reconquista — COTA", "3rd Air Brigade · Reconquista — COTA");
  tp("IX Brigada Aérea · Comodoro Rivadavia — COTA", "9th Air Brigade · Comodoro Rivadavia — COTA");
  tp("BC Marambio · Antártida — COTA", "Marambio Joint Base · Antarctica — COTA");
  tp("X Brigada Aérea · Río Gallegos — COTA", "10th Air Brigade · Río Gallegos — COTA");
  tp("BAM Mar del Plata — COTA", "Mar del Plata Military Air Base — COTA");
  tp("VI Brigada Aérea · Tandil — COTA", "6th Air Brigade · Tandil — COTA");
  tp("Documentos VSOA · COTA - VSOA", "VSOA Documents · COTA - VSOA");
  tp("Formulario de Inscripción · COTA - VSOA", "Enrollment Form · COTA - VSOA");
  tp("Ingresar · COTA - VSOA", "Sign in · COTA - VSOA");
  tp("Operaciones · COTA - VSOA", "Operations · COTA - VSOA");
  tp("Piloto · COTA - VSOA", "Pilot · COTA - VSOA");
  tp("Sala de pilotos · COTA - VSOA", "Pilots' room · COTA - VSOA");
  tp("Pilotos en Línea · COTA - VSOA", "Pilots Online · COTA - VSOA");
  tp("Redes Sociales · COTA - VSOA", "Social Networks · COTA - VSOA");
  tp("Reglamento · COTA - VSOA", "Regulations · COTA - VSOA");
  tp("Todos los Pilotos · COTA - VSOA", "All Pilots · COTA - VSOA");
  tp("Aviones MFS 2020/24 · COTA", "MFS 2020/24 Aircraft · COTA");
  tp("Aviones Prepar3D · COTA", "P3D Aircraft · COTA");
  tp("Escenarios MFS 2020/24 · COTA", "MFS 2020/24 Scenarios · COTA");
  tp("Escenarios Prepar3D · COTA", "P3D Scenarios · COTA");
  tp("Programa de Entrenamiento · COTA", "Training Program · COTA");
  tp("Liveries · COTA", "Liveries · COTA");
  tp("Manuales y documentos · COTA", "Manuals and documents · COTA");
  tp("Procedimientos · COTA", "Procedures · COTA");

  var DESCS = {};
  function dp(es, en){ DESCS[es] = { es: es, en: en }; }
  dp("Brigada SAAP del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAAP Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SABE del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SABE Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SACE del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SACE Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SADJ del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SADJ Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SADM del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SADM Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SADP del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SADP Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SAME del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAME Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SAOC del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAOC Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SAOR del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAOR Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SARE del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SARE Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SATR del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SATR Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SAVC del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAVC Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SAWB del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAWB Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SAWG del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAWG Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SAZM del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAZM Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Brigada SAZT del COTA - VSOA: base, ubicacion y unidades de la comunidad argentina de simulacion aerea.", "SAZT Brigade of the COTA - VSOA: base, location and units of the Argentine flight simulation community.");
  dp("Documentos referidos a VATSIM VSOA: normativa, manuales, formularios y material oficial del COTA.", "Documents related to VATSIM VSOA: regulations, manuals, forms and official COTA material.");
  dp("Formulario de inscripción al COTA - VSOA. Sumate a la comunidad argentina de simulación aérea en VATSIM.", "Enrollment form for COTA - VSOA. Join the Argentine flight simulation community on VATSIM.");
  dp("Acceso al perfil de piloto del COTA - VSOA.", "Access to the COTA - VSOA pilot profile.");
  dp("Operaciones del COTA en VATSIM: misiones, escalas y procedimientos de la comunidad argentina de simulación aérea.", "COTA operations on VATSIM: missions, stopovers and procedures of the Argentine flight simulation community.");
  dp("Perfil del piloto del COTA - VSOA: horas de vuelo, aeronaves e historial en la comunidad.", "COTA - VSOA pilot profile: flight hours, aircraft and community history.");
  dp("Sala de pilotos del COTA - VSOA: conocé a los pilotos activos de la comunidad y sus horas de vuelo.", "COTA - VSOA pilots' room: meet the community's active pilots and their flight hours.");
  dp("Pilotos del COTA volando ahora mismo en VATSIM, en vivo con mapa de Argentina, roster y estadísticas.", "COTA pilots flying right now on VATSIM, live with Argentina map, roster and statistics.");
  dp("Redes sociales del COTA - VSOA: Instagram, YouTube y TikTok de la comunidad argentina de simulación aérea.", "COTA - VSOA social networks: Instagram, YouTube and TikTok of the Argentine flight simulation community.");
  dp("Reglamento del COTA - VSOA: normas y procedimientos de la comunidad y sus brigadas.", "COTA - VSOA regulations: norms and procedures of the community and its brigades.");
  dp("Todos los pilotos del COTA - VSOA con horas de vuelo y registro en VATSIM.", "All COTA - VSOA pilots with flight hours and VATSIM registration.");
  dp("Aeronaves del COTA para Microsoft Flight Simulator 2020/2024.", "COTA aircraft for Microsoft Flight Simulator 2020/2024.");
  dp("Aeronaves del COTA para Prepar3D.", "COTA aircraft for Prepar3D.");
  dp("Escenarios del COTA para Microsoft Flight Simulator 2020/2024.", "COTA scenarios for Microsoft Flight Simulator 2020/2024.");
  dp("Escenarios del COTA para Prepar3D.", "COTA scenarios for Prepar3D.");
  dp("Programa de entrenamiento de la Escuela de Aviación Militar Virtual del COTA.", "Training program of the COTA Virtual Military Aviation School.");
  dp("Liveries del COTA - VSOA: pinturas oficiales de las aeronaves de la comunidad.", "COTA - VSOA liveries: official liveries of the community's aircraft.");
  dp("Manuales y documentos del COTA - VSOA.", "COTA - VSOA manuals and documents.");
  dp("Procedimientos operativos del COTA - VSOA.", "COTA - VSOA operational procedures.");

  /* ---- cobertura extra (todas las páginas) ---- */
  ct("15 de marzo de 1949", "March 15, 1949");
  ct("10 de Agosto de 1912", "August 10, 1912");
  ct("9 de enero de 1951", "January 9, 1951");
  ct("10 de agosto de 1944", "August 10, 1944");
  ct("9 de diciembre de 1975", "December 9, 1975");
  ct("24 de junio de 1952", "June 24, 1952");
  ct("Sí", "Yes");
  ct("No", "No");
  ct("pilotos", "pilots");
  ct("redes", "networks");
  ct("Escenarios", "Scenarios");
  ct("OPERACIONES", "OPERATIONS");
  ct(". Sus pilotos llevan a cabo misiones de transporte táctico y estratégico, vuelos logísticos, despliegue de personal y carga, operaciones antárticas, traslados de autoridades, ejercicios conjuntos y misiones de ayuda humanitaria, siguiendo procedimientos inspirados en la doctrina de la Fuerza Aérea Argentina y buscando ofrecer una experiencia de simulación lo más fiel y profesional posible.", ". Its pilots carry out tactical and strategic airlift missions, logistics flights, personnel and cargo deployment, Antarctic operations, VIP transport, joint exercises and humanitarian aid missions, following procedures inspired by the Argentine Air Force doctrine and seeking to offer a simulation experience as faithful and professional as possible.");
  ct("Formación integral para los futuros pilotos virtuales de la unidad. En esta etapa se instruye sobre procedimientos, fraseología y normativas de vuelo. La instrucción abarca desde la adaptación inicial en aeronaves Tecnam P2002, pasando por la instrucción avanzada y acrobática en Beechcraft T-6C Texan II, preparando al aspirante para las distintas especialidades operativas.", "Comprehensive training for the unit's future virtual pilots. This stage covers procedures, phraseology and flight regulations. Training ranges from initial adaptation on Tecnam P2002 aircraft, through advanced and aerobatic instruction on the Beechcraft T-6C Texan II, preparing the applicant for the different operational specialities.");
  ct("En vuelo", "In flight");
  ct("Sin conexión", "Offline");
  ct("sin conexión", "offline");
  ct("Sin plan de vuelo", "No flight plan");
  ct("Sin plan de vuelo cargado", "No flight plan filed");
  ct("No está volando en este momento.", "Not flying right now.");
  ct("Ver historial", "View history");
  ct("Ver evento", "View event");
  ct("Agregar a Google Calendar", "Add to Google Calendar");
  ct("COTA PRESENTE", "COTA ATTENDING");
  ct("Suelo", "Ground");
  ct("Cargando.", "Loading.");
  ct("Sin datos", "No data");
  ct("Error al cargar", "Error loading");
  ct("Sin conexión a VATSIM", "No VATSIM connection");
  ct("Error al conectar con VATSIM", "Error connecting to VATSIM");
  ct("Error de conexión con VATSIM", "VATSIM connection error");
  ct("Callsign VATSIM", "VATSIM callsign");
  ct("Aeronave", "Aircraft");
  ct("Ruta", "Route");
  ct("Altitud", "Altitude");
  ct("Velocidad", "Speed");
  ct("Rumbo", "Heading");
  ct("Squawk", "Squawk");
  ct("Enviando...", "Sending...");
  ct("Enviar solicitud", "Send request");
  ct("Hubo un error al enviar. Escribinos por Instagram y te ayudamos.", "There was an error sending. Write to us on Instagram and we will help you.");
  ct("Todavía no hay pilotos cargados en el roster", "No pilots loaded in the roster yet");
  ct("Agregalos en PILOTS (nombre + CID), dentro del <script> del archivo — ver instrucciones arriba.", "Add them in PILOTS (name + CID), inside the page <script> — see instructions above.");
  ct("Roster vacío", "Empty roster");
  ct("No se pudo conectar con VATSIM en este momento — reintentando…", "Could not connect to VATSIM right now — retrying…");
  ct("en el roster", "in the roster");
  ct("datos de las", "data from the");
  ct("actualizado", "updated");
  ct("No hay eventos programados en este momento.", "No events scheduled at this time.");
  ct("Sincronizado con VATSIM", "Synced with VATSIM");
  ct("Mostrando eventos guardados de las", "Showing cached events from");
  ct("No se pudo sincronizar con VATSIM en este momento.", "Could not sync with VATSIM right now.");
  ct("Segundo vuelo ferry de los F-16 de la Fuerza Aerea Argentina.", "Second ferry flight of the Argentine Air Force F-16s.");
  ct("Cruzá los Andes en una de las rutas más impresionantes de Sudamérica. Aeroparque Jorge Newbery (SABE) a Santiago de Chile (SCEL).", "Cross the Andes on one of the most impressive routes in South America. Jorge Newbery Airport (SABE) to Santiago de Chile (SCEL).");
  ct("Operación en la FIR Resistencia (SARR). Aeropuerto principal: SARI – Cataratas del Iguazú. Cobertura ATC completa y vistas espectaculares.", "Operation in the Resistencia FIR (SARR). Main airport: SARI – Iguazú Falls. Full ATC coverage and spectacular views.");
  ct("La COTA estará presente", "COTA will be present");

  function contentPass(){
    var lang = norm(LANG);
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        var p = n.parentNode;
        if (!p || !p.tagName) return NodeFilter.FILTER_REJECT;
        if (/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT;
        if (p.hasAttribute && (p.hasAttribute('data-i18n') || p.hasAttribute('data-i18n-h'))) return NodeFilter.FILTER_REJECT;
        if (n.__i18nOrig != null) return CONTENT[n.__i18nOrig.replace(/^\s+|\s+$/g, '')] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        var cur = n.nodeValue.replace(/^\s+|\s+$/g, '');
        if (cur.length < 2 || cur.length > 400) return NodeFilter.FILTER_REJECT;
        return CONTENT[cur] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function(n){
      if (n.__i18nOrig == null) n.__i18nOrig = n.nodeValue;
      var trimmed = n.__i18nOrig.replace(/^\s+|\s+$/g, '');
      var entry = CONTENT[trimmed];
      if (!entry) return;
      var v = entry[lang];
      if (v == null) v = entry.es;
      var nv = n.__i18nOrig.replace(trimmed, v);
      if (n.nodeValue !== nv) n.nodeValue = nv;
    });
  }

  function attrPass(){
    var lang = norm(LANG);
    [].slice.call(document.querySelectorAll('[placeholder]')).forEach(function(el){
      var p = el.getAttribute('placeholder');
      if (!p) return;
      if (el.__i18nOrigPh == null) el.__i18nOrigPh = p;
      var trimmed = el.__i18nOrigPh.replace(/^\s+|\s+$/g, '');
      var entry = CONTENT[trimmed];
      if (!entry) return;
      var v = entry[lang];
      if (v == null) v = entry.es;
      el.setAttribute('placeholder', el.__i18nOrigPh.replace(trimmed, v));
    });
  }

  function titlePass(){
    var lang = norm(LANG);
    var e = TITLES[document.title];
    if (e){ var v = e[lang]; if (v == null) v = e.es; document.title = v; }
    [].slice.call(document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]')).forEach(function(el){
      var c = el.getAttribute('content');
      if (!c) return;
      var pair = TITLES[c];
      if (!pair) return;
      var v = pair[lang]; if (v == null) v = pair.es;
      el.setAttribute('content', v);
    });
  }

  function descPass(){
    var lang = norm(LANG);
    [].slice.call(document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')).forEach(function(el){
      var c = el.getAttribute('content');
      if (!c) return;
      var pair = DESCS[c];
      if (!pair) return;
      var v = pair[lang]; if (v == null) v = pair.es;
      el.setAttribute('content', v);
    });
  }

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
    chromePass();
    contentPass();
    attrPass();
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
    titlePass();
    descPass();
    refreshSelector();
  };

  I18N.setLang = function(l){
    LANG = norm(l);
    try { localStorage.setItem(STORE, LANG); } catch(e){}
    document.documentElement.lang = LANG;
    I18N.lang = LANG;
    I18N.apply();
  };

  I18N.c = function(s){
    if (!s || norm(LANG) !== 'en') return s;
    return CONTENT[s] ? (CONTENT[s].en || s) : s;
  };

  I18N.locale = function(){
    return norm(LANG) === 'en' ? 'en-US' : 'es-AR';
  };

  document.addEventListener('click', function(ev){
    var target = ev.target;
    while (target && target !== document && !(target.classList && target.classList.contains('lang-btn'))) target = target.parentNode;
    if (target && target !== document) I18N.setLang(target.getAttribute('data-lang'));
  });

  var LANG = norm(current());
  document.documentElement.lang = LANG;
  I18N.lang = LANG;
  function boot(){ I18N.apply(); startObserver(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  function startObserver(){
    if (!window.MutationObserver || !document.body) return;
    var timer = 0;
    new MutationObserver(function(muts){
      for (var i = 0; i < muts.length; i++){
        if (muts[i].type === 'childList' || muts[i].type === 'characterData'){
          if (timer) return;
          timer = setTimeout(function(){ timer = 0; try { contentPass(); } catch(e){} }, 80);
          return;
        }
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
})();
