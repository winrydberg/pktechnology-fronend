<script lang="ts">

import { useUserStore } from '@/stores/user';
import {Role} from "@/types/enums";

export default {
  data(){
    return {
      user:  useUserStore().user,
    }
  },
  computed: {
    isAdmin() {
      return this.user.role.toUpperCase() === Role.ADMIN;
    },

    isEngineer() {
      return this.user.role.toUpperCase() === Role.ENGINEER;
    }
  }
};

</script>

<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">QuickLinks</h3>
    </div>
    <!-- /.box-header -->
    <!-- form start -->
   <div class="box-body">
     <RouterLink class="btn btn-success btn-block mt-3" to="/dashboard"><i class="fa fa-dashboard"></i> Dashboard</RouterLink>

     <RouterLink class="btn bg-purple btn-block mt-3" v-show="isAdmin" to="/new-work-order"><i class="fa fa-plus-circle"></i> New Work Order</RouterLink>

     <RouterLink class="btn btn-warning btn-block mt-3" v-show="isAdmin" to="/reports"><i class="fa fa-folder-o"></i> Generate Reports</RouterLink>

     <RouterLink class="btn btn-danger btn-block mt-3" v-show="isAdmin" to="/new-account"><i class="fa fa-user-plus"></i> New Account</RouterLink>

     <RouterLink class="btn bg-navy btn-block mt-3 text-white" v-show="isAdmin" to="/accounts"><i class="fa fa-users"></i> Accounts / Users</RouterLink>

     <RouterLink class="btn bg-warning btn-block mt-3" style="color:white;" v-show="isEngineer" to="/my-pending-orders"><i class="fa fa-list"></i> My Pending Orders</RouterLink>

     <RouterLink class="btn bg-navy btn-block mt-3" v-show="isEngineer" to="/my-assigned-orders"><i class="fa fa-users"></i> My Order History</RouterLink>

   </div>
  </div>
</template>

<style scoped>

</style>