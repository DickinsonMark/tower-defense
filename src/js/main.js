const CANVAS0 = document.getElementById('canvas0');
const CANVAS1 = document.getElementById('canvas1');
const CANVAS2 = document.getElementById('canvas2');
const CANVAS3 = document.getElementById('canvas3');
const CTX0 = CANVAS0.getContext('2d');
const CTX1 = CANVAS1.getContext('2d');
const CTX2 = CANVAS2.getContext('2d');
const CTX3 = CANVAS3.getContext('2d');
const stage = new createjs.Stage('canvas2');
var counter = 1;
var creepKillCounter = 0;
var creepArr = [];
var towerArr = [];
var mousePosition = {};
var towerPositions = [];
var currentInterval;
var started = false;
var playerName;

sessionStorage.setItem('PLAYERSTATS', '{"lives": 20, "cash": 50, "points": 0, "waveNum": 1}');
var unparsedPLAYERSTATS = sessionStorage.getItem('PLAYERSTATS');
var PLAYERSTATS = JSON.parse(unparsedPLAYERSTATS);

if (localStorage.getItem('HighScores') === null) {
  localStorage.setItem('HighScores', '[{"name": "Mark Dickinson", "score": 1000}]');
}

$(document).on('ready', function() {
  'use strict';
  $(document).on('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
  var field = new Image();
  field.src = 'assets/mapbackground.png';
  field.onload = () => {
    CTX0.drawImage(field, 0, 0, 512, 512, 0, 0, 500, 300);
    CTX0.drawImage(field, 0, 0, 512, 512, 500, 0, 500, 300);
    CTX0.drawImage(field, 0, 0, 512, 512, 0, 300, 500, 300);
    CTX0.drawImage(field, 0, 0, 512, 512, 500, 300, 500, 300);
  };
  drawMap(CTX1);
  for (var k = 1; k <= 5; k++) {towerArr[k] = new Tower(k);}
  function towerSelection() {
    towerArr.forEach(function(tower) {
      $('#status-area').append('<div id="tower' + counter + '" class="tower afford"><h5>Press the ' + counter + ' key to recruit</h5><h5>' + tower.name + '</h5><br><h6>$' + tower.price + '</h6></div>');
      if (PLAYERSTATS.cash < tower.price) {
        $('#tower' + tower.id).css({background: 'red', color: 'black'});
      } else {
        $('#tower' + tower.id).removeAttr('style');
      }
      counter++;
    });
  }
  towerSelection();
  setUpNewWave();

  $('#play').on('click', function(e) {
    e.preventDefault();
    $('body').append('<audio src="./assets/wave-start.m4a" autoplay>');
    CTX2.clearRect(0, 0, 1000, 600);
    currentInterval = interval();
    $(this).css('display', 'none');
    $('#next-wave').css('display', 'block');
    $('#next-wave').focus();
  });

  $('#next-wave').on('click', function(e) {
    if (creepArr.length === 0) {
      $('body').append('<audio src="./assets/wave-start.m4a" autoplay>');
      setUpNewWave();
      clearInterval(currentInterval);
      currentInterval = interval();
      console.log(this);
    }
  });

  $('#next-wave').on('keydown', function(e) {
    if (e.key === 'Enter') {
      if (creepArr.length === 0) {
        $('body').append('<audio src="./assets/wave-start.m4a" autoplay>');
        setUpNewWave();
        clearInterval(currentInterval);
        currentInterval = interval();
      }
    }
  });

  function interval() {
    return setInterval(function() {
      unparsedPLAYERSTATS = sessionStorage.getItem('PLAYERSTATS');
      PLAYERSTATS = JSON.parse(unparsedPLAYERSTATS);
      towerArr.forEach(function(tower) {
        if (PLAYERSTATS.cash < tower.price) {
          $('#tower' + tower.id).css({background: 'red', color: 'black'});
        } else {
          $('#tower' + tower.id).removeAttr('style');
        }
      });
      if (PLAYERSTATS.lives === 0) {
        gameOver();
      }
      drawCreeps();
      checkForCreeps();
    }, 100 / 6);
  }

  function checkForCreeps() {
    if (creepArr.length !== 0) {
      for (let creep in creepArr) {
        for (let tower in towerPositions) {
          if (!creepArr[creep].alive) {
            creepArr.splice(creep, 1);
          }
          if (checkRange(creepArr[creep], towerPositions[tower]) <= towerPositions[tower].range) {
            withinRange(creepArr[creep], towerPositions[tower]);
          } else {
            creepArr[creep].color = 'rgb(128, 12, 128)';
          }
        }
      }
    } else {
      endWave();
    }
  }

  function endWave() {
    clearInterval(currentInterval);
    CTX2.clearRect(0, 0, 1000, 600);
    unparsedPLAYERSTATS = sessionStorage.getItem('PLAYERSTATS');
    PLAYERSTATS = JSON.parse(unparsedPLAYERSTATS);
    var waveNum = PLAYERSTATS.waveNum;
    changePLAYERSTATS('cash', 100 + waveNum);
    changePLAYERSTATS('waveNum', 1);
    towerArr.forEach(function(tower) {
      if (PLAYERSTATS.cash < tower.price) {
        $('#tower' + tower.id).css({background: 'red', color: 'black'});
      } else {
        $('#tower' + tower.id).removeAttr('style');
      }
    });
  }

  function drawCreeps() {
    CTX2.clearRect(0, 0, 1000, 600);
    creepArr.forEach(function(creep) {
      creep.draw(CTX2);
    });
  }

  function setUpNewWave() {
    for (var i = 0; i < 10; i++) {creepArr.push(new Creeps(i));}
    for (var j = 0; j < creepArr.length; j++) {stage.addChild(drawCreepArr(j));}
    function drawCreepArr(j) {
      creepArr[j].draw(CTX2);
    }
  }
  $('#next-wave').focus();
});

$('#begin').on('click', function(e) {
  e.preventDefault();
  unparsedPLAYERSTATS = sessionStorage.getItem('PLAYERSTATS');
  PLAYERSTATS = JSON.parse(unparsedPLAYERSTATS);
  $('#stats').html('<p>Points ' + PLAYERSTATS.points + '</p><p>Wave ' + PLAYERSTATS.waveNum + '</p><p>Lives Remaining ' + PLAYERSTATS.lives + '</p><p>Cash $' + PLAYERSTATS.cash + '</p>');
  $('#welcome').css('display', 'none');
  $('#askName').css('display', 'block');
  $('#name').focus();
  $('#askName').append('<audio src="assets/whatname.m4a" autoplay>');
});

$('#answerName').on('click', function(e) {
  e.preventDefault();
  playerName = $('#name').val() || 'Player 1';
  $('#askName').css('display', 'none');
  $('#instructions').css({display: 'block', textalign: 'left'});
  $('#ready').focus();
});

$('#ready').on('click', function(e) {
  $('#instructions').css('display', 'none');
  showGame();
  $('#play').focus();
});

function showGame() {
  $('#canvas-holder').css('display', 'block');
  $('#status-area').css('display', 'flex');
}

$('#runAway').on('click', function(e) {
  e.preventDefault();
  $('#welcome').css('display', 'none');
  $('body').append('<img id="ran" src="./assets/runaway.gif">');
});

$('#canvas3').mousemove(function(event) {
  mousePosition.x = event.offsetX;
  mousePosition.y = event.offsetY;
});

$(document).on('keydown', function(e) {
  var x = mousePosition.x;
  var y = mousePosition.y;
  var keyPressed = parseInt(e.key);
  // if (((x < 55 || x > 85) && (y > 85)) && ((y < 55 || y  > 85) && (x < 55 || x > 825)) && ((x > 825 ||  x < 795) && (y < 55 || y > 465)) && ((y > 465 || y < 435) && (x > 825 || x < 595)) && ((x < 595 || x > 625) && (y > 465 || y < 195)) && ((y < 195 || y > 225) && (x > 625 || x < 395)) && ((x < 395 || x > 425) && (y < 195 || y > 365)) && ((y > 365 || y < 335) && (x > 425 || x < 295)) && ((x < 295 || x > 325) && (y > 365 || y < 235 )) && ((y < 235 || y > 265) && (x > 325 || x < 55)) && ((x < 55 || x > 85) && (y > 265 || y < 135)) && ((y < 135 || y > 165) && (x < 55))) {
  if (keyPressed <= 5 && keyPressed >= 1) {
    if (PLAYERSTATS.cash >= towerArr[keyPressed].price) {
      towerArr[keyPressed].draw(mousePosition.x, mousePosition.y, CTX3);
      towerPositions.push({xPos: mousePosition.x, yPos: mousePosition.y, damage: towerArr[keyPressed].damage, range: towerArr[keyPressed].range});
      changePLAYERSTATS('cash', -towerArr[keyPressed].price);
    }
    towerArr.forEach(function(tower) {
      if (PLAYERSTATS.cash < tower.price) {
        $('#tower' + tower.id).css({background: 'red', color: 'black'});
      } else {
        $('#tower' + tower.id).removeAttr('style');
      }
    });
  }
});

function checkRange(creepPos, towerPos) {
  let x1 = parseInt(creepPos.posX);
  let x2 = parseInt(towerPos.xPos);
  let y1 = parseInt(creepPos.posY);
  let y2 = parseInt(towerPos.yPos);
  if (x1 >= 0 && x1 <= 1000 && y1 >= 0 && y1 <= 600) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}

function withinRange(creep, tower) {
  if (creep.health >= 1) {
    CTX2.beginPath();
    CTX2.moveTo(creep.posX + 5, creep.posY + 5);
    CTX2.lineTo(tower.xPos, tower.yPos);
    CTX2.strokeStyle = 'red';
    CTX2.stroke();
    CTX2.closePath();
    creep.health -= tower.damage;
  } else {
    changePLAYERSTATS('cash', creep.reward);
    changePLAYERSTATS('points', creep.points);
    creepKillCounter++;
    creep.alive = false;
  }
}

function changePLAYERSTATS(variable, value) {
  unparsedPLAYERSTATS = sessionStorage.getItem('PLAYERSTATS');
  PLAYERSTATS = JSON.parse(unparsedPLAYERSTATS);
  PLAYERSTATS[variable] += value;
  sessionStorage.setItem('PLAYERSTATS', '{"lives": ' + PLAYERSTATS.lives + ', "cash": ' + PLAYERSTATS.cash + ', "points": ' + PLAYERSTATS.points + ', "waveNum": ' + PLAYERSTATS.waveNum + '}');
  unparsedPLAYERSTATS = sessionStorage.getItem('PLAYERSTATS');
  PLAYERSTATS = JSON.parse(unparsedPLAYERSTATS);
  $('#stats').html('<p>Points ' + PLAYERSTATS.points + '</p><p>Wave ' + PLAYERSTATS.waveNum + '</p><p>Lives Remaining ' + PLAYERSTATS.lives + '</p><p>Cash $' + PLAYERSTATS.cash + '</p>');
}

function gameOver() {
  clearInterval(currentInterval);
  $('#canvas-holder').css('display', 'none');
  $('#status-area').css('display', 'none');
  $('#gameOver').css('display', 'block');
  $('#gameStats').append('<h2>Game Over!</h2><h4>Great job!</h4><ul><li>score: ' + PLAYERSTATS.points + '</li><li>Wave: ' + PLAYERSTATS.waveNum + '</li></ul>');
  createHighScores(playerName);
}

function createHighScores(playerName) {
  let totalPoints = PLAYERSTATS.points;
  let unparsedHighScores = localStorage.getItem('HighScores');
  let highScores = JSON.parse(unparsedHighScores);
  highScores.push({name: playerName, score: totalPoints});
  highScores.sort(function(obj1, obj2) {
    return obj2.score - obj1.score;
  });
  if (highScores.length > 10) {highScores.pop();}
  localStorage.setItem('HighScores', JSON.stringify(highScores));
}

$('#highScores').on('click', function(e) {
  e.preventDefault();
  let unparsedHighScores = localStorage.getItem('HighScores');
  let highScores = JSON.parse(unparsedHighScores);
  let looped = 1;
  $('#gameOver').css('display', 'none');
  $('.leaderboard').css('display', 'block');
  $('#leaderboard').html('<h2>High Scores</h2><table id="leadtable" class="table table-striped"></table>');
  highScores.forEach(function(people) {
    $('#leadtable').append('<tr><td>' + looped + '</td><td>' + people.name + '</td><td>' + people.score + '</td></tr>');
    looped++;
  });
});
