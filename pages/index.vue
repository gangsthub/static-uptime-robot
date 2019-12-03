<template>
  <section class="container m-auto">
    <div class="flex w-full jumbo justify-center items-center">
      <RobotImage/>
      <div class="card flex flex-col ml-5">
        <h1 class="mb-2">Static Uptime Robot</h1>
        <h2 class="mb-6" v-if="status">
          Currently <code>{{ URL }}</code> is
          <span class="text-green">{{ status }}</span>
        </h2>
        <p>Last checked:
          <PrettyTime :time="time"/>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import RobotImage from '~/components/RobotImage.vue';
import PrettyTime from '~/components/PrettyTime.vue';

export default {
  async asyncData({ $axios }) {
    let ping = {};
    try {
      ping = await $axios.$get('/.netlify/functions/ping');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    const { status, time, URL } = ping;
    return { status, time, URL };
  },
  components: {
    RobotImage,
    PrettyTime
  }
};
</script>

<style scoped>
.jumbo {
  min-height: 50vh;
}
</style>
