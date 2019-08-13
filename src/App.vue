<template>
  <div id="app">
    <SelectCourse/>
  </div>
</template>

<script>
import SelectCourse from './components/SelectCourse';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/w3-css.css'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)


export default {
  name: 'app',
  components: {
    SelectCourse,
  }
}
</script>
<style>
  #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
