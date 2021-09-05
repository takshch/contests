<template>
  <div class="flex">
    <div class="mx-auto">
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
          </v-data-table>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
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
    headers() {
      return [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: 'Submitted On',
          value: 'submittedOn',
          align: 'center',
        },
        {
          text: 'Submitted By',
          value: 'name',
          align: 'center',
        },
        {
          text: 'Problem',
          value: 'problem',
          align: 'center',
        },
        {
          text: 'Language',
          value: 'language',
          align: 'center',
        },
        {
          text: 'Time',
          value: 'time',
          align: 'center',
        },
        {
          text: 'Memory',
          value: 'memory',
          align: 'center',
        },
      ];
    },
  },
  mounted() {
    this.$store.dispatch('setSubmission', {
      id: parseInt(this.$route.params.id, 10),
    });
  },
});
</script>
