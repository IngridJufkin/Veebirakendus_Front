import Vue from 'vue';
import VueRouter from 'vue-router';
import Orders from './../components/Orders'
import Products from './../components/Products'

Vue.use(VueRouter);

export const routes = [
  {
    path: '/orders',
    name: 'Tellimused',
    components: { default: Orders }
  }, 
  {
    path: '/products',
    name: 'Tooted',
    components: { default: Products }
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
});

export default router;
