// KAIL'S test site. The sign-up form sends and stores NOTHING until the privacy notice is signed off (gate 5, DPDP).
// The inputs have no `name` and the button is type="button", so even with JavaScript off nothing is submitted.
// Phase 2b will replace the test message with a write to Firestore (consent flags stored separately, with a timestamp).
(function () {
  var btn = document.getElementById('signup-btn');
  if (!btn) return;
  var input = document.getElementById('mobile');
  var launch = document.getElementById('opt-launch');
  var offers = document.getElementById('opt-offers');
  var msg = document.getElementById('form-msg');

  function show(text, isError) {
    msg.textContent = text;
    msg.className = 'form-msg' + (isError ? ' err' : '');
    msg.hidden = false;
  }

  // Accepts 98765 43210, +91 98765 43210, 0 98765 43210.
  function indianMobile(raw) {
    var d = String(raw).replace(/\D/g, '');
    if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
    else if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
    return /^[6-9]\d{9}$/.test(d) ? d : null;
  }

  function submit() {
    if (!indianMobile(input.value)) {
      show('Please type a 10-digit Indian mobile number.', true);
      input.focus();
      return;
    }
    if (!launch.checked && !offers.checked) {
      show('Tick at least one box so we know which messages you want.', true);
      return;
    }
    // Nothing leaves this page on the test site.
    show('Test site: nothing was sent or saved. Sign-up opens after sign-off.', false);
    input.value = '';
    launch.checked = false;
    offers.checked = false;
  }

  btn.disabled = false;
  btn.addEventListener('click', submit);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
  });
})();
