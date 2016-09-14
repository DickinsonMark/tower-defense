var unparsedPLAYERSTATS = sessionStorage.getItem('PLAYERSTATS');
var PLAYERSTATS = JSON.parse(unparsedPLAYERSTATS);
var totalHP;
function Creeps(i, opts) {
  opts = opts || {};
  switch (true) {
    case PLAYERSTATS.waveNum < 5:
      totalHP = PLAYERSTATS.waveNum * 4;
      break;
    case PLAYERSTATS.waveNum < 10:
      totalHP = PLAYERSTATS.waveNum * 8;
      break;
    case PLAYERSTATS.waveNum < 15:
      totalHP = PLAYERSTATS.waveNum * 12;
      break;
    case PLAYERSTATS.waveNum < 20:
      totalHP = PLAYERSTATS.waveNum * 16;
      break;
    case PLAYERSTATS.waveNum < 25:
      totalHP = PLAYERSTATS.waveNum * 20;
      break;
    case PLAYERSTATS.waveNum < 30:
      totalHP = PLAYERSTATS.waveNum * 24;
      break;
    case PLAYERSTATS.waveNum < 35:
      totalHP = PLAYERSTATS.waveNum * 28;
      break;
    case PLAYERSTATS.waveNum < 40:
      totalHP = PLAYERSTATS.waveNum * 32;
      break;
    case PLAYERSTATS.waveNum < 45:
      totalHP = PLAYERSTATS.waveNum * 36;
      break;
    case PLAYERSTATS.waveNum < 50:
      totalHP = PLAYERSTATS.waveNum * 40;
      break;
    case PLAYERSTATS.waveNum < 55:
      totalHP = PLAYERSTATS.waveNum * 44;
      break;
    case PLAYERSTATS.waveNum < 60:
      totalHP = PLAYERSTATS.waveNum * 48;
      break;
    default:
      totalHP = PLAYERSTATS.waveNum * 100;
  }
  this.health = opts.health || totalHP * 100;
  this.alive = true;
  this.reward = opts.reward || PLAYERSTATS.waveNum;
  this.points = opts.points || PLAYERSTATS.waveNum * 100;
  this.dx = 0;
  this.dy = 1;
  this.sprite =  opts.sprite || './assets/rabbit.png';
  this.posX = 65;
  this.posY = -12 - (i * 50);
  this.imgY = 0;
}

Creeps.prototype.draw = function(ctx, totalLives) {
  ctx.clearRect(this.posX - 6, this. posY - 12, 24, 24);
  var img = new Image();
  img.src = this.sprite;
  img.onload = () => {
    ctx.drawImage(img, 32, this.imgY, 32, 32, this.posX - 6, this.posY - 12, 24, 24);
  };

  if (this.posX === 65 && this.posY === 65) {
    this.move('east');
  } else if (this.posX === 805 && this.posY === 65) {
    this.move('south');
  } else if (this.posX === 805 && this.posY === 445) {
    this.move('west');
  } else if (this.posX === 605 && this.posY === 445) {
    this.move('north');
  } else if (this.posX === 605 && this.posY === 205) {
    this.move('west');
  } else if (this.posX === 405 && this.posY === 205) {
    this.move('south');
  } else if (this.posX === 405 && this.posY === 345) {
    this.move('west');
  } else if (this.posX === 305 && this.posY === 345) {
    this.move('north');
  } else if (this.posX === 305 && this.posY === 245) {
    this.move('west');
  } else if (this.posX === 65 && this.posY === 245) {
    this.move('north');
  } else if (this.posX === 65 && this.posY === 145) {
    this.move('east');
  } else if (this.posX === 1005 && this.posY === 145 && this.alive) {
    this.dx = 0;
    this.dy = 0;
    this.alive = false;
    PLAYERSTATS.lives--;
    sessionStorage.setItem('PLAYERSTATS', '{"lives": ' + PLAYERSTATS.lives + ', "cash": ' + PLAYERSTATS.cash + ', "points": ' + PLAYERSTATS.points + ', "waveNum": ' + PLAYERSTATS.waveNum + '}');
    unparsedPLAYERSTATS = sessionStorage.getItem('PLAYERSTATS');
    PLAYERSTATS = JSON.parse(unparsedPLAYERSTATS);
    $('#stats').html('<p>Points ' + PLAYERSTATS.points + '</p><p>Wave ' + PLAYERSTATS.waveNum + '</p><p>Lives Remaining ' + PLAYERSTATS.lives + '</p><p>Cash $' + PLAYERSTATS.cash + '</p>');
  }
  this.posX += this.dx;
  this.posY += this.dy;
  return this;
};

Creeps.prototype.move = function (newDirection) {
  if (newDirection === 'east') {
    this.dx = 1;
    this.dy = 0;
    this.imgY = 64;
  } else if (newDirection === 'south') {
    this.dx = 0;
    this.dy = 1;
    this.imgY = 0;
  } else if (newDirection === 'west') {
    this.dx = -1;
    this.dy = 0;
    this.imgY = 32;
  } else if (newDirection === 'north') {
    this.dx = 0;
    this.dy = -1;
    this.imgY = 96;
  }
};
