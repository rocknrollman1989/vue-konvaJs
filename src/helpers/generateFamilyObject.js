import Konva from 'konva';

const familyTree = [
  { gener: -1, key: 0, name: "bob", sex: "male", ux: 1},
  { gener: -1, key: 1, name: "Aaron", sex: "female", ux: 0},
  { gener: 0, key: 2, name: "Barbara", sex: "male", ux: 3},
  { gener: 0, key: 3, name: "Alice", sex: "female", ux: 2},
  { gener: 1, key: 4, name: "Bob", sex: "male"},
  { gener: 1, key: 5, name: "Bill", sex: "male"},
  { gener: 1, key: 6, name: "Alice", sex: "female"},

];

const rectWidthHeight = 50;

let minValue = 0;
let maxValue = 0;
let differenceCounter = 0;
const familyArrayWithCoordinates = [];
const pedigreeMemberCountInGeneration = {};

familyTree.forEach((member) => {
  if (member.gener) {
    member.gener < minValue ? minValue = member.gener : null;
    member.gener > maxValue ? maxValue = member.gener : null;
  }
});

familyTree.sort((a, b) =>{
  return a.gener - b.gener;
})


const getCanvasHeight = () => {
  let startValue = minValue;
  while (startValue <= maxValue) {
    differenceCounter ++;
    startValue ++;
  }
  return differenceCounter * 100;
}

const getCanvasWidth = () => {
  let numberOfGeneration = 0;
  let maxCountOfMembersInGeneration = 0;
  familyTree.forEach((member) => {
    if (numberOfGeneration != member.gener) {
      pedigreeMemberCountInGeneration[member.gener] = 1;
      numberOfGeneration = member.gener;
      return
    }
    if (numberOfGeneration == member.gener) {
      pedigreeMemberCountInGeneration[member.gener] = pedigreeMemberCountInGeneration[member.gener] + 1;
    }
  })
  Object.keys(pedigreeMemberCountInGeneration).forEach((key) => {
    if (pedigreeMemberCountInGeneration[key] > maxCountOfMembersInGeneration) return maxCountOfMembersInGeneration = pedigreeMemberCountInGeneration[key];
  })

  return maxCountOfMembersInGeneration * 100;
}

const canvasHeight = getCanvasHeight();
const canvasWidth = getCanvasWidth();

const createRectangles = (familyPerson, layer) => {
  const startXPosition = (canvasWidth / pedigreeMemberCountInGeneration[familyPerson.gener]) / 2 - 25;
  const indentFromLastElement = canvasWidth / pedigreeMemberCountInGeneration[familyPerson.gener];

  const startYPosition = (canvasHeight / differenceCounter / 2 - 25);
  const heightIndentFromLastElement = canvasHeight / differenceCounter;

  familyPerson.sex === 'male' ? 
  layer.add(new Konva.Rect({
    x: startXPosition + indentFromLastElement * FamilyPersonFactory.rectCounter,
    y: startYPosition + heightIndentFromLastElement * FamilyPersonFactory.actualGenerationCounter,
    width: rectWidthHeight,
    height: rectWidthHeight,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    id: familyPerson.key,
    generation: familyPerson.gener,
  })) :
  layer.add(new Konva.Circle({
    x: startXPosition + indentFromLastElement * FamilyPersonFactory.rectCounter + 25,
    y: startYPosition + heightIndentFromLastElement * FamilyPersonFactory.actualGenerationCounter + 25,
    radius: 25,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    key: familyPerson.key,
    generation: familyPerson.gener,
  }));
}

function FamilyPersonFactory(familyPerson, layer) {
  if (familyPerson.gener == FamilyPersonFactory.actualGeneration) {
    createRectangles(familyPerson, layer);
  }
  if (familyPerson.gener != FamilyPersonFactory.actualGeneration) {
    FamilyPersonFactory.actualGeneration = familyPerson.gener;
    FamilyPersonFactory.actualGenerationCounter ++;
    FamilyPersonFactory.rectCounter = 0;
    createRectangles(familyPerson, layer)
  }
  FamilyPersonFactory.rectCounter++;
}
FamilyPersonFactory.actualGeneration = minValue;
FamilyPersonFactory.actualGenerationCounter = 0;
FamilyPersonFactory.rectCounter = 0;


function LineForPersonFactory(familyPerson, layer) {

  if (LineForPersonFactory.twoMarriedPersonArray.length) {
    LineForPersonFactory.twoMarriedPersonArray.forEach((couple) => {
      couple.forEach((member) => {
        if (member.ux == familyPerson.key) {
          return couple.push(familyPerson);
        }
        console.log(LineForPersonFactory.twoMarriedPersonArray)

        // LineForPersonFactory.twoMarriedPersonArray.push([familyPerson]);
      })
    })

  }
  if (!LineForPersonFactory.twoMarriedPersonArray.length) {
    LineForPersonFactory.twoMarriedPersonArray.push([familyPerson]);
  }
}
LineForPersonFactory.twoMarriedPersonArray = [];


const initConvaStage = (mainContainer) => {
  const stage = new Konva.Stage({
    container: mainContainer.id,
    width: canvasWidth,
    height: canvasHeight,
  });
  return stage;
}

export const createPedigreeByConva = (refDiv) => {
  const mainContainer = refDiv;
  const stage = initConvaStage(mainContainer);
  const layer = new Konva.Layer();
  familyTree.forEach((member, item) => {
    new FamilyPersonFactory(member, layer);
    familyArrayWithCoordinates.push(layer.children[item]);
  })
  familyTree.forEach((member, item) => {
    if (member.ux || member.ux == 0) {
      new LineForPersonFactory(member, layer);
    }
  })

  stage.add(layer);
}
// ux, the person's wife
// vir, the person's husband