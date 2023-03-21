<script>
export default {
  name: "ResultatComponent",
  props:['final_search_string'],
  watch:{
    final_search_string(newValue,oldValue){
      console.log(newValue,oldValue)
      if ( newValue.length>0 ){
        this.getWeatherByName()
      }      
    }
    
  },
  
  data(){
    return{
      current_weather_data: {},
      mode_temperature : true,
    }
  },


  methods:{


    getWeatherByName(){
      let options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: this.final_search_string },
        headers: {
          'X-RapidAPI-Key': '30aad44501msh65bbb52a41657d8p1ad31bjsn2ec80c8ab81e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      if ( this.final_search_string.length == 0 ){
        this.current_weather_data = {}
      }else {
        this.axios.request(options).then( (response) => {
        //console.log(this.final_search_string,response);
        this.current_weather_data = response.data
        } )
      }

    },

  }

  
}


</script>

<template>


<h1>{{ final_search_string }}</h1>

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
