<script setup lang="ts">

</script>

<template>
  <div class="box box-info box-height" >
    <div class="box-header with-border">
      <h3 class="box-title">Work Order Completion Ranking</h3>

      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
      </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <p><i class="fa fa-info-circle"></i> Top 10 Ranking Of Engineers With Highest Completion Rate</p>
      <div class="table-responsive">
        <table class="table table-striped text-nowrap table-bordered">
          <thead>
          <tr>
            <th>#ID</th>
            <th>User Code</th>
            <th>User Name</th>
            <th>Orders Completed</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>1000</td>
            <td>
              <div class="sparkbar" data-color="#00a65a" data-height="20">Edwin Senunyeme</div>
            </td>
            <td>100</td>
            <td>
              <button class="btn btn-primary btn-sm" data-widget="collapse"><i class="fa fa-times"></i> Details</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>1001</td>
            <td>
              <div class="sparkbar" data-color="#f39c12" data-height="20">John Doe</div>
            </td>
            <td>90</td>
            <td>
              <button class="btn btn-primary btn-sm" data-widget="collapse"><i class="fa fa-times"></i> Details</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>1002</td>
            <td>
              <div class="sparkbar" data-color="#f56954" data-height="20">Jane Doe</div>
            </td>
            <td>50</td>
            <td>
              <button class="btn btn-primary btn-sm" data-widget="collapse"><i class="fa fa-times"></i> Details</button>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
      <!-- /.table-responsive -->
    </div>
    <!-- /.box-footer -->
  </div>
</template>

<style scoped>

</style>