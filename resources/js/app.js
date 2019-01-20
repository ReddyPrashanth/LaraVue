
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import {router} from './router.js';
import { Form, HasError,AlertError,AlertErrors, AlertSuccess} from 'vform';
import VueProgressBar from 'vue-progressbar';
import NotFound from './components/NotFound.vue';
import moment from 'moment';
import Swal from 'sweetalert2';
import Gate from './Gate.js'
// import VeeValidate from 'vee-validate';

window.Form = Form;
window.Swal = Swal;

// Vue Prototypes

Vue.prototype.$gate = new Gate(window.user);

// Global Filters

Vue.filter('upText', (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('date',(value) => {
    return moment(value).format('MMMM Do YYYY');
});

// sweet alert

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  window.toast = toast;

// vue packages

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
//   transition: {
//     speed: '0.2s',
//     opacity: '0.6s',
//     termination: 300
//   },
//   autoRevert: true,
//   location: 'left',
//   inverse: false
}

Vue.use(VueProgressBar, options);
// Vue.use(VeeValidate);

// Event Bus

window.eventBus = new Vue();





/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component(AlertErrors.name, AlertErrors);
Vue.component(AlertSuccess.name, AlertSuccess);
Vue.component('not-found', NotFound);
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data: {
        search: ''
    },
    methods: {
        searchUsers: _.debounce(() => {
            eventBus.$emit('searching');
        }, 1000)
    }
});
