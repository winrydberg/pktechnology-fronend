

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
                <h3 class="box-title">Add New Work Order</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <div class="col-md-12 d-flex justify-content-center align-items-center flex-column">
                  <i class="fa fa-info-circle"></i>
                  <p class="align-self-center">Complete the form below to add a single work order</p>
                </div>

                <div class="col-md-12">
                  <form role="form" @submit.prevent="submitSingleWorkorder" ref="singleWorkOrderForm">
                    <div class="box-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="first_name">Customer MSISDN</label>
                            <input type="text" class="form-control" v-model="work_order.msisdn" required id="full_name" placeholder="Enter MSISDN" >
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="email">Customer Name</label>
                            <input type="text" class="form-control" v-model="work_order.customerName" id="email" placeholder="Enter Full Name">
                          </div>
                        </div>
                      </div>


                      <div class="row mt-4">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="email">Customer Address</label>
                            <input type="text" class="form-control" v-model="work_order.customerAddress" id="email" placeholder="Enter Address">
                          </div>
                        </div>
                        <div class="col-md-6 mt-4">
                          <div class="form-group">
                            <button type="button" @click="showNewContactModal()" class="btn btn-warning"><i class="fa fa-plus"></i>Add Customer Phone No</button>
                          </div>
                        </div>
                      </div>


                      <div class="row mt-4">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="phone">Location</label>
                            <input type="text" class="form-control" v-model="work_order.location" required id="location" placeholder="Enter Location">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="phone">Agent Number</label>
                            <input type="text" class="form-control" v-model="work_order.salesAgent" required id="agent_number" placeholder="Enter Agent Number">
                          </div>
                        </div>
                      </div>



                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mt-4">
                            <label for="phone">Coordinate(Longitude)</label>
                            <input type="text" class="form-control" v-model="work_order.lng" required id="lng" placeholder="Enter Longitude">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group mt-4">
                            <label for="phone">Coordinate(Latitude)</label>
                            <input type="text" class="form-control" v-model="work_order.lat" required id="lat" placeholder="Enter Latitude">
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mt-4">
                            <label for="phone">Vendor</label>
                            <input type="text" class="form-control" v-model="work_order.vendor" required id="vendor" placeholder="Enter Vendor">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group mt-4">
                            <label for="phone">Date</label>
                            <input type="date" class="form-control" v-model="work_order.cdate" required id="cdate" placeholder="Enter Date">
                          </div>
                        </div>
                      </div>

                      <div class="form-group mt-4">
                        <label for="phone">Category</label>
                        <select class="form-control" v-model="work_order.category" id="category" required>
                          <option value="" selected>Select an option</option>
                          <option value="CATEGORY ONE">CATEGORY ONE</option>
                          <option value="CATEGORY TWO">CATEGORY TWO</option>
                        </select>
                      </div>


                      <div class="form-group mt-4">
                        <label for="phone">Engineer</label>
                        <select class="form-control" v-model="work_order.engineer" id="account_type" required>
                          <option value="" selected>Select an option</option>

                          <option v-for="account in accounts" value="account.code">{{account.name}}</option>

                        </select>
                      </div>




                    </div>
                    <!-- /.box-body -->

                    <div class="box-footer">
                      <button type="submit" class="btn btn-success"><i class="fa fa-user-plus"></i> Add Single Work Order <img v-if="loading" style="height: 15px;" src="../assets/loading.gif" alt="loading"/> </button>
                    </div>
                  </form>
                </div>
                <!-- /.table-responsive -->
              </div>
              <!-- /.box-footer -->
            </div>
          </div>

          <div class="col-md-3">
            <div class="box box-info box-height" >
              <div class="box-header with-border">
                <h3 class="box-title">Customer's Phone No.s</h3>
              </div>

              <!-- /.box-header -->
              <div class="box-body">
                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>#No.</th>
                    <th>Phone No.</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(phone, index) in work_order.customerPhone">
                    <td>{{index + 1}}</td>
                    <td>{{phone}}</td>
                    <td><button @click="removePhoneNo(phone)" class="btn btn-danger"><i class="fa fa-trash"></i></button></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <QuickLinks></QuickLinks>
          </div>
        </div>
      </section>
    </div>


    <!--    <Footer></Footer>-->


    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Default Modal</h4>
          </div>
          <div class="modal-body">
              <form ref="newPhoneNo" @submit.prevent="addPhoneNo">
                <div class="form-group mt-4">
                  <label for="phone">Enter Phone No.</label>
                  <input type="text" class="form-control" v-model="phone" required id="phone" placeholder="Enter Phone No">
                </div>
                <button type="submit" class="btn btn-primary mt-3">Add</button>
              </form>
          </div>
          <div class="modal-footer">
            <button type="button" @click="closeModal" class="btn btn-default pull-left" data-dismiss="modal">Close</button>

          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>


  </div>
</template>

<script lang="ts">

import Swal from 'sweetalert2'

import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DashboardInfo from "@/components/DashboardInfo.vue";
import LatestOrders from "@/components/LatestOrders.vue";
import QuickLinks from "@/components/QuickLinks.vue";

import apiClient from '@/services/axios';
import TheWelcome from "@/components/ForgotPassword.vue";
import type {AccountResponse} from "@/types/responses.js";

export default {

  components: {
    TheWelcome,
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
      phone: null,
      loading: false,
      accounts: [],
      work_order: {
        customerPhone: [],
        customerName: null,
        email: null,
        msisdn: null,
        location: null,
        lng: null,
        lat: null,
        category: "",
        cdate: null,
        vendor: null,
        engineer: "",
        salesAgent : null,
        salesAgentPhoneNumber: null,
        customerAddress: null
      }
    }
  },



  methods: {
    submitSingleWorkorder(){

      Swal.fire({
        title: "Add Single Work Order",
        text: "You are about to add a work order. Confirm to proceed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed"
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          apiClient.post('/api/workorder', this.work_order).then((response) => {
            this.loading = false;
            if(response.status === 201 && response.data.code === "201") {
              Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: "Success: Work order successfully created.",
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
      this.$refs.singleWorkOrderForm.reset();
    },

    showNewContactModal(){
      $('#myModal').modal('show');
    },

    closeModal(){
      $('#myModal').modal('hide');
    },

    addPhoneNo(){
      if(this.phone == null || this.phone == ""){
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Invalid phone number.",
        });
        return;
      }else{
        if(this.phone.length >=9){
          this.work_order.customerPhone.push("233"+this.phone.slice(-9));
          this.phone=""
          this.closeModal();
        }else{
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Invalid phone number.",
          });
          return;
        }
      }
    },

    removePhoneNo(phone_no){
      this.work_order.customerPhone = this.work_order.customerPhone.filter(item => item !== phone_no);
    },


    getAccounts() {
      apiClient.get<AccountResponse>('/api/auth/getallusers').then((response) => {
        if(response.status === 200 && response.data.code === "200") {
          response.data.data.forEach(element => {
            if(element.role.toUpperCase() == "ENGINEER"){
              this.accounts.push(element);
            }
          })
        }else{
          console.log(response.data.data)
        }
      }).catch((error) => {
        console.log(error);
      })
    },

    submitSingleWorkorder(){
      Swal.fire({
        title: "New Work Order",
        text: "You are about to add a work order. Confirm to proceed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed"
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          apiClient.post('/api/workorder', this.work_order).then((response) => {
            this.loading = false;
            if(response.status === 200 && response.data.code === "200") {
              Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: "Success: Work order created successfully",
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
     this.$refs.singleWorkOrderForm.reset();
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