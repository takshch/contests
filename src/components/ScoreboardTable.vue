<template>
  <v-card>
    <v-card-title>
      <v-row
        no-gutters
        class="ml-auto my-auto"
        cols="12"
        sm="4"
      >
        <v-col>
          <v-text-field
            label="Full name"
            single-line
            outlined
            v-model="search"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="scores"
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
  props: ['scores', 'slots', 'headers', 'isLoading'],
  data() {
    return {
      search: '',
    };
  },
  methods: {
    filterByName(value, search) {
      return value != null && search != null
      && typeof value === 'string' && value.toString().indexOf(search) !== -1;
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
