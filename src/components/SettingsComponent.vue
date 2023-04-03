<script>
import NavbarComponent from './NavbarComponent.vue'
import SearchComponent from './SearchComponent.vue'
export default {
  name: "SettingsComponent",
  components:{
    NavbarComponent,
    SearchComponent
  },
  data(){
    return{
      units : {
        temperature_unit : "",
        distance_unit : "",
        pressure_unit : "",
      },
      favorite_city : String,
      search_input : "",
      searchbar_visible : false,
      resultbox_visible : false,
    }
  },
  methods:{

    onKeyDown(event) {
      if (/^[a-zA-Z]$/.test(event.key) || event.key === "Backspace") {

        this.request_autocomplete_data(this.search_input)
      }
    },
    request_autocomplete_data(search_input){
      if (search_input.length < 2){
        return
      }
      let options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/search.json',
        params: {q: search_input},
        headers: {
          'X-RapidAPI-Key': '30aad44501msh65bbb52a41657d8p1ad31bjsn2ec80c8ab81e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      this.axios.request(options).then( (response) => {
        
        this.autocomplete_data = response.data
        this.resultbox_visible = this.autocomplete_data.length > 0

      } )
    },
    affectResult(result){
      this.favorite_city = result
      this.resultbox_visible,this.searchbar_visible = false,false
      if (this.favorite_city != "") {
        this.$cookies.set('favorite_city', this.favorite_city, '60d')
      }
      
    },
    getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          // Get the latitude and longitude from the position object
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          let options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/search.json',
            params: {q: latitude + "," + longitude},
            headers: {
              'X-RapidAPI-Key': '30aad44501msh65bbb52a41657d8p1ad31bjsn2ec80c8ab81e',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
          };
          this.axios.request(options).then( (response) => {
            this.affectResult(response.data[0]["name"]+" "+response.data[0]["region"])
          } )
        });
      } else { 
        window.alert("Geolocation is not supported by this browser.");
      }
    },
    remove_favorite_city(){
      this.favorite_city = ""
      this.$cookies.remove('favorite_city')
    },

    

  },

  beforeMount(){
    if ( !$cookies.isKey('units') ) {
      this.units.temperature_unit = "C"
      this.units.distance_unit = "km"
      this.units.pressure_unit = "mb"
      $cookies.set('units', this.units, '60d')
    }else{
      this.units = $cookies.get('units')
    }

    if ($cookies.isKey('favorite_city')) {
      this.favorite_city = $cookies.get('favorite_city')
    }
  },
  watch:{
    units:{
      handler(){
        $cookies.set('units', this.units, '60d')
      },
      deep: true
    }
  },

  
}

</script>

<template>

<NavbarComponent></NavbarComponent>

<div class="alert alert-warning alert-dismissible fade show mx-6 my-6" role="alert">
   When you edit these settings , you automatically accept using <strong>cookies</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

<div class="setting-affichage my-3 p-3">
  <h2>Display</h2>
  <h5>Temperature Unit</h5>
  <div class="form-check">
    <input v-model="units.temperature_unit" class="form-check-input" type="radio"  name="temperature_unit" id="temperature_unit_c" value="C">
    <label class="form-check-label" for="temperature_unit_c">
      Celsius (°C)
    </label>
  </div>

  <div class="form-check">
    <input v-model="units.temperature_unit" class="form-check-input" type="radio" name="temperature_unit" id="temperature_unit_f" value="F">
    <label class="form-check-label" for="temperature_unit_f">
      Fahrenheit (°F)
    </label>
  </div>
  <br>
  <h5>Distance Unit</h5>
  <div class="form-check">
    <input v-model="units.distance_unit" class="form-check-input" type="radio" name="distance_unit" id="distance_unit_km" value="km">
    <label class="form-check-label" for="distance_unit_km">
      Kilometers (km)
    </label>
  </div>
  
  <div class="form-check">
    <input v-model="units.distance_unit" class="form-check-input" type="radio" name="distance_unit" id="distance_unit_mi" value="mi">
    <label class="form-check-label" for="distance_unit_mi">
      Miles (mi)
    </label>
  </div>
  <br>
  <h5>Pressure Unit</h5>
  <div class="form-check">
    <input v-model="units.pressure_unit" class="form-check-input" type="radio" name="pressure_unit" id="pressure_unit_mb" value="mb">
    <label class="form-check-label" for="pressure_unit_mb">
      millibars (mb or hPa)
    </label>
  </div>
  
  <div class="form-check">
    <input v-model="units.pressure_unit" class="form-check-input" type="radio" name="pressure_unit" id="pressure_unit_in" value="in">
    <label class="form-check-label" for="pressure_unit_in">
      Inch of mercury (inHg)
    </label>
  </div>



</div>
<div class="setting-ville-fav my-3 p-3">
  <h2>Favorite City</h2>

  <div v-if="!$cookies.isKey('favorite_city')" > 
    <!-- ville non définie -->
    <button v-if="!searchbar_visible" @click="this.searchbar_visible = true" class=" btn btn-success">Add a favorite city</button>
    
    <div class="d-flex" v-if="searchbar_visible" >
      
      <input @keydown="onKeyDown" @click="request_autocomplete_data(this.search_input)" v-model="search_input"  autocomplete="off" class="form-control  mx-3 w-25 " width="200px" id="search-input"   type="search" placeholder="Search a city.  Ex : Paris" aria-label="Search">
  
      <button @click="getLocation()"  class="btn btn-outline-primary mx-3 " >
        <svg  width="20" height="20" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Location</title><path d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
      </button>
  
      <button @click="this.searchbar_visible = false;this.resultbox_visible=false;" class="btn btn-danger p-1" >
        <svg width="20" height="20 " xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
          <title>Close</title>
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/>
        </svg>
      </button>
  
    </div>
    <div v-if="resultbox_visible" class="liste-resultats d-flex flex-column">
      <div v-for="result in autocomplete_data" @click="affectResult(result.name+' '+result.region)"  class="result-item px-2 py-1 ">{{result.name }}, {{ result.country }}</div>
    </div>

  </div>

  <div v-if="$cookies.isKey('favorite_city')" > 
    <h4>{{ favorite_city }}</h4>
    <button @click="remove_favorite_city()" class="btn btn-danger">Delete</button>
  </div>
    
  
  

</div>




</template>
<style>
  .setting-affichage {
   color:white;
  }
  .setting-ville-fav {
   color:white;
  }
  .liste-resultats{
    color: black;
    background-color: #F5F0F6;
    border: 1px solid gray;
    border-radius: 5px;

    margin-top: 10px;
    margin-right: 40%;
    position: relative;
    bottom: 6px;
  }
</style>

