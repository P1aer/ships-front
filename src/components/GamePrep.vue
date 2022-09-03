<template>
    <div class="wrapper">
        <simple-page>
            <Navbar link="/"></Navbar>
            <div  class="placement">
                <PrepBoard :board="board"/>
                <PrepShips :random="getRandomShips" :restart="this.cleanPrep" :ships="ships"/>
            </div>

        </simple-page>
    </div>
</template>

<script lang="ts">
    import SimplePage from "./simplePage.vue";
    import {Board} from "@/class/Board";
    import PrepBoard from "@/components/PrepBoard.vue";
    import PrepShips from "@/components/PrepShips.vue";
    import { Ship } from "@/class/Ship";
    import {defineComponent} from "vue";
    import { Cell } from "@/class/Cell";
    import Navbar from "@/components/Navbar.vue";
    import {getRandomInt} from "@/hooks/utils";

    interface PointData {
        x: number
        y: number
        kx: number
        ky: number
    }

    export default defineComponent({
        name: "GamePrep",
        components: {PrepShips, PrepBoard, SimplePage, Navbar},
        props : {

        },
        data() {
            return {
                board: new Board() as Board,
                ships: [] as Ship[]
            }
        },
        methods: {
            initShips() {
                this.ships = []
                for (let i = 1; i < 5; i++) {
                    for(let j = 4 - i + 1;  j > 0; j--) {
                        this.ships.push(new Ship(i))
                    }
                }
            },
            //todo Сделай рабочим
            onDrop(evt: DragEvent,cell:Cell) {
/*
                const itemID = evt.dataTransfer?.getData('itemID') || 0
                let ship = this.ships.find((item) => item.id == itemID) || null
                this.ships = this.ships.filter((item) => item.id != itemID)
                if(ship) {
                    cell.ship = ship
                    cell.className = `d${ship.size}`
                    this.getAllCells(cell)
                }
*/


            },
            getRandomShips() {
                this.cleanPrep()
                try {
                    this.ships.forEach((ship) => {
                        let options = this.randomPlacement(ship.size)
                        ship.kx = options.kx
                        ship.ky = options.ky
                        this.getAllCells(options, ship)
                    })
                }
                catch (e) {
                    this.getRandomShips()
                }
                this.ships = []
            },
            randomPlacement(size: number):PointData {
                let x = 0
                let y = 0
                let kx = getRandomInt(2)
                let ky = kx === 0 ? 1 : 0
                // вертикально
                if (kx == 0) {
                    x = getRandomInt(10);
                    y = getRandomInt(11 - size);
                    //горизонтально
                } else {
                    x = getRandomInt(11 - size);
                    y = getRandomInt(10);
                }
                const data = {
                    x,
                    y,
                    kx,
                    ky
                }
                const res = this.checkBoard(data,size)
                return res ? data : this.randomPlacement(size)
            },
            checkBoard(data:PointData, size: number):boolean {
                let { x, y, kx, ky } = data;
                let fromX = (x == 0) ? x : x - 1;
                let toX = -1
                let fromY = (y == 0) ? y : y - 1;
                let toY = -1


                if (x + kx * size == 10 && kx == 1) toX = x + kx * size;
                else if (x + kx * size < 10 && kx == 1) toX = x + kx * size + 1;
                else if (x == 9 && kx == 0) toX = x + 1;
                else if (x < 9 && kx == 0) toX = x + 2;

                if (y + ky * size == 10 && ky == 1) toY = y + ky * size;
                else if (y + ky * size < 10 && ky == 1) toY = y + ky * size + 1;
                else if (y == 9 && ky == 0) toY = y + 1;
                else if (y < 9 && ky == 0) toY = y + 2;

                if (toX === -1 || toY === -1) return false;

                if (this.board.cells.slice(fromY, toY)
                    .filter(arr => arr.slice(fromX, toX).reduce((acc,val) => val.ship ? acc + 1 : acc + 0,0) > 0)
                    .length > 0) return false;
                return true;

            },

            resetBoard():void {
                const b = new Board()
                b.initCells()
                this.board = b
                return
            },

            getAllCells(data : PointData, ship: Ship) {
                this.board.getCell(data.x, data.y).className = `d${ship.size}`
                this.board.getCell(data.x, data.y).ship = ship
                    for (let i = ship.size - 1; i > 0;i--) {
                        if(data.kx) {
                            this.board.getCell(data.x + i, data.y ).ship = ship
                        }
                        else  {
                            this.board.getCell(data.x, data.y + i).ship = ship
                        }
                    }
            },
            cleanPrep() {
                this.resetBoard()
                this.initShips()
            },
        },

        mounted(): void {
          this.cleanPrep()
        }
    })
</script>

<style lang="scss" scoped>
    .placement {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .wrapper {
        height: 100vh;
        padding-top: 5%;
        background-color: #D9AFD9;
        background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    }
</style>