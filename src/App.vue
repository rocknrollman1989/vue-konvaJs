<template>
  <section class="vh-100">
    <component :is="typeOfComponent"/>
  </section>
</template>

<script>
import StartBildChartButton from '@/components/buttons/StartBildChartButton.vue';
import CreateChartModal from '@/components/modals/CreateChartModal.vue';
import ChartsContainer from '@/components/charts/ChartsContainer.vue';
import { rectanglesDataObject } from '@/helpers';


export default {
  name: 'app',
  data() {
    return {
     createChartProcess: false,
    };
  },
  computed: {
    typeOfComponent() {
      if (rectanglesDataObject.chartsDataArray.length) return ChartsContainer;
      if (this.createChartProcess) return CreateChartModal;
      return StartBildChartButton;
    }
  }
}
</script>

<style>

</style>
