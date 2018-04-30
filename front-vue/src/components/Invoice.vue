<template>
  <div >
    <md-card>
       <md-card-header>
    <div class="md-title">Rechnung</div>
          <div class="md-subhead">Info</div>
       </md-card-header>
<md-card-content>
  
   
      <md-datepicker v-model="invoice.date">
         <label>Datum</label>
      </md-datepicker>
    


    <md-field>
      <label>Kunde</label>
      <md-input v-model="invoice.customer"></md-input>
       
    </md-field>

</md-card-content>
    </md-card>

    <md-card>
      <md-card-header>
        <div class="md-title">Positionen</div>
      </md-card-header>
      <md-card-content>
   <md-table md-card>
      

      <md-table-row>
        
        <md-table-head>Beschreibung</md-table-head>
        <md-table-head>Menge</md-table-head>
        <md-table-head>Einzelpreis</md-table-head>
        <md-table-head>Summe</md-table-head>
         <md-table-head>Löschen</md-table-head>
      </md-table-row>

      <md-table-row v-for="(position, index) in invoice.positon"  :key='index'>
        <md-table-cell>
          <md-field>
            <md-input v-model="position.description"></md-input>       
          </md-field>
        </md-table-cell>
        <md-table-cell>
          <md-field>
            <md-input v-model.number="position.amount" type="number"></md-input>       
          </md-field>
        </md-table-cell>
        <md-table-cell>
          <md-field>
            <md-input v-model.number="position.singlePrice" type="number"></md-input>       
          </md-field>
        </md-table-cell>
        <md-table-cell>{{position.amount * position.singlePrice }}</md-table-cell>
         <md-table-cell>
<md-button class="md-icon-button" v-on:click="deletePostion(index)">
        <md-icon>delete</md-icon>
      </md-button>

         </md-table-cell>
      </md-table-row>

     
    </md-table>
   <md-button class="md-raised"
   v-on:click="addPosition"
   >Position hinzufügen</md-button>

<div class="md-layout">
    <div class="md-layout-item">Summe</div>
    <div class="md-layout-item">{{getSum()}}</div>
    
  </div>



        </md-card-content>
    </md-card>

<md-card>
      <md-card-header>
        <div class="md-title">Aktionen</div>
      </md-card-header>
    <md-card-actions md-alignment="space-between">
      <md-button class="md-raised"
   v-on:click="save"
   >Speichern</md-button>

   <md-button class="md-raised"
   v-on:click="openPdf"
   >Pdf Öffnen</md-button>
    </md-card-actions>
    </md-card>
  </div>
  
</template>

<script>
import axios from "axios";
let now = new Date();
let invoice = {
  date: now,
  positon: [
    {
      amount: 0,
      singlePrice: 0
    }
  ]
};
let basePath = "/api/";
export default {
  name: "Invoice",
  components: {},
  data() {
    return {
      invoice: invoice
    };
  },
  created() {
    if (this.$route.params.id) {
      this.loadInvoice();
    }
  },
  methods: {
    loadInvoice() {
      let id = this.$route.params.id;

      axios
        .get(basePath + "invoices/" + id)
        .then(res => {
          console.log("response", res.data);
          this.invoice = res.data;
        })
        .catch(e => {
          console.error(e);
        });
    },
    getSum() {
      let result = 0;
      if (this.invoice.positon) {
        this.invoice.positon.forEach(element => {
          result += element.amount * element.singlePrice;
        });
      }
      this.invoice.amount = result;
      return this.invoice.amount;
    },
    addPosition: function() {
      let newPost = {};
      newPost.amount = 0;
      newPost.singlePrice = 0.0;
      this.invoice.positon.push(newPost);
    },
    deletePostion: function(index) {
      this.invoice.positon.splice(index, 1);
    },
    save: function() {
      console.log("save this", this.invoice);
      axios
        .patch(basePath + "invoices/", this.invoice)
        .then(res => {
          let data = res.data.data;
          console.log("data", data);
          this.invoice._id = data.id;
          this.invoice._rev = data.rev;
        })
        .catch(e => {
          console.error(e);
        });
    },
    openPdf() {
      window.open(basePath + "invoicePdf/" + this.invoice._id, "_blank");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
