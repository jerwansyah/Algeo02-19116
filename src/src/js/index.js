const Vue = require('vue');
const App = require('@c/main.vue').default;

import '@s/index.scss';

new Vue({
  render: h => h(App),
}).$mount("#app");
