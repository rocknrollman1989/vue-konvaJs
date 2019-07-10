

    <template>
      <div class="chart__container">
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
              <v-rect :config="rectangle.rectConfig" :key="rectangle.id"></v-rect>
            </template>
          </v-layer>
        </v-stage>
      </div>
    </template>
    
    <script>
import { initRectangleChart } from '@/helpers';

export default {
  props: {
    chartData: Object,
  },
  data() {
    return {
      konvaInitObject: {},
    };
  },
  mounted() {
    this.konvaInitObject = { ...initRectangleChart(this.chartData) };
  }
}
</script>
    