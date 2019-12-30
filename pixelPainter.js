let mouseDown = false;

function createGridContainer( size ) {
  const gridContainer = document.createElement( "div" );
  gridContainer.setAttribute( "class", "gridContainer" );
  gridContainer.style.display = "grid";
  gridContainer.style.width = "500px";
  gridContainer.style.height = "500px";
  let gridTemplateColumns = "";
  for ( let i = 0; i < size; i++ ) {
    gridTemplateColumns += "1fr ";
  }
  gridContainer.style.gridTemplateColumns = gridTemplateColumns;
  return gridContainer;
}

function createGridCell() {
  const gridCell = document.createElement( "div" );
  gridCell.setAttribute( "class", "gridCell" );
  gridCell.style.border = "1px solid black";
  gridCell.addEventListener( "mousedown", () => {
    mouseDown = true;
    gridCell.style.backgroundColor = getCellColor();
  });
  gridCell.addEventListener( "mouseup", () => {
    mouseDown = false;
  });
  gridCell.addEventListener( "mouseover", () => {
    if ( mouseDown )
      gridCell.style.backgroundColor = getCellColor();
  }); 
  return gridCell;
}

function createGrid() {
  const size = document.querySelector( ".canvasSize select" ).value;
  if ( !document.querySelector( ".gridContainer" ) ) {
    const gridContainer = createGridContainer( size );
    for ( let i = 0; i < size; i++ ) {
      for ( let j = 0; j < size; j++ ) {
        const gridCell = createGridCell();
        gridContainer.appendChild( gridCell );
      }
    }
    document.body.appendChild( gridContainer );
  } else {
    const gridContainer = document.querySelector( ".gridContainer" );
    gridContainer.remove();
    createGrid( size );    
  }
}

function populateDropDownResolution() {
  const DEFAULT_RESOLUTION = 16;
  const dropDownSelector = document.querySelector( ".canvasSize select" );
  for ( let i = 1; i <= 128; i++ ) {
    const option = document.createElement( "option" );
    option.value = i;
    option.text = i + " x " + i;
    if ( option.value == DEFAULT_RESOLUTION ) {
      option.setAttribute( "selected", "selected" );
    }
    dropDownSelector.appendChild( option );
  }
}

function getCellColor() {
  const colorSettings = document.getElementsByName( "color" );
  let color = "black";
  colorSettings.forEach( element => {
    if ( element.checked ) {
      if ( element.value === "random" )
        color = getRandomColor();
      if ( element.value === "grayscale" ) {
        color = "black";
      }
    }
  });
  return color;
}

function getRandomColor() {
  const redComponent = Math.floor( Math.random() * 256 );
  const greenComponent = Math.floor( Math.random() * 256 );
  const blueComponent = Math.floor( Math.random() * 256 );
  const alphaComponent = Math.random();
  return `rgba(${redComponent}, 
    ${greenComponent}, 
    ${blueComponent}, 
    ${alphaComponent})`;
}

populateDropDownResolution();
createGrid();
const createCanvasButton = document.querySelector( ".canvasSize button" );
createCanvasButton.addEventListener( "click", () => {
  createGrid();
});