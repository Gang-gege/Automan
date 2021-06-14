import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import './filters'
import Moment from 'moment'
import 'moment/locale/zh-cn'
import ElementUI from 'element-ui';
import { Button, Avatar, Pagination, Input, Message, Backtop, Select, Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/golbal.css'
import './assets/iconfont/iconfont.css'

//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//引入vue-quill-editor相关样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$moment = Moment;
Vue.use(ElementUI)
Vue.use(Button)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Backtop)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
