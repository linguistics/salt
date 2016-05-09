var admin_escapes = 0;
document.addEventListener('keyup', function(ev) {
  if (ev.which == 27) {
    admin_escapes++;
  }
  if (admin_escapes > 1) {
    document.getElementById('admin').style.display = 'block';
  }
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
try { ga('create', 'UA-69465853-1', 'auto'); ga('send', 'pageview'); }
catch (err) { console.error('Google Analytics error:', err); }

/**
The program default is to show all days, but if the page's hash matches one
of the days, show only that day.
*/
function initializeProgram() {
  var elements = document.getElementById('days').children;
  // var program_days = ['thursday', 'friday', 'saturday', 'sunday'];
  function updateProgram() {
    var target = window.location.hash.slice(1);
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      // nb. Element#classList.contains() complains if you use an empty string
      var active = (target === '') || el.classList.contains(target);
      if (active) {
        el.classList.remove('hidden');
      }
      else {
        el.classList.add('hidden');
      }
    }
  }
  window.addEventListener('hashchange', updateProgram);
  // finally, initialize once manually on page load/render:
  updateProgram();
}
