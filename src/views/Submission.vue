<template>
  <div class="flex">
    <div class="mx-auto">
      <template>
        <v-skeleton-loader
            class="loader-list-item my-5"
            min-width="300"
            max-width="1000"
            min-height="80"
            type="list-item"
            v-if="isLoading"
          ></v-skeleton-loader>
        <SubmissionDetails v-else :submission="submission">
        </SubmissionDetails>
      </template>
      <br>
      <CodeEditor :code="code" />
      <br>
      <template>
        <v-skeleton-loader
          class="loader-list-item"
          min-width="300"
          max-width="1000"
          min-height="80"
          type="list-item"
          v-if="isLoading"
        ></v-skeleton-loader>
        <TestCasesTable v-else :testCases="testCases" :isLoading="isLoading">
        </TestCasesTable>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import SubmissionDetails from '@/components/SubmissionDetails.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import TestCasesTable from '@/components/TestCasesTable.vue';

export default Vue.extend({
  components: {
    SubmissionDetails,
    CodeEditor,
    TestCasesTable,
  },
  name: 'Submission',
  computed: {
    ...mapGetters(['getLoadingStatus', 'getSubmission']),
    isLoading() {
      return this.getLoadingStatus;
    },
    code() {
      return this.submission[0].code;
    },
    submission() {
      const id = parseInt(this.$route.params.id, 10);
      return [this.getSubmission(id)];
    },
    testCases() {
      return this.submission[0].testCases;
    },
  },
  async mounted() {
    this.$store.dispatch('setSubmission', {
      id: parseInt(this.$route.params.id, 10),
    });
  },
});
</script>
