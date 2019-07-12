<template>
  <b-container fluid>
    <!-- modals -->
    <charts-list-to-load/>
    <!--  -->
    <header-section></header-section>
    <charts-container></charts-container>
  </b-container>
</template>

<script>
import ChartsContainer from '@/components/charts/ChartsContainer.vue';
import HeaderSection from '@/components/header/HeaderSection.vue';
import ChartsListToLoad from '@/components/modals/ChartsListToLoad.vue';

export default {
  components: {
    ChartsContainer,
    HeaderSection,
    ChartsListToLoad,
  },
};
</script>

