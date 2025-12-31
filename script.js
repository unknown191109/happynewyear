const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

class Firework {
  constructor(x, y, targetY, color) {
    this.x = x;
    this.y = y;
    this.targetY = targetY;
    this.color = color;
    this.speed = Math.random() * 3 + 4;
  }

  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      explode(this.x, this.y, this.color);
      return true;
    }
    return false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.alpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.015;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

let fireworks = [];
let particles = [];

function explode(x, y, color) {
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 60%)`;
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.12) {
    fireworks.push(
      new Firework(
        Math.random() * canvas.width,
        canvas.height,
        Math.random() * canvas.height * 0.5,
        randomColor()
      )
    );
  }

  fireworks = fireworks.filter(fw => {
    fw.draw();
    return !fw.update();
  });

  particles = particles.filter(p => {
    p.update();
    p.draw();
    return p.alpha > 0;
  });

  requestAnimationFrame(animate);
}

animate();
