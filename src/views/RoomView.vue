<template>
        <PopupDialog :message="message" :open="popupOpen" @update:open="popupOpen = $event"/>
        <GamePrep :users="users" :id="roomId">

        </GamePrep>
</template>

<script lang="ts">
    import GamePrep from "@/components/GamePrep.vue";
    import PopupDialog from "@/components/PopupDialog.vue"
    import { defineComponent } from "vue";
    import instance from "@/axios";

    export default defineComponent({
        name: "RoomView",
        components: {GamePrep,PopupDialog},
        data() {
            return {
                    users: {} as object,
                    roomId: "",
                    message: "",
                    popupOpen: false
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
                            }
                            catch (e) {
                                    console.log(e)
                            }
                    },

                    setPopup() {
                       this.popupOpen = true
                    },
                    getMessage(id: string,mes: string) {
                            if (this.$socket.id === id) {
                                    return
                            }
                            this.message = mes
                            this.setPopup()
                    }
            },
            mounted(): void {
                        this.getRoom()
            },
            beforeRouteLeave(): void {
                    this.$socket.emit("ROOM:LEAVE", this.$route.params.id, this.$socket.id)
            },
            sockets: {
                    "ROOM:JOINED": function (data: string|object[]) {
                            this.getMessage(data[1] as string || "" , "Player has joined your room")
                            this.users = data[0] as object || {}
                    },
                    "ROOM:STATE": function (data: {
                            [str:string]: boolean
                    }) {
                            this.users = data
                    },

                    "ROOM:LEAVED": function (data: string|object[]) {
                            console.log("leaved")
                            this.getMessage(data[1] as string || "" , "Player has left your room")
                            this.users = data[0] as object || {}
                    }
            },
    })
</script>

<style lang="scss" scoped>

</style>