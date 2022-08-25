let hasStarted = false

const start = document.querySelector('#start')
start.addEventListener('click', () => {
    if(hasStarted) {
        main.style.backgroundColor = generateColor()
    }
    hasStarted = true
    document.querySelector('#overlay').style.display = 'none'
    const clock = document.querySelector('#clock')
    let time = 100
    interval = setInterval(() => {
        if(time == 0) {
            scoreCheck = checkScore([red, green, blue], [randomR, randomG, randomB])
            document.querySelector('#overlay').style.display = 'grid'
            start.querySelector('h1').textContent = scoreCheck + '% Match'
            if(scoreCheck < 90) start.style.backgroundColor = '#aa0000'
            else start.style.backgroundColor = '#2cac2c'

            clearInterval(interval)

            sliderR.value = 0
            sliderG.value = 0
            sliderB.value = 0

            

            red = 0
            green = 0
            blue = 0

            return
        }
        time--
        clock.textContent = time / 10
    }, 100);
})

function checkScore(user, random) {
    score = 0
    
    for(i = 0; i < 3; i++) {
        score += Math.abs(user[i] - random[i])
    }
    return Math.abs(Math.round(((score - 765) / 765) * 1000) / 10)
}

let randomR;
let randomG;
let randomB;

function generateColor() {
    r = Math.round(Math.random() * 255)
    g = Math.round(Math.random() * 255)
    b = Math.round(Math.random() * 255)

    randomR = r
    randomG = g
    randomB = b

    color = 'rgb(' + r + ', ' + g + ', ' + b + ')'
    return (color)
}

function colorMaker(r, g, b) {
    color = 'rgb(' + r + ', ' + g + ', ' + b + ')'
    return (color)
}

let red = 0
let green = 0
let blue = 0

const userColor = document.querySelector('#userColor')
const colorDisplay = userColor.querySelector('h1')

const sliderR = document.querySelector('#red')
sliderR.addEventListener('change', () => {
    red = sliderR.value
    userColor.style.backgroundColor = colorMaker(red, green, blue)
    colorDisplay.textContent = colorMaker(red, green, blue)
})

const sliderG = document.querySelector('#green')
sliderG.addEventListener('change', () => {
    green = sliderG.value
    userColor.style.backgroundColor = colorMaker(red, green, blue)
    colorDisplay.textContent = colorMaker(red, green, blue)
})

const sliderB = document.querySelector('#blue')
sliderB.addEventListener('change', () => {
    blue = sliderB.value
    userColor.style.backgroundColor = colorMaker(red, green, blue)
    colorDisplay.textContent = colorMaker(red, green, blue)
})

const main = document.querySelector('#main')
main.style.backgroundColor = generateColor()


