<script>
import NavbarComponent from './NavbarComponent.vue'
export default {
  name: "SettingsComponent",
  components:{
    NavbarComponent,
  },
  data(){
    return{
      temperature_unit : ""
    }
  }
  
}
</script>

<template>

<NavbarComponent></NavbarComponent>
<div class="custom-control custom-switch mx-5">
  <input type="checkbox" class="custom-control-input" id="customSwitch1">
  <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
</div>

<div class="form-check">
  <input v-model="temperature_unit" class="form-check-input" type="radio" name="temperature_unit" id="temperature_unit_c" value="C">
  <label class="form-check-label" for="temperature_unit_c">
    Celsius (°C)
  </label>
</div>

<div class="form-check">
  <input v-model="temperature_unit" class="form-check-input" type="radio" name="temperature_unit" id="temperature_unit_f" value="F" checked>
  <label class="form-check-label" for="temperature_unit_f">
    Fahrenheit (°F)
  </label>
</div>
<h1>{{ temperature_unit }}</h1>


</template>
<style>

</style>

