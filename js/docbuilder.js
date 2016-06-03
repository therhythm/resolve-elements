$(function() {
  var elements = [];
  var elementCode = [];

  /**
   * clear by default on page load
   */
  clear();

  /**
   * load code snippets from JSON file, keep a seperate array of available
   * elements
   * Place elements on page
   * Make elements drag-n-drop
   * Bind event handlers for form buttons
   */
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

    $('#submit').click(function(event) {
      buildCode(event);
    });

    $('#clear').click(function(event) {
      clearBuilder();
    });
  });

 /**
  * Bind event handlers for form buttons
  */
  $('#buildstamp').click(function(event) {
    buildStamp(event);
  });
  $('#clearstamp').click(function(event) {
    clearStamp();
  });

  /**
   * Build the code
   */
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


  /**
   * Build the timestmap
   */
  function buildStamp(event) {
    var timestamp = new Date();
    var stamp = $('#rkmname').val() + ' ' + timestamp.toLocaleString() + '\n';
    $('#timestamp').val(stamp);
    $('#timestamp').focus().select();
    event.preventDefault();
  }

  /* clear build area, code area */
  function clearBuilder() {
    $('#code').val('');
    $('#droppable').empty();
  }

  /* clear timestamp area */
  function clearStamp() {
    $('#timestamp').val('');
  }

  function clear() {
    clearBuilder();
    clearStamp();
  }
});
