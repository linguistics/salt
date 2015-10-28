var current_variable_global = window.current_variable;
if (current_variable_global) {
  var current_variable_el = document.getElementById('current_variable');
  current_variable_el.textContent = current_variable_global;
}
else {
  var current_variable_container_el = document.getElementById('current_variable_container');
  current_variable_container_el.style.display = 'none';
}
