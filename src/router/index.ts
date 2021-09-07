import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Scoreboard from '@/views/Scoreboard.vue';
import Submission from '@/views/Submission.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/scoreboard',
  },
  {
    path: '/scoreboard',
    name: 'Scoreboard',
    component: Scoreboard,
    meta: {
      title: 'Scoreboard',
    },
  },
  {
    path: '/submission/:id',
    name: 'Submission',
    component: Submission,
    meta: {
      title: 'Submission',
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
