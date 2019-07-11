

    <template>
      <div class="chart__container">
      <!-- modals -->
        <div :style="`top: ${positionTop - 40}px; left: ${positionLeft + 5}px; display: ${displayInfoModal ? 'block' : 'none'}`" class="chart__container__viewInfoModal">
          <ViewChartsValueModal :enter-value-to-view="valueToView"/>
        </div>
      <!--  -->
        <v-stage :config="konvaInitRectObject.configKonva">
          <v-layer>
            <v-line :config="konvaInitRectObject.axisYline"></v-line>
            <v-line :config="konvaInitRectObject.axisXline"></v-line>
            <template v-for="(graduate) in konvaInitRectObject.graduateYlines">
              <v-line :config="graduate.graduateConfig" :key="graduate.id"></v-line>
            </template>
            <template v-for="(graduate) in konvaInitRectObject.textToGraduateYlines">
              <v-text :config="graduate.textConfig" :key="graduate.id"></v-text>
            </template>
            <template v-for="(rectangle) in konvaInitRectObject.rectangles">
              <v-rect :config="rectangle.rectConfig" :key="rectangle.id"
              @mouseover="setChartInfo(rectangle.rectConfig.inputValue)"
              @mousemove="viewChartInfo($event.evt)"
              @mouseleave="hideChartInfo"
              >
              </v-rect>
              <v-text :config="rectangle.nameConfig" :key="rectangle.id" ref="rectanglesName"></v-text>
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
      konvaInitRectObject: {},
      valueToView: null,
      displayInfoModal: false,
      positionTop: null,
      positionLeft: null, 
    };
  },
  mounted() {
    this.konvaInitRectObject = initRectangleChart(this.chartData);
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
      handler(val){
        this.konvaInitRectObject = initRectangleChart(val);
      },
      deep: true
    }
  },
};
</script>

    
  