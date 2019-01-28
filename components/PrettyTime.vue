<template>
  <span :title="time">
    {{ computedTime }}
  </span>
</template>
<script>
import { formatDistance } from 'date-fns';
export default {
  name: 'Time',
  props: {
    time: {
      type: String,
      default: ''
    },
    fallbackString: {
      type: String,
      default: ''
    }
  },
  computed: {
    rn() {
      return new Date();
    },
    computedTime() {
      if (this.time) {
        const builtDate = new Date(this.time);
        return formatDistance(builtDate, this.rn);
      }
      return this.fallbackString || 'On last deploy';
    }
  }
};
</script>
