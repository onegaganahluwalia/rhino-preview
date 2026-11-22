/* Runs before first paint. Hides the age gate if this device confirmed age within the last 30 days. */
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  try {
    var v = JSON.parse(localStorage.getItem('rr_age_ok') || 'null');
    if (v && v.exp && v.exp > Date.now()) d.classList.add('age-ok');
    else localStorage.removeItem('rr_age_ok');
  } catch (e) {}
})();
