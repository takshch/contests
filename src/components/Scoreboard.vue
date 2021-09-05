<template>
  <v-card>
    <v-card>
      <v-col
        class="ml-auto my-auto"
        cols="12"
        sm="6"
        md="3"
      >
        <v-row>
          <v-text-field
            label="Full name"
            single-line
            outlined
            v-model="search"
          >
          </v-text-field>
        </v-row>
      </v-col>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="scores"
      :loading="loading"
      loading-text="Loading... Please wait"
      class="mb-9 v-example v-sheet v-sheet--outlined theme--light rounded"
      :search="search"
      :custom-filter="filterByName"
    >
      <template v-slot:item.score="{ item }">
        <span>
          <span
            v-if="typeof item.score === 'number'"
            class="fw-bold"
          >
            {{ item.score }}
          </span>
          <br>
          <span v-if="typeof item.totalTime === 'string'" class="text-grey">
            {{ item.totalTime }}
          </span>
        </span>
      </template>
    <template v-slot:item.name="{ item }">
      {{ item.name }}
    </template>
      <template v-for="(slot, index) in slots" v-slot:[`item.${slot.value}`]="{ item }">
        <ScoreItem
          :key="index"
          :score="item[slot.value].score"
          :id="item[slot.value].id"
          :submissionTime="item[slot.value].submissionTime"
        >
        </ScoreItem>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import ScoreItem from '@/components/ScoreItem.vue';

export default Vue.extend({
  components: {
    ScoreItem,
  },
  name: 'Scoreboard',
  data() {
    return {
      search: '',
    };
  },
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
    isLoading() {
      return this.$store.getters.getLoadingStatus;
    },
  },
  methods: {
    filterByName(value, search, item) {
      return value != null && search != null
      && typeof value === 'string' && value.toString().toLowerCase().indexOf(search) !== -1;
    },
  },
});
</script>

<style>
.fw-bold {
  font-weight: bold !important;
}
.text-grey {
  color: #9e9e9e !important;
}
.text-green {
  color: #4caf50 !important;
}
.text-red {
  color: #f44336 !important;
}
</style>
