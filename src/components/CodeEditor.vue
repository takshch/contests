<template>
  <v-card>
    <v-card-title>
      Code:
      <v-spacer />
      <v-btn
        elevation="2"
        @click="copyCode"
      >
      Copy
      </v-btn>
    </v-card-title>
    <div id="code-editor"></div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';

export default Vue.extend({
  props: {
    code: {
      type: String,
      default: () => '/*Here is your code...*/',
      required: true,
    },
  },
  mounted() {
    CodeMirror(document.getElementById('code-editor'), {
      lineNumbers: true,
      readOnly: true,
      mode: 'text/x-csrc',
      value: this.code,
    });
  },
  methods: {
    async copyCode() {
      await navigator.clipboard.writeText(this.code);
    },
  },
});
</script>
