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
          <b-list-group-item v-for="chart in chartsStore" :key="chart.id">{{chartsStore}}</b-list-group-item>
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
        console.log("!!!", chartsStore)
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
    },
  }
</script>