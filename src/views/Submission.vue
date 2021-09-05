<template>
  <div class="flex">
    <div class="mx-auto">
     <SubmissionDetails :isLoading="isLoading" :submission="submission">
     </SubmissionDetails>
     <br>
     <TestCasesTable :testCases="testCases" :isLoading="isLoading">
     </TestCasesTable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import SubmissionDetails from '@/components/SubmissionDetails.vue';
import TestCasesTable from '@/components/TestCasesTable.vue';

export default Vue.extend({
  components: {
    SubmissionDetails,
    TestCasesTable,
  },
  name: 'Submission',
  computed: {
    ...mapGetters(['getLoadingStatus', 'getSubmission']),
    isLoading() {
      return this.getLoadingStatus;
    },
    submission() {
      const id = parseInt(this.$route.params.id, 10);
      return [this.getSubmission(id)];
    },
    testCases() {
      return this.submission[0].testCases;
    },
  },
  mounted() {
    this.$store.dispatch('setSubmission', {
      id: parseInt(this.$route.params.id, 10),
    });
  },
});
</script>
