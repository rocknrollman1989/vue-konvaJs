<template>
  <header style="background-color: #eee;" class="p-2 d-flex flex-row justify-content-around">
    <b-button variant="primary" @click="saveChartToStorage">Save my chart</b-button>
    <b-button variant="success" @click="editMyChart">Edit my chart</b-button>
    <b-button variant="primary" @click="openModalToLoad">Load another chart</b-button>
    <b-button variant="primary" @click="createNewChart">Create a new chart</b-button>
    <b-button variant="danger" @click="deleteAllCharts">Delete all charts</b-button>
  </header>
</template>

<script>
import { saveChart } from '@/helpers/storageControlFunc';
import { rectanglesDataObject, eventBus } from '@/helpers';

export default {
  methods: {
    saveChartToStorage() {
      saveChart();
    },
    createNewChart() {
      saveChart();
      rectanglesDataObject.amountOfRectangles = null;
      rectanglesDataObject.chartsDataArray = [];
      delete rectanglesDataObject.id;
      eventBus.$emit('chartProcess', true);
    },
    openModalToLoad() {
      eventBus.$emit('openLoadModal', true);
    },
    deleteAllCharts() {
      eventBus.$emit('deleteAllCharts');
    },
    editMyChart() {
      eventBus.$emit('openEditModal', true);
    },
  },
};
</script>
