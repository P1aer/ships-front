<template>
        <GamePrep :board="myBoard">

        </GamePrep>
</template>

<script lang="ts">
    import GamePrep from "@/components/GamePrep.vue";
    import {Board} from "@/class/Board";
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "RoomView",
        components: {GamePrep},
        data() {
            return {
                state: "",
                myBoard: new Board() as Board
            }
        },
        methods: {
           resetBoard():void {
                   const b = new Board()
                   b.initCells()
                   this.myBoard = b
                   return
           }
        },
        mounted() {
           this.resetBoard()
        }
    })
</script>

<style lang="scss" scoped>

</style>