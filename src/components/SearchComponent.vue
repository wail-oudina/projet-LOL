<script>
export default {
  name: "SearchComponent",
  data(){
    return{
      autocomplete_data : {},
      search : "",
      isSearchActivated : true,
      show_resultbox : false,
      final_search_string : ""
    }
  },
  methods:{
    onclickOutside(){
      this.isSearchActivated = false
    },
    onKeyDown(event) {
      if (/^[a-zA-Z]$/.test(event.key) || event.key === "Backspace") {
        //console.log(event.key); // log the alphabet key that was pressed
        this.request_autocomplete_data()
      }
    },
    request_autocomplete_data(){
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
        //console.log(response);
        this.autocomplete_data = response.data
        if (this.autocomplete_data.length > 0) {
          this.show_resultbox = true
        }else{
          this.show_resultbox = false
        }

      } )
    },

    affectResult(result){
      this.final_search_string = result
      this.$emit('update:final_search_string', this.final_search_string)
      this.show_resultbox = false

    },
    getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          // Get the latitude and longitude from the position object
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          //this.affectResult(latitude + "," + longitude)
          this.search = latitude + "," + longitude
          this.request_autocomplete_data()
          
          
        });
      } else { 
        window.alert("Geolocation is not supported by this browser.");
      }
    },
  },
  props:{
      final_search_string: Object
  },
  emits: ['update:final_search_string'],
  
  
}
</script>

<template>


  <div  v-if="isSearchActivated" v-click-outside="onclickOutside" class="d-flex p-2 justify-content-center">
    <input @keydown="onKeyDown" v-model="search"  class="form-control  mx-3 w-25 color" width="200px" id="search-input"   type="search" placeholder="Search a city.  Ex : Paris" aria-label="Search">
    <button @click="this.final_search_string = getLocation()"  class="btn btn-outline-primary " >
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

  
  <div  v-if="show_resultbox" class="resultbox result-container d-flex flex-column justify-content-center ">


    <div v-for="result in autocomplete_data" @click="affectResult(result)"  class="result-item px-2 py-1 ">{{result.name }}, {{ result.country }}</div>
    

  </div>

</template>
<style>

.resultbox{
  background-color: #D8E1FF;
}
.v-enter-active, .v-leave-active {
  transition: opacity 1s ease;
}
</style>
