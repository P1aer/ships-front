import {Ship} from "@/class/Ship";

export class Cell {
    ship: Ship | null
    readonly x: number
    readonly y: number
    id : number
    className= ""

    constructor(x:number,y:number, ship: Ship | null) {
        this.x = x
        this.y = y
        this.ship = ship
        this.id = Math.random()
    }

}