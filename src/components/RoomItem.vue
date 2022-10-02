<template>
    <div class="row">
        <h4>{{room.ind}}</h4>
        <h4>{{room.name}}</h4>
        <h4> {{room.key}}</h4>
      <!--  <h4>{{room.public ? "public": "private"}}</h4>-->
        <h4> {{room.users.length}} / 2</h4>
        <div style="align-items: center;display: flex">
            <button :disabled="room.users.length >= 2" @click="joinRoom"> join room</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "RoomItem",
        props : {
            room: {
                type: Object,
                required: true
            }
        },
        methods:{
            joinRoom() {
                this.$router.push(`/rooms/${this.room.key}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .row {
        margin-left: 2rem;
        margin-top: 1rem;
        display:  grid;
        align-items: center;
        align-self: flex-start;
        width: 100%;
        grid-template-columns:5% 15% 35% 10% 13%;
        grid-gap: 2rem;
        h4 {
            font-size: 1.75rem;
        }
        button {
            color: white;
            font-size: 1.5rem;
            border: 1px solid teal;
            border-radius: .5rem;
            padding: 0.2rem 1rem;
            cursor: pointer;
            background: teal;
            &:disabled {
                opacity: .6;
                cursor: default;
            }
        }
    }
</style>