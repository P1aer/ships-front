<template>
    <h4 class="navbar">
        {{users[this.$socket.id] ?
       "ready state: " + this.readyUsers +  " / " + this.allUsers
        : "Расставтись и нажмите готов"}}
    </h4>
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
        padding-left: 1rem;
    }
</style>