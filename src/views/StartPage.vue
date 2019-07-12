<template>
  <b-container fluid class="h-50">
    <div class="d-flex flex-column justify-content-center align-items-center h-100" >
      <b-button variant="success" @click="createNewChart" class="mb-5">Create new Chart</b-button>
      <b-button variant="danger" @click="deleteAllCharts">Delete all charts</b-button>
    </div>
    <diV>
      <h3>Your charts:</h3>
      <b-list-group>
        <b-list-group-item 
        v-for="(chart, key, index) in chartsStore" 
        :key="key"
        class="chart__list"
        @click="loadChart(chart)"
        >
          <span>{{index + 1}}.</span>
          {{key}}
        </b-list-group-item>
      </b-list-group>
    </diV>
  </b-container>
</template>

<script>
import { eventBus, rectanglesDataObject } from '@/helpers';
import { chartsStore } from '@/helpers/storageControlFunc';


  export default {
    data() {
      return {
        chartsStore: null,
      };
    },
    mounted() {
      this.chartsStore = chartsStore;
    },
    methods: {
      createNewChart() {
        eventBus.$emit('chartProcess', true)
      },
      deleteAllCharts() {
        eventBus.$emit('deleteAllCharts');
      },
      loadChart(chart) {
        eventBus.$emit('loadChart', chart);
      }
    },
  };
</script>

