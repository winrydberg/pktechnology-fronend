

<template>
    <div class="row d-flex flex-row align-items-center justify-content-center vh-100">
      <div class="col-md-6 login-page d-flex flex-column align-items-center justify-content-center">
          <h1>PK TECHNOLOGY</h1>
        <p>Login To Proceed</p>
      </div>
      <div class="col-md-6 d-flex align-items-center justify-content-center">
        <div class="col-md-8 col-sm-12 align-self-center">
          <div class="card">
            <div class="card-header d-flex flex-row align-items-center justify-content-center">
              <p style="color: black;" class="card-title">Login To Proceed</p>
            </div>
            <div class="card-body">
                <div class="" v-show="error === true">
                    <p class="alert alert-danger">{{error_message}}</p>
                </div>
                <form @submit.prevent="loginUser">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" v-model="email" id="email" aria-describedby="emailHelp" required>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="password" id="password" required>
                  </div>

                 <div class="mt-5 d-flex align-items-center justify-content-center">
                   <button type="submit" class="brand_btn"><i v-if="!loading" class="fa fa-lock"></i> <img v-if="loading" style="height: 15px;" src="../assets/loading.gif" alt="loading"/> Sign In</button>
                 </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>



<script lang="ts">
import apiClient from '@/services/axios';
import {useUserStore} from "@/stores/user";


export default {

  data() {
    return {
      store: useUserStore(),
      loading: false,
      error: false,
      error_message: '',
      email: "",
      password: "",
      // userStore : useUserStore(),
    }
  },
  mounted() {

    this.store =  useUserStore();
    console.log(useUserStore().user);
  },
  methods: {

    testFunc(){

      this.store.setUser({
          id: "d0450bd0-fef1-4a1d-8bee-612943cb395d",
          email: "me@gmail.com",
          role: "ADMIN",
          token: "dasdasdasdasdsada",
          name: "John Doe",
          status: "Active",
          phone: 333423423,
          userCode: "333423423"
      })

      this.$router.push('/dashboard');
    },

    loginUser(){

      this.testFunc();
      return;

      this.loading = true;
      apiClient.post('/api/auth/login', {
        email: this.email,
        password: this.password
      }).then((response) => {
        console.log(response.data.data)
        this.loading = false;
        if(response.status === 200 && response.data.code === "200") {
            localStorage.setItem("token", response.data.data.token);
            this.store.setUser(response.data.data);
            this.$router.push('/dashboard');
        }else{
          this.error = true;
          this.error_message = "Oops, Something went wrong. Please try again";
        }
      }).catch((error) => {
        this.error = true;
        // this.error_message = error.message;
        console.log(error);
        if (error.response) {
          if (error.response.status === 404) {
            this.loading = false;
            this.error_message = error.response.data.message;
          } else {
            this.loading = false;
            this.error_message = "Server error| Please contact administrators";
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
          this.loading = false;
          this.error_message = "No response received:";
        } else {
          console.error('Error in setting up request:', error.message);
          this.loading = false;
          this.error_message = "Check your internet connection and try again";
        }
      })

    }
  }
}
</script>

<style scoped>
.login-page {
  background-image: url('../assets/nasa.jpg');
  background-size: cover;
  height: 100vh;
}

.login-page h1 {
  font-weight: bolder;
  color:white;
}

.login-page p {
  color:white;
}

@media (max-width: 960px) {
  .login-page {
    display: none;
    height: 0vh;
  }
}
</style>
