import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForgotPassword from "@/components/ForgotPassword.vue";
import DashboardView from "@/views/DashboardView.vue";
import NewWorkOrder from "@/views/NewWorkOrder.vue";
import WorkOrderHistory from "@/views/WorkOrderHistory.vue";
import NewAccount from "@/views/NewAccount.vue";
import AccountsView from "@/views/AccountsView.vue";
import SingleWorkOrder from "@/views/SingleWorkOrder.vue";
import MyPendingOrders from "@/components/MyPendingOrders.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/new-work-order',
      name: 'new-work-order',
      component: NewWorkOrder
    },
    {
      path: '/single-work-order',
      name: 'single-work-order',
      component: SingleWorkOrder
    },
    {
      path: '/work-order-history',
      name: 'work-order-history',
      component: WorkOrderHistory
    },
    {
      path: '/new-account',
      name: 'new-account',
      component: NewAccount
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView
    },
    {
      path: '/my-pending-orders',
      name: 'my-pending-orders',
      component: MyPendingOrders
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
