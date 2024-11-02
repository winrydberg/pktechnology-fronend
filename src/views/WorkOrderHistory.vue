

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
          <li><RouterLink to="/dashboard"><i class="fa fa-dashboard"></i> Dashboard</RouterLink></li>
          <li class="active">New Work Order</li>
        </ol>
      </section>

      <section class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-info box-height" >
              <div class="box-header with-border">
                <h3 class="box-title">Filter Work Order</h3>

                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <form role="form">
                  <div class="box-body">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="first_name">Start Date</label>
                          <input type="date" class="form-control" id="first_name">
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="last_name">End Date</label>
                          <input type="date" v-model="search_params" class="form-control" id="last_name" >
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="last_name">Search Term</label>
                          <input type="text" v-model="search_params.SearchTerm"  class="form-control" id="last_name" >
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="last_name">Status</label>
                          <select class="form-control" id="last_name">
                            <option value="">Select Status</option>
                            <option value="PENDING">Pending Orders</option>
                            <option value="PROCESSED">Processed Orders</option>
                            <option value="SUSPENDED">Suspended Orders</option>
                            <option value="REJECTED">Rejected Orders</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="box-footer">
                        <button type="button" @click="openLoadingModal" class="btn btn-success"><i class="fa fa-filter"></i> Filter Work Order</button>
                      </div>
                    </div>


                  </div>
                </form>
              </div>
              <!-- /.box-footer -->
            </div>
          </div>
        </div>


        <div class="row">
          <div class="col-md-12">
            <div class="box box-info box-height" >
              <div class="box-header with-border">
                <h3 class="box-title">Work Order History</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <div class="col-md-12 d-flex justify-content-center align-items-center flex-column alert alert-info">
                  <i class="fa fa-info-circle"></i>
                  <strong class="align-self-center">Work Order History Reports</strong>
                </div>

                <div class="col-md-12">
                    <div class="d-flex align-items-center justify-content-center flex-column" v-if="loading" >
                      <i class="fa fa-spinner fa-spin fa-3x"></i>
                      <h5>Loading... Please wait...</h5>
                    </div>
                    <div v-else class="table-responsive">
                      <table class="table table-striped table-hover text-nowrap table-bordered">
                        <thead>
                        <tr>
                          <th>#ID</th>
                          <th>MSISDN</th>
                          <th>NAME</th>
                          <th>ADDRESS</th>
                          <th>PHONE</th>
                          <th>LOCATION</th>
                          <th>SALES</th>
                          <th>AGENT NUMBER</th>
                          <th>CO-ORDINATES</th>
                          <th>VENDOR</th>
                          <th>DATE</th>
                          <th>CATEGORY</th>
                          <th>ENGINEER CODE</th>
                          <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(order, index) in workorders" :key="order.id">
                          <td>{{index +1}}</td>
                          <td>{{order.msisdn}}</td>
                          <td>{{order.customerName}}</td>
                          <td>{{order.customerAddress}}</td>
                          <td>
                            {{order.customerPhoneNumbers != null ? order.customerPhoneNumbers.join(",") : ''}}
                          </td>
                          <td>
                            {{order.location}}
                          </td>
                          <td>
                            {{order.salesAgent}}
                          </td>
                          <td>
                            {{order.salesAgentPhoneNumber}}
                          </td>
                          <td>
                            {{order.coOrdinates}}
                          </td>
                          <td>
                            {{order.vendor}}
                          </td>
                          <td>
                            {{ formattedDate(order.date) }}
                          </td>
                          <td>
                            {{order.category}}
                          </td>
                          <td>
                            {{order.engineerCode}}
                          </td>
                          <td>
                            <button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Delete</button>
                            <RouterLink to="/dashboard" class="btn bg-purple btn-sm mx-2"><i class="fa fa-eye"></i> More Details</RouterLink>
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
        </div>
      </section>
    </div>

<!--    <Footer></Footer>-->
    <LoadingModal ref="child"></LoadingModal>
  </div>
</template>

<script>

import moment from 'moment';
import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DashboardInfo from "@/components/DashboardInfo.vue";
import LatestOrders from "@/components/LatestOrders.vue";
import QuickLinks from "@/components/QuickLinks.vue";
import apiClient from "@/services/axios.js";
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

  computed: {

  },

  mounted() {
    this.getWorkorders()
  },
  data() {
    return {
      search_params : {
        SearchTerm: null,
        StepName: null,
        StepStatus: null,
        Status: null,
        StartDate: null,
        EndDate: null,
        PageSize: 10
      },
      loading: true,
      workorders : []
    }
  },

  methods: {
    openLoadingModal() {
      this.$refs.child.openModal();
    },
    getWorkorders() {
      apiClient.get('/api/workorder/getworkorder').then((response) => {
        this.loading = false;
        if(response.status === 200 && response.data.code === "200") {

          this.workorders = response.data.data.results;
        }else{
          console.log(response.data.data)
        }
      }).catch((error) => {
        this.loading = false;
        console.log(error);
      })
    },

    formattedDate(date) {
      return moment(date).format('MMMM Do, YYYY'); // Format the date
    },
  }
}

</script>

<style scoped>
#body{
  background-color: #ecf0f5;
  min-height: 100vh
}
</style>