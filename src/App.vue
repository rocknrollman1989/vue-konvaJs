<template>
  <section class="vh-100">
    <component :is="typeOfComponent"/>
  </section>
</template>

<script>
import ChartsPage from '@/views/ChartsPage.vue';
import StartPage from '@/views/StartPage.vue';
import CreateChartModal from '@/components/modals/CreateChartModal.vue';
import { rectanglesDataObject, eventBus } from '@/helpers';


export default {
  name: 'app',
  data() {
    return {
      createChartProcess: false,
    };
  },
  created() {
    eventBus.$on('chartProcess', process => {
      this.createChartProcess = process;
    })
  },
  computed: {
    typeOfComponent() {
      if (this.createChartProcess) return CreateChartModal;
      if (rectanglesDataObject.chartsDataArray && rectanglesDataObject.chartsDataArray.length) return ChartsPage;
      return StartPage;
    }
  }
}
</script>