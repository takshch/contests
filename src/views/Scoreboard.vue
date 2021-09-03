<template>
    <div class="flex">
      <Score-board class="mx-auto mt-12" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Scoreboard from '@/components/Scoreboard.vue';

export default Vue.extend({
  name: 'Scoreboard',

  components: {
    'Score-board': Scoreboard,
  },
  mounted() {
    this.$store.dispatch('setScoreboard');
  },
});
</script>
