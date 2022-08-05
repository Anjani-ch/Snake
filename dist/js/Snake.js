export default class Snake {
  canvas;
  ctx;
  x;
  y;
  w;
  h;
  color;
  body;
  initialBody;
  speed = 10;
  dx = this.speed;
  dy = 0;

  constructor(canvas, ctx, x, y, w, h, color) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.body = [{ x, y }, { x: x + 10, y }];
    this.initialBody = [...this.body];
  }

  show() {
    this.ctx.fillStyle = this.color;

    this.body.forEach(obj => this.ctx.fillRect(obj.x, obj.y, this.w, this.h));
  }

  changeDir(e) {
    const isUpArrow = e.key === 'ArrowUp';
    const isDownArrow = e.key === 'ArrowDown';
    const isLeftArrow = e.key === 'ArrowLeft';
    const isRightArrow = e.key === 'ArrowRight';

    if (isUpArrow || isDownArrow) {
      const isGoingDown = this.dy === this.speed;
      const isGoingUp = this.dy === -this.speed;
  
      if (isUpArrow && !isGoingDown) {
        this.dy = -this.speed;
      } else if (isDownArrow && !isGoingUp) {
        this.dy = this.speed;
      }
      
      this.dx = 0
    } else if (isLeftArrow || isRightArrow) {
      const isGoingRight = this.dx === this.speed;
      const isGoingLeft = this.dx === -this.speed;
  
      if (isLeftArrow && !isGoingRight) {
        this.dx = -this.speed;
      } else if (isRightArrow && !isGoingLeft) {
        this.dx = this.speed;
      }
  
      this.dy = 0;
    }
  }

  handleWalls() {
    this.body.forEach(part => {
      if (part.x > this.canvas.width) {
        part.x = 0;
      }
      
      if (part.x + this.w < 0) {
        part.x = this.canvas.width - this.w;
      }
      
      if (part.y > this.canvas.height) {
        part.y = 0;
      }
      
      if (part.y + this.h < 0) {
        part.y = this.canvas.height - this.h;
      }
    })
  }

  grow() {
    this.body.push({ x: this.body[this.body.length - 1].x, y: this.body[this.body.length - 1].y });
  }

  eat(food) {
    const head = this.body[0];
    
    const hasEatenFood = head.x + this.w > food.x && head.x + this.w <= food.x + this.w && head.y >= food.y && head.y + this.h <= food.y + this.h;

    return hasEatenFood;
  }

  die() {
    const head = this.body[0];
    let hasDied;

    this.body.forEach((part, index) => part.x === head.x && part.y === head.y && index ? hasDied = true : hasDied = false);

    return hasDied;
  }
  
  update() {
    const head = { x: this.body[0].x + this.dx };

    if (this.dy > 0) {
      head.y = this.body[0].y + this.h;
    } else if (this.dy === -this.speed) {
      head.y = this.body[0].y - this.h;
    } else {
      head.y = this.body[0].y + this.dy;
    }

    this.body.unshift(head);
    this.body.pop();
  }

  reset() {
    this.body = this.initialBody;
    this.dx = this.speed;
    this.dy = 0;
  }
}