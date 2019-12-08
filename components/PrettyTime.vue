<template>
  <time :title="time">
    {{ computedTime }} ago.
  </time>
</template>
<script>
import { formatDistance } from 'date-fns';

const INTERVAL = 5000;

export default {
  name: 'Time',
  props: {
    time: {
      type: String,
      default: () => new Date().toLocaleString()
    }
  },
  data() {
    return {
      rn: new Date()
    };
  },
  computed: {
    builtDate() {
      return new Date(this.time);
    },
    computedTime() {
      return formatDistance(this.builtDate, this.rn);
    }
  },
  created() {
    setInterval(() => {
      this.rn = new Date();
    }, INTERVAL);
  }
};
</script>
