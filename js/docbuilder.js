$(function() {
  var elements = [];
  var elementCode = [];

  var mistakes = [];
  var mistakeFeedback = [];


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
  * Load possible mistakes from JSON file, keep a seperate array of
  * possible mistakes
  * Place possible mistakes on page
  * Bind event handlers for form buttons
  */
  $.getJSON('js/review.json', function(data) {
    $.each(data.mistakes, function(key,val) {
      mistakes.push(key);
      mistakeFeedback[key] = val.feedback;
      $('#mistakes').append('<div class="checkbox"><label><input type="checkbox" id="' + key + '">' + val.name + '</label></div>')
    });

    $('#review').click(function(event) {
      buildReview(event);
    });

    $('#clearreview').click(function(event) {
      clearReview();
    });
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
   * Build the review
   */
  function buildReview(event) {
    var timestamp = new Date();
    var review = $('#rkmname').val() + ' ' + timestamp.toLocaleString() + '\n';
    var checkboxes = $('#mistakes div label input');
    for (var i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked) {
        review = review + '- ' + mistakeFeedback[checkboxes[i].id] + '\n';
      }
    }
    $('#feedback').val(review);
    $('#feedback').focus().select();
    event.preventDefault();
  }

  /* clear build area, code area */
  function clearBuilder() {
    $('#code').val('');
    $('#droppable').empty();
  }

  /* clear review checkboxes, feedback area */
  function clearReview() {
    var checkboxes = $('#mistakes div label input');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    $('#feedback').val('');
  }

  function clear() {
    clearBuilder();
    clearReview();
  }
});
