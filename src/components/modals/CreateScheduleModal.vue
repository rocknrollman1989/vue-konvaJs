<template>
  <div>
    <b-modal v-model="modalShow"
    >
      <template slot="modal-header">
        <div class="w-100" >
          <h5 class="text-center">Add schedule info</h5>
        </div>
      </template>

      <template slot="default">
        <AmountOfScheduleForm v-if="slotsParams.isAmountOfRectangles"  v-on:input="getInputValue" :amount-of-rectangles="amountOfRectangles"/>
        <CreateScheduleDataForm v-if="slotsParams.isInterestedParams" :amount-of-rectangles="amountOfRectangles" ref="scheduleDataForm"/>
      </template>

      <template slot="modal-footer">
        <b-button variant="success" @click="saveScheduleInfo">Ok</b-button>
        <b-button variant="danger" @click="returnToMainPage">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import AmountOfScheduleForm from '@/components/forms/AmountOfScheduleForm.vue';
import CreateScheduleDataForm from '@/components/forms/CreateScheduleDataForm.vue'
import { rectanglesDataObject } from '@/helpers';
  
  export default {
    components: {
      AmountOfScheduleForm,
      CreateScheduleDataForm,
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
        setTimeout(() => this.$parent.createScheduleProcess = false, 500);
      },
      getInputValue(value) {
        if (this.isAmountOfRectangles) return this.amountOfRectangles = value;
      },
      saveScheduleInfo() {
        const { slotsParams } = this;
        if (slotsParams.isInterestedParams) { 
          rectanglesDataObject.amountOfRectangles = this.amountOfRectangles;
          rectanglesDataObject.chartsDataArray = [...this.$refs.scheduleDataForm.chartsDataArray];
          this.modalShow = false;
          setTimeout(() => this.$parent.createScheduleProcess = false, 500);
          return;
        }
        slotsParams.isAmountOfRectangles = false;
        slotsParams.isInterestedParams = true;
      },
    }
  }
</script>