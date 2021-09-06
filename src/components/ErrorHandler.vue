<template>
<v-snackbar
    v-if="errorMessage && errorMessage !== ''"
    :timeout="10000"
    :value="true"
    absolute
    centerred
    centered
  >
    {{ errorMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="disableSnackbar"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'ErrorHandler',
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
