// gibt den sichtbaren und verborgenen Textinhalt von <main> einer Seite aus
// (nach Ausführung der Skripte). Aufruf: node extract.js <datei.html>
const { launch } = require('./pw.js');
(async () => {
  const b = await launch();
  const p = await b.newPage();
  await p.goto('file://' + require('path').resolve(process.argv[2]), { waitUntil: 'load' });
  await p.waitForTimeout(400);
  const t = await p.evaluate(() => {
    const m = document.querySelector('main') || document.body;
    const c = m.cloneNode(true);
    c.querySelectorAll('script,style,template').forEach(e => e.remove());
    // Texte aus Attributen, die Inhalt tragen (alt, aria-label, data-*) zählen nicht
    return c.textContent;
  });
  process.stdout.write(t);
  await b.close();
})();
