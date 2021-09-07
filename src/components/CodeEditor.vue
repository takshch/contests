<template>
  <v-card>
    <v-card-title>
      Code:
      <v-spacer />
      <v-btn
        elevation="2"
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
  props: ['code'],
  mounted() {
    CodeMirror(document.getElementById('code-editor'), {
      lineNumbers: true,
      readOnly: true,
      mode: 'text/x-csrc',
      value: this.code,
    });
  },
});
</script>
