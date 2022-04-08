const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const restartButton = document.getElementById('restart')
const currentSpeedText = document.getElementById('current-speed')
const desiredSpeedText = document.getElementById('desired-speed')
const speedUpButton = document.getElementById('speed-up')
const speedDownButton = document.getElementById('speed-down')

let result = 0
let hitPosition
let currentTime = 10
let timerId = null
let countDownTimerId = null
let desiredSpeed = 1000
let currentSpeed = 1000

const maxRoundsPerGame = 10
const speedStep = 100
const minSpeed = 2000


function restartBoard() {
    console.log('restart board')
    restartButton.textContent = 'restart'
    setUpParameters()
    eraseTimers()
    countDownTimerId = setInterval(countDown, currentSpeed)
    moveMole()
}

function eraseTimers() {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
}

function setUpParameters() {
    currentTime = maxRoundsPerGame
    timeLeft.textContent = currentTime
    result = 0
    score.textContent = result
    currentSpeed = desiredSpeed
    currentSpeedText.textContent = currentSpeed
}

restartButton.addEventListener('click', restartBoard)
speedUpButton.addEventListener('click', speedUp)
speedDownButton.addEventListener('click', speedDown)

function speedUp() {
    desiredSpeed -= speedStep
    if (desiredSpeed == 0) {
        desiredSpeed = speedStep
    }
    desiredSpeedText.textContent = desiredSpeed
}

function speedDown() {
    desiredSpeed += speedStep
    if (desiredSpeed >= minSpeed) {
        desiredSpeed = minSpeed
    }
    desiredSpeedText.textContent = desiredSpeed
}

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * squares.length)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
            square.classList.remove('mole')
        } else {
            result--
            if (result < 0) {
                result = 0
            }
            score.textContent = result
        }
    })
})


function moveMole() {
    timerId = setInterval(randomSquare, currentSpeed)
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('Game Over! Your final score is ' + result)
    }
}




