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
    <div class="nav-item dropdown ">
      <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
        <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
          <title>Settings</title>
          <path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <div class="dropdown-item" >Unité de temperature : </div>
        <a class="dropdown-item" href="#">ddazdazdaz</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
    <div class="nav-item dropdown ">
      <label>
        <input @click="value = !value" type="checkbox" class="checkbox">
        <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
          <title>Settings</title>
          <path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>
    </label>


      <div class="dropdown-menu dropdown-menu-right">
        <div class="dropdown-item" >Unité de temperature : </div>
        <a class="dropdown-item" href="#">ddazdazdaz</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </div>



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
body {
  overflow-x: hidden;
}
.checkbox {
  /* Hide the default checkbox */
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.icon {
  /* Style the SVG icon */
  width: 1em;
  height: 1em;
  fill: none;
  stroke: black;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Style the label to position the icon properly */
label {
  display: inline-block;
  position: relative;
  padding-left: 1.5em;
  margin-right: 0.5em;
  cursor: pointer;
}

label:hover .icon {
  stroke: blue;
}

</style>
