<script>
export default {
  name: "ResultatComponent",

  watch:{
    search_string(newValue,oldValue){
      console.log(newValue,oldValue)

      this.getWeatherByName()
      
    }
  },
  props:{
    search_string : String
  },
  data(){
    return{
      result_data: {},
      mode_temperature : true,
      isSearchActivated : true
    }
  },


  methods:{
    onclickOutside(){
      this.isSearchActivated = false
    },

    getWeatherByName(){
      let options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: this.search_string },
        headers: {
          'X-RapidAPI-Key': '30aad44501msh65bbb52a41657d8p1ad31bjsn2ec80c8ab81e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      if ( this.search_string.length == 0){
        this.result_data = {}
      }else {
        this.axios.request(options).then( (response) => {
        console.log(this.search_string,response);
        this.result_data = response.data

        } )
      }

    },


  }

  
}


</script>

<template>

  <div  v-if="isSearchActivated" class="d-flex p-2 justify-content-center">
    <input v-click-outside="onclickOutside" class="form-control input-group-append  mx-3 w-25 " width="200px" id="search-input" @keydown="onKeyDown" v-model="search"  type="search" placeholder="Search a city.  Ex : Paris" aria-label="Search">
    <button @click="getLocation()"  class="btn btn-outline-primary " >
      <svg  width="20" height="20" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Location</title><path d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
    </button>
  </div>

  <div v-else class="d-flex p-2 justify-content-center">
    <button @click="isSearchActivated = !isSearchActivated" class="btn btn-outline-info " type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
        <title>Search</title>
        <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448"/>
      </svg>
    </button>
  </div>  

  <div class="d-flex justify-content-center result-container">
    <div class="d-flex flex-column  justify-content-sm-center">
      <h3>LOREMFZEFZEFZEFZEFFZFZE</h3>
      <h3>LOREMFZEFZEFZEFZEFFZFZE</h3>
      <h3>LOREMFZEFZEFZEFZEFFZFZE</h3>
      <h3>LOREMFZEFZEFZEFZEFFZFZE</h3>
      <h3>LOREMFZEFZEFZEFZEFFZFZE</h3>
    </div>
  </div>


  <div>

  </div>

  <div>
    <div v-if="Object.keys(result_data).length != 0 " class="resultBox">
      <button v-if="mode_temperature" @click="mode_temperature = !mode_temperature">°F</button>
      <button v-else @click="mode_temperature = !mode_temperature">°C</button>
      <h3> {{  result_data.location.name }}, {{ result_data.location.region }}</h3>
      <h3>{{ result_data.location.country }}</h3>
      <h3 v-if="mode_temperature" class="temp"> {{ result_data.current.temp_c }}°C </h3>
      <h3 v-else class="temp"> {{ result_data.current.temp_f }}°F </h3>
      <h3> {{ result_data.current.condition.text }}</h3>

      

    </div>




  </div>

</template>
<style>


div.resultBox{
  border: 4px solid;
  justify-content: center;

}
</style>
