<script >
import NavbarComponent from './components/NavbarComponent.vue'
export default{
  components:{
    NavbarComponent
  }
}
</script>

<template>


  <div class="mainbox">
    <NavbarComponent class="navbar"></NavbarComponent>
  </div>

</template>

<style>
.navbar{
  background-color: lightblue;
  position: fixed;
  top : 0px;
  padding: 0;
  margin: 0;


}
</style>
