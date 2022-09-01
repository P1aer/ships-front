<template>
    <div class="board">
        <template v-for="cell in board.cells" :key="cell">
            <cell v-for="c in cell" :key="c.id"/>
        </template>
    </div>
</template>

<script lang="ts">
    import {Board} from "@/class/Board";
    import Cell from "@/components/Cell.vue";

    export default {
        name: "PrepBoard",
        components: {Cell},
        props: {
            board: {
                type: Board,
                required: true
            }
        }
    }
</script>

<style scoped>
  .board {
      width: calc(3rem * 10 + 2px);
      height: calc(3rem * 10 + 2px);
      display: flex;
      flex-wrap: wrap;
      border: 1px solid black;
  }
</style>