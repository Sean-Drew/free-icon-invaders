// Global variables
const btnStart = document.querySelector('.btnStart')
const gameOverEle = document.getElementById('gameOverEle')
let gamePlay = false
let player
let animateGame

// Event listeners
btnStart.addEventListener('click', startGame)

function startGame () {
    gamePlay = true
    gameOverEle.style.display = 'none'
    player = {
        score: 0,
        barWidth: 100,
        lives: 100,
    }
    animateGame = requestAnimationFrame(playGame)
}

function playGame () {
    console.log('game in play')
    animateGame = requestAnimationFrame(playGame)
}