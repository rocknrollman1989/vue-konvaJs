<template>
  <b-container fluid>
    <b-col class="d-flex flex-column align-items-center">
      <h1>Charts</h1>
      <RectangleChart :chart-data="chartData"/>
      <RingChart :chart-data="chartData"/>
    </b-col>
  </b-container>
</template>

<script>
import { rectanglesDataObject } from '@/helpers';
import RectangleChart from './RectangleChart.vue';
import RingChart from './RingChart.vue';

export default {
  components: {
    RectangleChart,
    RingChart,
  },
  data() {
    return {
      chartData: null,
    };
  },
  created() {
    this.chartData = rectanglesDataObject;
  },
}
</script>

