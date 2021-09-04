<template>
    <v-data-table
      :headers="headers"
      :items="scores"
      :loading="loading"
      loading-text="Loading... Please wait"
      class="mb-9 v-example v-sheet v-sheet--outlined theme--light rounded"
    >
    <template v-slot:item.name="{ item }">
      {{ item.name }}
    </template>
      <template v-for="(slot, index) in slots" v-slot:[`item.${slot.value}`]="{ item }">
        <span v-if="typeof item[slot.value].score === 'number'" :key="index">
          <span :class="getScoreColor(item[slot.value].score)" class="fw-bold">
            {{ item[slot.value].score }}
          </span>
          <br>
          <span class="text-grey">
            {{ item[slot.value].submissionTime }}
          </span>
        </span>
        <span v-else :key="index">
          -
        </span>
      </template>
    </v-data-table>
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
      let headers = [...scoreboard.headers.main, ...scoreboard.headers.problems] || [];
      headers = headers.map((header) => ({ ...header, align: 'center' }));
      return headers;
    },
    loading() {
      return this.$store.getters.getLoadingStatus;
    },
  },
  methods: {
    getScoreColor(score: number) {
      const dyanmiClasses = {
        'text-green': score === 1,
        'text-red': score === 0,
      };

      return dyanmiClasses;
    },
  },
});
</script>

<style scoped>
.fw-bold {
  font-weight: bold !important;
}
.text-grey {
  color: #9e9e9e!important;
}
.text-green {
  color: #4caf50 !important;
}
.text-red {
  color: #f44336 !important;
}
</style>
