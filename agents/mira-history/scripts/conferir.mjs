// Conferência visual do /mira-history: abre o deck em Chrome headless, congela cada
// cena em vários instantes (?cena=id&t=segundos) e grava screenshots + folha de contato
// em references/conferencia/. Também captura erros do console.
//
//   node conferir.mjs <deck> [--cena id] [--instantes 0.3,0.5,0.9] [--leve] [--largura 1280]
//
// --instantes em fração da duração (0..1) ou em segundos com sufixo s (ex.: 2s,6.5s).
// --leve emula tela de toque (modo leve do runtime).
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { acharDeck, acharChrome, carregarPuppeteer } from './_comum.mjs';

const args = process.argv.slice(2);
function opt(nome, padrao) { const i = args.indexOf('--' + nome); return i >= 0 ? args[i + 1] : padrao; }
const deck = acharDeck(args.find(a => !a.startsWith('--')));
const soCena = opt('cena', null);
const instantes = opt('instantes', '0.25,0.6,0.95').split(',').map(s => s.trim());
const leve = args.includes('--leve');
const W = parseInt(opt('largura', '1280'), 10), Hh = Math.round(W * 9 / 16);
const out = join(deck, 'references', 'conferencia');
mkdirSync(out, { recursive: true });

const pup = await carregarPuppeteer();
if (!pup) { console.error('puppeteer não encontrado (npm i puppeteer no projeto ou no pacote do Mira).'); process.exit(1); }
const browser = await pup.launch({ headless: 'new', executablePath: acharChrome(), args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: Hh, deviceScaleFactor: 1, hasTouch: leve, isMobile: leve });
const erros = [];
page.on('pageerror', e => erros.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') erros.push('console: ' + m.text()); });
const url = 'file:///' + join(deck, 'index.html').replace(/\\/g, '/');

await page.goto(url + '?cena=0&t=0', { waitUntil: 'networkidle0', timeout: 60000 });
const cenas = await page.evaluate(() => (window.__miraHistory ? window.__miraHistory.cenas.map(c => ({ id: c.id, durS: c.durS, capa: !!c.capa, fim: !!c.fim, corte: c.corte || null, lugar: c.lugar })) : null));
if (!cenas) { console.error('O runtime não subiu (window.__miraHistory ausente). Erros: ' + erros.join(' | ')); await browser.close(); process.exit(1); }

const quadros = [];
for (const c of cenas) {
  if (soCena && c.id !== soCena) continue;
  for (const inst of instantes) {
    const t = inst.endsWith('s') ? parseFloat(inst) : Math.max(0, c.durS * parseFloat(inst));
    const tt = Math.min(t, c.durS + 2);
    await page.goto(url + '?cena=' + encodeURIComponent(c.id) + '&t=' + tt.toFixed(2), { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForFunction(() => window.__miraTestePronto === true, { timeout: 10000 }).catch(() => { erros.push('modo de teste não confirmou prontidão em ' + c.id + ' t=' + tt); });
    await new Promise(r => setTimeout(r, 250));
    const nome = `${String(cenas.indexOf(c)).padStart(2, '0')}-${c.id}-${tt.toFixed(1)}s.png`;
    await page.screenshot({ path: join(out, nome) });
    quadros.push({ cena: c.id, t: tt, nome });
  }
}
// folha de contato
const html = `<html><body style="margin:0;background:#111;color:#eee;font:13px sans-serif;display:flex;flex-wrap:wrap">${quadros.map(q => `<div style="margin:6px;width:${Math.round(W / 3)}px"><img src="${q.nome}" style="width:100%;display:block"><div style="padding:3px 2px">${q.cena} · ${q.t.toFixed(1)} s</div></div>`).join('')}</body></html>`;
const nomeFolha = soCena ? 'folha-' + soCena : 'folha';
writeFileSync(join(out, nomeFolha + '.html'), html, 'utf8');
await page.setViewport({ width: W + 40, height: 900, deviceScaleFactor: 1 });
await page.goto('file:///' + join(out, nomeFolha + '.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
await page.screenshot({ path: join(out, nomeFolha + '.png'), fullPage: true });
await browser.close();
const total = cenas.reduce((s, c) => s + c.durS, 0);
console.log(`Cenas: ${cenas.length}, duração total ${Math.round(total)} s. ${quadros.length} quadros em ${out}. Folha: ${join(out, nomeFolha + '.png')}`);
console.log(cenas.map(c => `  ${c.id.padEnd(14)} ${c.durS.toFixed(1).padStart(5)} s  ${c.corte ? 'corte ' + c.corte : 'plano-sequência'}  ${c.lugar}${c.capa ? '  (capa)' : ''}${c.fim ? '  (fim)' : ''}`).join('\n'));
if (erros.length) { console.log('ERROS NO NAVEGADOR:'); [...new Set(erros)].forEach(e => console.log('  x ' + e)); process.exitCode = 2; }
