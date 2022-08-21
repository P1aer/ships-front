<template>
    <div class="page">
        <slot>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "simplePage",
    }
</script>

<style lang="scss" scoped>
    .page {
        margin:0 auto;
        padding: 1.5rem;
        width: 60%;
        border-radius: 8px;
        height: 80vh;
        background-color: azure;
    }
</style>