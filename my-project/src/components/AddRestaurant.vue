<template id="add-restaurant">
  <div>
  <h2>Add new restaurant</h2>
  <form v-on:submit="createRestaurant">
    <div class="form-group">
      <label for="add-name">Name</label>
      <input class="form-control" id="add-name" v-model="restaurant.name" required/>
    </div>
    <div class="form-group">
      <label for="add-cuisine">cuisine</label>
      <input class="form-control" id="add-cuisine" rows="10" v-model="restaurant.cuisine"></input>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
    <a class="btn btn-default"><router-link to="/">Cancel</router-link></a>
  </form>
  </div>
</template>

<script>
export default {
  template: '#add-restaurant',
  data: function () {
    return {restaurant: {name: '', cuisine: ''}
    }
  },
  methods: {
    // REQUETES POST
     createRestaurant() {

        let donneesFormulaire = new FormData();
        donneesFormulaire.append('nom',  this.restaurant.name);
        donneesFormulaire.append('cuisine',this.restaurant.cuisine);
        let url = "http://localhost:8080/api/restaurants";

        fetch(url, {
            method: "POST",
            body: donneesFormulaire
        })
        .then(function(responseJSON) {
            responseJSON.json()
                .then(function(res) {
                  console.log(res);
                });
            })
            .catch(function (err) {
                console.log(err);
        });
    }

  }
}
</script>
