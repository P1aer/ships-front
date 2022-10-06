<template>
    <div class="navbar">
        <div class="state">
            <span v-if="!users[this.$socket.id]">Set your ships and click ready</span>
            <span v-else-if="this.allUsers === 1">Wait for another player to join</span>
            <span v-else-if="this.allUsers > 1">Wait for other player to set his ships</span>
            <span v-else></span>
        </div>
        <div class="counters">
            Ready state: <span class="ready">{{this.readyUsers}}</span> / {{this.allUsers}}
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent( {
        name: "PrepNavComponent",
        props: {
            users: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                allUsers: Object.keys(this.users).length,
                readyUsers: Object.values(this.users).reduce((red,val) => val ? red + 1 : red,0)
        }
        },
        watch: {
            "users": {
                handler: function() {
                    this.allUsers = Object.keys(this.users).length
                    this.readyUsers = Object.values(this.users).reduce((red,val) => val ? red + 1 : red,0)
                },
                deep: true,
            }
        }
    })
</script>

<style lang="scss" scoped>
    .navbar {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-around;
        font-size: 1.3rem;
    }
    .counters {

    }
    .state {
        max-width: 350px;
        width: 100%;
    }
    .ready {
        color: #2AF598;
    }
</style>