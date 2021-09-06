<template>
  <div>
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
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { SUBMISSION_DETAILS_TABLE_HEADERS } from '../constants/table-headers';

export default Vue.extend({
  props: ['submission'],
  data() {
    return {
      headers: SUBMISSION_DETAILS_TABLE_HEADERS,
    };
  },
});
</script>
