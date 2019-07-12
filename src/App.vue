<template>
  <section class="vh-100">
    <component :is="typeOfComponent"/>
  </section>
</template>

<script>
import ChartsPage from '@/views/ChartsPage.vue';
import StartPage from '@/views/StartPage.vue';
import CreateChartModal from '@/components/modals/CreateChartModal.vue';
import { rectanglesDataObject, eventBus, } from '@/helpers';
import { deleteAllCharts } from '@/helpers/storageControlFunc';


export default {
  name: 'app',
  data() {
    return {
      createChartProcess: false,
      isLoadingData: false,

    };
  },
  created() {
    eventBus.$on('chartProcess', process => {
      this.createChartProcess = process;
    });
    eventBus.$on('deleteAllCharts', () => {
      deleteAllCharts();
    });
    eventBus.$on('loadChart', (chart) => {
      rectanglesDataObject.id = chart.id;
      rectanglesDataObject.chartsDataArray = chart.chartsDataArray;
      rectanglesDataObject.amountOfRectangles = chart.amountOfRectangles;
      this.isLoadingData = true;
      this.isLoadingData = false;
    })
  },
  beforeDestroy() {
    eventBus.$off('chartProcess');
    eventBus.$off('deleteAllCharts');
    eventBus.$off('loadChart');
  },
  computed: {
    typeOfComponent() {
      if (this.createChartProcess) return CreateChartModal;
      if (this.isLoadingData) return ChartsPage;
      if (rectanglesDataObject.chartsDataArray && rectanglesDataObject.chartsDataArray.length) return ChartsPage;
      return StartPage;
    }
  }
}
</script>