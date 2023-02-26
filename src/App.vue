<script >
import NavbarComponent from './components/NavbarComponent.vue'
import ResultatComponent from './components/ResultatComponent.vue'
export default{
  components:{
    NavbarComponent,
    ResultatComponent
  },
  data(){
    return{
      result : ""
    }
  }
}
</script>

<template>
  <NavbarComponent v-model:chosen_result="result"></NavbarComponent>

  <ResultatComponent :search_string="result.url"></ResultatComponent>

</template>

<style>

</style>
