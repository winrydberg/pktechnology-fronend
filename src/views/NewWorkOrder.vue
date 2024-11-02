

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
          <div class="col-md-9">
            <div class="box box-info box-height" >
              <div class="box-header with-border">
                <h3 class="box-title">Load New Work Order</h3>

                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <div class="col-md-12 d-flex justify-content-center align-items-center flex-column alert alert-info">
                  <i class="fa fa-info-circle"></i>
                  <strong class="align-self-center">Please complete the form below to load new work order</strong>
                </div>

                <div class="col-md-12">
                  <form role="form" ref="orderForm" @submit.prevent="submitWorkOrder">
                    <div class="box-body">
                      <div class="" v-if="excelError">
                        <p class="alert alert-danger" >{{errorMessage}}</p>
                      </div>
                      <div class="form-group">
                        <label for="file">Upload File (Excel File)</label>
                        <input type="file" class="form-control" @change="handleFileUpload" id="file" accept=".xlsx, .xls" >
                        <small style="color:red; font-weight: bold;">Accepted Format(.xlsx or .xls)</small>
                      </div>

                      <div class="form-group mt-4">
                        <p><a href="#" style="color:dodgerblue; font-weight: bold;">Click Here</a> to download sample work order file </p>
                      </div>


                    </div>
                    <!-- /.box-body -->

                    <div class="box-footer">
                      <button type="submit" class="btn btn-success"><i class="fa fa-upload"></i> Upload Work Order</button>
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

    <Footer></Footer>

  </div>
</template>

<script>
import * as XLSX from "xlsx";

import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DashboardInfo from "@/components/DashboardInfo.vue";
import LatestOrders from "@/components/LatestOrders.vue";
import QuickLinks from "@/components/QuickLinks.vue";
import Swal from "sweetalert2";
import apiClient from "@/services/axios.js";

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

  },
  data() {
    return{
      loading: false,
      excelError: false,
      excelFile: null,
      excelData: null,     // Stores parsed data
      errorMessage: "",    // Stores validation error messages
    }
  },

  methods: {
    handleFileUpload(event) {

      const file = event.target.files[0];

      this.excelError = false;
      this.errorMessage = "";  // Reset error message


      if (!file) {
        this.excelError = true;
        this.errorMessage = "No file selected.";
        this.excelFile = null;
        return;
      }

      // File Type Validation
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        this.excelError = true;
        this.errorMessage = "Invalid file type. Please upload an Excel file.";
        this.excelFile = null;
        return;
      }


      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // Get the first sheet and convert it to JSON
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Content Validation: Ensure specific columns exist
          const requiredColumns = ["MSISDN", "CUSTOMER", "ADDRESS", "PHONE", "LOCATION", "SALES", "AGENTNUMBER", "COORDINATES", "VENDOR", "DATE", "CATEGORY", "ENGINEERCODE"];
          const raw_fileColumns = jsonData[0];
          const fileColumns = raw_fileColumns.map(str => str.trim().toUpperCase());

          const hasRequiredColumns = requiredColumns.every(col =>
              fileColumns.includes(col)
          );
          if (!hasRequiredColumns) {
            this.excelError = true;
            this.errorMessage = `Missing required columns: ${requiredColumns.join(", ")}.`;
            this.excelFile = null;
            this.resetForm()
            return;
          }

          // If all validations pass, set the data
          this.excelData = XLSX.utils.sheet_to_json(worksheet); // Parsed JSON data
          this.excelFile = event.target.files[0];
          console.log(XLSX.utils.sheet_to_json(worksheet))
        } catch (error) {
          this.excelError = true;
          this.errorMessage = "Failed to process the file. Please ensure it is a valid Excel file.";
          this.excelFile = null;
        }
      };
      reader.readAsArrayBuffer(file);
    },

    resetForm(){
      this.$refs.orderForm.reset();
    },

    submitWorkOrder(){
      const formData = new FormData();
      formData.append('request', this.excelFile);
      Swal.fire({
        title: "New Work Order",
        text: "You are upload a new work order. Confirm to proceed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed"
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          apiClient.post('/api/workorder/upload', formData,{
            headers:{
              "Content-Type": "multipart/form-data",
            }
          }).then((response) => {
            this.loading = false;
            if(response.status === 200 && response.data.code === "200") {
              Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: "Success: "+ response.data.message,
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