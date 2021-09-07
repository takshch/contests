<template>
  <div class="flex my-10">
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
      <CodeEditor :code="submission[0].code" />
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
        <TestCasesTable v-else :testCases="submission[0].testCases" :isLoading="isLoading">
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
    submission() {
      const id = parseInt(this.$route.params.id, 10);
      return [this.getSubmission(id)];
    },
  },
  async mounted() {
    this.$store.dispatch('setSubmission', {
      id: parseInt(this.$route.params.id, 10),
    });
  },
});
</script>
