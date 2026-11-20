/* Runs before first paint: hides the age gate for visitors who already confirmed on this device. */
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  try { if (localStorage.getItem('rr_age_ok') === 'yes') d.classList.add('age-ok'); } catch (e) {}
})();
