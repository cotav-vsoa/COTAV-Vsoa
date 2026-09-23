<?php
/**
 * Actualiza data/stats.json con las estadísticas de VATSIM de cada piloto.
 * Pensado para correr como Cron Job de cPanel (línea de comandos / PHP CLI),
 * así el sitio en cotavirtual.com.ar se actualiza solo, sin subir nada a mano.
 *
 * Es el equivalente en PHP de tools/fetch-stats.js (que corre en GitHub Actions
 * para el repo). Mismo roster, misma lógica de cálculo.
 *
 * CONFIGURACIÓN EN CPANEL:
 *   cPanel > Cron Jobs > Add New Cron Job
 *   Común (cada 6 horas):  0  */6  *  *  *
 *   Comando (ajustá la ruta a tu usuario/cPanel):
 *     /usr/local/bin/php /home/cotavirt/public_html/tools/update-stats.php
 *
 *   Si no sabés la ruta del PHP CLI, en cPanel > Cron Jobs suele haber un
 *   botón "PHP Version" o podés probar con: php /home/cotavirt/public_html/tools/update-stats.php
 */

set_time_limit(0); // no cortar por timeout: el proceso tarda varios minutos por los límites de la API de VATSIM

$PILOTS = [
    ['cid' => 1562806, 'callsign' => 'FAG-212'],
    ['cid' => 1462350, 'callsign' => 'FAG-213'],
    ['cid' => 0,        'callsign' => 'FAG-222'],
    ['cid' => 1665183, 'callsign' => 'FAG-228'],
    ['cid' => 1665608, 'callsign' => 'FAG-229'],
    ['cid' => 1502178, 'callsign' => 'FAG-230'],
    ['cid' => 1712199, 'callsign' => 'FAG-236'],
    ['cid' => 1282428, 'callsign' => 'FAG-246'],
    ['cid' => 1835877, 'callsign' => 'FAG-251'],
    ['cid' => 2005108, 'callsign' => 'FAG-255'],
    ['cid' => 1785540, 'callsign' => 'FAG-256'],
];

const BASE = 'https://api.vatsim.net/v2/members';
$OUT_PATH = __DIR__ . '/../data/stats.json';

function log_line($msg) {
    echo '[' . date('Y-m-d H:i:s') . '] ' . $msg . "\n";
}

function http_get_json($url, $retries = 6) {
    for ($i = 0; $i < $retries; $i++) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTPHEADER => ['User-Agent: COTAV-Stats-Bot/1.0'],
        ]);
        $body = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($code === 200 && $body !== false) {
            $json = json_decode($body, true);
            if ($json !== null) return $json;
        }
        if ($code === 429) {
            $wait = ($i + 1) * 10;
            log_line("429, esperando {$wait}s...");
            sleep($wait);
            continue;
        }
        if ($i === $retries - 1) {
            throw new Exception("HTTP $code en $url");
        }
        sleep(3);
    }
    throw new Exception("HTTP 429 (reintentos agotados) en $url");
}

function compute_stats($historyResult, $fpsRaw) {
    $sessions = (is_array($historyResult) && isset($historyResult['items'])) ? $historyResult['items'] : [];
    $fps = is_array($fpsRaw) ? $fpsRaw : [];

    $totalMinutes = 0;
    foreach ($sessions as $s) {
        if (!empty($s['start']) && !empty($s['end'])) {
            $d = (strtotime($s['end']) - strtotime($s['start'])) / 60;
            if ($d > 0) $totalMinutes += $d;
        }
    }
    $hrs = intdiv((int)$totalMinutes, 60);
    $mins = (int)round($totalMinutes) % 60;
    $hoursStr = "{$hrs}h {$mins}m";

    $lastSession = count($sessions) > 0 ? $sessions[0] : null;
    $lastStr = '—';
    $lastDetailStr = '';

    if ($lastSession) {
        $lastDate = strtotime($lastSession['start']);
        $lastStr = ($lastSession['callsign'] ?? '—') . ' · ' . fecha_es($lastDate);

        $lastFp = null; $lastFpTime = 0;
        foreach ($fps as $fp) {
            if (isset($fp['connection_id']) && $fp['connection_id'] == $lastSession['id']) {
                $t = strtotime($fp['filed'] ?? '');
                if ($t > $lastFpTime) { $lastFp = $fp; $lastFpTime = $t; }
            }
        }
        if (!$lastFp) {
            $endT = strtotime($lastSession['end']);
            $startT = strtotime($lastSession['start']);
            foreach ($fps as $fp) {
                if (empty($fp['connection_id']) || empty($fp['filed'])) continue;
                $t = strtotime($fp['filed']);
                if ($t > $lastFpTime && $t <= $endT + 3600 && $t >= $startT - 3600) {
                    $lastFp = $fp; $lastFpTime = $t;
                }
            }
        }
        if ($lastFp) {
            $acShort = explode('/', $lastFp['aircraft'] ?? '')[0] ?: ($lastFp['aircraft'] ?? '');
            $dep = $lastFp['dep'] ?? '??';
            $arr = $lastFp['arr'] ?? '??';
            $lastDetailStr = '<span style="color:var(--blue-light);font-weight:400;">' . $dep . '</span> '
                . '<span style="color:var(--muted);font-size:10px;">→</span> '
                . '<span style="color:var(--blue-light);font-weight:400;">' . $arr . '</span> '
                . '<span style="color:var(--muted);font-size:10px;">·</span> '
                . '<span style="color:var(--blue-light);font-weight:400;">' . $acShort . '</span>';
        }
    }

    $airportCount = []; $aircraftCount = []; $seenConn = [];
    foreach ($fps as $fp) {
        if (!isset($fp['connection_id']) || $fp['connection_id'] === null) continue;
        $cid = $fp['connection_id'];
        $t = strtotime($fp['filed'] ?? '');
        if (isset($seenConn[$cid]) && $seenConn[$cid] > $t) continue;
        $seenConn[$cid] = $t;
        if (!empty($fp['dep'])) $airportCount[$fp['dep']] = ($airportCount[$fp['dep']] ?? 0) + 1;
        if (!empty($fp['arr'])) $airportCount[$fp['arr']] = ($airportCount[$fp['arr']] ?? 0) + 1;
        $ac = explode('/', $fp['aircraft'] ?? '')[0] ?: ($fp['aircraft'] ?? '');
        if ($ac) $aircraftCount[$ac] = ($aircraftCount[$ac] ?? 0) + 1;
    }

    $fpByConn = []; $fpByConnTime = [];
    foreach ($fps as $fp) {
        if (!isset($fp['connection_id']) || $fp['connection_id'] === null) continue;
        $cid = $fp['connection_id'];
        $t = strtotime($fp['filed'] ?? '');
        if (!isset($fpByConn[$cid]) || $t > $fpByConnTime[$cid]) {
            $fpByConn[$cid] = $fp;
            $fpByConnTime[$cid] = $t;
        }
    }

    // Filtro de RMKs que identifican vuelos del COTAV en VATSIM.
    // Ej: VSOA/FAAV.COM.AR, RMK/COTAV, www.cotavirtual.com.ar. Se comparan en
    // minúsculas; 'cota' ya cubre 'cotav' y 'cotavirtual'.
    $RMK_TOKENS = ['vsoa', 'faav', 'cota', 'cotav', 'cotavirtual'];

    // Recorremos TODO el historial (no solo las últimas 10 sesiones en bruto)
    // para juntar hasta 10 vuelos que cumplan el filtro COTAV. Así, si alguno
    // de los vuelos más recientes no tiene el remark correcto, seguimos
    // buscando hacia atrás en vez de mostrar menos de 10.
    $seen = []; $matched = [];
    foreach ($sessions as $s) {
        $fp = $fpByConn[$s['id']] ?? null;
        if (!$fp) {
            $best = null; $bestT = 0;
            $startT = strtotime($s['start']); $endT = strtotime($s['end']);
            foreach ($fps as $f) {
                if (empty($f['filed'])) continue;
                $t = strtotime($f['filed']);
                if ($t > $bestT && $t <= $endT + 3600 && $t >= $startT - 3600) {
                    $best = $f; $bestT = $t;
                }
            }
            $fp = $best;
        }
        $ac = $fp ? (explode('/', $fp['aircraft'] ?? '')[0] ?: ($fp['aircraft'] ?? '')) : '—';
        $route = $fp ? (($fp['dep'] ?? '??') . ' → ' . ($fp['arr'] ?? '??')) : '—';
        $remark = ($fp && !empty($fp['rmks'])) ? $fp['rmks'] : '';
        $flight = [
            'callsign' => $s['callsign'] ?? '—',
            'aircraft' => $ac,
            'route' => $route,
            'date' => fecha_es(strtotime($s['start'])),
            'remark' => $remark,
        ];

        $key = $flight['callsign'] . '|' . $flight['aircraft'] . '|' . $flight['route'] . '|' . $flight['date'];
        if (isset($seen[$key])) continue;
        $seen[$key] = true;

        $r = strtolower($remark);
        $isCota = false;
        foreach ($RMK_TOKENS as $t) {
            if ($remark !== '' && strpos($r, $t) !== false) { $isCota = true; break; }
        }
        if ($isCota) $matched[] = $flight;

        // Si ya tenemos 10 vuelos filtrados, no hace falta seguir escaneando.
        if (count($matched) >= 10) break;
    }

    // Solo mostramos vuelos marcados VSOA/FAAV/COTA. Si no hay ninguno, queda vacío.
    $filtered = $matched;

    arsort($airportCount);
    arsort($aircraftCount);

    return [
        'hours' => $hoursStr,
        'last' => $lastStr,
        'lastDetail' => $lastDetailStr,
        'airport' => count($airportCount) ? array_key_first($airportCount) : '—',
        'aircraft' => count($aircraftCount) ? array_key_first($aircraftCount) : '—',
        'lastFlights' => array_slice($filtered, 0, 10),
    ];
}

function fecha_es($timestamp) {
    $meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];
    return date('d', $timestamp) . ' de ' . $meses[(int)date('n', $timestamp) - 1] . ' de ' . date('Y', $timestamp);
}

function fetch_pilot_stats($cid) {
    if (!$cid) return null;
    $history = http_get_json(BASE . '/' . $cid . '/history?limit=2000');
    sleep(4);
    $fps = http_get_json(BASE . '/' . $cid . '/flightplans?limit=2000');
    return compute_stats($history, $fps);
}

// ---- main ----

$statsData = [];
if (file_exists($OUT_PATH)) {
    $existing = json_decode(file_get_contents($OUT_PATH), true);
    if (is_array($existing)) $statsData = $existing;
}

$toFetch = array_values(array_filter($PILOTS, function ($p) { return $p['cid']; }));
log_line('Pilotos a actualizar: ' . count($toFetch));
log_line('Esperando 45s (límite de la API de VATSIM)...');
sleep(45);

$ok = 0; $fail = 0;
foreach ($toFetch as $p) {
    echo "  {$p['callsign']} (CID {$p['cid']})... ";
    try {
        $stats = fetch_pilot_stats($p['cid']);
        $statsData[(string)$p['cid']] = $stats;
        file_put_contents($OUT_PATH, json_encode($statsData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        echo "OK ({$stats['hours']})\n";
        $ok++;
    } catch (Exception $e) {
        echo 'FAILED (' . $e->getMessage() . ")\n";
        $fail++;
    }
    sleep(8);
}

log_line("Listo: $ok OK, $fail fallidos");
log_line('Total en stats.json: ' . count($statsData));
