function drawMap(ctx) {
  var map;
  // create rows
  for (var x = 0; x < 50; x++) {
    // create colomns
    for (var y = 0; y < 30; y++) {
      if (drawTrack(x, y)) {
        map = new Rectangle(x * 20, y * 20, 'RGB(121, 76, 19)', ctx);
      }
    }
  }
  var tree9 = new Image();
  tree9.src = './assets/tree9.png';
  tree9.onload = () => {
    ctx.drawImage(tree9, 150, 420);
  };
  var tree3 = new Image();
  tree3.src = './assets/tree3.png';
  tree3.onload = () => {
    ctx.drawImage(tree3, 850, 0);
  };
  var tree5 = new Image();
  tree5.src = './assets/tree5.png';
  tree5.onload = () => {
    ctx.drawImage(tree5, 470, 425);
  };
  var lake = new Image();
  lake.src = './assets/pond.png';
  lake.onload = () => {
    ctx.drawImage(lake, -50, 400);
  };

}

function drawTrack(x, y) {
  if ((x === 3 && (y >= 0 && y <= 3)) || (y === 3 && (x >= 3 && x < 40)) || (x === 40 && (y >= 3 && y <= 22)) || (y === 22 && (x <= 40 && x >= 30)) || (x === 30 && (y <= 22 && y >= 10)) || (y === 10 && (x <= 30 && x >= 20)) || (x === 20 && (y >= 10 && y <= 17)) || (y === 17 && (x <= 20 && x >= 15)) || (x === 15 && (y >= 12 && y <= 17)) || (y === 12 && (x <= 15 && x >= 3)) || (x === 3 && (y <= 12 && y >= 7)) || (y === 7 && (x >= 3 && x <= 50))) {
    return true;
  }
  return false;
}

function Rectangle(xPos, yPos, color, ctx) {
  ctx.beginPath();
  ctx.rect(xPos, yPos, 20, 20);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
