export default class Food {
  canvas;
  ctx;
  x;
  y;
  w;
  h;
  color;
  
  constructor(canvas, ctx, w, h, color) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  show() {
    this.ctx.fillStyle = this.color;

    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  
  setLocation() {
    let x;
    let y;

    while(!x) {
      const randomX = Math.round(Math.random() * (this.canvas.width - this.w));

      if(randomX % 10 === 0) {
        x = randomX;
      }
    }

    while(!y) {
      const randomY = Math.round(Math.random() * (this.canvas.height - this.h));

      if(randomY % 10 === 0) {
        y = randomY;
      }
    }

    this.x = x;
    this.y = y;
  }
}