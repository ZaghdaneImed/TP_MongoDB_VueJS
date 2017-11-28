<template >
  <div>
  <h2>Edit restaurant</h2>
  <form v-on:submit="updateRestaurant()">
    <div class="form-group">
      <label for="edit-name">Name</label>
      <input class="form-control" id="edit-name" v-model="restaurant.name" required/>
    </div>
    <div class="form-group">
      <label for="edit-cuisine">Cuisine</label>
      <input class="form-control" id="edit-cuisine" v-model="restaurant.cuisine"></input>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
    <a class="btn btn-default"><router-link to="/">Cancel</router-link></a>
  </form>
  </div>
</template>

<script>
export default {
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
    updateRestaurant (){

      let donneesFormulaire = new FormData();
      donneesFormulaire.append('nom',  this.restaurant.name);
      donneesFormulaire.append('cuisine',this.restaurant.cuisine);

      let url = "http://localhost:8080/api/restaurants/" + this.$route.params.restaurant_id;
      fetch(url, {
          method: "PUT",
          body: donneesFormulaire
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
      //router.push('/');
    }
  }
};
</script>
