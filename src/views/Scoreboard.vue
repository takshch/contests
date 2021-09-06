<template>
    <div class="flex">
      <div class="mx-auto">
        <template>
          <vue-skeleton-loader
            v-if="isLoading"
            type="rect"
            :width="300"
            :height="50"
            animation="wave"
          />
          <ScoreboardTable class="mx-auto mt-12"
            :scores="scores"
            :slots="slots"
            :headers="headers"
            v-else
          >
          </ScoreboardTable>
        </template>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import VueSkeletonLoader from 'skeleton-loader-vue';
import ScoreboardTable from '@/components/ScoreboardTable.vue';

export default Vue.extend({
  name: 'Scoreboard',
  components: {
    VueSkeletonLoader,
    ScoreboardTable,
  },
  computed: {
    scores() {
      let { scores } = this.$store.getters.getScoreboard;
      if (scores) {
        scores = scores.map((score) => {
          const newScore = Object.hasOwnProperty.call(score, 'problems') ? { ...score, ...score.problems } : {};
          delete newScore.problems;
          return newScore;
        });
      }
      console.log('scores', scores);
      return scores;
    },
    slots() {
      const { headers: { problems } } = this.$store.getters.getScoreboard;
      return problems;
    },
    headers() {
      const scoreboard = this.$store.getters.getScoreboard;
      let headers = scoreboard?.headers?.main && scoreboard?.headers?.problems
        ? [...scoreboard.headers.main, ...scoreboard.headers.problems] : [];
      console.log(headers);
      headers = headers.map((header) => ({ ...header, align: 'center' }));
      return headers;
    },
    isLoading() {
      return this.$store.getters.getLoadingStatus;
    },
  },
  mounted() {
    this.$store.dispatch('setScoreboard');
  },
});
</script>
