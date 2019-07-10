<template>
  <section class="vh-100">
    <component :is="typeOfComponent"/>
  </section>
</template>

<script>
import StartBildScheduleButton from '@/components/buttons/StartBildScheduleButton.vue';
import CreateScheduleModal from '@/components/modals/CreateScheduleModal.vue';
import SchedulesContainer from '@/components/schedules/SchedulesContainer.vue';
import { rectanglesDataObject } from '@/helpers';


export default {
  name: 'app',
  data() {
    return {
     createScheduleProcess: false,
    };
  },
  computed: {
    typeOfComponent() {
      if (rectanglesDataObject.chartsDataArray.length) return SchedulesContainer;
      if (this.createScheduleProcess) return CreateScheduleModal;
      return StartBildScheduleButton;
    }
  }
}
</script>

<style>

</style>
