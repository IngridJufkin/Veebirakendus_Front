import Vue from 'vue';
import VueRouter from 'vue-router';
import Orders from './../components/Orders'
import Users from './../components/Users'
import Products from './../components/Products'
import updateProduct from './../components/UpdateProduct'
import NewProduct from './../components/NewProduct'
//import deleteProduct from './../components/deleteProduct'
import login from './../views/login'
import logout from './../views/logout'
import register from "./../views/register"

Vue.use(VueRouter);

export const routes = [
  {
    path: '/login',
    name: 'Logi sisse',
    components: { default: login }
  },
  {
    path: "/register",
    name: "Registreeri kasutaja",
    component: register
  },
  {
    path: '/orders',
    name: 'Tellimused',
    components: { default: Orders }
  },
  {
    path: '/products',
    name: 'Tooted',
    components: { default: Products }
  },
  {
    path: '/users',
    name: 'Kasutajad',
    components: { default: Users }
  },
  {
    path: '/UpdateProduct',
    name: 'Uuenda toodet',
    components: { default: updateProduct }
  },
  {
    path: '/newProduct',
    name: 'Lisa toode',
    components: { default: NewProduct }
  },
  {
    path: '/logout',
    name: 'Logi välja',
    components: { default: logout }
  },
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
});

export default router;
