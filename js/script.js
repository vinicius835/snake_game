
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const score = document.querySelector(".score---value")
const finalscore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const size = 30

let snake = [
    {x: 270, y:240},
    {x: 300, y:240}
]

const randomNumber = (min,max) =>{
    return Math.round(Math.random() * (max-min)+min)
}
const randomPosition = () =>{
    const number = randomNumber(0,canvas.width - size)
    return Math.round(number/30)*30
}
const randomColor = () => {
    const red = randomNumber(0,255)
    const green = randomNumber(0,255)
    const blue = randomNumber(0,255)
    return `rgb(${red},${green},${blue})`
}
const food = {
    x:randomPosition(), 
    y:randomPosition(),
    color: randomColor()
}

const incrementScore = () => {
    score.innerText = parseInt(score.innerText) + 10
}

let direction
let LoopId
const drawfood = () => {
    const {x,y,color} = food
    ctx.shadowColor =color
    ctx.shadowBlur = 100
    ctx.fillStyle = food.color
    ctx.fillRect(food.x,food.y,size,size)
    ctx.shadowBlur = 0
}
const drawsnake = () => {
    ctx.fillStyle = "#000099"
    snake.forEach((position,index)=>{
        if (index == snake.length -1){
            ctx.fillStyle = "blue"
        }
        ctx.fillRect(position.x,position.y,size,size)
        
    })
}
const moveSnake = () => {
    if(!direction) return
    const head = snake[snake.length -1]
    
    if (direction == "right"){
        snake.push({x:head.x + size,y:head.y})
    }
    if (direction == "left"){
        snake.push({x:head.x - size,y:head.y})
    }
    if (direction == "up"){
        snake.push({x:head.x,y:head.y - size})
    }
    if (direction == "down"){
        snake.push({x:head.x,y:head.y + size})
    }
    snake.shift()
}
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#192919"
    for (let i = 30; i< canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i,0)
        ctx.lineTo(i,600)
        ctx.stroke() 
         ctx.beginPath()
        ctx.lineTo(0,i)
        ctx.lineTo(600,i)
        ctx.stroke() 
        
        
    }

}

const checkEat = () =>{
    const head = snake[snake.length -1]
    if(head.x == food.x && head.y == food.y){
        incrementScore()
        snake.push(head)

        let x = randomPosition()
        let y = randomPosition()
        while (snake.find((position)=> position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition()
        }
        food.x = x 
        food.y = y
        food.color = randomColor()
    }
}
const checkCollision = () => {
    const head = snake[snake.length -1 ]
    const canvasLimit = canvas.width - size
    const wallColision =head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    const neckindex = snake.length -2
    const selfColision = snake.find((position,index) => {
        return index< neckindex && position.x == head.x && position.y == head.y
    })
    if (wallColision || selfColision){
        gameover()

    }
}
const gameover = () => {
    direction = undefined
    menu.style.display = "flex"
    canvas.style.filter = "blur(4px)"
    finalscore.innerText = score.innerText

}
buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    snake = [{x:270,y:240},
             {x: 300, y:240}
    ]
})
const gameLoop = () => {
    clearInterval(LoopId)

    ctx.clearRect(0,0,600,600)
    checkCollision()
    checkEat()
    drawfood()
    drawGrid()
    moveSnake()
    drawsnake()
    LoopId = setTimeout(() => {
        gameLoop()
    },150)
}

gameLoop()

document.addEventListener("keydown",({key}) =>{
    if (key == "ArrowRight" && direction != "left") {
        direction = "right" 
    
    }else{
    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }else{
    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }else{
    if (key == "ArrowDown" && direction != "up") {
    direction = "down"
}
}
}
}
    
    
    

})
