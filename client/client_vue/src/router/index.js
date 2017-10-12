import Vue from 'vue'
import Router from 'vue-router'
import CarList from '@/components/CarList'
import CarItem from '@/components/CarItem'
import CarFilter from '@/components/CarFilter'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'carList',
      component: CarList
    },
    {
      path: '/carItem/:id',
      name: 'CarItem',
      component: CarItem
    },
    ,
    {
      path: '/carFilter/',
      name: 'CarFilter',
      component: CarFilter
    },
    {
      path: '/cart/',
      name: 'Cart',
      component: Cart
    },
  ]
})

