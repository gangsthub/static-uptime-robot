<template>
  <section class="container m-auto">
    <div class="flex w-full jumbo justify-center items-center">
      <RobotImage/>
      <div class="card flex flex-col ml-5">
        <h1 class="mb-2">Static Uptime Robot</h1>
        <h2 class="mb-6">
          Currently your site is
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
import RobotImage from '~/components/RobotImage.vue'
import PrettyTime from '~/components/PrettyTime.vue'

export default {
  computed: {
    status() {
      return 'Up!'
    },
    time() {
      return new Date().toString()
    }
  },
  components: {
    RobotImage,
    PrettyTime
  }
}
</script>

<style scoped>
.jumbo {
  min-height: 50vh;
}
</style>
