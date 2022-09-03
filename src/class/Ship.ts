

export class Ship {
    health: number
    size: number
    kx: number
    ky: number
    id: number

    constructor(health: number, kx = 1,ky = 0) {
        this.health = health
        this.kx = kx
        this.ky = ky
        this.size = health
        this.id = Math.random()
    }

    takeDamage() {
        this.health--
    }
    changeOrientation() {
        if (this.kx === 0) {
            this.ky = 0
            this.kx = 1
        }
        else  {
            this.ky = 1
            this.kx = 0
        }
    }
}