<template id="restaurant-delete">
  <div>
    <h2>Delete restaurant {{ restaurant.name }}</h2>
    <form v-on:submit="deleteRestaurant">
      <p>The action cannot be undone.</p>
      <button type="submit" class="btn btn-danger">Delete</button>
      <a class="btn btn-default"><router-link to="/">Cancel</router-link></a>
    </form>
  </div>
</template>

<script>
export default {
  template: '#restaurant-delete',
  data: function () {
    return {restaurant: {}};
  },
  created () {
    this.findRestaurant(this.$route.params.restaurant_id)
  },
  methods: {
    findRestaurant(restaurant_id) {
      let url = "http://localhost:8080/api/restaurants/" + restaurant_id;

      fetch(url)
      .then(responseJSON => {
        responseJSON.json()
        .then(res => {
          // Maintenant res est un vrai objet JavaScript
          this.restaurant =  res.restaurant
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    },
    deleteRestaurant() {
      // Pour éviter que la page ne se ré-affiche
      let id = this.$route.params.restaurant_id
      let url = "http://localhost:8080/api/restaurants/" + id;

      fetch(url, {
        method: "DELETE"
      })
      .then(function(responseJSON) {
        responseJSON.json()
        .then(function(res) {
          // Maintenant res est un vrai objet JavaScript
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
};
</script>
