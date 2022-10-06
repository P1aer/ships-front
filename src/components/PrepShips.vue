<template>
    <div class="menu">
        <div class="field"
             @dragover.prevent
             @dragenter.prevent
             @drop.prevent="onDrop($event)">
            <div
                    draggable="true"
                    v-for="ship in sortedShips"
                    :key="ship"
                    :class="['d' + ship.size]"
                    @dragstart="dragStart($event,ship)"
            >
            </div>

        </div>
        <div class="buttons">
            <button @click="() => {
                restart()
            }">Clear</button>
            <button @click="() => {
                random()
                onChangeState(false)
            }">Random placement</button>
            <button :class="{'ready':readyState,'not-ready': !readyState}"
                    @click="onChangeState(!this.readyState)"
                    :disabled="this.ships.length > 0 ">
                Ready
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Ship} from "@/class/Ship";
    import { ElementPointData } from "@/hooks/utils";
    import {defineComponent, PropType, toRaw} from "vue";

    export default  defineComponent({
        name: "PrepShips",
        data() {
            return {
                readyState: false
            }
        },
        props: {
            ships: {
                type:Array as PropType<Ship[]>,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            setElem: {
                type:Function as PropType<(elem : ElementPointData) => void>,
                required: true
            },
            restart: Function,
            random: Function
        },
        methods: {
            dragStart(evt: DragEvent,elem: Ship) {
                if (!evt.dataTransfer) {
                    return
                }
                evt.dataTransfer.setData('itemId', elem.id.toString())
                evt.dataTransfer.effectAllowed = 'move'
                if(evt.currentTarget) {
                    let i = (evt.currentTarget as HTMLDivElement).getBoundingClientRect()
                    let x = evt.clientX - i.x
                    let y = evt.clientY - i.y
                    this.setElem({
                        x,
                        y,
                        height: i.height,
                        width: i.width
                    })
                }
            },
            onDrop(evt: DragEvent) {
                const cell = evt.dataTransfer?.getData('cell') || null
                if (!cell) {
                    return
                }
                this.$emit("switchShip", cell.split(' '))
            },
            onChangeState(state: boolean) {
                this.readyState = state
                this.$socket.emit("ROOM:STATE",this.id,this.readyState)
            }
        },
        computed : {
            sortedShips: function() {
                return [...this.ships].sort((a,b) => {
                    return a.size - b.size
                })
            }
        },
        watch: {
            "ships.length" : function (data) {
                if (data > 0 && this.id && this.readyState) {
                    this.onChangeState(false)
                }
            }
        }
    })
</script>

<style scoped lang="scss">

    .menu {
        display: flex;
        flex-direction: column;

        .buttons {
            .ready {
                background-color: #2AF598;
            }
            .not-ready {
                background-color: coral;
            }

            padding: 1rem;
            background-color: #eaeaea;
            border-radius: 4px;
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100%;
            button {
                cursor: pointer;
                font-size: 1.25rem;
                background-color: white;
                margin-top: 1rem;
                border: none;
                padding: 1rem 2rem;
                border-radius: 4px;
            }
        }
        .field {
            margin-bottom: 1rem;
            border-radius: 4px;
            min-height: 21.25rem;
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
            width: 21.25rem;
            box-sizing: content-box;
            background-color: #eaeaea;
        }
    }

    .d1{
        background-color:#684ec9 ;
        cursor: move;
        margin: 1rem 0.5rem;
        overflow: hidden;
       /* background-color: white;*/
        border: solid #684ec9 3px;
        border-radius: 2px;
        height: 3rem ;
         width: calc(1 * 3rem);
     }
    .d2 {
        cursor: move;
        overflow: hidden;
        position: relative;
        margin: 1rem 0.5rem;
        background-color:#684ec9 ;
/*        background-color: white;*/
        border: solid #684ec9 3px;
        border-radius: 2px;
        height: 3rem ;
        width: calc(2 * 3rem);
    }
    .d3 {
        cursor: move;
        position: relative;
        overflow: hidden;
        margin: 1rem 0.5rem;
        background-color:#684ec9 ;
/*        background-color: white;*/
        border: solid #684ec9 3px;
        border-radius: 2px;
        height: 3rem ;
        width: calc(3 * 3rem);
    }
    .d4 {
        background-color:#684ec9 ;
        cursor: move;
        position: relative;
        margin: 1rem 0.5rem;
        overflow: hidden;
        border: solid #684ec9 3px;
        border-radius: 2px;
        height: 3rem ;
        width: calc(4 * 3rem);
    }
    @media (max-width: 1200px) {
        .buttons {
            button {
                font-size: 1rem;
                margin-top: 0.4rem;
                border: none;
                padding: 1rem 1rem;
            }
        }
    }
</style>