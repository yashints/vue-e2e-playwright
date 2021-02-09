import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from '@/utils/toast.js';
import DKToast from 'vue-dk-toast';
import { setupAuth } from '@/auth/auth-plugin';
import { makeServer } from './server';

const toastOptions = {
  duration: 1500,
  positionY: 'top', // 'top' or 'bottom'
  positionX: 'right', // 'right' or 'left'
  styles: {
    marginTop: '50px',
    padding: '30px',
  },
};

const authConfig = {
  domain: process.env.VUE_APP_DOMAIN,
  client_id: process.env.VUE_APP_CLIENTID,
  redirect_uri: process.env.VUE_APP_REDIRECT_URL,
  audience: process.env.VUE_APP_AUDIENCE,
  advancedOptions: {
    defaultScope: 'openid profile email crud:users',
  },
};

function callbackRedirect(appState) {
  router.push(appState && appState.targetUrl ? appState.targetUrl : '/');
}

let app = createApp(App)
  .use(router)
  .use(store)
  .use(DKToast, toastOptions)
  .use(Toast);

makeServer();

setupAuth(authConfig, callbackRedirect).then(auth => {
  app.use(auth).mount('#app');
});
