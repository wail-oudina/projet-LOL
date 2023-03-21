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
        final_search_string : ""
      }
    }
  }
</script>

<template>
  <NavbarComponent></NavbarComponent>
  <SearchComponent v-model:final_search_string="final_search_string" ></SearchComponent>
  <ResultatComponent :final_search_string="final_search_string" ></ResultatComponent>
  
</template>
<style>
</style>
