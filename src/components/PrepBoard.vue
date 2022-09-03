<template>
    <div class="board"
         @dragover.prevent
         @dragenter.prevent
    >
        <template v-for="cell in board.cells" :key="cell">
            <cell :cell="c" v-for="c in cell" :key="c.id">
            </cell>
        </template>
    </div>
</template>

<script lang="ts">
    import {Board} from "@/class/Board";
    import Cell from "@/components/Cell.vue";
    import {Cell as c} from "@/class/Cell"
    import { PropType } from "vue";

    export default {
        name: "PrepBoard",
        components: {Cell},
        props: {
            board: {
                type: Board,
                required: true
            },
/*            onDrop: {
                type: Function as PropType<(ev: DragEvent, cell: c) => void>,
                required: true
            }*/
        },
    }
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