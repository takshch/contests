<template>
  <v-card>
    <v-card-title>Test Cases</v-card-title>
    <v-data-table
      :headers="headers"
      :items="testCases"
      :loading="isLoading"
    >
      <template v-slot:item.status="{ item }">
        <span class="text-green">
          {{ item.status ? 'Correct Answer' : 'Wrong Answer' }}
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { TEST_CASES_TABLE_HEADERS } from '../constants/table-headers';

export default Vue.extend({
  props: ['testCases'],
  data() {
    return {
      headers: TEST_CASES_TABLE_HEADERS,
    };
  },
});
</script>
