<script>
export default {
  name: "ResultatComponent",
  props:['final_search_string'],
  
  data(){
    return{
      current_weather_data: {},
      mode_temperature : true,
      photo_string : "",
      list : []
    }
  },
  watch:{
    final_search_string(newValue,oldValue){
      console.log(newValue,oldValue)
      if ( newValue.url.length>0 ){
        this.getWeatherByName(newValue.url)
      }      
    }
    
  },
  created(){
    if ( $cookies.isKey('favorite_city') ){
      this.getWeatherByName($cookies.get('favorite_city'))
      // MAKE IT SEARCH PHOTOS ALONG
    }
    
  },


  methods:{


    getWeatherByName(name){
      let options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: name },
        headers: {
          'X-RapidAPI-Key': '30aad44501msh65bbb52a41657d8p1ad31bjsn2ec80c8ab81e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      if ( this.final_search_string.url.length == 0 ){
        this.current_weather_data = {}
      }else {
        this.axios.request(options).then( (response) => {
        //console.log(this.final_search_string,response);
        this.current_weather_data = response.data
        } )
      }

    },
    getPhotos(){
      let options = {
        method: 'GET',
        url: 'https://api.unsplash.com/search/photos',
        headers: {
          'Authorization': 'Client-ID -HEG5D4sP3AZyu0WwbYPQt4LCT-USDu-PEHAZDgKypI'
        },
        params: {
          query: this.photo_string,
          per_page: 5,
          page:1,
          orientation: 'squarish'
        }
      }
      this.axios.request(options).then( (response) => {
        console.log(response.data)
        this.list = response.data.results
       
      } )

    }

  }

  
}


</script>

<template>
<input v-model="photo_string" type="text">
<button @click="getPhotos()" class="btn"> GET PHOTOS</button>
<h1>{{ final_search_string.url }}</h1>

  <div>
    <div v-if="Object.keys(current_weather_data).length != 0 " class="resultBox">
      <button v-if="mode_temperature" @click="mode_temperature = !mode_temperature">°F</button>
      <button v-else @click="mode_temperature = !mode_temperature">°C</button>
      <h3> {{  current_weather_data.location.name }}, {{ current_weather_data.location.region }}</h3>
      <h3>{{ current_weather_data.location.country }}</h3>
      <h3 v-if="mode_temperature" class="temp"> {{ current_weather_data.current.temp_c }}°C </h3>
      <h3 v-else class="temp"> {{ current_weather_data.current.temp_f }}°F </h3>
      <h3> {{ current_weather_data.current.condition.text }}</h3>

      

    </div>

    <div v-for="i in list" >
      
      <img :src="i.urls.small" alt="">
    </div>


  </div>

</template>
<style>
.result-container{
  display : none;
  width: auto;
  min-width: 200px;
  padding: 3px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-left:40%;
  margin-right:40%;
  margin-top: 0;
  position: relative;
  bottom: 6px;
  
}

.result-item{
  display: inherit;
  width: inherit;
  text-align: inherit;
  background-color: transparent;

}

.result-item:hover{
  background-color: lightgray;
  cursor: pointer;
}

div.resultBox{
  border: 4px solid;
  justify-content: center;

}
</style>
