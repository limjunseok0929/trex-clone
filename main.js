const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let timer = 0;
let cactuses = []
let jump = false
let jumpTimer = 0

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

const ExtendClass = (xCoor, color) => {
    return class {
        constructor() {
            this.x = xCoor
            this.y = 200
            this.width = 50
            this.height = 50
        }
        draw() {
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class Trex extends ExtendClass(10, 'green') {}
class Cactus extends ExtendClass(500, 'red') {}

const trex = new Trex()


trex.draw()

const Frame = () => {
    requestAnimationFrame(Frame)
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
    if(jumpTimer == 50){
        jump = false
        jumpTimer = 0
    }
    trex.draw()
}
Frame()

document.addEventListener('keydown', e => {
    if(e.code == 'Space') {
        jump = true
    }
})