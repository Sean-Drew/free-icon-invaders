// Global variables
const btnStart = document.querySelector('.btnStart')
const gameOverEle = document.getElementById('gameOverEle')
const container = document.getElementById('container')
const box = document.querySelector('.box')
const boxCenter = [ 
    box.offsetLeft + (box.offsetWidth / 2),
    box.offsetTop + (box.offsetHeight / 2)
]
// console.log('boxCenter is: ', boxCenter)

let gamePlay = false
let player
let animateGame

// Event listeners
btnStart.addEventListener('click', startGame)
container.addEventListener('mousedown', mouseDown)
container.addEventListener('mousemove', movePosition)

function movePosition (e) {
    // console.log('event is: ', e)
    let mouseAngle = getDeg(e)
    console.log('mouseAngle is: ', mouseAngle)
}

function getDeg (e) {
    let angle = Math.atan2(e.clientX - boxCenter[0], - (e.clientY - boxCenter[1]))
    return angle * (180 / Math.PI)
}

function mouseDown (e) {
    if (gamePlay) {
        console.log('from mousedown, FIRE')
    }
}

function startGame () {
    gamePlay = true
    gameOverEle.style.display = 'none'
    player = {
        score: 0,
        barWidth: 100,
        lives: 100,
    }
    // setup bad guys
    animateGame = requestAnimationFrame(playGame)
}

function playGame () {
    if (gamePlay) {
        // console.log('game in play')
        // move shots
        // update dashboard
        // move enemy
        animateGame = requestAnimationFrame(playGame)
    }
}