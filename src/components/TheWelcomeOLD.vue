

<template>
  <div class="login-box">
    <div class="login-logo">
      <RouterLink to="/"><b>PK</b>TECHNOLOGIES</RouterLink>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <form action="#" @submit.prevent="loginUser" method="post">
        <div class="form-group has-feedback">
          <input type="email" required v-model="email" class="form-control" placeholder="Email">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" required v-model="password" class="form-control" placeholder="Password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">

          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <div class="social-auth-links text-center">

      </div>
      <RouterLink to="/forgot-password">Forgot Password</RouterLink><br>

    </div>
    <!-- /.login-box-body -->
  </div>
</template>

<script>
export default {
  name: 'TheWelcome',
  components: {

  },
  mounted() {
    // Add a class to the body when the component is mounted
    document.body.classList.add('login-page');
  },
  beforeDestroy() {
    // Optionally remove the class when the component is destroyed
    document.body.classList.remove('login-page');
  },
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    loginUser(){
      this.$router.push('/dashboard');
    }
  }
}
</script>
