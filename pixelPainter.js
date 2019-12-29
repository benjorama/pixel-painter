const GRID_CELL_SIZE = "20px";
function createGridContainer( size ) {
  const gridContainer = document.createElement( "div" );
  gridContainer.setAttribute( "class", "gridContainer" );
  gridContainer.style.display = "grid";
  let gridTemplateColumns = "";
  for ( let i = 0; i < size; i++ ) {
    gridTemplateColumns += GRID_CELL_SIZE + " ";
  }
  gridContainer.style.gridTemplateColumns = gridTemplateColumns;
  return gridContainer;
}

function createGridCell() {
  const gridCell = document.createElement( "div" );
  gridCell.setAttribute( "class", "gridCell" );
  gridCell.style.border = "1px solid black";
  gridCell.style.height = GRID_CELL_SIZE;
  gridCell.addEventListener( "mouseover", () => {
    gridCell.style.backgroundColor = "black";
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

function populateDropDownSize() {
  const DEFAULT_GRID_SIZE = 16;
  const dropDownSelector = document.querySelector( ".canvasSize select" );
  for ( let i = 1; i <= 128; i++ ) {
    const option = document.createElement( "option" );
    option.value = i;
    option.text = i;
    if ( option.value == DEFAULT_GRID_SIZE ) {
      option.setAttribute( "selected", "selected" );
    }
    dropDownSelector.appendChild( option );
  }
}

populateDropDownSize();
createGrid();
const createCanvasButton = document.querySelector( ".canvasSize button" );
createCanvasButton.addEventListener( "click", () => {
  createGrid();
});



