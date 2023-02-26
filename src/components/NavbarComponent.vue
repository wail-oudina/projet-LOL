<script>
export default {
  name: "NavbarComponent",
  data(){
    return{
      search : "",
      results : [],
      chosen_result : ""
      
    }
  },
  props:{
    chosen_result: String
  },
  emits: ['update:chosen_result'],
  
  methods:{
    searchAutocomplete(){
      let options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/search.json',
        params: {q: this.search},
        headers: {
          'X-RapidAPI-Key': '30aad44501msh65bbb52a41657d8p1ad31bjsn2ec80c8ab81e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      this.axios.request(options).then( (response) => {
        console.log(response);
        this.results = response.data

      } )
    },
    onKeyDown(event) {
      if (!!document.getElementById("result_dropdown")){
        if (this.results.length > 0) {
        document.getElementById("result_dropdown").classList.remove("cache")
        document.getElementById("result_dropdown").classList.add("affiche")
        }else{
          document.getElementById("result_dropdown").classList.remove("affiche")
          document.getElementById("result_dropdown").classList.add("cache")
        }
      }
      if (/^[a-zA-Z]$/.test(event.key) || event.key === "Backspace") {
        //console.log(event.key); // log the alphabet key that was pressed
        this.searchAutocomplete()

      }
    },
    affectResult(result){
      this.chosen_result = result
      this.$emit('update:chosen_result', this.chosen_result)
      document.getElementById("result_dropdown").classList.remove("affiche")
      document.getElementById("result_dropdown").classList.add("cache")
      
    },
    getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          // Get the latitude and longitude from the position object
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          this.chosen_result = latitude + "," + longitude
          this.$emit('update:chosen_result', this.chosen_result)
        });
      } else { 
        //console.log("Geolocation is not supported by this browser.");
        window.alert("Geolocation is not supported by this browser.");
      }
    }
  }

}
let result_dropdown = document.getElementById("result_dropdown")
document.addEventListener('click', function(event) {
  if ( !!result_dropdown){

    if (event.target !== result_dropdown) {
      result_dropdown.classList.remove("affiche")
      result_dropdown.classList.add("cache")
    
    }
    if ( event.target === document.getElementById("search_input") ){
    result_dropdown.classList.remove("cache")
    result_dropdown.classList.add("affiche")
  }

  }


});
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{this.chosen_result.name}}
        </a>
        <div class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form @submit.prevent class="form-inline my-2 my-lg-0">
      <input id="search_input" @keydown="onKeyDown" v-model="search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <div v-if="this.search.length > 0 && this.results.length > 0" id = "result_dropdown" class="res dropdown-menu">
        <a v-for="result in results " class="dropdown-item" @click="affectResult(result.url)">{{result.name }}, {{ result.country }}</a>
      </div>
      <button @click="getLocation()" class="btn btn-outline-success my-2 my-sm-0" type="submit">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Location</title><path d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
      </button>
    </form>
  </div>
</nav>
</template>
<style>
.affiche {
  display: block !important;
  margin-top: 0; /* remove the gap so it doesn't close */
}
.cache {
  display: none !important;
}


</style>