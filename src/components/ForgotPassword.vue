

<template>
  <div class="login-box">
    <div class="login-logo">
      <RouterLink to="/"><b>PK</b>TECHNOLOGIES</RouterLink>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <form action="../../index2.html" method="post">
        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="Email">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>

        <div class="row">
          <div class="col-xs-6">

          </div>
          <!-- /.col -->
          <div class="col-xs-6">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Reset Password</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <div class="social-auth-links text-center">

      </div>
      <RouterLink to="/">Remembered Password? Login</RouterLink><br>

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

  }
}
</script>
