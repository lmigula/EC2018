import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App.vue'
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'

import moment from 'moment'

Vue.use(VueMaterial);

Vue.use(VueRouter);



Vue.config.productionTip = false

var router = new VueRouter({
  routes: routes
})

Vue.filter('reverse', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.split('')
    .reverse()
    .join('');
})

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})