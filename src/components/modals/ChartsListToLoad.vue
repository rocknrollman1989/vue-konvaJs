<template>
  <div>
    <b-modal v-model="modalShow"
    >
      <template slot="modal-header">
        <div class="w-100" >
          <h5 class="text-center">Load your's charts</h5>
        </div>
      </template>

      <template slot="default">
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
      </template>

      <template slot="modal-footer">
        <b-button variant="danger" @click="returnToMainPage">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { rectanglesDataObject, eventBus } from '@/helpers';
import { chartsStore } from '@/helpers/storageControlFunc';
  
  export default {
    data() {
      return {
        modalShow: false,
        chartsStore: null,
      };
    },
    created() {
      eventBus.$on('openLoadModal', (bool) => {
        this.modalShow = bool
      });
    },
    mounted() {
      this.$root.$on('bv::modal::show', () => {
        this.chartsStore = chartsStore;
      })
    },
    beforeMount() {
      this.$root.$off('bv::modal::show');
    },
    methods: {
      returnToMainPage() {
        this.modalShow = false;
      },
      loadChart(chart) {
        rectanglesDataObject.id = chart.id;
        rectanglesDataObject.chartsDataArray = chart.chartsDataArray;
        rectanglesDataObject.amountOfRectangles = chart.amountOfRectangles;
        this.modalShow = false;
      }
    },
  }
</script>

<style>
 .chart__list:hover {
   background: #c9c4c633;
   cursor: pointer;
 }
</style>
