<template>
  <div>
      Rechnungen
     <md-list class="md-triple-line">
         <md-list-item>
              <md-button class="md-raised" to="/invoice">neue Rechnung</md-button>

         </md-list-item>
      <md-list-item v-for="(invoice, index) in invoiceList"  :key='index'>
       
     <div class="md-list-item-text">
          <span>{{ invoice.value.customer }}</span>
          <span> Summe: {{invoice.value.amount}} €</span>
         <span>Datum: {{invoice.value.date |formatDate}}</span>
        </div>

       <router-link tag="md-button" v-bind:to="'/invoice/' + invoice.id">Details</router-link>
      </md-list-item>
     </md-list>
  </div>
  
</template>

<script>
import axios from "axios";

let invoiceList = [];
export default {
  name: "List",
  components: {},
  data() {
    return {
      invoiceList: invoiceList
    };
  },
  created() {
    console.log("created");
    this.loadList();
  },
  methods: {
    loadList() {
      console.log("loading List");
      let basePath = "/api/";
      axios
        .get(basePath + "invoices")
        .then(res => {
          console.log("response", res.data);
          this.invoiceList = res.data;
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
