// gemeinsamer zugriff auf das playwright-paket der global installierten cli.
// nutzt die bereits vorhandene headless-shell, damit nichts nachgeladen werden muss.
const path = require('path');
const fs = require('fs');
const os = require('os');
const { execSync } = require('child_process');
const root = execSync('npm root -g').toString().trim();
const pw = require(path.join(root, '@playwright/cli/node_modules/playwright'));
const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
const shell = fs.readdirSync(cache).filter(d => d.startsWith('chromium_headless_shell-')).sort().pop();
const executablePath = path.join(cache, shell, fs.readdirSync(path.join(cache, shell)).find(d => d.startsWith('chrome-headless-shell')), 'chrome-headless-shell');
module.exports = { launch: () => pw.chromium.launch({ executablePath }) };
