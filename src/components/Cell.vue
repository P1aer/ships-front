<template>
    <div class="cell">
        1
    </div>
</template>

<script>
    export default {
        name: "CellComponent"
    }
</script>

<style lang="scss" scoped>
 .cell {
     width: calc(3rem);
     height:calc( 3rem);
     display: flex;
     border: 1px solid black;
     align-items: center;
     justify-content: center;
 }
</style>