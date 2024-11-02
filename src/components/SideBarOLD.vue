

<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>Alexander Pierce</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>

      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <li class="">
          <RouterLink to="/dashboard">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </RouterLink>
        </li>

<!--        <li>-->
<!--          <a href="pages/widgets.html">-->
<!--            <i class="fa fa-th"></i> <span>Widgets</span>-->
<!--            <span class="pull-right-container">-->
<!--              <small class="label pull-right bg-green">new</small>-->
<!--            </span>-->
<!--          </a>-->
<!--        </li>-->

        <li class="treeview"  >
          <a href="#">
            <i class="fa fa-laptop"></i>
            <span>Manage Orders</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><RouterLink to="/new-order"><i class="fa fa-circle-o"></i> New Work Order</RouterLink></li>
            <li><RouterLink to="/work-order-history"><i class="fa fa-circle-o"></i> Work Order History</RouterLink></li>

          </ul>
        </li>

        <li class="header">ACCOUNTS</li>
        <li class="treeview" >
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Manage Accounts</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><RouterLink to="managers"><i class="fa fa-circle-o"></i> Managers</RouterLink></li>
            <li><RouterLink to="engineers"><i class="fa fa-circle-o"></i> Engineers</RouterLink></li>
          </ul>
        </li>
        <li><RouterLink to="/"><i class="fa fa-sign-out"></i> <span>Logout</span></RouterLink></li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>


  export default {
    data(){
      return {
        selected_nav: {
          nav_id: "order",
          class_name: "menu-open"
        }
      }
    },
    mounted() {
      // Add a class to the body when the component is mounted
      document.body.classList.remove('login-page');
      document.body.classList.add('skin-blue');
      document.body.classList.add('sidebar-mini');
      let scripts = [
          // "/bower_components/jquery/dist/jquery.min.js",
          // "/bower_components/bootstrap/dist/js/bootstrap.min.js",
          // "dist/js/demo.js"
      ];

      let css_styles = [
          // "/bower_components/bootstrap/dist/css/bootstrap.min.css",
          // "/public/dist/css/AdminLTE.min.css",
          // "/dist/css/skins/_all-skins.min.css"
      ];

      css_styles.forEach(style => {
        this.loadExternalCSS(style)
            .then(() => {
              console.log('External CSS loaded successfully');
            })
            .catch((error) => {
              console.error('Failed to load external CSS:', error);
            });
      })


      scripts.forEach(script => {
        this.loadExternalScript(script)
            .then(() => {
              console.log('Sidebar: External script loaded successfully => '+script);
              // You can now use the external script’s functionality here.
            })
            .catch((error) => {
              console.error('Failed to load external script:'+script, error);
            });
      })

    },
    methods: {
      loadExternalScript(src) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      },

      loadExternalCSS(href) {
        return new Promise((resolve, reject) => {
          // Check if the CSS is already loaded
          if (document.querySelector(`link[href="${href}"]`)) {
            resolve(); // CSS is already loaded
            return;
          }

          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.onload = resolve;
          link.onerror = reject;
          document.head.appendChild(link);
        });
      },


      navbarSelected(nav_id) {
          switch(nav_id) {
            case "order":
              this.selected_nav = {
                nav_id: "order",
                class_name: "menu-open"
              }
              break;
            case "account":
              this.selected_nav = {
                nav_id: "account",
                class_name: "menu-open"
              }
              break;
            default:
              break;

          }
      }
    }
  }
</script>

<style scoped>

</style>