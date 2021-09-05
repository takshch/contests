<template>
  <div>
    <template v-if="isLoading">
      <v-skeleton-loader
        class=""
        min-width="300"
        max-width="1000"
        type="card"
      ></v-skeleton-loader>
    </template>
    <template v-else>
      <v-card>
        <v-card-title>Submission: {{ submission.id }}</v-card-title>
        <v-data-table
          :headers="headers"
          :items="submission"
          hide-default-footer
          disable-sort
        >
          <template v-slot:item.problem="{ item }">
            <a :href="item.problem.link" class="underline">
              {{ item.problem.text }}
            </a>
          </template>
          <template v-slot:item.status="{ item }">
            <span :href="item.problem.link" class="text-green">
              {{ item.status ? 'Correct Answer' : 'Wrong Answer'}}
            </span>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { SUBMISSION_DETAILS_TABLE_HEADERS } from '../constants/table-headers';

export default Vue.extend({
  props: ['submission', 'isLoading'],
  data() {
    return {
      headers: SUBMISSION_DETAILS_TABLE_HEADERS,
    };
  },
});
</script>
