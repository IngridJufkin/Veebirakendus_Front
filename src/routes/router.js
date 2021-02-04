import Vue from 'vue';
import VueRouter from 'vue-router';
import Orders from './../components/Orders'

Vue.use(VueRouter);

export const routes = [
  {
    path: '/orders',
    name: 'Tellimused',
    components: { default: Orders }
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
});

export default router;
