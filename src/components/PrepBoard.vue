<template>
    <div ref="table" class="board"
         @dragover.prevent="dragOver($event, this.coordinates)"
         @drop.prevent="onDrop($event, this.coordinates)"
    >
        <template v-for="cell in board.cells" :key="cell">
            <cell
                    :on-click="onClick"
                    :check="checkSelected"
                  :selected="selected" :hide="hideShip"
                  :set-elem="setElem"
                  :cell="c" v-for="c in cell"
                  :key="c.id">
            </cell>
        </template>
    </div>
</template>

<script lang="ts">
    import {Board} from "@/class/Board";
    import Cell from "@/components/Cell.vue";
    import { Cell as c } from "@/class/Cell";
    import {defineComponent, PropType} from "vue";
    import {ElementPointData} from "@/hooks/utils";

    export default defineComponent( {
        name: "PrepBoard",
        components: {Cell},
        data() {
            return {
                coordinates: {} as  DOMRect
            }
        },
        props: {
            board: {
                type: Board,
                required: true
            },
            onClick: {
               type: Function as PropType<(Cell: c) => boolean>,
               required: true
            },
            onDrop: {
                type: Function as PropType<(ev: DragEvent,coordinates: DOMRect) => void>,
                required: true
            },
            dragOver: {
                type: Function as PropType<(ev: DragEvent,coordinates: DOMRect) => void>,
                required: true
            },
            setElem: {
                type:Function as PropType<(elem : ElementPointData) => void>,
                required: true
            },
            hideShip: {
                type:Function as PropType<(elem : c, b: boolean) => void>,
                required: true
            },
            selected: {
                type: Function as PropType<(Cell: c|null) => void>,
                required:true
            },
            checkSelected: {
                    type: Function as PropType<() => void>,
                    required: true
            }
        },
        methods: {
        },
        mounted(): void {
            this.coordinates = (this.$refs.table as HTMLDivElement).getBoundingClientRect()
        }
    })
</script>

<style scoped>
  .board {
      width: calc(3rem * 10 + 4px);
      height: calc(3rem * 10 + 4px);
      display: flex;
      flex-wrap: wrap;
      border: 2px solid #684ec9;
  }
</style>