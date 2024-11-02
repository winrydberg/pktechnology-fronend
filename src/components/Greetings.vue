<script lang="ts">
import { useUserStore } from '@/stores/user';
import {Role} from "@/types/enums";

export default {
  data(){
    return {
      user:  useUserStore().user,
      message: ""
    }
  },
  mounted() {
    this.setMessage();
  },
  computed: {
    isAdmin() {
      return this.user.role.toUpperCase() === Role.ADMIN;
    }
  },
  methods: {
    setMessage(){
      switch (this.user.role.toUpperCase()) {
        case Role.ADMIN:
          this.message = `As an administrator, you can take following actions:
          <br> 1. Manage users,
          <br> 2. Assign work orders to Engineers,
          <br> 3. View updates on work orders and Many more`;
          break;
      }
    }
  }
};
</script>

<template>
  <div class="callout callout-success">
    <h4>Hi {{user != null ? user.name: "There"}}, Greetings</h4>

    <p>Welcome to PK Technology's order management platform. </p>
    <span v-html="message"></span>
  </div>
</template>

<style scoped>

</style>