import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from "vue-3-socket.io";
import io from 'socket.io-client'

const opt = {
    debug: true,
    connection: io("http://localhost:3001"),
    vuex : {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}
const app = createApp(App).use(router).use(new VueSocketIO(opt))
app.mount('#app')


