/* Rhino Republic v2: age gate (30 days, local only) and preview forms (no backend). No cookies, no tracking. */
(function () {
  var KEY = 'rr_age_ok', DAYS = 30;
  var root = document.documentElement;
  var gate = document.getElementById('gate');

  function setInert(on) {
    ['main', 'top'].forEach(function (id) { var el = document.getElementById(id); toggle(el, on); });
    toggle(document.querySelector('.foot'), on);
  }
  function toggle(el, on) {
    if (!el) return;
    if (on) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
    else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
  }

  if (gate) {
    if (root.classList.contains('age-ok')) { gate.hidden = true; }
    else {
      setInert(true);
      var yes = document.getElementById('gate-yes');
      yes && yes.focus();
      yes.addEventListener('click', function () {
        try { localStorage.setItem(KEY, JSON.stringify({ v: 1, exp: Date.now() + DAYS * 864e5 })); } catch (e) {}
        root.classList.add('age-ok');
        gate.hidden = true;
        setInert(false);
        var main = document.getElementById('main');
        if (main) { main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: true }); }
      });
      // "No" is a plain link to not-of-age.html; nothing is stored.
    }
  }

  // Preview forms: validate in the browser, never send anything.
  Array.prototype.forEach.call(document.querySelectorAll('.js-form'), function (form) {
    var status = form.querySelector('.form__status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) { form.reset(); return; } // honeypot tripped: silently drop
      if (!form.checkValidity()) { form.reportValidity(); return; }
      status.textContent = 'Thank you. This form is a preview and is not connected yet, so nothing has been sent or stored. Please use the email address shown on this page once it is published.';
      status.hidden = false;
      status.focus && status.setAttribute('tabindex', '-1');
      status.focus();
    });
  });
})();
