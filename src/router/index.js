import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/components/goodslist'
import Goods from '@/components/goods'
import GoodsEditor from '@/components/goodseditor'
import Cart from '@/components/shoppingcart'
import Orders from '@/components/orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'index',
      component:GoodsList
    },
    {
      path: '/allgoods',
      name:'allgoods',
      component:GoodsList

    },
    {
      path:'/goods/puton',
      component:GoodsEditor,
      name:'puton'

    },
    {
      path:'/goods/modify/:id',
      component:GoodsEditor,
      name:'modify'
    },
    {
      path:'/goods/show/:id',
      component:Goods,
      name:'show',
    },
    {
      path:'/shoppingcart',
      component:Cart,
      name:'cart'
    },
    {
      path:'/orders',
      component:Orders,
      name:'orders'
    }
    
  ]
})
