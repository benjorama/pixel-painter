function createGridContainer( size ) {
  const gridContainer = document.createElement( "div" );
  gridContainer.setAttribute( "class", "gridContainer" );
  gridContainer.style.display = "grid";
  gridContainer.style.width = "450px";
  gridContainer.style.height = "450px";
  let gridTemplateColumns = "";
  for ( let i = 0; i < size; i++ ) {
    gridTemplateColumns += "1fr ";
  }
  gridContainer.style.gridTemplateColumns = gridTemplateColumns;
  return gridContainer;
}

let mouseDown = false;
function createGridCell() {
  let alpha = 0.0;
  const gridCell = document.createElement( "div" );
  gridCell.setAttribute( "class", "gridCell" );
  gridCell.style.border = "1px solid black";
  gridCell.addEventListener( "mousedown", () => {
    mouseDown = true;
    console.log(mouseDown);
    alpha += 0.1;
    gridCell.style.backgroundColor = getCellColor( alpha );
  });
  gridCell.addEventListener( "mouseup", () => {
    mouseDown = false;
  });
  gridCell.addEventListener( "mouseover", () => {
    console.log(mouseDown);
    if ( mouseDown ) {
      alpha += 0.1;
      gridCell.style.backgroundColor = getCellColor( alpha );
    }
  }); 
  return gridCell;
}

function createGrid() {
  const size = document.querySelector( ".options select" ).value;
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
  const dropDownSelector = document.querySelector( ".options select" );
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

function getCellColor( alpha ) {
  const colorSettings = document.getElementsByName( "color" );
  let color = "black";
  colorSettings.forEach( element => {
    if ( element.checked ) {
      if ( element.value === "random" )
        color = getRandomColor();
      if ( element.value === "grayscale" ) {
        console.log("alpha: " + alpha );
        color = `rgba( 0.0, 0.0, 0.0, ${alpha})`;
      }
    }
  });
  return color;
}

function getRandomColor() {
  return `rgba(
    ${Math.floor( Math.random() * 256 )}, 
    ${Math.floor( Math.random() * 256 )}, 
    ${Math.floor( Math.random() * 256 )}, 
    ${1})`;
}

populateDropDownResolution();
createGrid();
const createCanvasButton = document.querySelector( ".options button" );
createCanvasButton.addEventListener( "click", () => {
  createGrid();
});