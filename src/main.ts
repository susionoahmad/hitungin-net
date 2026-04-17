import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import { initGoogleTracking } from '@/utils/tracking';

const app = createApp(App);

app.use(router);

router.isReady().then(() => {
  initGoogleTracking(router);
  app.mount('#app');
});