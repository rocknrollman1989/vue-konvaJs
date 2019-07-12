<template>
  <div>
    <b-modal v-model="modalShow"
    >
      <template slot="modal-header">
        <div class="w-100" >
          <h5 class="text-center">Add chart info</h5>
        </div>
      </template>

      <template slot="default">
        <AmountOfChartForm v-if="slotsParams.isAmountOfRectangles"  v-on:input="getInputValue" :amount-of-rectangles="amountOfRectangles"/>
        <CreateChartDataForm v-if="slotsParams.isInterestedParams" :amount-of-rectangles="amountOfRectangles" ref="chartDataForm"/>
      </template>

      <template slot="modal-footer">
        <b-button variant="success" @click="saveChartInfo">Ok</b-button>
        <b-button variant="danger" @click="returnToMainPage">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import AmountOfChartForm from '@/components/forms/AmountOfChartForm.vue';
import CreateChartDataForm from '@/components/forms/CreateChartDataForm.vue'
import { rectanglesDataObject, eventBus } from '@/helpers';
  
  export default {
    components: {
      AmountOfChartForm,
      CreateChartDataForm,
    },
    data() {
      return {
        modalShow: true,
        slotsParams: {
          isAmountOfRectangles: true,
          isInterestedParams: null,
        },
        amountOfRectangles: 4,
      };
    },
    methods: {
      returnToMainPage() {
        const { slotsParams } = this;
        this.modalShow = false;
        this.amountOfRectangles = 4;
        slotsParams.isAmountOfRectangles = true;
        slotsParams.isInterestedParams = false;
        setTimeout(() => eventBus.$emit('chartProcess', false), 500);
      },
      getInputValue(value) {
        const { isAmountOfRectangles } = this.slotsParams;
        if (isAmountOfRectangles) return this.amountOfRectangles = value;
      },
      saveChartInfo() {
        const { slotsParams } = this;
        if (slotsParams.isInterestedParams) { 
          rectanglesDataObject.amountOfRectangles = this.amountOfRectangles;
          rectanglesDataObject.chartsDataArray = [...this.$refs.chartDataForm.chartsDataArray];
          this.modalShow = false;
          setTimeout(() => eventBus.$emit('chartProcess', false), 500);
          return;
        }
        slotsParams.isAmountOfRectangles = false;
        slotsParams.isInterestedParams = true;
      },
    }
  }
</script>