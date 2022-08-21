<template>
    <div class="wrapper">
        <simple-page>
            <NavBar link="/"/>
            <div class="body">
                <h5 class="counter">
                    всего комнат: {{this.size}}
                </h5>
                <RoomItem :room="{
                ...room,
                key: key,
                ind: ind + 1,
            }"
                          v-for="(room,key,ind) in rooms" :key="key"
                />
            </div>

        </simple-page>
    </div>
</template>

<script>
    import SimplePage from "@/components/simplePage";
    import NavBar from "@/components/Navbar";
    import instance from "@/axios";
    import RoomItem from "@/components/RoomItem";

    export default {
        name: "RoomsView",
        data() {
          return {
              rooms: {},
              size: 0,
          }
        },
        methods: {
            async fetchRooms() {
                try {
                    const {data} = await instance.get("/rooms")
                    this.rooms = data.rooms
                    this.size = data.size
                }
                catch (e) {
                    console.log(e)
                }
            }
        },
        mounted() {
            this.fetchRooms()
        },
        components: {RoomItem, NavBar, SimplePage}
    }
</script>

<style lang="scss" scoped>
    .counter {
        font-size: 1.5rem;
        font-weight: normal;
    }
    .body {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
    .wrapper {
        height: 100vh;
        padding-top: 4%;
        background-color: #08AEEA;
        background-image: linear-gradient(135deg, #08AEEA 0%, #2AF598 100%);
    }
</style>