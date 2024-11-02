<script  lang="ts">
export default {
  name: 'LoadingModal',
  methods: {
    closeModal(){
      $("#loadingModal").modal("hide");
    },

    openModal(){
      $("#loadingModal").modal("show");
    }
  }
}
</script>

<template>
  <div class="modal fade" id="loadingModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close btn btn-default" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Loading....</h4>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center align-items-center flex-column">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
            <p>Loading... Please wait...</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="closeModal" class="btn btn-danger pull-left" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>