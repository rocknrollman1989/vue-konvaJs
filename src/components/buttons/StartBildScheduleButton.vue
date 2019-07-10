<template>
  <b-container fluid class="h-100">
    <div class="d-flex justify-content-center align-items-center h-100" >
      <b-button variant="success" @click="createNewSchedule">Create new schedule</b-button>
    </div>
  </b-container>
</template>

<script>
  export default {
    methods: {
      createNewSchedule() {
        this.$parent.createScheduleProcess = true;
      },
    },
  };
</script>
