
export const rectanglesDataObject = {
  amountOfRectangles: null,
  chartsDataArray: [],
}


const indentForDividingLine = 25;
const linesColor = '#212529';
const actualChartWidth = window.innerWidth/2;
const actualChartHeight = window.innerHeight/2;
const dividingLineWidth = 2;
const amountOfGraduateLinesForRectangleOnYAxis = 10;
const graduateFontSize = 14;
const distanceBetweenGraduateLinesOnYAxis = actualChartHeight / amountOfGraduateLinesForRectangleOnYAxis;

const axisYlinePosition = [indentForDividingLine, 0, indentForDividingLine, actualChartHeight - indentForDividingLine];
const axisXlinePosition = [indentForDividingLine, actualChartHeight - indentForDividingLine,  actualChartWidth - indentForDividingLine, actualChartHeight - indentForDividingLine];


const axisYGraduateLinesPosition = (i) => {
  return [indentForDividingLine-2, ((actualChartHeight - indentForDividingLine) - (distanceBetweenGraduateLinesOnYAxis * i)), indentForDividingLine + 2, ((actualChartHeight - indentForDividingLine) - (distanceBetweenGraduateLinesOnYAxis * i))]
}

const dynamicColors = () => {
  const generateColor = () => Math.floor(Math.random() * 255);
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
  return Number(Math.floor(realHeight));
} 

const getAnimatedChartHeigh = (rect, neededRectHeight, timerToPaint) => {
  if(rect.height == neededRectHeight) clearInterval(timerToPaint);
  rect.height -= 1
}

export const initRectangleChart = (chartData) => {
  const rectangleOptimalWidth = actualChartWidth / rectanglesDataObject.amountOfRectangles - 10;
  const coefficientOfGraduateSteps = getCoefficientOfGraduateSteps(chartData.chartsDataArray);

  const konvaInitObject = {};
  konvaInitObject.graduateYlines = [];
  konvaInitObject.textToGraduateYlines = [];
  konvaInitObject.rectangles = [];

  konvaInitObject.configKonva = {
    width: actualChartWidth,
    height: actualChartHeight,
  };
  konvaInitObject.axisYline = {
    points: axisYlinePosition,
    stroke: linesColor,
    strokeWidth: dividingLineWidth,
  };
  konvaInitObject.axisXline = {
    points: axisXlinePosition,
    stroke: linesColor,
    strokeWidth: dividingLineWidth,
  };
  
  for (let i = 0; i < amountOfGraduateLinesForRectangleOnYAxis; i++) {
    konvaInitObject.graduateYlines.push({
      graduateConfig: {
        points: axisYGraduateLinesPosition (i),
        stroke: linesColor,
        strokeWidth: 2,
        },
    });
    konvaInitObject.textToGraduateYlines.push({
      textConfig: {
        x: 0,
        y: (actualChartHeight - indentForDividingLine - graduateFontSize/2) - (distanceBetweenGraduateLinesOnYAxis * i),
        fontSize: graduateFontSize,
        text: coefficientOfGraduateSteps * i || '0',
        },
    });
  }
  chartData.chartsDataArray.forEach((data, index) => {
    konvaInitObject.rectangles.push({
      rectConfig: {
        x: indentForDividingLine + rectangleOptimalWidth*index,
        y: actualChartHeight - indentForDividingLine,
        width: rectangleOptimalWidth,
        height: 0,
        inputValue: data.value,
        fill: dynamicColors(),
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
      () => getAnimatedChartHeigh(konvaInitObject.rectangles[index].rectConfig, getProportionToScaleChart(data.value, coefficientOfGraduateSteps)*-1, timerToPaint)
      , 1);
  });
  return konvaInitObject;
}
