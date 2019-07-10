<template>
  <b-container fluid>
    <b-col>
      <h1>Charts</h1>
      <RectangleChart :chart-data="chartData"/>
    
    </b-col>
  </b-container>
</template>

<script>
import { rectanglesDataObject } from '@/helpers';
import RectangleChart from './RectangleChart.vue';

export default {
  components: {
    RectangleChart,
  },
  data() {
    return {
      chartData: rectanglesDataObject,
    };
  },
}
</script>

