import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'
import GoodsList from '@/components/goodslist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'index',
      component:Index,
      children:[{
        path:'',
        component:GoodsList
      }]
    },
    {
      path:'/content/:id',
      component:Content,
      name: 'content' 
    }
  ]
})
