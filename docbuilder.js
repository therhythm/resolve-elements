$(function() {
  /* load code snippets from JSON file, keep a seperate array of available
      elements, and a seperate array for selected elements
      Place elements on page */
  $.getJSON('elements.json', function(data) {
    var elements = [];
    var elementCode = [];
    var selectedElements = [];
    $.each(data.elements, function(key,val) {
        elements.push(key);
        elementCode[key] = val.code;
        selectedElements[key] = false
        $('#elements').append('<div class="checkbox"><label><input type="checkbox" id="' + key + '">' + val.name + '</label></div>');
    });

    /* update build array based on what is checked */
    $('input').change(function() {
      selectedElements[this.id] = !selectedElements[this.id];
    });

    /* build the code
      TODO: base this of actual checkboxes instead of array
    */
    $('#submit').click(function(event) {
      var code = "";
      for (var i = 0; i < elements.length; i++) {
        if(selectedElements[elements[i]]) {
          code = code + elementCode[elements[i]] + "\n"
        }
      }
      $('#code').val(code);
      $('#code').focus().select();
      event.preventDefault();
    });
  });

  /* clear all checkboxes, textarea */
  var clear = function() {
    $('input').prop('checked',false);
    $('#code').val('');
  }

  /* clear on button click */
  $('#clear').click(function(event) {
    clear();
  });

  /* clear by default on page load */
  clear();
});
