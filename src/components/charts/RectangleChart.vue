

    <template>
      <div class="chart__container">
        <!-- modals -->
        <div :style="`top: ${positionTop - 40}px; left: ${positionLeft + 5}px; display: ${displayInfoModal ? 'block' : 'none'}`" class="chart__container__viewInfoModal">
          <ViewChartsValueModal :enter-value-to-view="valueToView"/>
        </div>
        <!--  -->
        <v-stage :config="konvaInitObject.configKonva">
          <v-layer>
            <v-line :config="konvaInitObject.axisYline"></v-line>
            <v-line :config="konvaInitObject.axisXline"></v-line>
            <template v-for="(graduate) in konvaInitObject.graduateYlines">
              <v-line :config="graduate.graduateConfig" :key="graduate.id"></v-line>
            </template>
            <template v-for="(graduate) in konvaInitObject.textToGraduateYlines">
              <v-text :config="graduate.textConfig" :key="graduate.id"></v-text>
            </template>
            <template v-for="(rectangle) in konvaInitObject.rectangles">
              <v-rect :config="rectangle.rectConfig" :key="rectangle.id"
              @mouseover="setChartInfo(rectangle.rectConfig.inputValue)"
              @mousemove="viewChartInfo($event.evt)"
              @mouseleave="hideChartInfo"
              ></v-rect>
            </template>
          </v-layer>
        </v-stage> 
      </div>
    </template>
    
<script>
import { initRectangleChart } from '@/helpers';
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
      konvaInitObject: {},
      valueToView: 12345,
      displayInfoModal: false,
      positionTop: null,
      positionLeft: null, 
    };
  },
  mounted() {
    this.konvaInitObject = { ...initRectangleChart(this.chartData) };
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
};
</script>

<style lang="scss" scoped>
.chart__container {
  position: relative;

  &__viewInfoModal {
    position: absolute;
    z-index: 100;
  }
}
</style>

    
  