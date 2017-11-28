import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Restaurant from '@/components/Restaurant'
import AddRestaurant from '@/components/AddRestaurant'
import RestaurantEdit from '@/components/RestaurantEdit'
import RestaurantDelete from '@/components/RestaurantDelete'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: List, name: 'restaurants'},
		{path: '/restaurant/:restaurant_id', component: Restaurant, name: 'restaurant'},
		{path: '/add-restaurant', component: AddRestaurant},
		{path: '/restaurant/:restaurant_id/edit', component: RestaurantEdit, name: 'restaurant-edit'},
		{path: '/restaurant/:restaurant_id/delete', component: RestaurantDelete, name: 'restaurant-delete'}
  ]
})
