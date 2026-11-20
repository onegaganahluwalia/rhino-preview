/* Rhino Republic: age gate. No cookies, no tracking, nothing sent anywhere. */
(function () {
  var KEY = 'rr_age_ok';
  var root = document.documentElement;
  var gate = document.getElementById('gate');
  var ask = document.getElementById('gate-ask');
  var exit = document.getElementById('gate-exit');
  var yes = document.getElementById('gate-yes');
  var no = document.getElementById('gate-no');
  var back = document.getElementById('gate-back');
  var main = document.getElementById('main');
  if (!gate) return;

  function lockPage(on) {
    ['main', 'top'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (on) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
      else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    });
    var f = document.querySelector('.foot');
    if (f) { if (on) { f.setAttribute('inert', ''); f.setAttribute('aria-hidden', 'true'); } else { f.removeAttribute('inert'); f.removeAttribute('aria-hidden'); } }
  }

  if (root.classList.contains('age-ok')) { gate.hidden = true; return; }
  lockPage(true);
  yes && yes.focus();

  yes.addEventListener('click', function () {
    try { localStorage.setItem(KEY, 'yes'); } catch (e) {}
    root.classList.add('age-ok');
    gate.hidden = true;
    lockPage(false);
    if (main) { main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: true }); }
  });
  no.addEventListener('click', function () {
    ask.hidden = true; exit.hidden = false;
    var t = document.getElementById('gate-exit-title'); t && t.focus();
  });
  back.addEventListener('click', function () {
    exit.hidden = true; ask.hidden = false; yes.focus();
  });
})();
