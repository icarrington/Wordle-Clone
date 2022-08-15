//Model Section?
const rows = document.querySelectorAll('.row');
const keyboard = document.querySelector('.keyboard');
let rowNumber = 0;
let currentRow = rows[rowNumber];
let tiles = currentRow.querySelectorAll('.tile');
let tileNumber = 0;

let word = 'LUNCH'; //Fallback word in case the API doesn't work.

//Random Words API
fetch('https://random-word-api.herokuapp.com/word?length=5')
  .then(response => response.json())
  .then(response => word = response[0].toUpperCase())
  .catch(err => console.log(err));




//View Section?
function changeLetter(event) {
  const letter = event.key;
  
  if((!/^\w$/i.test(letter)) && (letter != 'Backspace') && (letter != 'Enter')) return; //Makes sure letter is a character and not a key like Enter or Backspace.
  

  if (letter == 'Enter') { //Submits the word if there are 5 letters.
    if (tileNumber < 4) return;
    showColors();
    return submitEntry();
  }
  
  if(letter == 'Backspace') { //Deletes a letter
    if(tileNumber == 0) return;
    tileNumber--;
    tiles[tileNumber].innerHTML = '';
  } else if (tileNumber >= 5) return; //Do nothing after 5 letters
  else {
    tiles[tileNumber].innerHTML = letter.toUpperCase();
    tileNumber++;
  }
}

//This function changes the CSS styling for each letter depending on whether that letter is in the right spot, present in the word, or not in the word.
function showColors() {
  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    if (tile.textContent == word[i]) {
      tile.classList.add('correct');
      let key = document.getElementById(tile.textContent);
      key.classList.add('correct');
    }
    else if (word.includes(tile.textContent)) {
      tile.classList.add('present');
      let key = document.getElementById(tile.textContent);
      key.classList.add('present');
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
  if(Array.from(tiles).every(tile => tile.classList.contains('correct'))) {
    document.removeEventListener('keyup', changeLetter);
    alert('Correct!');
    return;
  }
  if (rowNumber >= 5) {
    alert('Word is ' + word); //alert the word after 5 incorrect guesses.
    return;
  }

  rowNumber++;
  currentRow = rows[rowNumber];
  tileNumber = 0;
  tiles = currentRow.querySelectorAll('.tile');
}

//this function makes it so that clicking the on screen keyboard works the same as typing with a keyboard.
function handleKeyboardClicks(event) {
  let target = event.target;
  let press = new KeyboardEvent('keyup', {key: target.id});
  event.preventDefault(); //prevents zooming on mobile
  document.dispatchEvent(press);
}

document.addEventListener('keyup', changeLetter);
keyboard.addEventListener('click', handleKeyboardClicks);