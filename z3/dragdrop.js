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
    ctx.font = this.fontSize+'px serif';
    ctx.fillText(this.text, this.x, this.y+this.height/2+this.fontSize/2, this.width);
    ctx.restore();
  }
}


var MouseTouchTracker = function (canvas, callback) {

  function processEvent(evt) {
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
    var coords = processEvent(evt);
    callback('down', coords.x, coords.y);
  }

  function onUp(evt) {
    evt.preventDefault();
    callback('up');
  }

  function onMove(evt) {
    evt.preventDefault();
    var coords = processEvent(evt);
    callback('move', coords.x, coords.y);
  }

  canvas.ontouchmove = onMove;
  canvas.onmousemove = onMove;

  canvas.ontouchstart = onDown;
  canvas.onmousedown = onDown;
  canvas.ontouchend = onUp;
  canvas.onmouseup = onUp;
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
function randomColor()
{
  return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

document.addEventListener('DOMContentLoaded', (event) => {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  var spawnX = 0;
  var spawnY = 0;
  var boxWidth = 64;
  var boxHeight = 64;
  var rectangles = [];
  var activeShape = null;
  console.log(canvas.width, canvas.height);
  var platform = new Rectangle(16, canvas.height - 32, 0.7 * canvas.width, 16, 'red');
  var button = new Button(0.8*canvas.width, canvas.height-128, 0.1*canvas.width, 64, 'blue', "Spawn", 'white');

  var moveStartX = 0;
  var moveStartY = 0;

  var mtt = new MouseTouchTracker(canvas,
    function (evtType, x, y) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      platform.render(ctx);
      button.render(ctx);
      rectangles.forEach(function(r) { r.render(ctx); });
      switch (evtType) {

        case 'down':
          moveStartX = x;
          moveStartY = y;
          if(isPointInShape(button, x, y))
          {
            rectangles.push(new Rectangle(spawnX, spawnY, boxWidth, boxHeight, randomColor()))
          }
          rectangles.forEach(function(r) { 
            if(isPointInShape(r, x, y)) {
              activeShape = r;
              activeShape.preMoveX = activeShape.x;
              activeShape.preMoveY = activeShape.y;
            }
          });
          break;

        case 'up':
          if(areShapesColliding(r, platform))
          {
            activeShape.x = activeShape.preMoveX;
            activeShape.y = activeShape.preMoveY;
          }
          rectangles.forEach(function(r) {
            if(r === activeShape) return;
            if(areShapesColliding(r, activeShape))
            {
              activeShape.x = activeShape.preMoveX;
              activeShape.y = activeShape.preMoveY;
            }
          });
          activeShape = null;
          break;

        case 'move':
          var dx = x - moveStartX;
          var dy = y - moveStartY;
          moveStartX = x;
          moveStartY = y;
          if(activeShape != null)
          {
            activeShape.x += dx;
            activeShape.y += dy;
          }
          break;
      }

      //rectangle.render(ctx);
    }
  );
  //the event occurred
});