

<template>
  <div class="box box-info box-height" >
    <div class="box-header with-border">
      <h3 class="box-title">My Latest Orders</h3>

      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
      </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <div class="table-responsive">
        <table class="table table-striped table-bordered text-nowrap" id="myOrders">
<!--        <DataTable class="display text-nowrap" width="100%">-->
          <thead>
            <tr>
              <th>#ID</th>
              <th>MSISDN</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>PHONE</th>
              <th>LOCATION</th>
              <th>CO-ORDINATES</th>
              <th>VENDOR</th>
              <th>DATE</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in engineerLatestOrders" :key="order.id">
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
                <button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Delete</button>
                <RouterLink to="/dashboard" class="btn bg-purple btn-sm mx-2"><i class="fa fa-eye"></i> More Details</RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
<!--        </DataTable>-->
      </div>
      <!-- /.table-responsive -->
    </div>
    <!-- /.box-footer -->
  </div>
</template>

<script lang="ts">
  import apiClient from "@/services/axios";
  import {useUserStore} from "@/stores/user";
  import type {WorkOrderResponse} from "@/types/responses";
  import moment from "moment/moment";


  export default {
    components:{
      // DataTable,
      // DataTablesCore,
    },
    data(){
      return {
        user:  useUserStore().user,
        engineerLatestOrders: [],
      }
    },
    props: {

    },

    mounted() {
      this.getEngineerLatestOrders();
    },


    methods:{

      formattedDate(date) {
        return moment(date).format('MMMM Do, YYYY'); // Format the date
      },
       getEngineerLatestOrders(){
         apiClient.get<WorkOrderResponse>('/api/workorder/getworkorder',
         {
           SearchTerm: this.user.userCode
         }
         ).then((response) => {
           this.loading = false;
           if(response.status === 200 && response.data.code === "200") {
             this.engineerLatestOrders = response.data.data.results;
           }else{
             console.log(response.data.data)
           }
         }).catch((error) => {
           this.loading = false;
           console.log(error);
         })
       }
    }
  }
</script>

<style scoped>

.box-height {

}
</style>