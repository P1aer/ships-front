import {Cell} from "@/class/Cell";
import {Ship} from "@/class/Ship";

export class Board {
    cells: Cell[][] = []
    shipsAlive = 10

    public initCells(size = 10) {
        for (let i = 0; i< size ; i++) {
            const row : Cell[] = []
            for (let j = 0; j< size ; j++) {
                row.push(new Cell(j,i,null))
            }
            this.cells.push(row)
        }
    }
    public getCell ( x: number, y: number) {
        return this.cells[y][x]
    }
    public addShipOnBoard(ship: Ship,points: {x: number,y:number}[] ) {
        points.forEach((value => this.getCell(value.x,value.y).ship = ship))
    }
}
