<script>
import NavbarComponent from './NavbarComponent.vue'
import ResultatComponent from './ResultatComponent.vue'
export default {
  name: "IndexComponent",
  components:{
    NavbarComponent,
    ResultatComponent
  },
  data(){
    return{
      result : "",
      display_search : true
    }
  }
}
</script>

<template>
  <NavbarComponent :display_search="display_search" v-model:chosen_result="result"></NavbarComponent>


  <ResultatComponent :search_string="result"></ResultatComponent>
  
</template>
<style>

</style>
