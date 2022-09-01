import {Ship} from "@/class/Ship";

export class Cell {
    ship: Ship | null
    readonly x: number
    readonly y: number
    available: boolean
    id : number

    constructor(x:number,y:number, ship: Ship | null) {
        this.x = x
        this.y = y
        this.ship = ship
        this.available = false
        this.id = Math.random()
    }

}