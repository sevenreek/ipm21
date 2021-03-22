class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  render(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.restore();
  }
}
class Box extends Rectangle {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    this.preMoveX = x;
    this.preMoveY = y;
  }
  resetMove() {
    this.preMoveX = this.x;
    this.preMoveY = this.y;
  }
}
class Button extends Rectangle {
  constructor(x, y, width, height, color, text, textColor) {
    super(x, y, width, height, color);
    this.text = text;
    this.textColor = textColor;
    this.fontSize = 16;
  }
  render(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillStyle = this.textColor;
    ctx.font = this.fontSize + 'px serif';
    ctx.fillText(this.text, this.x, this.y + this.height / 2 + this.fontSize / 2, this.width);
    ctx.restore();
  }
}


class MouseEventsTracker {
  constructor(canvas, onDownCB, onUpCB, onMoveCB) {
    function processMouseOrTouchEvent(evt) {
      var rect = canvas.getBoundingClientRect();
      var offsetTop = rect.top;
      var offsetLeft = rect.left;

      if (evt.touches) {
        return {
          x: evt.touches[0].clientX - offsetLeft,
          y: evt.touches[0].clientY - offsetTop
        }
      } else {
        return {
          x: evt.clientX - offsetLeft,
          y: evt.clientY - offsetTop
        }
      }
    }

    function onDown(evt) {
      evt.preventDefault();
      var coords = processMouseOrTouchEvent(evt);
      onDownCB(coords.x, coords.y);
    }

    function onUp(evt) {
      evt.preventDefault();
      onUpCB();
    }

    function onMove(evt) {
      evt.preventDefault();
      var coords = processMouseOrTouchEvent(evt);
      onMoveCB(coords.x, coords.y);
    }

    canvas.ontouchmove = onMove;
    canvas.onmousemove = onMove;
    canvas.ontouchstart = onDown;
    canvas.onmousedown = onDown;
    canvas.ontouchend = onUp;
    canvas.onmouseup = onUp;
  }
}

function isPointInShape(shape, x, y) {
  if (x > shape.x && y > shape.y && x < shape.x + shape.width && y < shape.y + shape.height) {
    return true;
  }
  return false;
}

function areShapesColliding(a, b) {
  var maxAx = a.x + a.width;
  var minAx = a.x;
  var minAy = a.y;
  var maxAy = a.y + a.height;
  var maxBx = b.x + b.width;
  var minBx = b.x;
  var minBy = b.y;
  var maxBy = b.y + b.height;
  return maxAx >= minBx && minAx <= maxBx && minAy <= maxBy && maxAy >= minBy;
}
function randomColor() {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
function resizeCanvas(canvas) {
  canvas.width = 0.9 * window.innerWidth;
  canvas.height = 0.9 * window.innerHeight;
}
document.addEventListener('DOMContentLoaded', (event) => {

  var canvas = document.getElementById('canvas');
  resizeCanvas(canvas);
  var ctx = canvas.getContext("2d");
  var boxWidth = 64;
  var boxHeight = 64;
  var spawnX = 0.8 * canvas.width;
  var spawnY = canvas.height - 128 - boxHeight;
  var rectangles = [];
  var activeShape = null;
  console.log(canvas.width, canvas.height);
  var platform = new Rectangle(16, canvas.height - 32, 0.7 * canvas.width, 16, 'red');
  var button = new Button(0.8 * canvas.width, canvas.height - 128, 0.1 * canvas.width, 64, 'blue', "Generuj klocek", 'white');

  var moveStartX = 0;
  var moveStartY = 0;

  function renderMap()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platform.render(ctx);
    button.render(ctx);
    rectangles.forEach(function (r) { r.render(ctx); });
  }
  var met = new MouseEventsTracker(canvas,
    function (x, y) { // ON DOWN
      renderMap();
      moveStartX = x;
      moveStartY = y;
      if (isPointInShape(button, x, y)) {
        rectangles.push(new Rectangle(spawnX, spawnY, boxWidth, boxHeight, randomColor()))
      }
      rectangles.forEach(function (r) {
        if (isPointInShape(r, x, y)) {
          activeShape = r;
          activeShape.preMoveX = activeShape.x;
          activeShape.preMoveY = activeShape.y;
        }
      });
    },
    function () { // ON UP
      renderMap();
      if (activeShape == null) { return; }
      if (areShapesColliding(activeShape, platform)) {
        activeShape.x = activeShape.preMoveX;
        activeShape.y = activeShape.preMoveY;
      }
      rectangles.forEach(function (r) {
        if (r === activeShape) return;
        if (areShapesColliding(r, activeShape)) {
          activeShape.x = activeShape.preMoveX;
          activeShape.y = activeShape.preMoveY;
        }
      });
      activeShape = null;
    },
    function (x, y) { // ON MOVE
      renderMap();
      var dx = x - moveStartX;
      var dy = y - moveStartY;
      moveStartX = x;
      moveStartY = y;
      if (activeShape != null) {
        activeShape.x += dx;
        activeShape.y += dy;
      }
    });
});