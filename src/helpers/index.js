import Vue from 'vue';


export let rectanglesDataObject = {
  amountOfRectangles: null,
  chartsDataArray: [],
}

export const eventBus = new Vue();


const indentForDividingLine = 25;
const linesColor = '#212529';
const actualChartWidth = window.innerWidth/2;
const actualChartHeight = window.innerHeight/2;
const dividingLineWidth = 2;
const amountOfGraduateLinesForRectangleOnYAxis = 10;
const graduateFontSize = 14;
const distanceBetweenGraduateLinesOnYAxis = actualChartHeight / amountOfGraduateLinesForRectangleOnYAxis;
const innerRadiusForRingChart = 50;
const ringСircumference = 2*3.14*innerRadiusForRingChart;
const ringMaxRadius = actualChartHeight / 2;

const axisYlinePosition = [indentForDividingLine, 0, indentForDividingLine, actualChartHeight - indentForDividingLine];
const axisXlinePosition = [indentForDividingLine, actualChartHeight - indentForDividingLine,  actualChartWidth - indentForDividingLine, actualChartHeight - indentForDividingLine];


const axisYGraduateLinesPosition = (i) => {
  return [indentForDividingLine-2, ((actualChartHeight - indentForDividingLine) - (distanceBetweenGraduateLinesOnYAxis * i)), indentForDividingLine + 2, ((actualChartHeight - indentForDividingLine) - (distanceBetweenGraduateLinesOnYAxis * i))]
}

const getDataLongForBuildAngle = (dataArray) => {
  let circleLong = 0;
  dataArray.forEach((data) => {
    circleLong += data.value;
  })
  return circleLong;
}

export const dynamicColors = () => {
  const generateColor = () => Math.round(Math.random() * 255);
  return `rgb(${generateColor()},${generateColor()},${generateColor()})`;
};

const getCoefficientOfGraduateSteps = (chartsDataArray) => {
  let coefficientOfGraduateSteps = 1;
  let numberOfDigits = 1;
  chartsDataArray.forEach((dataElem) => {
    if (`${dataElem.value}`.length > numberOfDigits) {
      coefficientOfGraduateSteps = 1;
      for (let i = 0; i < `${dataElem.value}`.length - 1; i++) {
        coefficientOfGraduateSteps = `${coefficientOfGraduateSteps}` + '0';
      }
      numberOfDigits = `${dataElem.value}`.length;
      coefficientOfGraduateSteps = +coefficientOfGraduateSteps;
    }
  }) 
  return coefficientOfGraduateSteps;
}

const getProportionToScaleChart = (value, coefficientOfGraduateSteps) => {
  const proportion = Number((value * 10) / coefficientOfGraduateSteps); 
  const realHeight = (actualChartHeight) * proportion / 100;
  return Number(Math.round(realHeight));
} 

const getProportionToScaleRingChart = (value, maxDataValue) => {
  const differenceBetweenRad = ringMaxRadius - innerRadiusForRingChart;
  const persentOfCommonPlaceForViewValue = Math.round((value * 100) / maxDataValue);
  let chartFieldRadius = Math.floor(((differenceBetweenRad * persentOfCommonPlaceForViewValue) / 100) + 50);
  chartFieldRadius > ringMaxRadius ? chartFieldRadius = ringMaxRadius : null ;
  return chartFieldRadius;
}

const getMaxDataValue = (array) => {
  let maxValue = 0;
  array.forEach((data) => {
    if (data.value > maxValue) maxValue = data.value;
  })
  return maxValue;
}

const getAnimatedChartHeigh = (rect, neededRectHeight, timerToPaint) => {
  if(rect.height == neededRectHeight) clearInterval(timerToPaint);
  rect.height -= 1
}

const getAngle = (value, allDataLongForBuildAngle) => {
  const percentOfСomponent = value * 100 / allDataLongForBuildAngle;
  const longInRingChart = Math.floor(ringСircumference * percentOfСomponent / 100);
  const angle = Math.round((longInRingChart * 180)/ (3.14 * 50));
  return angle; 
}

export const initRectangleChart = (chartData) => {
  const rectangleOptimalWidth = actualChartWidth / rectanglesDataObject.amountOfRectangles - 10;
  const coefficientOfGraduateSteps = getCoefficientOfGraduateSteps(chartData.chartsDataArray);

  const konvaInitRectObject = {};
  konvaInitRectObject.graduateYlines = [];
  konvaInitRectObject.textToGraduateYlines = [];
  konvaInitRectObject.rectangles = [];

  konvaInitRectObject.configKonva = {
    width: actualChartWidth,
    height: actualChartHeight,
  };
  konvaInitRectObject.axisYline = {
    points: axisYlinePosition,
    stroke: linesColor,
    strokeWidth: dividingLineWidth,
  };
  konvaInitRectObject.axisXline = {
    points: axisXlinePosition,
    stroke: linesColor,
    strokeWidth: dividingLineWidth,
  };
  
  for (let i = 0; i < amountOfGraduateLinesForRectangleOnYAxis; i++) {
    konvaInitRectObject.graduateYlines.push({
      graduateConfig: {
        points: axisYGraduateLinesPosition (i),
        stroke: linesColor,
        strokeWidth: 2,
        },
    });
    konvaInitRectObject.textToGraduateYlines.push({
      textConfig: {
        x: 0,
        y: (actualChartHeight - indentForDividingLine - graduateFontSize/2) - (distanceBetweenGraduateLinesOnYAxis * i),
        fontSize: graduateFontSize,
        text: coefficientOfGraduateSteps * i || '0',
        },
    });
  }
  chartData.chartsDataArray.forEach((data, index) => {
    konvaInitRectObject.rectangles.push({
      rectConfig: {
        x: indentForDividingLine + rectangleOptimalWidth*index,
        y: actualChartHeight - indentForDividingLine,
        width: rectangleOptimalWidth,
        height: 0,
        inputValue: data.value,
        fill: data.chartElementColor,
        stroke: 'black',
        strokeWidth: 2,
      },
      nameConfig: {
        x: indentForDividingLine + rectangleOptimalWidth*index,
        y: actualChartHeight - indentForDividingLine * 2,
        text: data.valueName,
        fontSize: graduateFontSize,
      }
    })
    const timerToPaint = setInterval(
      () => getAnimatedChartHeigh(konvaInitRectObject.rectangles[index].rectConfig, getProportionToScaleChart(data.value, coefficientOfGraduateSteps)*-1, timerToPaint)
      , 1);
  });
  return konvaInitRectObject;
}

export const initRingChart = (chartData) => {
  let angleCounter = 0;
  const konvaInitRingObject = {};
  const allDataLongForBuildAngle = getDataLongForBuildAngle(chartData.chartsDataArray);
  const maxDataValue = getMaxDataValue(chartData.chartsDataArray);
  konvaInitRingObject.rings = [];


  konvaInitRingObject.configKonva = {
    width: actualChartWidth,
    height: actualChartHeight,
  };


  chartData.chartsDataArray.forEach((data, index) => {
    let dataAngle = getAngle(data.value, allDataLongForBuildAngle);
    if (chartData.chartsDataArray.length - 1 === index) {
      dataAngle = 360 - angleCounter;
    }
    konvaInitRingObject.rings.push({
      ringConfig: {
        x: actualChartWidth / 2,
        y: actualChartHeight / 2,
        innerRadius: innerRadiusForRingChart,
        outerRadius: getProportionToScaleRingChart(data.value, maxDataValue),
        angle: dataAngle,
        fill: data.chartElementColor,
        stroke: 'black',
        inputValue: data.value,
        strokeWidth: 2,
        rotation: angleCounter,
      }
    })
    angleCounter += dataAngle;
  });
  return konvaInitRingObject;
}
