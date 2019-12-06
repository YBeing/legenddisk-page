import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import axios from 'axios'
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
// axios.defaults.withCredentials=true;
Vue.prototype.$ajax=axios;
Vue.use(ViewUI);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
