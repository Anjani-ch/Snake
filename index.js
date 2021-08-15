const msg = document.querySelector('#msg')
const canvas = document.querySelector('canvas')

const ctx = canvas.getContext('2d')

const square = {
    sizeX: 10,
    sizeY: 5
}

const snake = {
    body: [{ x: 30, y: 20 }, { x: 40, y: 20 }],
    speed: 10,
    dx: 0,
    dy: 0
}

const startSnakeBody = snake.body

const food = {}

const time = 150

let interval = null

const clearBoard = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

const generateSnake = () => {
    ctx.fillStyle = 'blue'

    snake.body.forEach(part => ctx.fillRect(part.x, part.y, square.sizeX, square.sizeY))
}

const addToSnakeBody = () => snake.body.push({ x: snake.body[snake.body.length - 1].x, y: snake.body[snake.body.length - 1].y })

const generateFood = () => {
    ctx.fillStyle = 'red'

    ctx.fillRect(food.x, food.y, square.sizeX, square.sizeY)
}

const setFoodSpawn = () => {
    for (let i = 0; i < 1000; i++) {
        const randomX = Math.round(Math.random() * canvas.width - square.sizeX)

        if (randomX % 10 === 0) {
            food.x = randomX
            break
        }
    }

    for (let i = 0; i < 1000; i++) {
        const randomY = Math.round(Math.random() * canvas.height - square.sizeY)

        if (randomY % 10 === 0) {
            food.y = randomY
            break
        }
    }
}

const stopGame = () => {
    clearInterval(interval)

    msg.style.display = 'block'
}

const detectHit = () => {
    const snakeHead = snake.body[0]

    const hasEatenFood = snakeHead.x + square.sizeX > food.x && snakeHead.x + square.sizeX <= food.x + square.sizeX && snakeHead.y >= food.y && snakeHead.y + square.sizeY <= food.y + square.sizeY

    let hasEatenSelf = false

    snake.body.forEach(part => {
        if (part.x > canvas.width) part.x = 0
        if (part.x + square.sizeX < 0) part.x = canvas.width - square.sizeX
        if (part.y > canvas.height) part.y = 0
        if (part.y + square.sizeY < 0) part.y = canvas.height - square.sizeY
    })

    snake.body.forEach((part, index) => part.x === snakeHead.x && part.y === snakeHead.y && index ? hasEatenSelf = true : '')

    if (hasEatenFood) {
        addToSnakeBody()
        setFoodSpawn()
    }

    if (hasEatenSelf) stopGame()
}

const move = () => {
    const snakeBody = snake.body
    const snakeHead = { x: snakeBody[0].x + snake.dx }

    if (snake.dy > 0) snakeHead.y = snakeBody[0].y + square.sizeY
    else if (snake.dy === -snake.speed) snakeHead.y = snakeBody[0].y - square.sizeY
    else snakeHead.y = snakeBody[0].y + snake.dy

    snakeBody.unshift(snakeHead)
    snakeBody.pop()
}

const changeDirection = e => {
    const isUpArrow = e.key === 'ArrowUp'
    const isDownArrow = e.key === 'ArrowDown'
    const isLeftArrow = e.key === 'ArrowLeft'
    const isRightArrow = e.key === 'ArrowRight'

    if (isUpArrow || isDownArrow) {
        const isGoingDown = snake.dy === snake.speed
        const isGoingUp = snake.dy === -snake.speed

        if (isUpArrow && !isGoingDown) snake.dy = -snake.speed
        else if (isDownArrow && !isGoingUp) snake.dy = snake.speed

        snake.dx = 0
    } else if (isLeftArrow || isRightArrow) {
        const isGoingRight = snake.dx === snake.speed
        const isGoingLeft = snake.dx === -snake.speed

        if (isLeftArrow && !isGoingRight) snake.dx = -snake.speed
        else if (isRightArrow && !isGoingLeft) snake.dx = snake.speed

        snake.dy = 0
    }
}

const resetGame = () => {
    snake.body = [{ x: 30, y: 20 }, { x: 40, y: 20 }]
    snake.dy = 0
    snake.dx = snake.speed

    clearInterval(interval)
    setFoodSpawn()

    interval = setInterval(updateBoard, time)

    msg.style.display = 'none'
}

const updateBoard = () => {
    clearBoard()
    generateSnake()
    generateFood()
    move()
    detectHit()
}

setFoodSpawn()

snake.dx = snake.speed
interval = setInterval(updateBoard, time)

addEventListener('keydown', changeDirection)
addEventListener('keyup', e => e.key === 'Escape' ? resetGame() : '')