<script>
export default {
  name: "ResultatComponent",
  props:['final_search_string'],
  
  data(){
    return{
      weather_data: {},
      list : [],
      dict_directions : {
        N: "North",
        NNE: "North North East",
        NE: "North East",
        ENE: "East North East",
        E: "East",
        ESE: "East South East",
        SE: "South East",
        SSE: "South South East",
        S: "South",
        SSW: "South South West",
        SW: "South West",
        WSW: "West South West",
        W: "West",
        WNW: "West North West",
        NW: "North West",
        NNW: "North North West",}
    }
  },
  watch:{
    final_search_string(newValue,oldValue){
      console.log(newValue,oldValue)
      if ( newValue.url.length>0 ){
        this.getWeatherByName(newValue.url)
        this.getPhotos(newValue.url)
      }      
    }
    
  },
  created(){
    this.final_search_string.url = ""

    if ( $cookies.isKey('favorite_city') ){
      this.final_search_string.url = $cookies.get('favorite_city')
      this.getWeatherByName($cookies.get('favorite_city'))
      
      this.getPhotos($cookies.get('favorite_city'))
      console.log("created")
    }
    
  },
  
  
  methods:{
    
    
    getWeatherByName(name){
      let options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {q: name , days:'3' },
        headers: {
          'X-RapidAPI-Key': '30aad44501msh65bbb52a41657d8p1ad31bjsn2ec80c8ab81e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      
      if ( this.final_search_string.url.length == 0 || this.final_search_string.url == undefined ){
        this.weather_data = {}
      }else {
        this.axios.request(options).then( (response) => {
          //console.log(this.final_search_string,response);
          this.weather_data = response.data
          console.log(response.data)
        } )
      }
      
    },
    getPhotos(string){
      let options = {
        method: 'GET',
        url: 'https://api.unsplash.com/search/photos',
        headers: {
          'Authorization': 'Client-ID -HEG5D4sP3AZyu0WwbYPQt4LCT-USDu-PEHAZDgKypI'
        },
        params: {
          query: string,
          per_page: 10,
          page:2,
          orientation: 'landscape'
        }
      }
      this.axios.request(options).then( (response) => {
        console.log(response.data)
        this.list = response.data.results
        
      } )
      
    },
    formatDate(date){
      //format DD/MM from "YYYY-MM-DD"
      let date_array = date.split("-")
      return date_array[2] + "/" + date_array[1]
    },
    dayname(epoch){
      let date = new Date(epoch*1000)
      let day = date.getDay()
      let dayname = ""
      switch(day){
        case 0:
        dayname = "Sunday"
        break;
        case 1:
          dayname = "Monday"
          break;
        case 2:
          dayname = "Tuesday"
          break;
        case 3:
          dayname = "Wednesday"
          break;
        case 4:
          dayname = "Thursday"
          break;
        case 5:
          dayname = "Friday"
          break;
        case 6:
          dayname = "Saturday"
          break;
        }
        return dayname
    },
    tworandomints(x){
      let a = Math.floor(Math.random()*x)
      let b = Math.floor(Math.random()*x)
      while (a == b){
        b = Math.floor(Math.random()*x)
      }
      console.log(a,b)
      return [a,b]
    },
    
    
  },
  computed:{
    randomints : {
      get(){
        return this.tworandomints(10)
      }
    }
  },
  
  
}


</script>

<template>


  <div class="resultat">

    <div v-if="Object.keys(weather_data).length != 0 " class="container mt-5">
      <div class="card border-0 shadow-lg my-4">
        <div class="card-header bg-info text-white py-3">
          <h3 class="m-0">Current Weather </h3>
        </div>
        <div class="card-body card-color">
          <div class="row">
            <div class="col-sm-6">
              <h5 class="text-secondary">Location:</h5>
              <p>{{  weather_data.location.name }}, {{ weather_data.location.region }}</p>
              <h5 class="text-secondary">Temperature:</h5>
              <p v-if=" $cookies.get('temperature_unit') === 'C' || !$cookies.isKey('temperature_unit') " > {{ weather_data.current.temp_c }}°C </p>
              <p v-else>{{ weather_data.current.temp_f }}°F </p>
              <h5 class="text-secondary">Wind:</h5>
              <p>
                {{weather_data.current.wind_kph}} km/h
                <svg :style="{transform:'rotate('+weather_data.current.wind_degree+'deg)'}" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292"/>
                </svg>
                {{ dict_directions[weather_data.current.wind_dir] }}
              </p>
            </div>
            <div class="col-sm-6">
              <h5 class="text-secondary">Conditions: <img class="image" :src="weather_data.current.condition.icon"></h5>
              <p>{{ weather_data.current.condition.text }} </p>
              <h5 class="text-secondary">Feels Like:</h5>
              <p v-if=" $cookies.get('temperature_unit') === 'C' || !$cookies.isKey('temperature_unit') " > {{ weather_data.current.feelslike_c }}°C </p>
              <p v-else>{{ weather_data.current.feelslike_f }}°F </p>
              <h5 class="text-secondary">Humidity:</h5>
              <p>{{weather_data.current.humidity}}%</p>
            </div>
          </div>
        </div>
      </div>
      
      
      
      <!-- Weather forecast card -->
      <div class="card border-0 shadow-lg">
        <!-- Card header -->
        <div class="card-header bg-info text-white py-5">
          <h3 class="m-0">Weather Forecast</h3>
        </div>
        <!-- Card body -->
        <div class="card-body card-color">
          <div class="row">
            <!-- Day 1 -->
            <div v-for="forecastday in weather_data.forecast.forecastday" class="d-flex flex-column justify-content-center col-sm-4">
              <h5 class="text-secondary ">{{ dayname(forecastday.date_epoch) }} {{ formatDate(forecastday.date)  }}</h5>
              <p>{{ forecastday.day.condition.text }} <img :src="forecastday.day.condition.icon"> </p>

              <p v-if=" $cookies.get('temperature_unit') === 'C' || !$cookies.isKey('temperature_unit') ">Min Temperature: {{ forecastday.day.mintemp_c }}°</p>
              <p v-else>Min Temperature: {{ forecastday.day.mintemp_f }}°</p>
              <p v-if=" $cookies.get('temperature_unit') === 'C' || !$cookies.isKey('temperature_unit') ">Max Temperature: {{ forecastday.day.maxtemp_c }}°</p>
              <p v-else>Max Temperature: {{ forecastday.day.maxtemp_f }}°</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
      
    <div v-if="list.length >0" class="container my-7 ">
      <div class="card border-0 shadow-lg">
        <div class="card-header bg-info text-white py-3">
          <h3 class="m-0">2 Photos Taken in This Region</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <img :src="list[randomints[0]].urls.regular"  class="img-fluid rounded">
            </div>
            <div class="col-sm-6">
              <img :src="list[randomints[1]].urls.regular"  class="img-fluid rounded">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="arrow" style="transform: rotate(45deg);"></div>
      </div>
	  </div>



  </div>

</template>
<style>



.carousel-box{
  margin-right: 25%;
  margin-left: 25%;
  width: 50%;
  height: 50%;
}
.card-color{
  background-color:#F5F0F6;
}

.image{
  position: absolute;
  top: 10px;
}
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
