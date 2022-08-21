<template>
    <div class="wrapper">
        <div class="menu">
            <h1 class="menu-name"> WAR SHIPS</h1>
            <div class="menu-body">
                <h3 @click="$router.push('/create')">Create Room</h3>
                <h3 @click="$router.push('/rooms')">View Rooms</h3>
            </div>

            <div class="menu-end">
                <h3><a target="_blank" href="https://github.com/P1aer">author</a></h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainView"
    }
</script>

<style scoped lang="scss">
    .wrapper {
        height: 100vh;
        padding-top: 7%;
        background-color: #0093E9 ;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%) ;
    }
.menu {
    margin:0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1.25rem;
    border-radius: 8px;
    box-shadow: 4px 3px 3px rgba(0,0,0,0.4);
    background-color: azure;
    width: 40%;
    height: 60vh;
    &-name {
        font-size: 4rem;
        margin: 1rem 0 ;
        height: 20%;
    }
    &-body {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 60%;
        flex-direction: column;
        h3 {
            margin-top: 1rem;
            cursor: pointer;
            font-size: 2.75rem;
            transition: transform .3s ease-in-out;
            &:hover {
                transform: scale(1.2);
            }
        }
    }
    &-end {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        width: 100%;
        height: 20%;
        h3, a {
            color: teal;
            text-decoration: none;
        }
    }
}
</style>