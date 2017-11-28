<template><div>
  <div class="actions">
    <a class="btn btn-default" >
	  <router-link :to="{path: '/add-restaurant'}">
      <span class="glyphicon glyphicon-plus"></span>
      Add restaurant
	  </router-link>
    </a>
  </div>
  <div class="filters">
    <div class="form-group col-sm-3">
      <label for="search-element">restaurant name</label>
      <input v-model="searchKey" class="form-control" id="search-element" requred/>
    </div>
  </div>
  <table class="table">
    <thead>
    <tr>
      <th>Name</th>
      <th>cuisine</th>
      <th class="">Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="restaurant in filteredRestaurants">
      <!-- tr v-for="restaurant in restaurants" -->
      <!-- tr v-for="restaurant in restaurants | filterBy searchKey in 'name'" -->
      <td>
        <a><router-link :to="{name: 'restaurant', params: {restaurant_id: restaurant._id}}">{{ restaurant.name }}</router-link></a>
      </td>
      <td>{{ restaurant.cuisine }}</td>

      <td>
	    <a class="btn btn-warning btn-xs"><router-link :to="{name: 'restaurant-edit', params: {restaurant_id: restaurant._id}}">Edit</router-link></a>
        <a class="btn btn-danger btn-xs"><router-link :to="{name: 'restaurant-delete', params: {restaurant_id: restaurant._id}}">Delete</router-link></a>
      </td>
    </tr>
    </tbody>
  </table>
    <paginate
      :page-count= countPage
      :page-range="2"
      :margin-pages="1"
      :click-handler="clickCallback"
      :active-class="'active'"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>

</div>
</template>

<script>
export default {
  data: function () {
    return {
      restaurants: [],
      searchKey: '',
      countPage: 0,
      pageNum: 1
    };
  },
  computed: {
    filteredRestaurants() {
      return this.restaurants.filter( (restaurant) => {
      	return restaurant.name.indexOf(this.searchKey) > -1
        //return !restaurant.name.indexOf(this.searchKey)
      })
    }
  },
  methods: {
    countRestaurants() {
    	let url = "http://localhost:8080/api/restaurants/count";

    	fetch(url)
    		.then(responseJSON => {
            	responseJSON.json()
            	.then(res => {
            		// Maintenant res est un vrai objet JavaScript
            		console.log(res.data);
                this.countPage = Math.round(res.data / 10 ) - 1
            	});
        	})
        	.catch(function (err) {
            	console.log(err);
        });
    },
    clickCallback(pageNum) {
      this.getRestaurants(pageNum)
    },
    getRestaurants(pageNum) {
    	let url = "http://localhost:8080/api/restaurants?page="+pageNum;

    	fetch(url)
    		.then(responseJSON => {
            	responseJSON.json()
            	.then(res => {
            		// Maintenant res est un vrai objet JavaScript
            		console.log(res.data);
                this.restaurants = res.data
            	});
        	})
        	.catch(function (err) {
            	console.log(err);
        });
    },
    findRestaurant (restaurantId) {
      return restaurants[findRestaurantKey(restaurantId)];
    },

    findRestaurantKey (restaurantId) {
      for (var key = 0; key < restaurants.length; key++) {
        if (restaurants[key].id == restaurantId) {
          return key;
        }
      }
    }
  },
  mounted() {
    this.getRestaurants();
    this.countRestaurants();
  }
};

</script>
<style lang="css">
.page-item {
  padding-left: 40px;
  padding-right: 40px;
}
.active {
  border: 2px solid red;
    border-radius: 5px;
}
</style>
