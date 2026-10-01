/* Projekt FLZ: Seite teilen (LinkedIn, WhatsApp, E-Mail, Link kopieren). */
(function () {
  'use strict';
  var SHARE_URL = location.protocol === 'file:' ? 'https://hochstrasser.com/flz-der-polizei-ulm/' : location.href;
  var SHARE_TITLE = 'FLZ im „Neuen Bau“ Ulm — hochstrasser.';
  var u = encodeURIComponent(SHARE_URL), t = encodeURIComponent(SHARE_TITLE);
  document.getElementById('shLi').href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + u;
  document.getElementById('shWa').href = 'https://wa.me/?text=' + encodeURIComponent(SHARE_TITLE + ' ' + SHARE_URL);
  document.getElementById('shMa').href = 'mailto:?subject=' + t + '&body=' + encodeURIComponent(SHARE_TITLE + '\n' + SHARE_URL);

  var cp = document.getElementById('shCp'), note = document.getElementById('shNote');
  function done(msg) { note.textContent = msg; setTimeout(function () { note.textContent = ''; }, 2600); }
  cp.addEventListener('click', function () {
    var fallback = function () {
      var ta = document.createElement('textarea');
      ta.value = SHARE_URL; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:absolute;left:-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done('Link kopiert'); } catch (e) { note.textContent = SHARE_URL; }
      document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(SHARE_URL).then(function () { done('Link kopiert'); }, fallback);
    } else { fallback(); }
  });
})();
