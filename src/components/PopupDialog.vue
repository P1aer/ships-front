<template >
    <transition name="fade">
    <div v-if="open" class="modal">
        <div class="message-box">
            <h2>{{message}}</h2>
        </div>
    </div>
    </transition>
</template>

<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent({
        name: "PopupDialog",
        props: {
            message: String,
            open: {
                type: Boolean,
                required: true,
                default:false
            }
        },
        watch: {
           open(currval) {
               if (currval) {
                   setTimeout(() => this.$emit("update:open",false),1000)
               }
            }
        }
    })
</script>

<style lang="scss" scoped>
    .modal {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to  {
        opacity: 0;
    }
    .message-box {
        border-radius: 6px;
        box-shadow: 1px 2px 3px rgba(1,1,1,0.3);
        height: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 30vw;
        margin: 3% auto 0 auto;
        padding: 1rem;
        background-color: white;
    }
</style>