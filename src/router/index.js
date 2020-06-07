import Vue from 'vue'
import Router from 'vue-router'
import goodsList from '@/views/goodsList'
import cart from '@/views/Cart'
import address from '@/views/address'
import orderConfirm from '@/views/orderConfirm'
import orderSuccess from '@/views/orderSuccess'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/address',
      name: 'address',
      component: address
    }, 
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    }   
  ]
})
