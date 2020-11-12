let currentWord = [];
let chosenWord = '';
let chosenLetter = '';
let lives = 11;
let usedLetters = [];

let result = document.getElementById('result');
let livesRemaining = document.getElementById('lives-remaining');

const onScreenWord = document.getElementById('on-screen-word');
const submitBtn = document.getElementById('submit-btn');
const inputBox = document.getElementById('input');
const goBtn = document.getElementById('go');
const menuContainer = document.getElementById('menu-container');
const playAgainBtn = document.getElementById('play-again-btn');
const postGameTab = document.getElementById('post-game-tab');
const gameSetupTab = document.getElementById('game-setup');
const answer = document.getElementById('answer');
const menuBox = document.getElementById('menu-box');


var onScreenLives = document.getElementById('image-id');
var resultImage = document.getElementById('result-image');

let eventFunc = {};
let keyboardObjects = [];

const USED_LETTER = 'used letter';
const LETTER_EXISTS = 'letter exists';
const LETTER_DOES_NOT_EXIST = 'letter does not exist';



const keyboardIds = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];



const addKeyboardEventListeners = () => {
	for (let i = 0; i < keyboardIds.length; i++) {
		keyboardObjects.push(document.getElementById(keyboardIds[i]));
		keyboardObjects[i].addEventListener(
			'click',
			(eventFunc = function () {
				letterHandler(keyboardIds[i]);
				keyboardObjects[i].classList.add('letter-used');
				keyboardObjects[i].classList.remove('letter');
				usedLetters.push(keyboardObjects[i].textContent);
			}),
			false
		);
	}
}


const resetButtons = () => {
	for (let i = 0; i < usedLetters.length; i++) {
		for (let x = 0; x < keyboardObjects.length; x++) {
			if (usedLetters[i] === keyboardObjects[x].textContent) {
				keyboardObjects[x].classList.remove('letter-used');
				keyboardObjects[x].classList.add('letter');
			}
		}
	}
}

const playAgainHandler = () => {
	switchMenu(postGameTab, gameSetupTab, true);
	onScreenLives.src = 'img/hangman.png';
	resetButtons();
	currentWord = [];
	chosenWord = '';
	chosenLetter = '';
	lives = 11;
	usedLetters = [];
	inputBox.classList.remove('close-input');
}

const goHandler = () => {
	if (inputBox.value) {
		inputBox.placeholder = '';
		inputBox.classList.add('close-input');
		closeMenu(gameSetupTab, true);
		addChosenWord();
	} else {
		inputBox.placeholder = 'please enter a word!';
	}
}

const openMenu = (menu, fade) => {
	if (fade) {
		menuContainer.style.opacity = '0%';
		menuContainer.classList.add('show');
		menu.classList.add('show');
		setTimeout(function () {
			menuContainer.classList.add('fade-in');
			menuContainer.style.removeProperty('opacity');
		}, 1);

		setTimeout(function () {
			menuContainer.classList.remove('fade-in');
		}, 501);
	} else {
		menuContainer.classList.add('show');
		menu.classList.add('show');
	}
}

const closeMenu = (menu, fade) => {
	if (fade) {
		menuContainer.classList.add('fade-out');

		setTimeout(function () {
			menuContainer.classList.remove('show');
			menu.classList.remove('show');
			menuContainer.classList.remove('fade-out');
		}, 500);
	} else {
		menuContainer.classList.remove('show');
		menu.classList.remove('show');
	}
}

const switchMenu = (currentMenu, nextMenu, fade) => {
	if (fade) {
		currentMenu.classList.add('fade-out');

		setTimeout(function () {
			currentMenu.classList.remove('show');
			currentMenu.classList.remove('fade-out');

			nextMenu.style.opacity = '0%';
			nextMenu.classList.add('show');
			setTimeout(function () {
				nextMenu.classList.add('fade-in');
				nextMenu.style.removeProperty('opacity');
			}, 1);

			setTimeout(function () {
				nextMenu.classList.remove('fade-in');
			}, 501);
		}, 500);
	} else {
		currentMenu.classList.remove('show');
		nextMenu.classList.add('show');
	}
}
const addChosenWord = () => {
	//ADDS CHOSEN WORD TO THE GAME SCREEN
	chosenWord = inputBox.value.toLowerCase();

	for (let i = 0; i < chosenWord.length; i++) {
		if (chosenWord[i] === ' ') {
			currentWord[i] = ' ';
		} else {
			currentWord[i] = '-';
		}
	}
	updateCurrentWord();
}

const checkStoredWord = letter => {
	let doesLetterExist = false;
	let sum = 0;

	for (let x = 0; x < usedLetters.length; x++) {
		if (letter === usedLetters[x]) {
			return USED_LETTER;
		}
	}
	for (let i = 0; i < chosenWord.length; i++) {
		if (letter === chosenWord[i]) {
			currentWord[i] = letter;
			doesLetterExist = true;
			sum++;
		}
	}
	if (sum === 0) {
		return LETTER_DOES_NOT_EXIST;
	} else {
		return LETTER_EXISTS;
	}
}

// dont need this function because i replaced the text input with an onscreen keyboard
// kept for future reference

// function checkValidlLetter(chosenLetter) {
// 	if (chosenLetter.length !== 1) {
// 		alert('Error, type ONE letter');
// 		return false;
// 	} else if (
// 		!(
// 			(chosenLetter.charCodeAt() >= 65 && chosenLetter.charCodeAt() < 91) ||
// 			(chosenLetter.charCodeAt() >= 97 && chosenLetter.charCodeAt() < 123)
// 		)
// 	) {
// 		alert('You didnt enter a letter :)');
// 		return false;
// 	} else {
// 		return true;
// 	}
// }

const updateCurrentWord = () => {
	let updatedWord = '';
	// ADDS LETTER(S) TO CURRENT ARRAY
	for (let i = 0; i < chosenWord.length; i++) {
		if (chosenWord[i] === chosenLetter) {
			currentWord[i] = chosenLetter;
		}
	}

	updatedWord = currentWord.toString(); // CONVERTS THE ARRAY TO A STRING AND THEN
	//REMOVES COMMAS CREATED BY .TOSTRING METHOD
	for (let i = 0; i < updatedWord.length; i++) {
		if ((updatedWord[i] = ',')) {
			updatedWord = updatedWord.replace(',', '');
		}
	}

	onScreenWord.textContent = updatedWord;
	inputBox.value = '';
}

const updateImage = lives => {
	switch (lives) {
		case 10:
			onScreenLives.src = 'img/h1.png';
			break;
		case 9:
			onScreenLives.src = 'img/h2.png';
			break;
		case 8:
			onScreenLives.src = 'img/h3.png';
			break;
		case 7:
			onScreenLives.src = 'img/h4.png';
			break;
		case 6:
			onScreenLives.src = 'img/h5.png';
			break;
		case 5:
			onScreenLives.src = 'img/h6.png';
			break;
		case 4:
			onScreenLives.src = 'img/h7.png';
			break;
		case 3:
			onScreenLives.src = 'img/h8.png';
			break;
		case 2:
			onScreenLives.src = 'img/h9.png';
			break;
		case 1:
			onScreenLives.src = 'img/h10.png';
			break;
		case 0:
			onScreenLives.src = 'img/h11.png';
			break;
	}
}


const playerWins = () => {
	answer.textContent = '!!  ' + chosenWord + '  !!';
	onScreenLives.src = 'img/welldone.png';
	resultImage.src = 'img/you-win.gif';
	livesRemaining.textContent = `With ${lives} lives remaining!`;
	openMenu(postGameTab);
}

const playerLoses = () => {
	answer.textContent = '!!  ' + chosenWord + '  !!';
	resultImage.src = 'img/you-LOSE.gif';
	openMenu(postGameTab);
}

const letterHandler = letter => {

	switch (checkStoredWord(letter)) {
		case LETTER_EXISTS:
			updateCurrentWord();
			break;
		case LETTER_DOES_NOT_EXIST:
			lives--;
			updateImage(lives);
			break;
		case USED_LETTER:
			//something here
			break;
	}
	
	if (onScreenWord.textContent === chosenWord) {
		playerWins();
	} else if (lives === 0) {
		playerLoses();
	}
}
// const submitLetter = letter => {
// 	switch (checkStoredWord(letter)) {
// 		case LETTER_EXISTS:
// 			updateCurrentWord();
// 			break;
// 		case LETTER_DOES_NOT_EXIST:
// 			lives--;
// 			updateImage(lives);
// 			break;
// 		case USED_LETTER:
// 			//something here
// 			break;
// 	}
// 	checkIfUserHasWon();
	
// }



// WHEN PAGE HAS LOADED ----------------------------------------------------------
onScreenWord.textContent = '------'
openMenu(gameSetupTab, true);
addKeyboardEventListeners();



// EVENT LISTENERS ---------------------------------------------------------------

goBtn.addEventListener('click', goHandler);

playAgainBtn.addEventListener('click', playAgainHandler);
