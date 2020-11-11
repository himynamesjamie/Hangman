let currentWord = [];
let chosenWord = '';
let chosenLetter = '';
let lives = 10;
const onScreenWord = document.getElementById('on-screen-word');
const submitBtn = document.getElementById('submit-btn');
const inputBox = document.getElementById('input');
var onScreenLives = document.getElementById('image');

function hasLetterAlreadyBeenChosen(letter) {
	for (let i = 0; i < chosenWord.length; i++) {
		if (letter === currentWord[i]) {
			alert(`${currentWord[i]} has already been chosen.`);
			return false;
		}
	}
	return true;
}

function checkStoredWord(letter) {
	let doesLetterExist = false;
	let numOfTimes = 0;
	for (let i = 0; i < chosenWord.length; i++) {
		if (letter === chosenWord[i]) {
			currentWord[i] = letter;
			doesLetterExist = true;
			numOfTimes++;
		}
	}
	return doesLetterExist;
}

function checkValidlLetter(chosenLetter) {
	if (chosenLetter.length !== 1) {
		alert('Error, type ONE letter');
		return false;
	} else if (
		!(
			(chosenLetter.charCodeAt() >= 65 && chosenLetter.charCodeAt() < 91) ||
			(chosenLetter.charCodeAt() >= 97 && chosenLetter.charCodeAt() < 123)
		)
	) {
		alert('You didnt enter a letter :)');
		return false;
	} else {
		return true;
	}
}

function updatecurrentWord() {
	for (let i = 0; i <= currentWord.length; i++) {
		console.log(currentWord[i]);
	}
}

function updateImage(lives) {
    if (lives === 9) {
        onScreenLives.src = 'img/h1.png';
    } 
    if (lives === 8) {
        onScreenLives.src = 'img/h2.png';
    } 
    if (lives === 7) {
        onScreenLives.src = 'img/h3.png';
    } 
    if (lives === 6) {
        onScreenLives.src = 'img/h4.png';
    } 
    if (lives === 5) {
        onScreenLives.src = 'img/h5.png';
    } 
    if (lives === 4) {
        onScreenLives.src = 'img/h6.png';
    } 
    if (lives === 3) {
        onScreenLives.src = 'img/h7.png';
    } 
    if (lives === 2) {
        onScreenLives.src = 'img/h8.png';
    } 
    if (lives === 1) {
        onScreenLives.src = 'img/h9.png';
    } 
    if (lives === 0) {
        onScreenLives.src = 'img/gameover.png';
    } 

}

function submitLetter() {
	let chosenLetter = inputBox.value;
	if (!checkValidlLetter(chosenLetter)) {
		return false;
	}
	if (!hasLetterAlreadyBeenChosen(chosenLetter)) {
		return false;
	}

	if (checkStoredWord(chosenLetter)) {
		onScreenWord.textContent = currentWord;
	} else {
        lives--;
        updateImage(lives);
		console.log(lives);
	}

	// checkValidlLetter(chosenLetter)
}

// --------------------------------------------------------------------------------------------------------------------------------------

chosenWord = prompt('please enter your chosen word!');
// currentWord = '-' * 2;
for (let i = 0; i < chosenWord.length; i++) {
	currentWord[i] = '-';
}

let poo = currentWord.toString();


for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === ',') {
        string.replace(',', '');
    }
    
    
}

console.log(currentWord);
// for (let i = 0; i < chosenWord.length; i++) {
// 	if (poo[i] === ',') {
//         string.replace('characterToReplace', '');    
//     }
// }

console.log(poo);

onScreenWord.textContent = currentWord;

submitBtn.addEventListener('click', submitLetter);
