<template>
    <div class="cell-cont">
        <div class="cell">

        </div>
        <div :class="[cell.className,{'vertical': !!cell?.ship?.ky}]" >

        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import {Cell} from "@/class/Cell";

    export default defineComponent({
        name: "CellComponent",
        props: {
            cell: Cell
        }
    })
</script>

<style lang="scss" scoped>
    .cell-cont {
        position: relative;
    }
    .vertical {
        transform: rotate(90deg);
        transform-origin: 1.5rem 1.5rem;
    }
    .d1 {
        z-index: 3;
        position: absolute;
        cursor: move;
        top:0;
        left: 0;
        height: 3rem ;
        width: calc(1 * 3rem + 2px);
        border: solid #684ec9 3px;
        border-radius: 2px;
    }
    .d2 {
        z-index: 3;
        position: absolute;
        cursor: move;
        top:0;
        left: 0;
        height: 3rem ;
        width: calc(2 * 3rem + 2px);
        border: solid #684ec9 3px;
        border-radius: 2px;
    }
    .d3 {
        z-index: 3;
        position: absolute;
        cursor: move;
        top:0;
        left: 0;
        height: 3rem ;
        width: calc(3 * 3rem + 2px);
        border: solid #684ec9 3px;
        border-radius: 2px;
    }
    .d4 {
        z-index: 3;
        position: absolute;
        cursor: move;
        top:0;
        left: 0;
        height: 3rem ;
        width: calc(4 * 3rem + 2px);
        border: solid #684ec9 3px;
        border-radius: 2px;
    }
 .cell {
     z-index: 2;
     position: relative;
     width: calc(3rem);
     height:calc( 3rem);
     display: flex;
     border: 1px solid rgba(1,1,1,0.3);
     align-items: center;
     justify-content: center;
 }
 .shiped {
        background-color: red;
    }
</style>