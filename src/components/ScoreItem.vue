<template>
  <span>
    <template v-if="typeof score === 'number'">
      <tag :is="tagName" :to="routeLink">
        <span :class="getScoreColor(score)" class="fw-bold">
          {{ score }}
        </span>
        <br />
        <span class="text-grey">
          {{ submissionTime }}
        </span>
      </tag>
    </template>
    <template v-else>
      <span> - </span>
    </template>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['score', 'submissionTime', 'id'],
  computed: {
    tagName() {
      console.log(this.id);
      return typeof this.id === 'number' ? 'router-link' : 'span';
    },
    routeLink() {
      console.log(this.id);
      return typeof this.id === 'number' ? `/submission/${this.id}` : null;
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
