var canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
var maxRadius = 40;
var r = 5;
var mouse = {
  x: undefined,
  y: undefined,
};
var amt = 800;

var colorArray = [
  "#272F32",
  "#9DBDC6",
  "#FF3D2E",
  "#DAEAEF",
  "#5B2D87",
  "#E62591",
  "#009AB8",
  "#F57A20",
  "#E8E615",
];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event Listeeners
window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener(
  "touchmove",
  function (ev) {
    mouse.x = ev.touches[0].clientX;
    mouse.y = ev.touches[0].clientY;
  },
  false
);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(canvas.width);
  console.log(canvas.height);
  init();
});

function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.maxRadius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function () {
    c.beginPath();
    c.arc(
      (this.x += this.dx),
      (this.y += this.dy),
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    c.fillStyle = this.color;
    c.lineWidth = 0.7;
    c.stroke();
    c.fill();
  };
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;

    // Logic
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 8;
      }
    } else if (this.radius > this.maxRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}

var circleArray = [];
function init() {
  if (window.innerWidth < window.innerHeight) {
    amt = 600;
    r = 3.6;
    maxRadius = 25;
  } else amt = 1200;
  circleArray = [];
  for (var i = 0; i < amt; i++) {
    var radius = Math.random() * r + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 1.3;
    var dy = (Math.random() - 0.5) * 1.3;
    circleArray.push(new Circle(x, y, radius, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
