let xENTER = 150;
let xBACKSPACE = 450;
let field = [
  [6, 0, 0, 0, 1, 9, 7, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 1, 9],
  [0, 0, 0, 4, 0, 0, 0, 0, 1],
  [3, 0, 0, 0, 0, 2, 9, 0, 0],
  [0, 0, 0, 0, 8, 5, 0, 2, 0],
  [9, 0, 0, 0, 0, 0, 0, 6, 5],
  [0, 0, 5, 3, 4, 8, 0, 0, 0],
  [7, 0, 8, 0, 0, 0, 0, 0, 0]
];
 
function keyPressed() {
  if (key === 'Enter') {
    solveRec();
  }
  if (key === 'Backspace') {
    zuruecksetzen();
  }
}
 
function mousePressed() {
  let cellSize = width / 9;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let x = j * cellSize;
      let y = i * cellSize;
      if (mouseX >= x && mouseX < x + cellSize && mouseY > y && mouseY < y + cellSize) {
        field[i][j]++;
        if (field[i][j] > 9) {
          field[i][j] = 0;
        }
      }
    }
  }
  if (mouseX >= xENTER-50 && mouseX < xENTER + 50 && mouseY > 600 && mouseY < 680) {
    solveRec();
  }
 
  if (mouseX >= xBACKSPACE-50 && mouseX < xBACKSPACE + 50 && mouseY > 600 && mouseY < 680) {
    zuruecksetzen();
  }
}
 
function setup() {
  createCanvas(600, 680);
}
 
function draw() {
  background(255);
  printField();
  textSize(20);
  textAlign(CENTER);
  text("Lösung anzeigen [Enter]", xENTER, 640);
  text("zurücksetzen [Backspace]", xBACKSPACE, 640);
}
 
function zuruecksetzen() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      field[i][j] = 0;
    }
  }
}
 
function solveRec() {
  let cellNo = findNextEmpty();
  if (cellNo === -1) {
    console.log("Es gibt keine freien Zellen mehr");
    return true;
  }
 
  for (let i = 1; i < 10; i++) {
    if (numberAllowed(cellNo, i)) {
      setNumber(cellNo, i);
      let result = solveRec();
      if (result) {
        return true;
      }
      setNumber(cellNo, 0);
    }
  }
  return false;
}
 
function findNextEmpty() {
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field.length; c++) {
      if (field[r][c] === 0) {
        return r * 9 + c;
      }
    }
  }
  return -1;
}
 
function setNumber(cellNo, number) {
  let row = Math.floor(cellNo / 9);
  let col = cellNo % 9;
  field[row][col] = number;
}
 
function getNumber(cellNo) {
  let row = Math.floor(cellNo / 9);
  let col = cellNo % 9;
  return field[row][col];
}
 
function numberAllowed(cellNo, number) {
  let row = Math.floor(cellNo / 9);
  let col = cellNo % 9;
  return !(
    rowContainsNumber(row, number) ||
    colContainsNumber(col, number) ||
    blockContainsNumber(row, col, number)
  );
}
 
function rowContainsNumber(row, number) {
  for (let i = 0; i < 9; i++) {
    if (field[row][i] === number) {
      return true;
    }
  }
  return false;
}
 
function colContainsNumber(col, number) {
  for (let i = 0; i < 9; i++) {
    if (field[i][col] === number) {
      return true;
    }
  }
  return false;
}
 
function blockContainsNumber(row, col, number) {
  let startR = row - (row % 3);
  let startC = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (field[startR + i][startC + j] === number) {
        return true;
      }
    }
  }
  return false;
}
 
function printField() {
  let cellSize = width / 9;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let x = j * cellSize;
      let y = i * cellSize;
      let value = field[i][j];
 
      if (value !== 0) {
        textAlign(CENTER, CENTER);
        textSize(38);
        fill(0);
        text(value, x + cellSize / 2, y + cellSize / 2);
      }
    }
  }
 
  for (let i = 0; i < 10; i++) {
    if (i % 3 === 0) {
      stroke(0);
      line(0, i * cellSize, width, i * cellSize);
      line(0, i * cellSize - 1, width, i * cellSize - 1);
      line(0, i * cellSize + 1, width, i * cellSize + 1);
    } else {
      stroke(180);
      line(0, i * cellSize, width, i * cellSize);
    }
  }
 
  for (let i = 1; i < 9; i++) {
    if (i % 3 === 0) {
      stroke(0);
      line(i * cellSize, 0, i * cellSize, width);
      line(i * cellSize + 1, 0, i * cellSize + 1, width);
      line(i * cellSize - 1, 0, i * cellSize - 1, width);
    } else {
      stroke(0);
      line(i * cellSize, 0, i * cellSize, width);
    }
  }
  for(let c=0; c<3; c++){
    stroke(0);
  line(599+c, 0, 599+c, 600);
  }
}
