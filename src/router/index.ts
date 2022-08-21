import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from "@/views/MainView.vue"
import RoomsView from "@/views/RoomsView.vue"
import RoomView from "@/views/RoomView.vue"
import CreateView from "@/views/CreateView.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainView
  },
  {
    path: "/rooms",
    component: RoomsView
  },
  {
    path: "/create",
    component: CreateView
  },
  {
    path:"/rooms/:id",
    component: RoomView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
