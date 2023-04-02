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
        NNW: "North North West",},
      randomints : [0,0]
    }
  },
  watch:{
    final_search_string(newValue,oldValue){

      if ( newValue.url.length>0 ){
        this.getWeatherByName(newValue.url)
        this.getPhotos(newValue.url)
      }      
    }
    
  },
  created(){
    this.tworandomints();
    this.final_search_string.url = "";

    if ( $cookies.isKey('favorite_city') ){
      this.final_search_string.url = $cookies.get('favorite_city')
      this.getWeatherByName($cookies.get('favorite_city'))
      
      this.getPhotos($cookies.get('favorite_city'))

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

          this.weather_data = response.data

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
    tworandomints(){
      let x = 10
      let a = Math.floor(Math.random()*x)
      let b = Math.floor(Math.random()*x)
      while (a == b){
        b = Math.floor(Math.random()*x)
      }

      this.randomints = [a,b]
    },
    
    
  },

  
  
}


</script>

<template>


  <div class="resultat">

    <div v-if="Object.keys(weather_data).length != 0 " class="container mt-5">
      <div class="card border-0 shadow-lg my-4">
        <div class="card-header bg-info text-white text-center py-3">
          <h3 class="m-0">Current Weather </h3>
        </div>
        <div class="card-body card-color text-center">
          <img class="mx-auto my-auto image" style="height: 128px;" :src="weather_data.current.condition.icon">
          <div class="row">
            <div class="col-sm-6">
              <h5 class="text-secondary">
                <svg  width="20" height="20" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                  <title>Location</title>
                  <path d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                  <circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                </svg>
                Location:
              </h5>
              <p>{{  weather_data.location.name }}, {{ weather_data.location.region }}</p>
              <h5 class="text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                  <path d="M320 287.18V81c0-35.12-27.89-64.42-63-64.95a64.08 64.08 0 00-65 64v207.13a8 8 0 01-3.18 6.37A113.48 113.48 0 00144 384a112 112 0 00224 0 113.48 113.48 0 00-44.82-90.45 8 8 0 01-3.18-6.37zM254.07 432a48 48 0 01-22-89.54 16 16 0 008-13.84V112.45c0-8.61 6.62-16 15.23-16.43A16 16 0 01272 112v216.58a16.18 16.18 0 008.15 13.94A48 48 0 01254.07 432z"/>
                </svg>
                Temperature:
              </h5>
              <p v-if=" $cookies.get('temperature_unit') === 'C' || !$cookies.isKey('temperature_unit') " > {{ weather_data.current.temp_c }}°C </p>
              <p v-else>{{ weather_data.current.temp_f }}°F </p>
              <h5 class="text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                  <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path><path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                </svg>
                Wind:
              </h5>
              <p>
                {{weather_data.current.wind_kph}} km/h
                <svg :style="{transform:'rotate('+weather_data.current.wind_degree+'deg)'}" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292"/>
                </svg>
                {{ dict_directions[weather_data.current.wind_dir] }}
              </p>
              <h5>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                  <path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                  <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
                </svg>
                Visibility:</h5>
              <p>{{ weather_data.current.vis_km }} km</p>

            </div>
            <div class="col-sm-6">
              <h5 class="text-secondary">Condition: </h5>
              <p>{{ weather_data.current.condition.text }} </p>
              <h5 class="text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                  <path d="M307.72 302.27a8 8 0 01-3.72-6.75V80a48 48 0 00-48-48h0a48 48 0 00-48 48v215.52a8 8 0 01-3.71 6.74 97.51 97.51 0 00-44.19 86.07A96 96 0 00352 384a97.49 97.49 0 00-44.28-81.73zM256 112v272" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
                  <circle cx="256" cy="384" r="48"/>
                </svg>
                Feels Like:
              </h5>
              <p v-if=" $cookies.get('temperature_unit') === 'C' || !$cookies.isKey('temperature_unit') " > {{ weather_data.current.feelslike_c }}°C </p>
              <p v-else>{{ weather_data.current.feelslike_f }}°F </p>
              <h5 class="text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                  <path d="M400 320c0 88.37-55.63 144-144 144s-144-55.63-144-144c0-94.83 103.23-222.85 134.89-259.88a12 12 0 0118.23 0C296.77 97.15 400 225.17 400 320z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
                  <path d="M344 328a72 72 0 01-72 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                </svg>
                Humidity:
              </h5>
              <p>{{weather_data.current.humidity}}%</p>
              <h5>Pressure:</h5>
              <p>{{ weather_data.current.pressure_mb }} kPa</p>
            </div>
          </div>
        </div>
      </div>
      
      
      
      <!-- Weather forecast card -->
      <div class="card border-0 shadow-lg">
        <!-- Card header -->
        <div class="card-header bg-info text-white text-center py-5">
          <h3 class="m-0">Weather Forecast</h3>
        </div>
        <!-- Card body -->
        <div class="card-body card-color">
          <div class="row text-center">
            <!-- Day 1 -->
            <div v-for="forecastday in weather_data.forecast.forecastday" class="d-flex flex-column justify-content-center col-sm-4">
              <h5 class="text-secondary ">{{ dayname(forecastday.date_epoch) }} {{ formatDate(forecastday.date)  }}</h5>
              <p>{{ forecastday.day.condition.text }}  </p>
              <img class="mx-auto" style="height: 64px;width: 64px;" :src="forecastday.day.condition.icon">

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
        <div class="card-header bg-info text-white text-center py-3">
          <button @click="tworandomints()"  class="btn btn-info btn-actualiser">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon-actualiser" viewBox="0 0 512 512">
              <path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 58l80 80-80 80"/>
            </svg>
          </button>
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

  </div>

</template>
<style>

.btn-actualiser{
  position: absolute;
  right: 10px;
  top: 0;
  margin: 10px;
  z-index: 1;
}

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
  position:absolute;
  left: 64px;
  right: 64px;
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
