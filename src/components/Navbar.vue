<template>
    <div class="nav">
        <h3 class="link" @click="$router.push(link)">
            ←
        </h3>
        <slot>

        </slot>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props: {
            link: String
        }
    }
</script>

<style lang="scss" scoped>
 .nav {
     display: flex;
     align-items: center;
     width: 100%;
     height: fit-content;
     padding: 10px;
     .link {
         cursor: pointer;
         font-size: 2rem;
     }
 }
</style>