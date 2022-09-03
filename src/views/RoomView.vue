<template>
        <GamePrep>

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
            }
        },
    })
</script>

<style lang="scss" scoped>

</style>