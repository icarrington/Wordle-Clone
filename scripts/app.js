//Model Section?
const rows = document.querySelectorAll('.row');
const keyboard = document.querySelector('.keyboard');
let rowNumber = 0;
let currentRow = rows[rowNumber];
let tiles = currentRow.querySelectorAll('.tile');
let tileNumber = 0;

let word = 'LUNCH'; //the answer, maybe it can be dynamically set from a server?



//View Section?
function changeLetter(event) {
  const letter = event.key;
  
  if((!/^\w$/i.test(letter)) && (letter != 'Backspace') && (letter != 'Enter')) return;
  

  if (letter == 'Enter') {
    if (tileNumber < 4) return;
    showColors();
    return submitEntry();
  }
  
  if(letter == 'Backspace') {
    if(tileNumber == 0) return;
    tileNumber--;
    tiles[tileNumber].innerHTML = '';
  } else if (tileNumber >= 5) return;
  else {
    tiles[tileNumber].innerHTML = letter.toUpperCase();
    tileNumber++;
  }
}

function showColors() {
  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    if (tile.textContent == word[i]) {
      tile.classList.add('correct');
      let key = document.getElementById(tile.textContent);
      key.classList.add('correct');
    }
    else if (word.includes(tile.textContent)) {
      tile.classList.add('misplaced');
      let key = document.getElementById(tile.textContent);
      key.classList.add('misplaced');
    }
    else {
      tile.classList.add('wrong');
      let key = document.getElementById(tile.textContent);
      key.classList.add('wrong');
    }
  }
}

//Controller Section?
function submitEntry() {
  if(Array.from(tiles).every(tile => tile.classList.contains('correct'))) document.removeEventListener('keyup', changeLetter);
  if (rowNumber >= 5) return;
  rowNumber++;
  currentRow = rows[rowNumber];
  tileNumber = 0;
  tiles = currentRow.querySelectorAll('.tile');
}

function handleKeyboardClicks(event) {
  let target = event.target;
  let press = new KeyboardEvent('keyup', {key: target.id});
  document.dispatchEvent(press);
}

document.addEventListener('keyup', changeLetter);
keyboard.addEventListener('click', handleKeyboardClicks);