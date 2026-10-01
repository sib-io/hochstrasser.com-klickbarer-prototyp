// Screenshots für die visuelle Prüfung.
// node shot.js <slug> [--grid] [--w=1440,390]  -> prototyp/_shots/<slug>-<w>[-grid].png
const path = require('path');
const fs = require('fs');
const { launch } = require('./pw.js');
const args = process.argv.slice(2);
const slug = args.find(a => !a.startsWith('--'));
const grid = args.includes('--grid');
const wArg = args.find(a => a.startsWith('--w='));
const widths = wArg ? wArg.slice(4).split(',').map(Number) : [1440, 390];
const out = path.resolve(__dirname, '../prototyp/_shots');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await launch();
  for (const w of widths) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    await p.goto('file://' + path.resolve(__dirname, `../prototyp/${slug}.html`), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.addStyleTag({ content: '.rv,.rv *{opacity:1!important;transform:none!important;transition:none!important}' });
    await p.evaluate(() => document.querySelectorAll('.rv').forEach(e => e.classList.add('in')));
    // lazy-Bilder sofort laden, sonst bleiben sie im Ganzseiten-Screenshot leer
    await p.evaluate(() => Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 3000); }); })));
    if (grid) {
      await p.addStyleTag({ content: `body::after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:9999;
        background:repeating-linear-gradient(to right,rgba(255,0,80,.10) 0 var(--col),transparent var(--col) calc(var(--col) + var(--gutter)));
        background-size:calc(min(100vw - 2*var(--side),var(--container)) + var(--gutter)) 100%;
        background-position:max(var(--side),calc((100vw - var(--container))/2)) 0;
        background-repeat:no-repeat;
        width:auto}
        body{position:relative}` });
    }
    await p.waitForTimeout(300);
    const file = path.join(out, `${slug}-${w}${grid ? '-grid' : ''}.png`);
    await p.screenshot({ path: file, fullPage: true });
    console.log(file);
    await p.close();
  }
  await b.close();
})();
