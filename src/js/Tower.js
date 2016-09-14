function Tower(type) {
  switch (type) {
    case 1:
      this.id = 1;
      this.name = 'Sir Galahad the Pure';
      this.damage = 5;
      this.range = 50;
      this.price = 25;
      this.src = './assets/knight4.png';
      this.color = 'rgb(160, 130, 60)';
      break;
    case 2:
      this.id = 2;
      this.name = 'Sir Bedevere the Wise';
      this.damage = 10;
      this.range = 100;
      this.price = 250;
      this.src = './assets/knight1.png';
      this.color = 'rgb(80, 30, 110)';
      break;
    case 3:
      this.id = 3;
      this.name = 'Sir Robin the Not-Quite-So-Brave-as-Sir-Lancelot';
      this.damage = 20;
      this.range = 200;
      this.price = 500;
      this.src = './assets/knight3.png';
      this.color = 'rgb(60, 70, 60)';
      break;
    case 4:
      this.id = 4;
      this.name = 'Sir Lancelot the Brave';
      this.damage = 30;
      this.range = 300;
      this.price = 1000;
      this.src = './assets/knight5.png';
      this.color = 'rgb(40, 80, 120)';
      break;
    case 5:
      this.id = 5;
      this.name = 'Arthur, King of the Britons';
      this.damage = 50;
      this.range = 400;
      this.price = 10000;
      this.src = './assets/knight2.png';
      this.color = 'rgb(170, 50, 50)';
      break;
  }
}

Tower.prototype.draw = function (x, y, ctx) {
  ctx.beginPath();
  var img = new Image();
  img.src = this.src;
  img.onload = function() {
    ctx.drawImage(img, 32, 0, 32, 32, x - 12, y - 12, 24, 24);
  };
  ctx.closePath();
};
