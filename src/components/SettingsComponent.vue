<script>
import NavbarComponent from './NavbarComponent.vue'
export default {
  name: "SettingsComponent",
  components:{
    NavbarComponent,
  }
  
}
</script>

<template>

<NavbarComponent></NavbarComponent>
<div class="custom-control custom-switch mx-5">
  <input type="checkbox" class="custom-control-input" id="customSwitch1">
  <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
</div>


</template>
<style>

</style>

