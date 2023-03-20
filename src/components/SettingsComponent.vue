<script>
import NavbarComponent from './NavbarComponent.vue'
export default {
  name: "SettingsComponent",
  components:{
    NavbarComponent,
  },
  data(){
    return{
      temperature_unit : "",
      searchbar_visible : false,
      settings : {}
    }
  },
  methods:{
    init(){
      this.temperature_unit = $cookies.get('temperature_unit')
    },
    create_cookie_temperature_unit(){
      $cookies.set('temperature_unit', this.temperature_unit, '1d')
    },
    showit(){
      console.log($cookies.get('temperature_unit'))

      console.log("test:",$cookies.get("temperature_unit")==null)
    }
    

  },

  watch:{
    temperature_unit(){
      this.create_cookie_temperature_unit()
    }
  },
  created() {
    this.init()
  },

  
}

</script>

<template>

<NavbarComponent></NavbarComponent>

<button class="btn btn-primary m-5" @click="create_cookie_temperature_unit()">CREATE</button>


<button class="m-3" @click="showit()">GET</button>


<!-- <div class="custom-control custom-switch mx-5">
  <input type="checkbox" class="custom-control-input" id="customSwitch1">
  <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
</div> -->

<div class="setting-affichage my-3 p-3">
  <h2>Affichage</h2>
  <h5>Unité de temperature</h5>
  <div class="form-check">
    <input v-model="temperature_unit" class="form-check-input" type="radio" name="temperature_unit" id="temperature_unit_c" value="C">
    <label class="form-check-label" for="temperature_unit_c">
      Celsius (°C)
    </label>
  </div>

  <div class="form-check">
    <input v-model="temperature_unit" class="form-check-input" type="radio" name="temperature_unit" id="temperature_unit_f" value="F">
    <label class="form-check-label" for="temperature_unit_f">
      Fahrenheit (°F)
    </label>
  </div>

</div>
<div class="setting-ville-fav my-3 p-3">
  <h2>Ville favorite</h2>
  <button v-if="!searchbar_visible" @click="this.searchbar_visible = true" class=" btn btn-success">Ajouter une ville</button>
  <div class="d-flex" v-if="searchbar_visible" >
    
    <input class="form-control  mx-3 w-25 " width="200px" id="search-input" @keydown="onKeyDown" v-model="search"  type="search" placeholder="Search a city.  Ex : Paris" aria-label="Search">

    <button @click="this.searchbar_visible = false" class="btn btn-danger p-1" width="40px" height="40px">
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
        <title>Close</title>
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/>
      </svg>
    </button>
  </div>
</div>




</template>
<style>

</style>

