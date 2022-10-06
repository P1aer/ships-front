<template>
    <div class="nav">
            <img class="link"
                 @click="$router.push(link)"
                 src="../../public/back.svg"
                 alt="arrow back icon"
            >
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
     padding: 0px;
     margin-bottom: 1rem;
     .link {
         cursor: pointer;
         height: 2rem;
         width: 2rem;
     }
 }
</style>