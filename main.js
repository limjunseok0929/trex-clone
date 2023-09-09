const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let timer = 0;
let cactuses = []

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
const cactus = new Cactus()


trex.draw()
cactus.draw()

const Frame = () => {
    requestAnimationFrame(Frame)
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if(timer % 120 == 0) {
        cactuses.push(cactus)
    }

    cactuses.forEach((a, i, o) => {
        if(a.x < 0) {
            o.splice(i, 1)
        }
        a.x--
        a.draw()
    })

    trex.draw()
}
Frame()