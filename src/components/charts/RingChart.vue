<template>
  <div class="chart__container">
    <!-- modals -->
      <div :style="`top: ${positionTop - 40}px; left: ${positionLeft + 5}px; display: ${displayInfoModal ? 'block' : 'none'}`" class="chart__container__viewInfoModal">
        <ViewChartsValueModal :enter-value-to-view="valueToView"/>
      </div>
    <!--  -->

    <v-stage :config="konvaInitRingObject.configKonva">
      <v-layer>
        <template v-for="(ring) in konvaInitRingObject.rings">
          <v-arc :config="ring.ringConfig" :key="ring.id"
          @mouseover="setChartInfo(ring.ringConfig.inputValue)"
          @mousemove="viewChartInfo($event.evt)"
          @mouseleave="hideChartInfo"
          ></v-arc>
        </template>
      </v-layer>
    </v-stage> 
  </div>
</template>

<script>
import { initRingChart } from '@/helpers';
import ViewChartsValueModal from '@/components/modals/ViewChartsValueModal.vue';

export default {
  components: {
    ViewChartsValueModal,
  },
  props: {
    chartData: Object,
  },
  data() {
    return {
      konvaInitRingObject: {},
      valueToView: null,
      displayInfoModal: false,
      positionTop: null,
      positionLeft: null, 
    };
  },
  mounted() {
    this.konvaInitRingObject = initRingChart(this.chartData);
  },
  methods: {
    viewChartInfo(e) {
      this.displayInfoModal = true;
      this.positionTop = e.offsetY;
      this.positionLeft = e.offsetX;
    },
    setChartInfo(value) {
      this.valueToView = value;
    },
    hideChartInfo() {
      this.displayInfoModal = false;
    },
  },
  watch: {
    chartData: {
      handler(){
       this.konvaInitRingObject = initRingChart(this.chartData);
      },
      deep: true
    }
  },
};
</script>
