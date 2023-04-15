<script>
export default {
  name: "NavbarComponent",
}
</script>

<template>
  <div class="ma-navbar">

    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand mx-3" href="/">
        My Météo  
        <svg  xmlns="http://www.w3.org/2000/svg" class="ionicon mx-2" viewBox="0 0 512 512">
          <path d="M90.61 306.85A16.07 16.07 0 00104 293.6C116.09 220.17 169.63 176 232 176c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0012.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H106c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/>
          <path d="M384.8 271.4a80 80 0 10-123.55-92M464 208h32M336 48v32M222.86 94.86l22.63 22.63M449.14 94.86l-22.63 22.63" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>
      
      </a>
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto ml-3">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" >Home <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
  
        <router-link to="/settings" >
          <button class="btn mon-btn-settings ">
            Settings 
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
              <title>Settings</title>
              <path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
            </svg>
          </button>
        </router-link>
      </div>
    </nav>
  </div>
</template>
<style>
.mon-btn-settings{
  background-color: #B38338;
  color: white !important;
  
}
.ma-navbar{
  background-color: #97A8B4;
}

svg {
  height:20px;
  width:20px;
  position:relative;
  bottom:2px;
}


body {
  overflow-x: hidden;
  
}
.checkbox {
  /* Hide the default checkbox */
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.icon {
  /* Style the SVG icon */
  width: 1em;
  height: 1em;
  fill: none;
  stroke: black;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Style the label to position the icon properly */
label {
  display: inline-block;
  position: relative;
  padding-left: 1.5em;
  margin-right: 0.5em;
  cursor: pointer;
}

label:hover .icon {
  stroke: blue;
}

</style>
