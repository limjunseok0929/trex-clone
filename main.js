const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let timer = 0;
let cactuses = []
let jump = false
let jumpTimer = 0
let animation

const img_cactus = new Image()
const img_trex = new Image()

img_cactus.src = 'cactus.png'
img_trex.src = 'trex.png'

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

const ExtendClass = (xCoor, image) => {
    return class {
        constructor() {
            this.x = xCoor
            this.y = 200
            this.width = 50
            this.height = 50
        }
        draw() {
            // ctx.fillStyle = color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(image, this.x, this.y)
        }
    }
}

class Trex extends ExtendClass(10, img_trex) {}
class Cactus extends ExtendClass(500, img_cactus) {}

const trex = new Trex()

const Frame = () => {
    animation = requestAnimationFrame(Frame)
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if(timer % 120 == 0) {
        const cactus = new Cactus()
        cactuses.push(cactus)
    }

    cactuses.forEach((a, i, o) => {
        if(a.x < 0) {
            o.splice(i, 1)
        }
        a.x -= 3

       crash(trex, a)

        a.draw()
    })

    if(jump) {
        trex.y -= 3
        jumpTimer++
    }
    if(!jump) {
        if(trex.y < 200){
            trex.y += 3
        }
    }
    if(jumpTimer > 40){
        jump = false
        jumpTimer = 0
    }

    trex.draw()
}
Frame()

const crash = (trex, cactus) => {
    const xDiff = cactus.x - (trex.x + trex.width)
    const yDiff = cactus.y - (trex.y + trex.height)
    if(xDiff < 0 && yDiff < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
    }
}

document.addEventListener('keydown', e => {
    if(e.code == 'Space') {
        jump = true
    }
})