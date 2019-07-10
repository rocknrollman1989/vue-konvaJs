<template>
  <b-container fluid>
    <b-col>
      <h1>Charts</h1>
      <RectangleSchedule :chart-data="chartData"/>
    
    </b-col>
  </b-container>
</template>

<script>
import { rectanglesDataObject } from '@/helpers';
import RectangleSchedule from './RectangleSchedule.vue';

export default {
  components: {
    RectangleSchedule,
  },
  data() {
    return {
      chartData: rectanglesDataObject,
    };
  },
}
</script>

