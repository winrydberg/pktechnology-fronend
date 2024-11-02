

<template>
  <div class="" id="body">
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
                <h3 class="box-title">Add New User Account</h3>

                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                  <div class="col-md-12 d-flex justify-content-center align-items-center flex-column">
                    <i class="fa fa-info-circle"></i>
                    <p class="align-self-center">Complete the form below to add new user account</p>
                  </div>

                <div class="col-md-12">
                  <form role="form" @submit.prevent="registerUser">
                    <div class="box-body">
                      <div class="form-group">
                        <label for="first_name">Full Name</label>
                        <input type="text" class="form-control" v-model="full_name" required id="full_name" placeholder="Enter Full Name" >
                      </div>

                      <div class="form-group mt-4">
                        <label for="email">Email Address</label>
                        <input type="email" class="form-control" v-model="email" id="email" placeholder="Enter Email Address">
                      </div>

                      <div class="form-group mt-4">
                        <label for="phone">Phone No.</label>
                        <input type="text" class="form-control" v-model="phone" required id="phone" placeholder="Enter Phone No.">
                      </div>

                      <div class="form-group mt-4">
                        <label for="phone">Account Type</label>
                        <select class="form-control" v-model="role" id="account_type" required>
                          <option value="" selected>Select an option</option>
                          <option value="MANAGER">MANAGER ACCOUNT</option>
                          <option value="ENGINEER">ENGINEER ACCOUNT</option>
                          <option value="MATERIAL">MATERIAL / WAREHOUSE USER ACCOUNT</option>
                        </select>
                      </div>

                      <div class="row mt-4">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="password" required class="form-control" id="password" placeholder="Enter Password">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" class="form-control" required v-model="confirm_password" id="confirm_password" placeholder="Confirm Password">
                          </div>
                        </div>
                      </div>


                    </div>
                    <!-- /.box-body -->

                    <div class="box-footer">
                      <button type="submit" class="btn btn-success"><i class="fa fa-user-plus"></i> Register Account <img v-if="loading" style="height: 15px;" src="../assets/loading.gif" alt="loading"/> </button>
                    </div>
                  </form>
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

    <LoadingModal ref="child" show=""></LoadingModal>
<!--    <Footer></Footer>-->
  </div>
</template>

<script>

import Swal from 'sweetalert2'

import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DashboardInfo from "@/components/DashboardInfo.vue";
import LatestOrders from "@/components/LatestOrders.vue";
import QuickLinks from "@/components/QuickLinks.vue";

import apiClient from '@/services/axios';
import LoadingModal from "@/components/LoadingModal.vue";

export default {

  components: {
    LoadingModal,
    QuickLinks,
    LatestOrders,
    DashboardInfo,
    Header,
    SideBar,
    Footer
  },

  mounted() {

  },
  data() {
    return {
      loading: false,
      full_name: null,
      email: null,
      phone: null,
      password: null,
      confirm_password: null,
      role: ""
    }
  },

  methods: {
    openLoadingModal() {
      this.$refs.child.openModal();
    },
    loseLoadingModal() {
      this.$refs.child.closeModal();
    },
    registerUser(){
      if(this.password !== this.confirm_password){
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Confirm Password does not match password field"
        });
        return ;
      }


      Swal.fire({
        title: "New Account",
        text: "You are about to create new user account. Confirm to proceed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed"
      }).then((result) => {
        if (result.isConfirmed) {
          this.openLoadingModal();
          this.loading = true;
          apiClient.post('/api/auth/createuser', {
            email: this.email,
            name: this.full_name,
            phoneNumber: this.phone,
            role: this.role,
            password: this.password
          }).then((response) => {
            this.loading = false;
            if(response.status === 201 && response.data.code === "201") {
              Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: "Success: User account created successfully",
              }).then((_) => {
                this.resetForm();
              });
            }else{
              Swal.fire({
                icon: "error",
                title: "ERROR",
                text: response.data.message,
              });
            }
          }).catch((error) => {
            this.loading = false;
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
    },

    resetForm(){
      this.full_name = null;
      this.email = null;
      this.phone = null;
      this.password = null;
      this.confirm_password = null;
      this.role = "";
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