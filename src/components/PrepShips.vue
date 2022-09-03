<template>
    <div class="menu">
        <div class="field"
             @dragover.prevent
             @dragenter.prevent
             @drop="onDrop($event)">
            <div
                    draggable="true"
                    v-for="ship in ships"
                    :key="ship"
                    :class="['d' + ship.size]"
                    @dragstart="dragStart($event,ship)"
            >
            </div>

        </div>
        <div class="buttons">
            <button @click="() => {
                restart()
                this.readyState = false
            }">Очистить</button>
            <button @click="() => {
                random()
                this.readyState = false
            }">Случайная расстановка</button>
            <button :class="{'ready':readyState,'not-ready': !readyState}"
                    @click="readyState = !readyState"
                    :disabled="this.ships.length > 0 ">
                Готов
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Ship} from "@/class/Ship";
    import {defineComponent, PropType} from "vue";

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
            restart: Function,
            random: Function
        },
        methods: {
            dragStart(evt: DragEvent,elem: Ship) {
                evt.dataTransfer?.setData('itemId', elem.id.toString())
            },
            onDrop(evt: DragEvent) {
                const itemID = evt.dataTransfer?.getData('itemID') || 0
                let ship = this.ships.find((item) => item.id == itemID)
                if (!ship) {
                    this.$emit("removeFromBoard",ship)
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
            min-height: 340px;
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
            width: 350px;
            box-sizing: content-box;
            background-color: #eaeaea;
        }
    }

    .d1{
        cursor: move;
        margin: 1rem 0.5rem;
        overflow: hidden;
        background-color: white;
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
        background-color: white;
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
        background-color: white;
        border: solid #684ec9 3px;
        border-radius: 2px;
        height: 3rem ;
        width: calc(3 * 3rem);
    }
    .d4 {
        cursor: move;
        position: relative;
        margin: 1rem 0.5rem;
        overflow: hidden;
        background-color: white;
        border: solid #684ec9 3px;
        border-radius: 2px;
        height: 3rem ;
        width: calc(4 * 3rem);
    }
</style>