function dnss(urls) {
  // initialize all the images
  $('.jobsprite').each(function() {
    $(this).css('background-image', "url('" + urls.mainbar + "/jobicon_pvp.png')");
  });

  // is async, don't care when we get it
  $.getJSON(urls.job, function(data) {
    db = data;

    // have it stay a little
    $('.skill[data-skill]').each(function() {
      var dom = $(this);
      dom.data('desc', 'hover'); // initialize desc
      init_description(dom);
    });
  });

  $('.skill[data-skill]').each(function() {
    var dom = $(this);
    var lvl = dom.data('lvl').split(',').map(int);
    var grayed = lvl[0] == 0 ? '_b' : '';
    var sprite = dom.data('sprite').split(',');
    sprite[1] *= -50;
    sprite[2] *= -50;

    dom.css('background', "url('"+ urls.mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px"); // initial setup
    dom.find('.skill-bdr')
       .css('background', "url('" + urls.border + "') 100px 0")
       .addClass(lvl[0] > 0 ? null : 'gray');
    dom.find('.skill-lvl').text([lvl[0] + lvl[3], lvl[1]].join('/'));

    dom.on('mousedown', skill_adj);

    // disable right click; maybe disable whole panel body?
    dom.on('contextmenu', preventDefault);
  });
}

function preventDefault(e) {
  e.preventDefault();
}

function int(v) {
  return parseInt(v);
}

function sum(p, c) {
  return p+c
}

function get_curr_max_sp() {
  return Job.TSP.reduce(sum);
}

function get_max_sp() {
  return Job.Levels.slice(0, Job.MaxLevel).reduce(sum);
}
