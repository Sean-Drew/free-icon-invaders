// Global variables
const icons =  ["bars", "bug", "bowling-ball", "coffee", "couch", "football-ball", "gem", "laptop"] // Bring some icons in from fontawesome CDN
const btnStart = document.querySelector('.btnStart')
const gameOverEle = document.getElementById('gameOverEle')
const container = document.getElementById('container')
const base = document.querySelector('.base')
const box = document.querySelector('.box')
const boxCenter = [
    box.offsetLeft + (box.offsetWidth / 2),
    box.offsetTop + (box.offsetHeight / 2)
]

let gamePlay = false
let player
let animateGame
// let rect = box.getBoundingClientRect()
// console.log('rect is: ', rect)

// Event listeners
btnStart.addEventListener('click', startGame)
container.addEventListener('mousedown', mouseDown)
container.addEventListener('mousemove', movePostion)

// Game logic
function movePostion(e) {
    let deg = getDeg(e)
    box.style.webkitTransform = `rotate(${deg}deg)`
    box.style.mozTransform = `rotate(${deg}deg)`
    box.style.msTransform = `rotate(${deg}deg)`
    box.style.oTransform = `rotate(${deg}deg)`
    box.style.transform = `rotate(${deg}deg)`
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect()
    let bRect = b.getBoundingClientRect()
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right)
    )
}

function getDeg(e) {
    let angle = Math.atan2(e.clientX - boxCenter[0], -(e.clientY - boxCenter[1]))
    return angle * (180 / Math.PI)
}

function degRad(deg) {
    return deg * (Math.PI / 180)
}

function mouseDown(e) {
    if (gamePlay) {
        let div = document.createElement('div')
        let deg = getDeg(e)
        div.setAttribute('class', 'fireme')
        div.moverx = 5 * Math.sin(degRad(deg))
        div.movery = -5 * Math.cos(degRad(deg))
        div.style.left = `${boxCenter[0] - 5}px`
        div.style.top = `${boxCenter[1] - 5}px`
        div.style.width = `${10}px`
        div.style.height = `${10}px`
        container.appendChild(div)
    }
}

function startGame() {
    gamePlay = true
    gameOverEle.style.display = 'none'
    player = {
            score: 0,
            barwidth: 100,
            lives: 100
        }
        setupBadguys(10)
    animateGame = requestAnimationFrame(playGame)
}

function randomMe(num) {
    return Math.floor(Math.random() * num)
}

function setupBadguys(num) {
    for (let x = 0; x < num; x++) {
        badmaker()
    }
}

function moveEnemy() {
    let tempEnemy = document.querySelectorAll('.baddy')
    let hitter = false
    for (let enemy of tempEnemy) {
        if (enemy.offsetTop > 550 || enemy.offsetTop < 0 || enemy.offsetLeft > 750 || enemy.offsetLeft< 0) {
            enemy.parentNode.removeChild(enemy)
            badmaker()
        } else {
            enemy.style.top = `${enemy.offsetTop + enemy.movery}px`
            enemy.style.left = `${enemy.offsetLeft + enemy.moverx}px`
        }
        if (isCollide(box, enemy)) {
            // console.log('COLLISION')
            hitter = true
            player.lives--
        }
    }
    if (hitter) {
        base.style.backgroundColor = 'red'
        hitter = false
    } else {
        base.style.backgroundColor = ''
    }
}

function badmaker() {
    let div = document.createElement('div')
    let myIcon = `fa-${icons[randomMe(icons.length)]}`
    let x, y, xmove, ymove
    let randomStart = randomMe(4)
    let dirSet = randomMe(4) + 1
    let dirPos = randomMe(7) - 3
    switch (randomStart) {
        case 0:
            x = 0
            y = randomMe(600)
            ymove = dirPos
            xmove = dirSet
            break
        case 1:
            x = 800
            y = randomMe(600)
            ymove = dirPos
            xmove = dirSet * (-1)
            break
        case 2:
            x = randomMe(800)
            y = 0
            ymove = dirSet
            xmove = dirPos
            break
        case 3:
            x = randomMe(800)
            y = 600
            ymove = dirSet * (-1)
            xmove = dirPos
            break
    }
    div.innerHTML = `<i class="fas ${myIcon}"></i>`
    div.setAttribute('class', 'baddy')
    div.style.fontSize = `${randomMe(20) + 30}px`
    div.style.left = `${x}px`
    div.style.top = `${y}px`
    div.moverx = xmove
    div.movery = ymove
    container.appendChild(div)
}

function moveShots() {
    let tempShots = document.querySelectorAll('.fireme')
    for (let shot of tempShots) {
        if (shot.offsetTop > 600 || shot.offsetTop < 0 || shot.offsetLeft > 800 || shot.offsetLeft < 0) {
            shot.parentNode.removeChild(shot)
        }
        else {
            shot.style.top = `${shot.offsetTop + shot.movery}px`
            shot.style.left = `${shot.offsetLeft + shot.moverx}px`
        }
    }
}

function playGame() {
    if (gamePlay) {
        moveShots()
        //update dashboard
        moveEnemy()
        animateGame = requestAnimationFrame(playGame)
    }
}