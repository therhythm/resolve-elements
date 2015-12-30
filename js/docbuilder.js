$(function() {
  var elements = [];
  var elementCode = [];

  /* load code snippets from JSON file, keep a seperate array of available
      elements, and a seperate array for selected elements
      Place elements on page
      Make elements drag-n-drop*/
  $.getJSON('js/elements.json', function(data) {
    $.each(data.elements, function(key,val) {
        elements.push(key);
        elementCode[key] = val.code;
        $('#elements').append('<div class="draggable btn btn-primary" id="' + key + '">' + val.name + '</div>');
        $('.draggable').draggable({
          revert: "invalid",
          containment: "document",
          helper: "clone",
          cursor: "move"
        });
        $('#droppable').droppable({
          accept: ".draggable",
          drop: function(event,ui) {
            $(this).append($(ui.draggable).clone());
            $("#droppable .draggable").addClass("snippet");
            $(".snippet").removeClass("ui=draggable draggable");
            $(".snippet").draggable({
              containment: 'parent'
            });
          }
        });
    });

    /* build the code */
    $('#submit').click(function(event) {
      buildCode(event);
    });
  });

  function buildCode(event) {
    var code = "";
    var snippets = $('#droppable').children()
    for (var i = 0; i < snippets.length; i++) {
      code = code + elementCode[snippets[i].id] + "\n";
    }
    $('#code').val(code);
    $('#code').focus().select();
    event.preventDefault();
  }

  /* clear build area, code area */
  function clear() {
    $('#code').val('');
    $('#droppable').empty();
  }

  /* clear on button click */
  $('#clear').click(function(event) {
    clear();
  });

  /* clear by default on page load */
  clear();
});
