

<template>
  <nav class="navbar navbar-expand-lg bg-dark px-4" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><strong>PK TECHNOLOGIES</strong></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/dashboard">Dashboard
              <span class="visually-hidden">(current)</span>
            </RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Manage Work Order</a>
            <div class="dropdown-menu">
              <RouterLink class="dropdown-item" to="new-work-order" v-show="isAdmin">New Work Order</RouterLink>
              <div class="dropdown-divider" v-show="isAdmin"></div>
              <RouterLink class="dropdown-item" to="single-work-order" v-show="isAdmin">Single Work Order</RouterLink>
              <div class="dropdown-divider" v-show="isAdmin"></div>
              <RouterLink class="dropdown-item" to="work-order-history" v-show="isAdmin">Work Order History</RouterLink>
              <div class="dropdown-divider" v-show="isAdmin"></div>
              <RouterLink class="dropdown-item" to="work-order-report" v-show="isAdmin">Work Order Reports</RouterLink>


              <RouterLink class="dropdown-item" to="my-pending-orders" v-show="isEngineer">My Pending Orders</RouterLink>
              <div class="dropdown-divider" v-show="isEngineer"></div>
              <RouterLink class="dropdown-item" to="my-order-history" v-show="isEngineer">My Work Order History</RouterLink>
              <div class="dropdown-divider" v-show="isEngineer"></div>
            </div>
          </li>
<!--          <li class="nav-item">-->
<!--            <a class="nav-link" href="#">About</a>-->
<!--          </li>-->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Manage Accounts</a>
            <div class="dropdown-menu">
              <RouterLink class="dropdown-item" to="/new-account" v-if="isAdmin">New Account</RouterLink>
              <div class="dropdown-divider" v-show="isAdmin"></div>
              <RouterLink class="dropdown-item" to="/accounts" v-show="isAdmin">Accounts</RouterLink>
              <div class="dropdown-divider" v-show="isAdmin"></div>
              <RouterLink class="dropdown-item" v-show="isAdmin" to="/roles">Roles</RouterLink>
              <div class="dropdown-divider"v-show="isAdmin"></div>
              <a class="dropdown-item" href="#" @click="logoutUser">Logout</a>
            </div>
          </li>
        </ul>

        <div class="d-flex align-items-center ms-3">
          <i class="fa fa-user-circle-o fa-2x " style="color:white;"></i>
          <span class="mx-3" style="color:white;">{{user != null ? user.email : "N/A"}}</span>
        </div>
<!--        <form class="d-flex">-->
<!--          <input class="form-control me-sm-2" type="search" placeholder="Search">-->
<!--          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>-->
<!--        </form>-->
      </div>
    </div>
  </nav>
</template>

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
    },
    logoutUser(){
      localStorage.removeItem("token");
      this.store.setUser(null);
      this.$router.push('/');
    }
  }
};

</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

</style>