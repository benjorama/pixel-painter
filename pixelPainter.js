const GRID_CELL_SIZE = "20px";

function createGridContainer( width ) {
  const gridContainer = document.createElement( "div" );
  gridContainer.setAttribute( "class", "gridContainer" );
  gridContainer.style.display = "grid";
  let gridTemplateColumns = "";
  for ( let i = 0; i < width; i++ ) {
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
  return gridCell;
}

function createGrid( width, height ) {
  const gridContainer = createGridContainer( width );
  for ( let i = 0; i < width; i++ ) {
    for ( let j = 0; j < height; j++ ) {
      const gridCell = createGridCell();
      gridContainer.appendChild( gridCell );
    }
  }
  document.body.appendChild( gridContainer );
}

createGrid( 16, 16 );
