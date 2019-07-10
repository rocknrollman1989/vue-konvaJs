<template>
  <b-container fluid>
    <b-col v-for="rectangle in  chartsDataArray" :key="rectangle.id">
      <b-col>
        <label>{{rectangle.label}}</label>
      </b-col>
      <b-col>
        <b-form-input type="number" @input="setData($event, rectangle)"
        :value="rectangle.value"
        >
        </b-form-input>
      </b-col>
    </b-col>
  </b-container>
</template>

<script>
export default {
  props: {
    amountOfRectangles: Number,
  },
  data() {
    return {
      chartsDataArray: [],
    };
  },
  mounted() {
    const { amountOfRectangles } = this;
    for (let i=0; i < amountOfRectangles; i++) {
          this.chartsDataArray.push({
            id: i,
            label: `Enter value for ${i+1} rectangle`,
            value: Math.floor(Math.random()*100),
          })
    }
  },
  methods: {
    setData(value, rectangle) {
      rectangle.value = value;
    },
  },
};
</script>

