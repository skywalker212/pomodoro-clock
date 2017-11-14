//remember timeout
var brek = 5;
var session = 25;
var totseconds = session * 60;
var spentseconds = totseconds;
var minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
var seconds = ("0" + totseconds % 60).slice(-2);
var ses = true;
var paused = true;

$('.brekint').html(brek);
$('.sesint').html(session);
$('.countseconds').html(seconds);
$('.countminutes').html(minutes);

function adjusttime(value) {
  if (value == 'ses-add') {
    session++;
    $('.sesint').html(session);
  } else if (value == 'ses-sub') {
    if (session == 1) session = 1;
    else session--;
    $('.sesint').html(session);
  } else if (value == 'brk-add') {
    brek++;
    $('.brekint').html(brek);
  } else {
    if (brek == 1) brek = 1;
    else brek--;

    $('.brekint').html(brek);
  }

  if ( (ses==true && (value=='ses-add' || value=='ses-sub')) || (ses==false && (value=='brk-add' || value=='brk-sub')) ) {
    paused = true;
    $('.hand-block').rotate(0);
    if(value=='ses-add' || value=='ses-sub') totseconds = session * 60;
    else totseconds = brek * 60;
    spentseconds = totseconds;
    minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
    seconds = ("0" + totseconds % 60).slice(-2);

    $('.countseconds').html(seconds);
    $('.countminutes').html(minutes);
  }

}

jQuery.fn.rotate = function(degrees) {
  $(this).css({
    'transform': 'rotate(' + degrees + 'deg)'
  });
  return $(this);
};

function intervalFun() {
  if (!paused) {
    spentseconds -= 1;
    var deg = 360 - ((spentseconds / totseconds) * 360) % 360;
    $('.hand-block').rotate(deg);
    minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
    seconds = ("0" + spentseconds % 60).slice(-2);

    $('.countseconds').html(seconds);
    $('.countminutes').html(minutes);
    if (spentseconds == 0) {
      ses = !ses;
      if (ses == true) {
        totseconds = session * 60;
        $('.quote').html('Work Hard - Session Running');
        $('.circle').css('background-color', 'rgb(152, 152, 152)');
      } else {
        totseconds = brek * 60;
        $('.quote').html('Take a break, have a KitKat!');
        $('.circle').css('background-color', 'rgb(36, 190, 42)');
      }
      spentseconds = totseconds;
      minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
      seconds = ("0" + totseconds % 60).slice(-2);
      $('.countseconds').html(seconds);
      $('.countminutes').html(minutes);
    }
  }
}

function changestate() {
  paused = !paused;
}

function resetthis() {
  paused = true;
  if (ses == true) totseconds = session * 60;
  else totseconds = brek * 60;
  spentseconds = totseconds;
  minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
  seconds = ("0" + totseconds % 60).slice(-2);
  $('.hand-block').rotate(0);
  $('.countseconds').html(seconds);
  $('.countminutes').html(minutes);
}

setInterval(intervalFun, 1000);
