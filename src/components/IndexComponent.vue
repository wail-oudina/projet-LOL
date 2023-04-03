<script>
  import NavbarComponent from './NavbarComponent.vue'
  import ResultatComponent from './ResultatComponent.vue'
  import SearchComponent from './SearchComponent.vue';
  export default {
    name: "IndexComponent",
    components:{
      NavbarComponent,
      SearchComponent,
      ResultatComponent
    },
    data(){
      return{
        searched_city_data : Object
      }
    }
  }
</script>

<template>
  <NavbarComponent></NavbarComponent>
  <SearchComponent v-model:searched_city_data="searched_city_data" ></SearchComponent>
  <ResultatComponent :searched_city_data="searched_city_data" ></ResultatComponent>
  
</template>
<style>
body{
  background-color: #2B4162;
}
</style>
