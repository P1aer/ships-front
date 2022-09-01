<template>
    <div class="wrapper">
        <simple-page>
            <PrepBoard :board="board"/>
        </simple-page>
    </div>
</template>

<script lang="ts">
    import SimplePage from "./simplePage.vue";
    import {Board} from "@/class/Board";
    import PrepBoard from "@/components/PrepBoard.vue";
    export default {
        name: "GamePrep",
        components: {PrepBoard, SimplePage},
        props : {
            board: {
                type: Board,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        height: 100vh;
        padding-top: 5%;
        background-color: #D9AFD9;
        background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    }
</style>