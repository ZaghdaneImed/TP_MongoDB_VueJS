<template>
<div>
  <h2>{{ restaurant.name }}</h2>
  <b>Cuisine: </b>
  <div>{{ restaurant.cuisine }}</div>
  <br/>
  <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
  <a><router-link to="/">Back to restaurant list</router-link></a>
</div>
</template>

<script>
export default {
  data: function () {
    return {restaurant: this.findRestaurant(this.$route.params.restaurant_id)};
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
    }
  }
};

</script>
