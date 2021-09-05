<template>
    <div class="flex">
      <ScoreboardTable class="mx-auto mt-12"
        :scores="scores"
        :slots="slots"
        :headers="headers"
        :isLoading="isLoading"
      >
      </ScoreboardTable>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ScoreboardTable from '@/components/ScoreboardTable.vue';

export default Vue.extend({
  name: 'Scoreboard',
  components: {
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
