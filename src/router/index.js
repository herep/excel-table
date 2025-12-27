import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hello from "../components/Hello.vue";
import PhoneTable from "../components/PhoneTable.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Phone',
      name: 'Phone',
      component: PhoneTable
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
