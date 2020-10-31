const Vue = require('vue');
const App = require('./components/main.vue').default;

new Vue({
  render: h => h(App),
}).$mount("#app");
