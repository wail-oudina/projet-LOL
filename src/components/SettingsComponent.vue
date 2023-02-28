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
  <div>
    <NavbarComponent :display_search="false"></NavbarComponent>

    
  </div>

</template>
<style>

</style>

