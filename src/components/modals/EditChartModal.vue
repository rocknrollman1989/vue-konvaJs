<template>
  <div>
    <b-modal v-model="modalShow"
    >
      <template slot="modal-header">
        <div class="w-100" >
          <h5 class="text-center">Edit chart</h5>
        </div>
      </template>

      <template slot="default">
        <b-list-group>
          <b-list-group-item 
          v-for="(chart) in chartToEdit" 
          :key="chart.id"
          >
            <b-col>
            <label>{{chart.labelForName}}</label>
          </b-col>
          <b-col>
            <b-form-input type="text"
            :value="chart.valueName"
            v-model="chart.valueName"
            >
            </b-form-input>
          </b-col>
          <b-col>
            <label>{{chart.labelForValue}}</label>
          </b-col>
          <b-col>
            <b-form-input type="number"
            :value="chart.value"
            v-model="chart.value"
            >
            </b-form-input>
          </b-col>
          </b-list-group-item>
        </b-list-group>
      </template>

      <template slot="modal-footer">
        <b-button variant="success" @click="saveChart" class="mr-5">Save</b-button>
        <b-button variant="danger" @click="returnToMainPage">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { eventBus } from '@/helpers';
import { rectanglesDataObject } from '@/helpers';
  
  export default {
    data() {
      return {
        modalShow: false,
        chartToEdit: [],
      };
    },
    created() {
      eventBus.$on('openEditModal', (bool) => {
        this.modalShow = bool;
      });
    },
    mounted() {
      this.$root.$on('bv::modal::show', () => {
        this.chartToEdit = Object.assign([], this.chartToEdit, rectanglesDataObject.chartsDataArray);
      })
    },
    beforeDestroy() {
      this.$root.$off('bv::modal::show');
      eventBus.$off('openEditModal');
    },
    methods: {
      returnToMainPage() {
        this.modalShow = false;
      },
      saveChart() {
        rectanglesDataObject.chartsDataArray = this.chartToEdit;
        this.modalShow = false;
      }
    },
  }
</script>
