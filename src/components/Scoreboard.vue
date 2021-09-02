<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="scores"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-for="(slot, index) in slots" v-slot:[`item.${slot.value}`]="{ item }">
         <span :color="getScoreColor(slot.value)" :key="index">
            {{ item[slot.value].score }}
          </span>
          <br :key="index">
          <span :key="index">
            {{ item[slot.value].submissionTime }}
          </span>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Scoreboard',
  computed: {
    scores() {
      let { scores } = this.$store.getters.getScoreboard;
      scores = scores.map((score) => {
        const newScore = { ...score, ...score.problems };
        delete newScore.problems;
        return newScore;
      });
      return scores;
    },
    slots() {
      const { headers: { problems } } = this.$store.getters.getScoreboard;
      return problems;
    },
    headers() {
      const scoreboard = this.$store.getters.getScoreboard;
      return [...scoreboard.headers.main, ...scoreboard.headers.problems] || [];
    },
    loading() {
      return this.$store.getters.getLoadingStatus;
    },
  },
  methods: {
    getVSlotName(value) {
      console.log(value);
      return `item.${value}`;
    },
    getScoreColor(score: number) {
      let color;
      if (score === 1) {
        color = 'green';
      } else if (score === 0) {
        color = 'red';
      }

      return color;
    },
  },
});
</script>
