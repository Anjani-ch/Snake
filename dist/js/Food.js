export default class Food {
  x;
  y;
  w;
  h;
  color;
  
  constructor(w, h, color) {
    this.w = w;
    this.h = h;
    this.color = color;
  }

  show(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  
  setLocation(canvas) {
    let x;
    let y;

    while(!x) {
      const randomX = Math.round(Math.random() * (canvas.width - this.w));

      if(randomX % 10 === 0) {
        x = randomX;
      }
    }

    while(!y) {
      const randomY = Math.round(Math.random() * (canvas.height - this.h));

      if(randomY % 10 === 0) {
        y = randomY;
      }
    }

    this.x = x;
    this.y = y;
  }
}