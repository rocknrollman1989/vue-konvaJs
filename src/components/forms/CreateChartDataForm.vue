<template>
  <b-container fluid>
    <b-col v-for="rectangle in  chartsDataArray" :key="rectangle.id">
      <b-list-group>
        <b-list-group-item>
          <b-col>
            <label>{{rectangle.labelForName}}</label>
          </b-col>
          <b-col>
            <b-form-input type="text" @input="setName($event, rectangle)"
            :value="rectangle.valueName"
            >
            </b-form-input>
          </b-col>
          <b-col>
            <label>{{rectangle.labelForValue}}</label>
          </b-col>
          <b-col>
            <b-form-input type="number" @input="setData($event, rectangle)"
            :value="rectangle.value"
            >
            </b-form-input>
          </b-col>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-container>
</template>

<script>
import { dynamicColors } from '@/helpers';

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
            labelForValue: `Enter value rectangle`,
            value: Math.floor(Math.random()*100),
            labelForName: `Enter rectangle name`,
            valueName: `Rectangle №${i+1}`,
            chartElementColor: dynamicColors(),
          })
    }
  },
  methods: {
    setData(value, rectangle) {
      rectangle.value = Number(value);
    },
    setName(value, rectangle) {
      rectangle.valueName = value;
    },
  },
};
</script>

