import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home';
import MovieDetails from '@/components/MovieDetails';
import About from '@/components/About';
import Login from '@/components/Login';
import Admin from '@/components/Admin';
import UnAuthorized from '@/components/403';
import { routeGuard } from '@/auth/auth-plugin';

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/movie/:id',
    component: MovieDetails,
  },  
  {
    path: '/about',
    component: About,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: routeGuard,
    meta: {
      authorize: {
        role: 'Admin',
      },
    },
  },
  {
    path: '/unauthorized',
    component: UnAuthorized,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
