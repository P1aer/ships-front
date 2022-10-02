<template>
    <div class="wrapper">
        <simple-page>
            <Navbar link="/">
                <PrepNavComponent :users="users"/>
            </Navbar>
            <div  class="placement">
                <PrepBoard
                        :on-click="onRightClick"
                        :check-selected="checkSelected"
                        :selected="setSelected"
                        :hide-ship="hideShip"
                        :set-elem="setElem"
                        :drag-over="onDragOver"
                        :on-drop="onDrop"
                        :board="board"
                 />
                <PrepShips
                        :id="this.id"
                        :users="users"
                        @update:users="this.$emit('update:users',$event)"
                        :set-elem="setElem"
                        :random="getRandomShips"
                        :restart="this.cleanPrep"
                        :ships="ships"
                        @switchShip="switchShip"
                />
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
    import {ElementPointData, getRandomInt} from "@/hooks/utils";
    import instance from "@/axios";
    import PrepNavComponent from "@/components/PrepNavComponent.vue";

    interface PointData {
        x: number
        y: number
        kx: number
        ky: number
    }

    export default defineComponent({
        name: "GamePrep",
        components: {PrepNavComponent, PrepShips, PrepBoard, SimplePage, Navbar},
        props : {
            users: {
                type: Object,
                required: true
            },
            id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                board: new Board() as Board,
                ships: [] as Ship[],
                element: null as ElementPointData | null,
                selected: {} as Cell|null,
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
            checkSelected() {
                if (this.selected === null || this.selected.isHidden) {
                    return
                }
                this.hideShip(this.selected, true)
                this.selected = null
            },
            setSelected(val: Cell | null) {
               this.selected = val
            },
            hideShip(cell : Cell, hide = false) {
                if (!cell.ship) {
                    return
                }
                for (let i = cell.ship.size - 1; i >= 0;i--) {
                    if(cell.ship.kx === 1) {
                        this.board.getCell(cell.x + i, cell.y ).isHidden = hide
                    }
                    else  {
                        this.board.getCell(cell.x, cell.y  + i).isHidden = hide
                    }
                }
            },
            onDragOver(evt : DragEvent, coordinates: DOMRect) {
                if(!evt.dataTransfer) {
                    return
                }
                if (!this.canBePlaced(evt,coordinates)) {
                    evt.dataTransfer.dropEffect = "none"
                }
                else {
                    evt.dataTransfer.dropEffect = "move"
                }
            },

            onRightClick(cell: Cell) {
                if (!cell.ship) {
                    return
                }
                this.hideShip(cell, false)
                const data = {
                    x : cell.x,
                    y: cell.y,
                    kx: cell.ship.kx === 1 ? 0 : 1,
                    ky: cell.ship.ky === 1 ? 0 : 1,
                }

               if(this.checkBoard(data, cell.ship.size)) {
                   const copy = cell.ship as Ship
                   this.destroyShip(cell)
                   copy.kx = data.kx
                   copy.ky = data.ky
                   this.getAllCells(data, copy)
                   return true
               }
               else  {
                   this.hideShip(cell, true)
                   return false;
               }
            },

            switchShip(cell: string[]) {
                const curCell = this.board.getCell(+ cell[0],+ cell[1])
                if (!curCell.ship) {
                    return
                }
                this.ships.push(new Ship(curCell.ship.size))
                this.destroyShip(curCell)
            },

            destroyShip(cell: Cell) {
                if (!cell.ship) {
                    return
                }
                cell.className = ''
                for (let i = cell.ship.size - 1; i >= 0;i--) {
                    if(cell.ship.kx === 1) {
                        this.board.getCell(cell.x + i, cell.y ).ship = null
                        this.board.getCell(cell.x + i, cell.y ).isHidden = false
                    }
                    else  {
                        this.board.getCell(cell.x, cell.y + i).ship = null
                        this.board.getCell(cell.x, cell.y  + i).isHidden = false
                    }
                }
            },

            onDrop(evt: DragEvent, coordinates: DOMRect) {
                let i = this.canBePlaced(evt, coordinates)
                const cell = evt.dataTransfer?.getData("cell") || null
                if(!i) {
                    if(cell)  {
                        this.switchShip(cell.split(" "))
                    }

                    this.element = null
                    return;
                }
                const itemID = evt.dataTransfer?.getData('itemID') || 0
                let ship = this.ships.find((item) => item.id == itemID) || null
                if (cell) {
                    const point = cell.split(" ")
                    const curCell = this.board.getCell(+ point[0],+ point[1])
                    const copy = curCell.ship as Ship
                    this.destroyShip(curCell)
                    this.getAllCells(i, copy)

                    this.element = null
                    return;
                }
                if (!ship) {
                    this.element = null
                    return;
                }
                this.ships = this.ships.filter(elem => elem.id != itemID)
                this.getAllCells(i,ship)
                this.element = null
            },

            canBePlaced(evt: DragEvent, coordinates: DOMRect) {
                if (!this.element) {
                    return false
                }
                const {x, y, height, width } = this.element
                const cellSize = Math.min(width,height)
                const size = Math.floor(Math.max(width,height) / cellSize)
                const mouseX = evt.x - coordinates.x
                const mouseY = evt.y - coordinates.y

                const left = mouseX - x
                const top = mouseY - y
                const center = {
                    x: left + cellSize / 2,
                    y: top + cellSize / 2
                }
                const cell = {
                    x: Math.floor(center.x / cellSize),
                    y: Math.floor(center.y / cellSize)
                }
                if (cell.x < 0 || cell.y < 0 ) {
                    return false;
                }
                const data = {
                    x: cell.x,
                    y: cell.y,
                    kx: height > width ? 0 : 1,
                    ky: height > width ? 1 : 0
                }
                if (!this.checkBoard(data, size)) {
                    return false;
                }
                return data
            },

            setElem(ev: ElementPointData) {
                this.element = ev
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
                if (x + kx * size === 10 && kx === 1) toX = x + kx * size;
                else if (x + kx * size < 10 && kx === 1) toX = x + kx * size + 1;
                else if (x === 9 && kx === 0) toX = x + 1;
                else if (x < 9 && kx === 0) toX = x + 2;

                if (y + ky * size === 10 && ky === 1) toY = y + ky * size;
                else if (y + ky * size < 10 && ky === 1) toY = y + ky * size + 1;
                else if (y == 9 && ky === 0) toY = y + 1;
                else if (y < 9 && ky === 0) toY = y + 2;
                if (toX === -1 || toY === -1) return false;

                if (this.board.cells.slice(fromY, toY)
                    .filter(arr => arr.slice(fromX, toX).reduce((acc,val) => val.isHidden ? acc + 1 : acc + 0,0) > 0)
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
                this.board.getCell(data.x, data.y).isHidden = true
                    for (let i = ship.size - 1; i > 0;i--) {
                        if(data.kx === 1) {
                            this.board.getCell(data.x + i, data.y ).ship = ship
                            this.board.getCell(data.x + i, data.y ).isHidden = true
                        }
                        else  {
                            this.board.getCell(data.x, data.y + i).ship = ship
                            this.board.getCell(data.x, data.y + i ).isHidden = true
                        }
                    }
            },

            cleanPrep() {
                this.element = null
                this.resetBoard()
                this.initShips()
            },
        },

        mounted(): void {
            this.cleanPrep()
        },
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
    @media (max-width: 1200px) {
        .wrapper {
            padding-top: 0;
        }
    }
</style>