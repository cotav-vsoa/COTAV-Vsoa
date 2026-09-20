// ASCII-only generator (uses \uXXXX to avoid encoding issues)
const fs = require('fs');
const path = require('path');
const root = path.resolve('.');
const src = path.join(root, 'storage', 'escenarios-p3d', 'index.html');
let tpl = fs.readFileSync(src, 'utf8');

const cats = [
  { id: 'escenarios-p3d', tit: 'Escenarios Escuela Prepar3D \u00b7 COTAV', desc: 'Escenarios del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual (Prepar3D).', h2: 'Escenarios Escuela Prepar3D', p: 'Escenarios del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual (Prepar3D), de libre descarga para alumnos.' },
  { id: 'escenarios-mfs', tit: 'Escenarios Escuela MFS 2020/24 \u00b7 COTAV', desc: 'Escenarios del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual (MFS 2020/24).', h2: 'Escenarios Escuela MFS 2020/24', p: 'Escenarios del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual (MFS 2020/24), de libre descarga para alumnos.' },
  { id: 'aviones-p3d', tit: 'Aviones Escuela Prepar3D \u00b7 COTAV', desc: 'Aviones del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual (Prepar3D).', h2: 'Aviones Escuela Prepar3D', p: 'Aviones del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual (Prepar3D), de libre descarga para alumnos.' },
  { id: 'aviones-mfs', tit: 'Aviones Escuela MFS 2020/24 \u00b7 COTAV', desc: 'Aviones del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual (MFS 2020/24).', h2: 'Aviones Escuela MFS 2020/24', p: 'Aviones del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual (MFS 2020/24), de libre descarga para alumnos.' },
  { id: 'liveries', tit: 'Liveries Escuela \u00b7 COTAV', desc: 'Pinturas oficiales del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual.', h2: 'Liveries Escuela', p: 'Pinturas oficiales del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual, de libre descarga para alumnos.' },
  { id: 'manuales', tit: "MTL's Escuela \u00b7 COTAV", desc: "Manuales t\u00e9cnicos del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual.", h2: "MTL's Escuela", p: "Manuales t\u00e9cnicos y material de lectura del COTAV para la Escuela de Aviaci\u00f3n Militar Virtual." }
];

const baseAbs = 'https://faav-vsoa.github.io/FAAV-Vsoa/storage/escuela-de-aviacion-militar-virtual/';

cats.forEach(function (cat) {
  const url = baseAbs + cat.id + '/index.html';
  const dir = path.join(root, 'storage', 'escuela-de-aviacion-militar-virtual', cat.id);
  fs.mkdirSync(dir, { recursive: true });
  const oldTail = path.join('storage', 'escenarios-p3d', 'index.html');
  const newTail = path.join('storage', 'escuela-de-aviacion-militar-virtual', cat.id, 'index.html');
  let h = tpl
    .replace('<title>Escenarios Prepar3D \u00b7 COTAV</title>', '<title>' + cat.tit + '</title>')
    .replace('<meta name="description" content="Escenarios del COTAV para Prepar3D.">', '<meta name="description" content="' + cat.desc + '">')
    .replace(oldTail.replace(/\\/g, '\\\\'), newTail.replace(/\\/g, '\\\\'))
    .replace('<h2>Escenarios Prepar3D</h2>', '<h2>' + cat.h2 + '</h2>')
    .replace('<p>Escenarios y scenery packs del COTAV (Prepar3D), de libre descarga para pilotos.</p>', '<p>' + cat.p + '</p>');
  fs.writeFileSync(path.join(dir, 'index.html'), h);
  console.log('ok ' + cat.id);
});
console.log('DONE');
