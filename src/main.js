// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Hello from './components/business/Hello'
import Login from './components/business/Login'
import Test from './components/business/Test'
import Teacher from './components/business/Teacher'
import Table from './components/business/Table'
import Main from './components/sys/Main'
import User from './components/admin/User'
import Department from './components/admin/Department'
import Role from './components/admin/Role'
import RoleUser from './components/admin/RoleUser'
import RolePrivilege from './components/admin/RolePrivilege'
import RoleDepartment from './components/admin/RoleDepartment'

import TableTest from './components/business/TableTest'


axios.defaults.withCredentials = true;
Vue.prototype.$http = axios


Vue.use(VueRouter)
Vue.use(ElementUI)


Vue.config.productionTip = false


// 2. 定义路由
// 每个路由应该映射一个组件。 
const routes = [

  { path: '/', name: 'login', component: Login },
  { path: '/tabletest', name: 'tabletest', component: TableTest },
  {
    path: '/main',
    component: Main,
    children: [
      { path: '/hello', name: 'Hello', component: Hello },
      { path: '/table', name: 'table', component: Table },
      { path: '/test', name: 'test', component: Test },

      { path: '/teacher', name: 'teacher', component: Teacher },
      { path: '/user', name: 'user', component: User },
      { path: '/department', name: 'department', component: Department },
      { path: '/role', name: 'role', component: Role },
      { path: '/roleUser', name: 'roleUser', component: RoleUser },
      { path: '/rolePrivilege', name: 'rolePrivilege', component: RolePrivilege },
       { path: '/roleDepartment', name: 'roleDepartment', component: RoleDepartment }
    ],
  },
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({ routes })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
