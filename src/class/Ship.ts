import {Player} from "@/class/Player";

export class Ship {
    health: number
    size: number

    constructor(health: number) {
        this.health = health
        this.size = health
    }

    takeDamage() {
        this.health--
    }
}