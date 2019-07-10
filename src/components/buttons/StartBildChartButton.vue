<template>
  <b-container fluid class="h-100">
    <div class="d-flex justify-content-center align-items-center h-100" >
      <b-button variant="success" @click="createNewChart">Create new Chart</b-button>
    </div>
  </b-container>
</template>

<script>
  export default {
    methods: {
      createNewChart() {
        this.$parent.createChartProcess = true;
      },
    },
  };
</script>
