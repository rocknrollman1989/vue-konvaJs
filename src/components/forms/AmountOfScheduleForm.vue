<template>
  <b-container fluid>
    <b-col>
      <label>Enter amount of rectangles:</label>
    </b-col>
    <b-col>
      <b-form-input type="number" @input="$emit('input', $event)"
      :value="amountOfRectangles"
      >
      </b-form-input>
    </b-col>
  </b-container>
</template>

<script>
export default {
  props: {
    amountOfRectangles: Number,
  },
};
</script>

