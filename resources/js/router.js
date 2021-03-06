import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Profile from './components/Profile.vue';
import Users from './components/Users.vue';
import Developer from './components/Developer.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/dashboard', component: Dashboard},
    {path: '/profile', component: Profile},
    {path: '/developer', component: Developer},
    {path: '/users', component: Users}
];


export const router = new VueRouter({
    routes,
    mode:'history'
});
