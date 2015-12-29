$(function() {
  /*==================================*/
  /*               DATA               */
  /*==================================*/

  /* create array to keep track of what to build */
  /*TODO: replace this with a loop to create the array based on selectable elements */
  var selectedElements = [];
  selectedElements['title'] = false;
  selectedElements['break'] = false;
  selectedElements['infobar'] = false;
  selectedElements['covers'] = false;
  selectedElements['text'] = false;
  selectedElements['list'] = false;
  selectedElements['sidebyside'] = false;
  selectedElements['table'] = false;

  /* code snippets to build with */
  /*TODO: load this from files  */
  /*TODO: Retain formatting in strings */
  var title = '{section:type=wysiwyg|title=Title}\n\t<span style="color: rgb(0, 136, 204); font-family: arial; font-size: large;">\n\t\tDocument Title\n\t</span>\t\n<hr>\n{section}';
  var sectionbreak = '{section:type=source|title=Break}\n\t<hr>\n{section}';
  var infobar = '{section:type=infobar|title=InfoBar}\n\t{infobar:social=true|feedback=true|rating=false|attachments=false|history=false|tags=false|pageInfo=true|height=250}\n{section}';
  var covers = '{section:type=wysiwyg|title=Covers}<div style="font-family: Verdana, Helvetica, Arial, sans-serif;"><u><font size="5" color="#0088CC" face="arial">This Wiki Covers:</font></u></div><div><b style="font-size: medium;"><br><ul style="margin: 0px;"><li style="font-family: Verdana, Helvetica, Arial, sans-serif;"><font face="arial"><b>Lorem ipsum dolor sit amet</b><br></font></li><li style="font-family: Verdana, Helvetica, Arial, sans-serif;"><font face="arial"><b>consectetur adipiscing elit</b><br></font></li></ul></b></div>{section}';
  var text = '{section:type=wysiwyg|title=Text Section}<div style="font-size: 13px; color: rgb(0, 0, 0); font-family: Verdana, Helvetica, Arial, sans-serif;"><u><font color="#0088CC" size="5" face="arial">Section title</font></u></div><br><font size="4" face="arial">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</font>{section}';
  var list = '{section:type=wysiwyg|title=List Section}<u style="font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 13px;"><font size="5" color="#0088CC" face="arial">List title</font></u><div style="font-family: Verdana, Helvetica, Arial, sans-serif;"><span style="font-family: arial;"><br><font size="4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font></span></div><div style="font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 13px;"><font size="3" face="arial"><b><br></b></font></div><div style="font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 13px;"><font size="3" face="arial"><b>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</b></font></div><div style="font-family: Verdana; font-size: 12px;"><div style="font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 13px;"><br></div></div><div style="font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 12px;"><font size="3" face="arial"><b>2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</b></font><ul style="margin: 0px;"><li><font face="arial" size="3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</font></li></ul></div><div style="font-family: Verdana; font-size: 12px;"><div style="font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 13px;"><br></div></div>{section}';
  var sidebyside = '{section:type=wysiwyg,wysiwyg|title=Side by Side Section}<table style="width:100%" class="wiki-builder"><tr><td style="width:50%;vertical-align:top;" class="wiki-builder"><div style="font-size: 13px; color: rgb(0, 0, 0); font-family: Verdana, Helvetica, Arial, sans-serif;"><u><font size="5" color="#0088CC" face="arial">Left side title</font></u></div><div style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, Arial, sans-serif;"><br><font face="arial" size="4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</font></div></td class="wiki-builder"><td style="width:50%;vertical-align:top;" class="wiki-builder"><div style="font-size: 13px; color: rgb(0, 0, 0); font-family: Verdana, Helvetica, Arial, sans-serif;"><font face="arial"><u><font size="5" color="#0088CC">Right side title</font></u></font></div><div style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, Arial, sans-serif;"><br><font face="arial" size="4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</font></div></td class="wiki-builder"></tr></table class="wiki-builder">{section}';
  var table = '{section:type=table|title=Table Section}{table}Column Title 1 | Column Title 2 | Column Title 3 Lorem ipsum dolor sit amet | consectetur adipiscing elit | sed do eiusmod tempor incididunt ut labore et dolore magna aliqua{table}{section}';


  /*==================================*/
  /*            FUNCTIONS             */
  /*==================================*/

  /* clear all checkboxes and textarea */
  var clear = function() {
    $('input').prop('checked',false);
    $('#code').val('');
  }

  /* update build array based on what is checked */
  $("input").change(function() {
    selectedElements[this.id] = !selectedElements[this.id];
  });

  /* build the code */
  $('#submit').click(function(event) {
    var code = "";
    /* TODO: make this a loop */
    if(selectedElements['title']) {
      code = code + title + '\n';
    }
    if(selectedElements['break']) {
      code = code + sectionbreak + '\n';
    }
    if(selectedElements['infobar']) {
      code = code + infobar + '\n';
    }
    if(selectedElements['covers']) {
      code = code + covers + '\n';
    }
    if(selectedElements['text']) {
      code = code + text + '\n';
    }
    if(selectedElements['list']) {
      code = code + list + '\n';
    }
    if(selectedElements['sidebyside']) {
      code = code + sidebyside + '\n';
    }
    if(selectedElements['table']) {
      code = code + table + '\n';
    }
    $('#code').val(code);
    $('#code').focus().select();
    event.preventDefault();
  });

  /* clear on button click */
  $('#clear').click(function(event) {
    clear();
  });

  /* clear by default on page load */
  clear();
});
