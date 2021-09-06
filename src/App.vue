<template>
  <v-app>
    <v-main>
      <router-view/>
      <ErrorHandler />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default Vue.extend({
  name: 'App',
  components: {
    ErrorHandler,
  },
  computed: {
    ...mapGetters(['getErrorMessage']),
    errorMessage() {
      return this.getErrorMessage;
    },
  },
  methods: {
    disableSnackbar() {
      this.$store.commit('setErrorMessage', '');
    },
  },
});
</script>
