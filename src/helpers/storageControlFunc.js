import { rectanglesDataObject } from './index';

export let chartsStore = {};

const initChartsStore = () => {
  chartsStore = JSON.parse(localStorage.getItem('charts')) || {};
}

const getRandomNumber = () => Math.floor(Math.random()*1000); // just for example

export const saveChart = () => {
  const generatedId = generateIdForObject();
  rectanglesDataObject.id = generatedId;
  chartsStore[`rectanglesDataObject${generatedId}`] = rectanglesDataObject;
  localStorage.setItem('charts', JSON.stringify(chartsStore));
};

export const deleteAllCharts = () => {
  localStorage.removeItem('charts');
  chartsStore = {};
};

const generateIdForObject = () => {
  if (!chartsStore || !Object.keys(chartsStore).length) return getRandomNumber();
  let idToReturn = null;
  Object.keys(chartsStore).forEach((key) => {
    if(chartsStore[key].id === rectanglesDataObject.id) return idToReturn = rectanglesDataObject.id;
  })
  return idToReturn ||  getRandomNumber();
};


initChartsStore();
