
<template>
  <div class="" id="body">
    <loading v-model:active="extra_loading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :z-index="100000"
             background-color="#000"
             :lock-scroll="true"
             :is-full-page="false"/>
    <Header></Header>

    <div class="container-fluid" >
      <section class="content-header">
        <h1>
          Dashboard
          <small>Version 2.0</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li class="active">Dashboard</li>
        </ol>
      </section>

      <section class="content">

        <div class="row">
          <div class="col-md-9">
            <div class="box box-info box-height" >
              <div class="box-header with-border">
                <h3 class="box-title">User Accounts</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <div class="col-md-12 d-flex justify-content-center align-items-center flex-column">
                  <i class="fa fa-info-circle"></i>
                  <p class="align-self-center">Find below accounts for all users registered on the platform with their specific role(s)</p>
                  <hr />
                </div>

                <div class="col-md-12">
                  <div class="d-flex align-items-center justify-content-center flex-column" v-if="loading">
                    <i class="fa fa-spinner fa-spin fa-2x"></i>
                    <p>Loading... Please wait...</p>
                  </div>
                  <div class="table-responsive" v-else>
                    <table class="table table-striped table-bordered">
                      <thead>
                      <tr>
                        <th>ID#</th>
                        <th>Full Name</th>
                        <th>Phone No#</th>
                        <th>Email</th>
                        <th>Role(s)</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(account, index) in accounts">
                        <td>{{index +1 }}</td>
                        <td>{{account.name}}</td>
                        <td>{{account.phoneNumber}}</td>
                        <td>{{account.email}}</td>
                        <td>
                          <span class="badge rounded-pill bg-primary"><i class="fa fa-check-circle"></i> {{account.role != null ? account.role.toUpperCase() : "N/A"}}</span>
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-success" v-if="account.status =='Active'"><i class="fa fa-check-circle"></i> {{account.status}}</span>
                          <span class="badge rounded-pill bg-danger" v-else><i class="fa fa-check-circle"></i> {{account.status}}</span>
                        </td>
                        <td>
                          <button class="btn btn-primary btn-sm" data-widget="collapse"><i class="fa fa-times"></i> Details</button>
                          <span v-show="account.id !== user.id">
                          <button @click="updateAccountStatus(account.id, 'Active')" v-show="account.status == 'Inactive'" class="btn bg-purple btn-sm mx-1" data-widget="collapse"><i class="fa fa-times"></i> Activate</button>
                          <button @click="updateAccountStatus(account.id, 'Inactive')" v-show="account.status == 'Active'" class="btn btn-warning btn-sm mx-1" data-widget="collapse"><i class="fa fa-times"></i> De-activate</button>
                          </span>
                        </td>
                      </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
                <!-- /.table-responsive -->
              </div>
              <!-- /.box-footer -->
            </div>
          </div>
          <div class="col-md-3">
            <QuickLinks></QuickLinks>
          </div>
        </div>
      </section>
    </div>



    <!--    <Footer></Footer>-->
  </div>
</template>

<script lang="ts">

import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DashboardInfo from "@/components/DashboardInfo.vue";
import LatestOrders from "@/components/LatestOrders.vue";
import QuickLinks from "@/components/QuickLinks.vue";
import apiClient from "@/services/axios.js";
import Swal from "sweetalert2";
import type {AccountResponse} from "@/types/responses";
import { useUserStore } from '@/stores/user';

export default {

  components: {
    QuickLinks,
    LatestOrders,
    DashboardInfo,
    Header,
    SideBar,
    Footer
  },

  mounted() {
      this.getAccounts();
  },
  data() {
    return {
      user:  useUserStore().user,
      loading: true,
      extra_loading: true,
      accounts: []
    }
  },

  methods: {
    getAccounts() {
      apiClient.get<AccountResponse>('/api/auth/getallusers').then((response) => {
        this.loading = false;
        if(response.status === 200 && response.data.code === "200") {
          console.log("success")
          console.log(response.data.data)
          this.accounts = response.data.data;
        }else{
          console.log(response.data.data)
        }
      }).catch((error) => {
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: error.message,
        });
      })
    },

    updateAccountStatus(account_id, status) {
      let title = "Activate account"
      let success_message = "Account successfully activated"
      if(status =='Deactivate'){
        title = "Deactivate account";
        success_message = "Account successfully deactivated"
      }
      Swal.fire({
        title: title,
        text: "Are you sure?. Confirm to proceed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed"
      }).then((result) => {
        if (result.isConfirmed) {
          this.extra_loading = true;
          apiClient.patch('/api/auth/activateordeactivateuser', {
            id: account_id,
            status: status
          }).then((response) => {
            this.extra_loading = false;
            if(response.status === 200 ) {


              Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: success_message,
              }).then(() => {
                window.location.reload();
                // this.accounts.map(account =>
                //     account.id === account_id ? { ...account, status: status } : account
                // );
              });
            }else{
              Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "Unable to complete action. Please try again",
              });
            }
          }).catch((error) => {
            this.extra_loading = false;
              Swal.fire({
                icon: "error",
                title: "ERROR",
                text: error.message,
              });
          })
        }else{
          Swal.fire({
            icon: "info",
            title: "ERROR",
            text: "Action cancelled",
          });
        }
      });
    }
  }
}

</script>

<style scoped>
#body{
  background-color: #ecf0f5;
  min-height: 100vh
}
</style>