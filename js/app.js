let currentWord = [];
let chosenWord = '';
let chosenLetter = '';
let lives = 11;
let usedLetters = [];
let gameMode = false;

let result = document.getElementById('result');
let livesRemaining = document.getElementById('lives-remaining');
const cancelGo = document.getElementById('cancel__go');
const playAgainYesBtn = document.getElementById('play-again__yes');
const playAgainNoBtn = document.getElementById('play-again__no');

const wordContainer = document.querySelector('.word-container');
const navBar = document.querySelector('.nav-bar ul').children;
const quitMenu = document.querySelector('.quit-menu');
const quitNoBtn = document.querySelector('#quit__no');
const quitYesBtn = document.querySelector('#quit__yes');
const keyboard = document.getElementById('keyboard');
const pvpBtn = document.getElementById('pvp-btn');
const pveBtn = document.getElementById('pve-btn');
const backdrop = document.querySelector('#backdrop');
const quitBtn = document.querySelector('.quit');
const page = document.getElementById('page');
const onScreenWord = document.getElementById('on-screen-word');
const submitBtn = document.getElementById('submit-btn');
const inputBox = document.getElementById('input');
const goBtn = document.getElementById('go');
const playAgainBtn = document.getElementById('play-again-btn');
const postGameTab = document.getElementById('post-game-tab');
const gameSetupTab = document.getElementById('game-setup');
const answer = document.getElementById('answer');
const menuBox = document.getElementById('menu-box');

let currentMenu = null;

var onScreenLives = document.getElementById('image-id');
var resultImage = document.getElementById('result-image');

let keyboardObjects = [];

const USED_LETTER = 'used letter';
const LETTER_EXISTS = 'letter exists';
const LETTER_DOES_NOT_EXIST = 'letter does not exist';

const SMALL = 'small';

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

// const areYouSureMenu = (PARAMETERS) => {
// 	const newMenu = document.createElement('div');
// 	newMenu.className = 'are-you-sure__menu-box';
// 	newMenu.innerHTML = `
// 	<div class="quit-menu">
// 		<h2>are you sure?</h2>
// 		<div>
// 			<p id="no" class="no-btn btn-white">no</p>
// 			<p class="yes-btn btn-black">yes</p>
// 		</div>
// 	</div>
// 	`;
// 	const menuRoot = document.querySelector('page');
// 	menuRoot.append(newMenu);
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
};

const updateImage = (lives) => {
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
};

const checkStoredWord = (letter) => {
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
};

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
};

const showKeyboard = () => {
	keyboard.classList.add('show-keyboard');
	wordContainer.classList.add('word-container__move');
};

const hideKeyboard = () => {
	keyboard.classList.remove('show-keyboard');
	wordContainer.classList.remove('word-container__move');
};

const removeClass = (element, className) => {
	element.classList.remove(className);
};

const addClass = (element, className) => {
	element.classList.add(className);
};

const removeClassFromActiveMenu = (className) => {
	const menu = menuBox.children;
	for (let i = 0; i < menu.length; i++) {
		if (menu[i].classList.contains(className)) {
			menu[i].classList.remove(className);
		}
	}
};

const addClassToActiveMenu = (className) => {
	const menu = menuBox.children;
	for (let i = 0; i < menu.length; i++) {
		if (menu[i].classList.contains('show')) {
			menu[i].classList.add(className);
		}
	}
};

const openMenu = (menu, size) => {
	if (size === SMALL) {
		menuBox.style.width = '250px';
		menuBox.style.height = '100px';
	}
	menuBox.style.opacity = '0%';
	backdrop.style.opacity = '0%';
	addClass(menuBox, 'show');
	addClass(backdrop, 'show');
	addClass(menu, 'show');
	setTimeout(function () {
		menuBox.style.removeProperty('opacity');
		backdrop.style.removeProperty('opacity');
		addClass(menuBox, 'fade-in');
		addClass(backdrop, 'fade-in');
	}, 1);

	setTimeout(function () {
		removeClass(menuBox, 'fade-in');
		removeClass(backdrop, 'fade-in');
	}, 251);
};

const closeMenu = () => {
	addClass(menuBox, 'fade-out');
	addClass(backdrop, 'fade-out');

	setTimeout(function () {
		removeClassFromActiveMenu('show');
		removeClass(menuBox, 'show');
		removeClass(menuBox, 'fade-out');
		removeClass(backdrop, 'show');
		removeClass(backdrop, 'fade-out');
		menuBox.style.removeProperty('width');
		menuBox.style.removeProperty('height');
	}, 250);
};

const switchMenu = (nextMenu) => {
	addClassToActiveMenu('fade-out');

	setTimeout(function () {
		removeClassFromActiveMenu('show');
		removeClassFromActiveMenu('fade-out');

		nextMenu.style.opacity = '0%';
		addClass(nextMenu, 'show');
		setTimeout(function () {
			addClass(nextMenu, 'fade-in');
			nextMenu.style.removeProperty('opacity');
		}, 1);

		setTimeout(function () {
			removeClass(nextMenu, 'fade-in');
		}, 251);
	}, 250);
};

const closeInput = () => {
	inputBox.classList.add('close-input');
	setTimeout(function () {
		inputBox.classList.remove('close-input');
	}, 250);
};

const resetGame = () => {
	resetButtons();
	currentWord = [];
	chosenWord = '';
	chosenLetter = '';
	lives = 11;
	usedLetters = [];
	onScreenLives.src = 'img/hangman.png';
	onScreenWord.textContent = 'HANGMAN';
};

const addKeyboardEventListeners = () => {
	for (let i = 0; i < keyboardIds.length; i++) {
		keyboardObjects.push(document.getElementById(keyboardIds[i]));
		keyboardObjects[i].addEventListener(
			'click',
			function () {
				letterHandler(keyboardIds[i]);
			},
			false
		);
	}
};

const deactivateLetter = (letter) => {
	for (let i = 0; i < keyboardIds.length; i++) {
		if (letter === keyboardIds[i]) {
			keyboardObjects[i].classList.add('letter-used');
			keyboardObjects[i].classList.remove('letter');
			usedLetters.push(keyboardIds[i]);
		}
	}
};

const resetButtons = () => {
	for (let i = 0; i < usedLetters.length; i++) {
		for (let x = 0; x < keyboardObjects.length; x++) {
			if (usedLetters[i] === keyboardObjects[x].textContent) {
				keyboardObjects[x].classList.remove('letter-used');
				keyboardObjects[x].classList.add('letter');
			}
		}
	}
};

const playerWins = () => {
	answer.textContent = '!!  ' + chosenWord + '  !!';
	onScreenLives.src = 'img/welldone.png';
	resultImage.src = 'img/you-win.gif';
	livesRemaining.textContent = `With ${lives} lives remaining!`;
	openMenu(postGameTab);
};

const playerLoses = () => {
	answer.textContent = '!!  ' + chosenWord + '  !!';
	resultImage.src = 'img/you-LOSE.gif';
	openMenu(postGameTab);
};
//  ---------------------------------------------------------- EVENT HANDLERS --------

const quitYesBtnHandler = () => {
	resetGame();
	hideKeyboard();
	quitBtn.classList.remove('show');
	addClass(pvpBtn, 'nav-btn');
	removeClass(pvpBtn, 'active-nav');
	gameMode = false;
	closeMenu();
};

const quitNoBtnHandler = () => {
	closeMenu();
};
const quitBtnHandler = () => {
	openMenu(quitMenu, SMALL);
};

const backdropHandler = () => {
	// closeMenu();
};
const pvpBtnHandler = () => {
	if (!gameMode) {
		openMenu(gameSetupTab);
	}
};

const playAgainYesBtnHandler = () => {
	switchMenu(gameSetupTab);
	// alert('hello');
};

const playAgainNoBtnHandler = () => {
	quitYesBtnHandler();
};

const cancelGoHandler = () => {
	closeMenu();
}



const goHandler = () => {
	if (inputBox.value) {
		closeInput();
		closeMenu(gameSetupTab);
		quitBtn.classList.add('show');
		addChosenWord();
		inputBox.placeholder = '';
		showKeyboard();
		addClass(pvpBtn, 'active-nav');
		removeClass(pvpBtn, 'nav-btn');
		gameMode = true;
	} else {
		inputBox.placeholder = 'please enter a word!';
	}
};

const letterHandler = (letter) => {
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
	deactivateLetter(letter);
	if (onScreenWord.textContent === chosenWord) {
		playerWins();
		resetGame();
	} else if (lives === 0) {
		playerLoses();
		resetGame();
	}
};

//  ---------------------------------------------------------- WHEN PAGE HAS LOADED --------
addKeyboardEventListeners();
onScreenWord.textContent = 'HANGMAN';

//  --------------------------------------------------------------- EVENT LISTENERS --------

goBtn.addEventListener('click', goHandler);

pvpBtn.addEventListener('click', pvpBtnHandler);
backdrop.addEventListener('click', backdropHandler);
quitBtn.addEventListener('click', quitBtnHandler);
quitNoBtn.addEventListener('click', quitNoBtnHandler);
quitYesBtn.addEventListener('click', quitYesBtnHandler);
playAgainNoBtn.addEventListener('click', playAgainNoBtnHandler);
playAgainYesBtn.addEventListener('click', playAgainYesBtnHandler);
cancelGo.addEventListener('click', cancelGoHandler);
