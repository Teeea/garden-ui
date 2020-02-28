import BookListView from "@/views/BookListView/BookListView";
import Vue          from 'vue';
import VueRouter    from 'vue-router';
import Home         from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path     : '/',
    name     : 'Home',
    component: Home,
  },
  {
    path     : '/book-list/:ids',
    name     : 'BookList',
    component: BookListView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
