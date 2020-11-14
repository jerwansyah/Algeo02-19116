const Vue = require('vue');
const About = require('@c/aboutbonk.vue').default;

import '@s/index.scss';

new Vue({
  render: h => h(About),
}).$mount("#aboutbonk");
