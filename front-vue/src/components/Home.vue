<template>
  <div class="hello">
    <md-card>
    <HelloWorld msg="Vue.js @ Entwicklercamp"/>
    <img src="../assets/logo-ec.png">
    </md-card>
  </div>
  
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 10px;
  text-align: center;
}
</style>
