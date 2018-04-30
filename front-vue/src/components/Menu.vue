<template>

<div>
   <div class="md-toolbar-row">
   <span class="md-title"> EntwicklerCamp 2018</span>
 
    <!-- use router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
          <router-link tag="md-button" to="/">Home</router-link>
          <router-link tag="md-button" to="/binding">Data Binding</router-link>
          <router-link tag="md-button"  to="/list">List</router-link>
   </div>
</div>
  
</template>

<script>
export default {
  name: "Menu",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #008091;
}
</style>
