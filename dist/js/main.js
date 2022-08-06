import Snake from './Snake.js'
import Food from './Food.js';

const msg = document.querySelector('#msg');
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

const square = { w: 10, h: 5 };

const snake = new Snake(20, 15, square.w, square.h, 'green');
const food = new Food(square.w, square.h, 'red');

const UPDATE_TIME = 60;

let gameLoop;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  food.show(ctx);
  snake.show(ctx);
  snake.handleWalls(canvas);
  snake.update();

  if(snake.die()) {
    clearInterval(gameLoop);
    msg.style.display = 'block';
  }

  if(snake.eat(food)) {
    food.setLocation(canvas);
    snake.grow();
  }
}

function resetGame() {
  snake.reset();

  clearInterval(gameLoop);
  food.setLocation(canvas);

  gameLoop = setInterval(update, UPDATE_TIME);

  msg.style.display = 'none';
}

gameLoop = setInterval(update, UPDATE_TIME);

food.setLocation(canvas);

addEventListener('keydown', e => snake.changeDir(e));
addEventListener('keyup', e => e.key === 'Escape' ? resetGame() : '');