<template>

  <div>
     <md-app>
       <md-app-toolbar >
  <Menu></Menu>
       </md-app-toolbar>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <md-app-content>
  <router-view></router-view>
  </md-app-content>
     </md-app>
</div>

</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Menu from "./components/Menu.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    Menu
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 10px;
}
</style>
