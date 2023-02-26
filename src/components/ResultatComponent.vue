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
      mode_temperature : true
    }
  },

  methods:{
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

    }
  }

  
}
</script>

<template>

  

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

h3{
  text-align: center;
  font-size: large;
}
h3.temp{
  font-size: xx-large;
}
div.resultBox{
  border: 4px solid;
  justify-content: center;

}
</style>
