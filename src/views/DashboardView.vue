

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
              <div class="col-md-12">
                <Greetings></Greetings>
              </div>
            </div>

            <!-- Info boxes -->
              <DashboardInfo></DashboardInfo>
            <!-- /.row -->


              <div class="row">
                <div class="col-md-9" v-show="isAdmin">
                  <LatestOrders></LatestOrders>
                  <div class="row>">
                    <div class="col-md-12" >
                      <EngineerWorkOrderCompletion></EngineerWorkOrderCompletion>
                    </div>
                  </div>
                </div>

                <div class="col-md-9" v-show="isEngineer">
                  <EngineerLatestOrders></EngineerLatestOrders>
                </div>

                <div class="col-md-3">
                  <QuickLinks></QuickLinks>
                </div>
              </div>
          </section>
        </div>

<!--      <Footer></Footer>-->
    </div>
</template>

<script>

import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DashboardInfo from "@/components/DashboardInfo.vue";
import LatestOrders from "@/components/LatestOrders.vue";
import QuickLinks from "@/components/QuickLinks.vue";
import EngineerWorkOrderCompletion from "@/components/EngineerWorkOrderCompletion.vue";
import {useUserStore} from "@/stores/user";
import {Role} from "@/types/enums";
import EngineerLatestOrders from "@/components/EngineerLatestOrders.vue";
import Greetings from "@/components/Greetings.vue";


export default {

  components: {
    Greetings,
    EngineerLatestOrders,
    EngineerWorkOrderCompletion,
    QuickLinks,
    LatestOrders,
    DashboardInfo,
    Header,
    SideBar,
    Footer
  },

  mounted() {

  },
  computed: {
    isAdmin() {
      return this.user.role.toUpperCase() === Role.ADMIN;
    },

    isEngineer() {
      return this.user.role.toUpperCase() === Role.ENGINEER;
    }
  },
  data() {
    return{
      user:  useUserStore().user,
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