<template>
    <div class="wrapper">
        <simple-page class="newPage">
            <Navbar link="/"/>
                <h3 class="id-info">Id комнаты:
                    <span v-if="isLoaded">
                        {{this.$socket.id}}
                    </span>
                    <span v-else>
                        ожидайте
                     </span>
                </h3>
                <div  class="page-body">
                    <input v-model="name" class="input" type="text" placeholder="room name" maxlength="10">
                    <button @click="this.onClick" class="button" :disabled="!isLoaded || this.name.length < 4"> Create Room</button>
                </div>
        </simple-page>
    </div>

</template>

<script>
    import Navbar from "@/components/Navbar";
    import instance from "@/axios";
    import SimplePage from "@/components/simplePage";
    export default {
        sockets: {
            connect: function () {
                this.isLoaded = true
            },
        },
        data() {
            return {
                isLoaded: this.$socket.connected || false,
                name: ""
            }
        },
        methods: {
          async onClick() {
              try {
                  await instance.post("/rooms", {
                      roomId: this.$socket.id,
                      name: this.name
                  })
                  this.$router.push(`/rooms/${this.$socket.id}`)
              }
              catch (e) {
                  console.log(e)
              }
            }
        },
        name: "CreateView",
        components: {SimplePage, Navbar},

    }
</script>

<style scoped lang="scss">
    .newPage {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .page-body {
        width: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;

    }
    .id-info {
        margin-top: 3rem;
        align-self: flex-start;
        font-size: 2rem;
        font-weight: normal;
        span {
            font-weight: bold;
        }
    }
    .input {
        width: 60%;
        font-size: 2rem;
        height: 4rem;
        border-radius: .5rem;
        outline: none;
        border: 1px solid teal;
        padding-left: 1rem;
    }
    .button {
        margin-top: 2rem;
        color: white;
        font-size: 1.5rem;
        border: 1px solid teal;
        border-radius: .5rem;
        padding: 1rem 2rem;
        cursor: pointer;
        background-color: teal;
        transition: transform .3s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
        &:disabled {
            background: transparent;
            color: black;
            opacity: .6;
        }
    }
    .wrapper {
        height: 100vh;
        padding-top: 5%;
        background-color: #D9AFD9;
        background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    }
</style>