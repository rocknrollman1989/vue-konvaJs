<template>
  <b-container fluid class="h-50">
    <div class="d-flex flex-column justify-content-center align-items-center h-100" >
      <b-button variant="primary" @click="openPedigreeTree" class="mb-5">Open pedigree tree</b-button>
      <b-button variant="success" @click="createNewChart" class="mb-5">Create new Chart</b-button>
      <b-button variant="danger" @click="deleteAllCharts">Delete all charts</b-button>
    </div>
    <diV v-if="Object.keys(chartsStore).length">
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
import { eventBus } from '@/helpers';
import { chartsStore } from '@/helpers/storageControlFunc';


  export default {
    data() {
      return {
        chartsStore: {},
      };
    },
    mounted() {
      if (Object.keys(chartsStore).length) this.chartsStore = chartsStore;
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
      },
      openPedigreeTree() {
        eventBus.$emit('openPedigreeTree');
      }
    },
  };
</script>

