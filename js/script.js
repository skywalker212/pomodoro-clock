//remember timeout
var brek = 1;
var session = 25;
var totseconds = session * 60;
var spentseconds = totseconds;
var minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
var seconds = ("0" + totseconds % 60).slice(-2);
var flag = true;
var paused = true;

$('.brekint').html(brek);
$('.sesint').html(session);
$('.countseconds').html(seconds);
$('.countminutes').html(minutes);

function adjusttime(value) {
  paused = true;
  if (value == 'ses-add') {
    session++;
    totseconds = session * 60;
    spentseconds = totseconds;
    minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
    seconds = ("0" + totseconds % 60).slice(-2);

    $('.sesint').html(session);
    $('.countseconds').html(seconds);
    $('.countminutes').html(minutes);
  } else if (value == 'ses-sub') {
    if (session == 1) session = 1;
    else session--;
    console.log(totseconds);
    totseconds = session * 60;
    spentseconds = totseconds;
    minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
    seconds = ("0" + totseconds % 60).slice(-2);

    $('.sesint').html(session);
    $('.countseconds').html(seconds);
    $('.countminutes').html(minutes);
  } else if (value == 'brk-add') {
    brek++;
    $('.brekint').html(brek);
  } else {
    if (brek == 1) brek = 1;
    else brek--;
    $('.brekint').html(brek);
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
    var deg = 180 - (spentseconds / totseconds) * 180;
    $('.hand-block').rotate(deg);
    minutes = ("0" + Math.floor(spentseconds / 60)).slice(-2);
    seconds = ("0" + spentseconds % 60).slice(-2);

    $('.countseconds').html(seconds);
    $('.countminutes').html(minutes);
  }
}

function changestate() {
  paused = !paused;
  console.log(paused);
}

setInterval(intervalFun, 1000);
