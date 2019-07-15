<template>
  <div style="height: 100vh" class="w-100" ref="konvaContainer" id="konva__container">
    
  </div>
</template>

<script>
import { createPedigreeByConva } from '@/helpers/generateFamilyObject';

export default {
  data() {
    return {
    };
  },
  mounted() {
    const { konvaContainer } = this.$refs;
    createPedigreeByConva(konvaContainer);
  }
}
</script>
