<template>
        <GamePrep v-model:users="users" :id="roomId">

        </GamePrep>
</template>

<script lang="ts">
    import GamePrep from "@/components/GamePrep.vue";
    import { defineComponent } from "vue";
    import instance from "@/axios";

    export default defineComponent({
        name: "RoomView",
        components: {GamePrep},
        data() {
            return {
                    users: {} as object,
                    roomId: "",
            }
        },
            methods: {
                    async getRoom() {
                            try {
                                    const id =  this.$route.params.id
                                    const { data } = await instance.get(`/rooms/${id}`)
                                    if (!data || Object.keys(data.users).length >= 2) {
                                            this.$router.push("/")
                                            return
                                    }
                                    this.$socket.emit("ROOM:JOIN", id)
                                    this.roomId = id as string
                                    this.users = {...data.users,[this.$socket.id]: false}
                            }
                            catch (e) {
                                    console.log(e)
                            }
                    }
            },
            mounted(): void {
                this.getRoom()
            },
            beforeRouteLeave(): void {
                    this.$socket.emit("ROOM:LEAVE", this.$route.params.id, this.$socket.id)
            },
            sockets: {
                    "ROOM:JOINED": function (data: {
                            [str:string]: boolean
                    }) {
                            this.users = data
                    },
                    "ROOM:STATE": function (data: {
                            [str:string]: boolean
                    }) {
                            this.users = data
                    },
                    "ROOM:LEAVED": function (data: {
                            [str:string]: boolean
                    }) {
                            this.users = data
                    }
            },
    })
</script>

<style lang="scss" scoped>

</style>