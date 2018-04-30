<template>
  <div >
      <md-card>
      <md-card-header>
        <div class="md-title">Data Binding</div>
      </md-card-header>
       <md-card-content> 
 
   <md-field>
      <label>String</label>
      <md-input v-model="message"></md-input>
    </md-field>
    <div>String: {{ message }}</div>
    <div>String | Filter: {{ message|capitalize }}</div>
    <div>String | Global Filter: {{ message|reverse }}</div>
  <div>

    <md-field>
      <label>Zahl</label>
      <md-input v-model.number="age" type="number"> </md-input>
    </md-field>
    
  </div>
  <div>Zahl: {{ age }}</div>

  <md-switch v-model="boolData">v-if</md-switch>
<md-card v-if="boolData">
      <md-card-header>
        <div class="md-title">v-if</div>
      </md-card-header>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
      </md-card-content>

     
    </md-card>

<div>
  <md-switch v-model="vIfElse">v-else</md-switch>
</div>
<md-card v-if="vIfElse">
      <md-card-header>
        <div class="md-title">v-if</div>
      </md-card-header>
     
    </md-card>
    <md-card v-else>
      <md-card-header>
        <div class="md-title">v-else</div>
      </md-card-header>

      

     
    </md-card>

       </md-card-content>
      </md-card>
  </div>
  
  
  
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    message: "",
    age: 0,
    boolData: false,
    vIfElse: false
  }),
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
